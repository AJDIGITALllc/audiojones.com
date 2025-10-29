#!/usr/bin/env node
import { execSync } from "child_process";

const cmd = process.argv[2];

switch (cmd) {
  case "init":
    execSync("codex init", { stdio: "inherit" });
    break;
  case "link":
    execSync("codex repo link", { stdio: "inherit" });
    break;
  case "sync":
    execSync("codex sync", { stdio: "inherit" });
    break;
  case "status":
    execSync("codex status", { stdio: "inherit" });
    break;
  case "commit":
    execSync("codex commit --auto", { stdio: "inherit" });
    break;
  default:
    console.log("Usage: node tools/repo.js [init|link|sync|status|commit]");
}
