"""Utility script to diagnose the latest Vercel deployment.

This module connects to the Vercel REST API, retrieves the most recent
deployment for the configured project, and emits a concise diagnostic
summary that highlights the build status, root cause, and recommended
fixes.  The behaviour mirrors the specification in ``codex.task.yml``
so that the script can be triggered either manually or as part of an
automated workflow.

Environment variables
=====================

``VERCEL_TOKEN``
    A personal access token with permission to read deployments.

``VERCEL_PROJECT_NAME``
    The project slug or ID whose deployments should be inspected.

``VERCEL_TEAM_ID`` *(optional)*
    Team context for multi-tenant organisations.

The script only relies on the Python standard library and therefore
does not add any third-party dependency requirements.
"""

from __future__ import annotations

import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from typing import Iterable, List, Optional


API_BASE_DEPLOYMENTS = "https://api.vercel.com/v6/deployments"
API_DEPLOYMENT_EVENTS = "https://api.vercel.com/v13/deployments/{id}/events"


class VercelAPIError(RuntimeError):
    """Wraps API errors to provide clearer diagnostics to the user."""


@dataclass
class Deployment:
    """Representation of a Vercel deployment returned by the API."""

    uid: str
    state: str
    created_at: float
    framework: Optional[str]


@dataclass
class LogInsights:
    """Holds the conclusions derived from parsing the deployment logs."""

    root_cause: str
    missing_envs: List[str]
    missing_dependencies: List[str]
    framework: Optional[str]
    build_status: str
    recommendations: List[str]


def getenv_or_exit(key: str) -> str:
    """Return the environment variable ``key`` or exit with an explanation."""

    value = os.getenv(key)
    if not value:
        print(f"❌ Environment variable {key} is not set.")
        sys.exit(1)
    return value


def make_request(url: str, headers: dict[str, str], params: Optional[dict[str, str]] = None) -> dict:
    """Perform a GET request and decode the JSON payload."""

    if params:
        query = urllib.parse.urlencode(params)
        url = f"{url}?{query}"
    request = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            payload = response.read()
    except urllib.error.HTTPError as exc:  # pragma: no cover - network failure
        raise VercelAPIError(f"HTTP error {exc.code} from Vercel API: {exc.reason}") from exc
    except urllib.error.URLError as exc:  # pragma: no cover - network failure
        raise VercelAPIError(f"Failed to reach Vercel API: {exc.reason}") from exc

    try:
        return json.loads(payload.decode("utf-8"))
    except json.JSONDecodeError as exc:
        raise VercelAPIError("Invalid JSON payload from Vercel API") from exc


def list_deployments(token: str, project: str, team: Optional[str]) -> List[Deployment]:
    headers = {"Authorization": f"Bearer {token}"}
    params: dict[str, str] = {"projectId": project, "limit": "20"}
    if team:
        params["teamId"] = team

    data = make_request(API_BASE_DEPLOYMENTS, headers=headers, params=params)
    deployments = []
    for item in data.get("deployments", []):
        framework = None
        meta = item.get("meta") or {}
        if isinstance(meta, dict):
            framework = meta.get("framework")
        created = float(item.get("created", 0)) / 1000.0
        deployments.append(
            Deployment(
                uid=item.get("uid", ""),
                state=item.get("state", "unknown"),
                created_at=created,
                framework=framework,
            )
        )

    deployments.sort(key=lambda d: d.created_at, reverse=True)
    return deployments


def fetch_events(token: str, deployment_id: str, team: Optional[str]) -> List[dict]:
    headers = {"Authorization": f"Bearer {token}"}
    params: dict[str, str] = {}
    if team:
        params["teamId"] = team

    url = API_DEPLOYMENT_EVENTS.format(id=deployment_id)
    data = make_request(url, headers=headers, params=params)
    events = data if isinstance(data, list) else data.get("events", [])
    return [event for event in events if isinstance(event, dict)]


def extract_text_from_event(event: dict) -> str:
    payload = event.get("payload")
    if isinstance(payload, dict):
        text = payload.get("text")
        if isinstance(text, str):
            return text
    if "message" in event and isinstance(event["message"], str):
        return event["message"]
    return ""


