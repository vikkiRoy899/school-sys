# CLAUDE.md — Project Guide for Claude Code

This file provides context, commands, architectural guardrails, and coding conventions for Claude when working on the **Universal Education SaaS** repository.

---

## 1. Project Overview & Architecture

Universal Education SaaS is a multi-tenant platform for schools, colleges, and coaching institutes:
- **Web Admin Panel (`apps/admin`)**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
- **Universal Mobile App (`apps/mobile`)**: React Native with Expo (Android first), TypeScript, Expo Router.
- **Central API (`apps/api` or Next.js route handlers)**: HTTPS REST API, Zod schema validation.
- **Database**: PostgreSQL with Row-Level Security (RLS) and Drizzle ORM (or Prisma).
- **Authentication**: Managed auth (Supabase Auth / Auth.js) with tenant-scoped claims.
- **Transactional Email**: Resend / Amazon SES for account invitations and QR enrollment codes.
- **CI/CD**: GitHub Actions workflow (`.github/workflows/build-android-release.yml`) builds and publishes the mobile APK to GitHub Releases on tag push.

---

## 2. Common Development & Test Commands

Run commands from the repository root (or workspace subfolders):

```bash
# Dependencies & Setup
npm install                  # Install all monorepo dependencies
npm run db:generate          # Generate database migrations (Drizzle/Prisma)
npm run db:migrate           # Apply migrations to local PostgreSQL

# Development Servers
npm run dev                  # Start web admin + API locally
npm run dev:mobile           # Start Expo development server (npx expo start)

# Quality Checks & Testing
npm run lint                 # Run ESLint across all workspaces
npm run type-check           # Run TypeScript compiler checks (tsc --noEmit)
npm test                     # Run unit and integration tests (Vitest / Jest)
npm run test:tenant          # Run automated cross-tenant security isolation tests

# Android Build & Release
git tag v1.0.0               # Tag release to trigger GitHub Actions APK build
git push origin v1.0.0       # Triggers .github/workflows/build-android-release.yml
```

---

## 3. Strict Architectural & Security Guardrails

When generating code or proposing changes, Claude must strictly enforce these rules:

1. **Strict Tenant Isolation**:
   - Every tenant-owned database table must include `institute_id`.
   - Never trust client-supplied tenant identifiers. Always resolve the active `institute_id` from the authenticated session context.
   - Enforce database-level Row Level Security (RLS) in addition to server-side query filters.
2. **QR & Account Activation Security**:
   - QR codes must **never** contain permanent passwords, admin keys, or raw authentication secrets.
   - Enrollment tokens must be cryptographically random strings, stored hashed (`SHA-256`) in the database, valid for 24–72 hours, and consumed atomically (single-use).
   - Deep links must target a fixed, verified platform domain (e.g. `https://app.example.com/enroll?t=<token>`), never an arbitrary host from user input.
3. **Parent-Child Linkage**:
   - Parents and students have distinct accounts.
   - A parent can access only explicitly verified linked children via the `student_guardians` relationship table.
   - Account activation for minors requires verifiable guardian confirmation in compliance with the DPDP Act 2023.
4. **Secrets & Privacy**:
   - Never commit API keys, database credentials, or signing keystores to Git.
   - Redact all tokens, passwords, and sensitive PII from application logs.

---

## 4. Coding Conventions & Code Style

- **Language**: TypeScript throughout (strict mode enabled, zero `any` types).
- **Naming**: `camelCase` for variables and functions; `PascalCase` for React components and types; `kebab-case` for file and directory names.
- **Validation**: All API endpoints and form inputs must be validated with **Zod** schemas before execution.
- **Data Access**: Always use parameterised queries or typed ORM methods (never concatenate raw SQL strings).
- **Error Handling**: Return standard JSON error envelopes (RFC 7807 problem details) with descriptive, non-leaking error messages.
- **Imports**: Group imports (standard library / framework first, third-party packages second, internal modules third).

---

## 5. Development Strategy with Claude

- **Phase 1 First**: Focus on the core coaching institute pilot slice: institute creation, admin auth, student/parent onboarding with QR email, attendance, and basic fee tracking.
- **TDD for Security**: Write failing tests for cross-tenant data leaks and token replay before implementing the endpoint.
- **Reference Documentation**: Refer to `PRD.md`, `ARCHITECTURE.md`, `DATABASE_SCHEMA.md`, `API_SPEC.md`, `QR_EMAIL_FLOW.md`, and `CI_CD_ANDROID_RELEASE.md` for complete technical contracts.
