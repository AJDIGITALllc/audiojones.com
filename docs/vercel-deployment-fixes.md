# Vercel Deployment Failures and Resolutions

This document summarizes the root causes of recent Vercel deployment failures and the steps taken to resolve them.

## Issue: Missing `OPENAI_API_KEY` Environment Variable

**Date:** 2025-11-06

**Symptom:** Vercel deployments were failing with a generic "Error" status, and local production builds (`npm run build`) were failing with the error message: `Error: OPENAI_API_KEY environment variable is required`.

**Root Cause:** The `blogGenerator` module, which is responsible for generating blog content using the OpenAI API, was checking for the `OPENAI_API_KEY` environment variable in its constructor. This caused the application to fail during the build process, as the `blogGenerator` module was being instantiated even though its methods were not being called.

**Resolution:** The fix was to move the check for the `OPENAI_API_KEY` from the constructor to the `generateContentWithVoice` method, which is the only place where the API key is actually used. This ensures that the build process can complete without requiring the API key to be set, and the application will only fail at runtime if the API key is missing and an attempt is made to generate blog content.