def find_framework(deployment: Deployment, events: Iterable[dict]) -> Optional[str]:
    if deployment.framework:
        return deployment.framework
    for event in events:
        text = extract_text_from_event(event).lower()
        if "next.js" in text:
            return "next.js"
        if "astro" in text:
            return "astro"
        if "remix" in text:
            return "remix"
        if "sveltekit" in text:
            return "sveltekit"
    return None


def detect_patterns(lines: Iterable[str], patterns: Iterable[str]) -> List[str]:
    matches = []
    for line in lines:
        low = line.lower()
        for pattern in patterns:
            if pattern in low:
                matches.append(line.strip())
                break
    return matches


def derive_insights(deployment: Deployment, events: List[dict]) -> LogInsights:
    lines = [extract_text_from_event(event) for event in events if extract_text_from_event(event)]

    error_lines = detect_patterns(lines, ["error", "fail", "cannot", "missing", "module not found"])
    root_cause = error_lines[-1] if error_lines else "No explicit error message found in logs."

    missing_envs = detect_patterns(
        lines,
        ["environment variable", "env var", "not set", "undefined", "missing key"],
    )
    missing_dependencies = detect_patterns(
        lines,
        [
            "module not found",
            "cannot find module",
            "npm err! missing script",
            "package not found",
            "dependency is missing",
        ],
    )

    framework = find_framework(deployment, events)

    recommendations = [
        "Verify the build command in Vercel project settings.",
        "Confirm all required environment variables are configured in the Vercel dashboard.",
        "Reproduce the build locally with `npm run build` to validate the fix before redeploying.",
    ]
    if missing_envs:
        recommendations.insert(1, "Set the missing environment variables noted in the logs.")
    if missing_dependencies:
        recommendations.insert(1, "Install or declare the dependencies that are reported as missing.")

    return LogInsights(
        root_cause=root_cause,
        missing_envs=missing_envs,
        missing_dependencies=missing_dependencies,
        framework=framework,
        build_status=deployment.state,
        recommendations=recommendations,
    )


def format_summary(insights: LogInsights, deployment: Deployment) -> str:
    framework = insights.framework or "Unknown"
    status_line = f"🔍 BUILD STATUS | {insights.build_status.upper()} | Framework: {framework}"
    root_cause_line = f"🧠 ROOT CAUSE | {insights.root_cause}"

    extra_sections = []
    if insights.missing_envs:
        extra_sections.append("Missing ENV Vars:\n  - " + "\n  - ".join(insights.missing_envs))
    if insights.missing_dependencies:
        extra_sections.append("Missing Dependencies:\n  - " + "\n  - ".join(insights.missing_dependencies))

    fix_lines = "\n  - ".join(insights.recommendations)
    fix_section = f"🛠 FIX RECOMMENDATION |\n  - {fix_lines}"

    created = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(deployment.created_at))
    header = f"🔗 Latest deployment: {deployment.uid} | Created: {created}"

    sections = [header, status_line, root_cause_line]
    sections.extend(extra_sections)
    sections.append(fix_section)
    return "\n\n".join(sections)


def main() -> int:
    token = getenv_or_exit("VERCEL_TOKEN")
    project = getenv_or_exit("VERCEL_PROJECT_NAME")
    team = os.getenv("VERCEL_TEAM_ID")

    try:
        deployments = list_deployments(token, project, team)
    except VercelAPIError as exc:
        print(f"❌ {exc}")
        return 1

    if not deployments:
        print("❌ No deployments found for the specified project.")
        return 1

    latest = deployments[0]
    print(f"🔗 Latest deployment: {latest.uid} | State: {latest.state}")

    try:
        events = fetch_events(token, latest.uid, team)
    except VercelAPIError as exc:
        print(f"❌ {exc}")
        return 1

    insights = derive_insights(latest, events)
    summary = format_summary(insights, latest)
    print()
    print(summary)
    return 0


if __name__ == "__main__":  # pragma: no cover - CLI behaviour
    raise SystemExit(main())

