# Universal Education SaaS — Documentation Pack

This pack describes a multi-tenant School, College & Coaching Management SaaS with:
- One universal Android app for students and parents
- One web admin panel for every institute
- A central SaaS backend with strict tenant isolation
- Institute-issued QR enrollment delivered to each student's and parent's email when accounts are created
- Role-based access, subscriptions, audit logs and configurable modules
- Automated GitHub Actions CI/CD workflow to compile Android APKs and push directly to GitHub Releases
- Tailored configuration and Model Context Protocol (MCP) plugins for Anthropic's Claude

## Important assumptions
1. "Central SaaS" is the recommended first release. Each institute gets a unique institute code/slug, not an arbitrary API server to trust from a QR.
2. QR codes contain a short-lived, single-use enrollment token—not a permanent password or admin API key.
3. Student and parent accounts are separate. A parent may be securely linked to one or more children.
4. Claude Code CLI and Claude Desktop with Model Context Protocol (MCP) provide the primary agentic development harness.

## Files
- `CLAUDE.md` — standard project guidance and guardrails for Claude Code
- `CLAUDE_WORKFLOW.md` — multi-stage development workflow and specialist prompt templates for Claude
- `.mcp.json` — Model Context Protocol (MCP) server plugins (PostgreSQL, GitHub, Playwright, Memory)
- `PRD.md` — product requirements
- `ARCHITECTURE.md` — system architecture and trust boundaries
- `DATABASE_SCHEMA.md` — suggested PostgreSQL schema
- `API_SPEC.md` — initial API contract
- `QR_EMAIL_FLOW.md` — account creation, QR and email workflow
- `SECURITY_PRIVACY.md` — security and privacy requirements
- `UI_UX_SPEC.md` — screens and experience
- `SETUP_GUIDE.md` — tools, installation and local development
- `EXTENSIONS_AND_INTEGRATIONS.md` — Claude MCP plugins and editor extensions
- `ROADMAP_TESTING.md` — implementation phases and acceptance tests
- `CI_CD_ANDROID_RELEASE.md` — automated GitHub Actions APK build & release documentation
- `.github/workflows/build-android-release.yml` — automated GitHub Actions CI/CD pipeline for Android APK builds

## Suggested first milestone
Build a working pilot for one coaching institute with: institute setup, admin login, student/parent creation, QR email delivery, QR activation, attendance, fee tracking and basic reports. Validate with real users before expanding into school and college modules.

## Building with Claude & Model Context Protocol (MCP)

Use `CLAUDE.md` as the root instruction file and `CLAUDE_WORKFLOW.md` for the multi-stage implementation plan:
1. Open this repository in your terminal and launch **Claude Code** (`claude`), or open it in VS Code / Cursor with the Claude extension.
2. Claude automatically loads `CLAUDE.md` to adopt architectural guardrails, build commands, and coding standards.
3. Enable the MCP plugins configured in `.mcp.json` (Postgres, GitHub, Playwright, Memory) for live database queries and browser testing.
4. Execute the development phases sequentially: start with the review phase, implement the core vertical slice (QR enrollment flow), run automated tests, and trigger GitHub Actions for Android APK releases.
