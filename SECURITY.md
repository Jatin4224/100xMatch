# Security Policy

100xMatch stores personal data (names, emails, photos) and handles logins, so we take security reports seriously.

## Reporting a vulnerability

**Please don't open a public issue for security problems.**

Report it privately through GitHub instead: go to the repository's **Security** tab and click **Report a vulnerability** ([direct link](https://github.com/Jatin4224/100-x-Match/security/advisories/new)).

Please include:

- What the problem is and what an attacker could do with it
- Steps to reproduce, or a proof of concept
- The affected file, endpoint or page, if you know it

You can expect a first reply within a few days. Once it's fixed, we're happy to credit you in the release notes unless you'd prefer not to be named.

## Supported versions

Only the latest code on `main` gets security fixes.

## Scope

In scope: the backend API in `Backend/` and the frontend in `frontend/frontend/`.

Out of scope: problems in your own deployment configuration, and vulnerabilities in third-party dependencies that already have a public advisory (feel free to open a normal PR that upgrades them).
