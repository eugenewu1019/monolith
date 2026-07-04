# Agent Notes

## README Updates

- Treat README maintenance as a full audit, not a partial text refresh.
- Before committing README changes, verify badges, production URLs, framework versions, scripts, project structure, screenshots/images, and linked docs.
- Run `npm run docs:check` whenever README.md or README.zh-TW.md changes.
- Verify the production URL against GitHub Pages settings with `gh api repos/eugenewu1019/monolith/pages --jq .html_url` before changing demo or production links.
