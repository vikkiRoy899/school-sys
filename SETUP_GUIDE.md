# Setup Guide (Baseline: Claude Code & VS Code)

This guide provides instructions for setting up your local development environment and configuring Anthropic's **Claude** (via Claude Code CLI, Claude Desktop, or VS Code/Cursor) to develop the Universal Education SaaS.

---

## 1. Suggested Development Environment

- **Version Control**: Git & GitHub repository (configured with Actions CI/CD).
- **Runtime**: Node.js LTS (v20+), npm / pnpm.
- **Database**: PostgreSQL 15+ (local via Docker Compose or managed provider).
- **AI Agent**: **Claude Code CLI** (`@anthropic-ai/claude-code`) or VS Code / Cursor with the Anthropic Claude extension.
- **MCP Servers**: Model Context Protocol servers configured via `.mcp.json`.
- **Mobile Development**: React Native with Expo CLI (`npx expo`); automated APK compilation handled in the cloud via GitHub Actions.

---

## 2. Setting Up Claude Code & MCP Plugins

Claude Code is Anthropic's agentic CLI tool designed for direct codebase reasoning, refactoring, and test execution.

### Step 1: Install Claude Code
```bash
npm install -g @anthropic-ai/claude-code
```

### Step 2: Authenticate & Launch
Run `claude` in the repository root:
```bash
cd universal_education_saas_docs
claude
```
Claude will automatically discover and load **`CLAUDE.md`**, adopting the repository's strict tenant isolation rules, test commands, and coding standards.

### Step 3: Enable MCP Plugins (`.mcp.json`)
The repository includes `.mcp.json` at the root. To allow Claude to query your database and monitor GitHub workflows, ensure the following tools are available:
- **Postgres MCP**: Inspects PostgreSQL schemas and validates migrations.
- **GitHub MCP**: Monitors `.github/workflows/build-android-release.yml` APK builds and manages release tags.
- **Playwright MCP**: Automates browser checks on the Next.js admin portal.
- **Sequential Thinking MCP**: Provides multi-step structured reasoning for security modeling.

---

## 3. Local Infrastructure (Docker Compose)

To run a lightweight local backend without complex host installations, use Docker Compose:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    container_name: universal_edu_db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: universal_edu_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  mailpit:
    image: axllent/mailpit
    container_name: universal_edu_mailpit
    ports:
      - "1025:1025" # SMTP port
      - "8025:8025" # Web UI for viewing activation emails & QRs

volumes:
  postgres_data:
```

Start the containers:
```bash
docker compose up -d
```

---

## 4. Android Tooling & Automated CI/CD Builds

1. **Automated Cloud Builds (Recommended)**: To avoid running heavy Android Studio builds, Gradle daemons, or emulators locally, use the repository's GitHub Actions workflow (`.github/workflows/build-android-release.yml`). Pushing a git tag (e.g. `git tag v1.0.0 && git push origin v1.0.0`) automatically compiles, signs, and attaches the release `.apk` directly to the latest GitHub Release. See `CI_CD_ANDROID_RELEASE.md` for secrets configuration.
2. **Local Mobile Development (Optional)**: If local testing is needed:
   - Run `npx expo start` inside `apps/mobile/` to test features via Expo Go on a physical phone.
   - For native Android testing, connect a physical Android device via USB debugging rather than running heavy virtual emulators.
3. **QR and Deep-Link Testing**: Test QR scanning and app link verification (`https://app.example.com/enroll?t=<token>`) on a physical device before release.

---

## 5. Development Strategy with Claude

Use `CLAUDE_WORKFLOW.md` for the multi-stage implementation plan:
- **Phase 0 & 1**: Ask Claude to review architecture documents and write the first database migration.
- **Phase 2**: Use the PostgreSQL MCP plugin to apply migrations and verify Row Level Security (RLS).
- **Phase 3**: Implement the core vertical slice (Institute registration → Student/Parent creation → QR invitation email via Mailpit → Mobile app activation).
- **Phase 4**: Run automated negative security tests (cross-tenant data leaks and token replay prevention).
