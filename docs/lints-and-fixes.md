# Lints and Fixes

This document summarizes the key linting changes made to the codebase.

## ESLint Configuration

- Installed and configured `eslint-plugin-jsdoc` to enforce TSDoc-compliant documentation.
- Added the `@typescript-eslint/no-explicit-any` rule to disallow the use of the `any` type.

## Fixes

- Added TSDoc-compliant documentation to all public APIs in the `src` directory.
- Replaced all instances of `any` with more specific types.
