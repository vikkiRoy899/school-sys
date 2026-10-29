# Claude Plugins, MCP Servers & Editor Extensions

This document details the recommended **Model Context Protocol (MCP)** plugins for Anthropic's **Claude**, along with essential developer tooling and IDE extensions.

---

## 1. Claude Plugins: Model Context Protocol (MCP)

Anthropic's open-source **Model Context Protocol (MCP)** enables Claude (via Claude Code CLI, Claude Desktop, or Claude Projects) to securely interact with your local environment, databases, and third-party APIs.

A ready-to-use `.mcp.json` configuration file is included in the project root:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://postgres:postgres@localhost:5432/universal_edu_dev"],
      "description": "Inspects schemas, verifies migrations, and validates tenant-isolation queries."
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}" },
      "description": "Manages PRs, monitors Android APK release workflows, and creates release tags."
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      "description": "Enables deep, structured multi-step reasoning for tenant security modeling."
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"],
      "description": "Headless browser automation to test Next.js admin screens and mobile responsive views."
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "description": "Maintains persistent knowledge of architectural decisions and schema state across sessions."
    }
  }
}
```

### Top MCP Plugins & Their Impact on Development

| MCP Plugin Server | What it Gives Claude | Impact on SaaS Development |
| :--- | :--- | :--- |
| **`server-postgres`** | Direct schema inspection, SQL query execution, and migration verification | Prevents schema mismatches, validates foreign keys, and tests Row Level Security (RLS) policies live. |
| **`server-github`** | Repository issue management, PR reviews, workflow status checks, and release tagging | Allows Claude to inspect CI/CD logs for `.github/workflows/build-android-release.yml` and publish releases autonomously. |
| **`server-sequential-thinking`** | Dynamic multi-step planning and reflective reasoning | Dramatically reduces architectural oversights when designing complex multi-tenant boundaries and RBAC matrices. |
| **`playwright-mcp-server`** | In-browser DOM navigation, screenshot capture, and form submission | Allows Claude to test the Next.js admin onboarding flow, verify UI contrast, and validate mobile responsiveness. |
| **`server-memory`** | Persistent entity and graph memory across chats | Preserves decided API schemas, tenant naming rules, and rejected technical options without repeating context. |

---

## 2. Claude Developer Tooling

- **Claude Code CLI**: Anthropic's agentic command-line interface that operates directly within your repository, reads `CLAUDE.md`, runs tests, and applies edits.
  ```bash
  # Install Claude Code globally
  npm install -g @anthropic-ai/claude-code

  # Launch Claude inside the project root
  claude
  ```
- **Anthropic Claude Extension for VS Code / Cursor**: Official extension providing inline chat, code explanations, and diff generation within your editor.

---

## 3. Recommended VS Code / Cursor Extensions

Install only what the project needs; editor extensions support formatting and typing but do not replace server-side security:

- **ESLint** (`dbaeumer.vscode-eslint`): Enforces TypeScript linting and import rules.
- **Prettier** (`esbenp.prettier-vscode`): Standardizes project-wide code formatting.
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`): Provides class autocomplete, linting, and hover previews for Next.js admin styling.
- **Prisma** (`Prisma.prisma`) / **Drizzle ORM Extension**: Syntax highlighting and migration management for the database schema.
- **Expo Tools** (`expo.vscode-expo-tools`): Autocomplete and config debugging for React Native Expo app development.
- **GitLens** (`eamodio.gitlens`): In-editor Git commit blame, line history, and branch navigation.
- **Error Lens** (`usernamehw.errorlens`): Highlights compiler and lint diagnostics directly inline on code lines.
- **Docker** (`ms-azuretools.vscode-docker`): Container management for local PostgreSQL, Redis, and Mailpit services.

---

## 4. Production Service Integrations

- **Authentication**: Supabase Auth or Auth.js with custom JWT tenant claims.
- **Database**: PostgreSQL 15+ with Row-Level Security (RLS) enabled.
- **Transactional Email**: Resend or Amazon SES with verified custom domain, DKIM/DMARC, and delivery webhook tracking.
- **QR Code Generation**: `qrcode` (Node.js) on backend; Expo Camera / BarcodeScanner on mobile.
- **Mobile CI/CD**: GitHub Actions compiling and signing Android APKs attached to GitHub Releases.
- **Payment Processing (Phase 2)**: Razorpay with webhook signature verification and idempotency keys.
