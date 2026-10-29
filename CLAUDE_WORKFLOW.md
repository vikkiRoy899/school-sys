# Claude Multi-Stage Development Workflow

## 1. Purpose & Overview

This document defines the structured development methodology when building the **Universal Education SaaS** platform using Anthropic's **Claude** (via **Claude Code CLI**, Claude Desktop, or Claude Projects).

It provides execution rules, specialist prompt templates, review gates, and verification checklists designed specifically for Claude's reasoning model and tool capabilities.

---

## 2. Core Operating Rules for Claude

1. **Read `CLAUDE.md` First**: Claude must read `CLAUDE.md` at the start of any session to load architectural guardrails, build commands, and security rules.
2. **Strict Multi-Tenancy**: Every query, mutation, and schema must be scoped to `institute_id` with both application-level middleware and PostgreSQL Row Level Security (RLS).
3. **No Phantom Credentials**: QR codes must encode only short-lived, single-use, hashed random activation tokens—never plaintext passwords, session cookies, or admin API keys.
4. **Test Before Claims**: Never report a feature or test as passing without actually executing the underlying test command and verifying the exit status.
5. **Incremental Vertical Slices**: Implement one verifiable end-to-end slice (the coaching institute pilot) before branching into broader modules like transport, library, or complex examinations.
6. **Use MCP Plugins for Grounded Operations**: Leverage connected Model Context Protocol (MCP) servers (PostgreSQL, GitHub, Playwright) for direct inspection, testing, and workflow management rather than guessing state.

---

## 3. Phased Implementation Sequence

```
Phase 0: Reconnaissance & Environment
   ↓
Phase 1: Architecture & Contract Review
   ↓
Phase 2: Database Migrations & Tenant RLS (PostgreSQL MCP)
   ↓
Phase 3: Core Vertical Slice (Student/Parent QR Activation Flow)
   ↓
Phase 4: Admin Panel (Next.js) & Universal App (Expo Android)
   ↓
Phase 5: Automated Testing, APK Release Build & Security Audit
```

### Phase 0 — Workspace Reconnaissance
- Inspect repository structure, package configurations, and documentation.
- Verify environment variables against `.env.example`.
- Ensure PostgreSQL and Docker services are accessible.

### Phase 1 — Architecture & Contract Review
- Confirm API paths in `API_SPEC.md` and database tables in `DATABASE_SCHEMA.md`.
- Establish standard error response schemas (RFC 7807).
- Lock in the first milestone: Coaching Institute Pilot.

### Phase 2 — Foundation & Database
- Implement PostgreSQL schema with Drizzle/Prisma.
- Write and apply Row-Level Security (RLS) policies scoped to `app.current_tenant`.
- Verify migrations using the PostgreSQL MCP server.
- Write automated cross-tenant isolation tests.

### Phase 3 — First Vertical Slice
Implement the critical path end-to-end:
1. Institute creation and admin authentication.
2. Creation of a student and parent account in pending state.
3. Cryptographic token generation (SHA-256 hashed server-side) and transactional QR email dispatch.
4. Universal mobile app activation via deep link / QR scan.
5. Atomic token redemption, session issuance, and verified parent-child linking.
6. Record and verify attendance and fee payments for the active student.

### Phase 4 — Web Admin & Universal Mobile App
- **Web Admin**: Next.js App Router, institute setup wizard, student/parent registry, fee ledger, and reports.
- **Universal Mobile App**: React Native Expo app with camera QR scanning, role-aware navigation (student view vs. parent view with child switcher), and offline caching.

### Phase 5 — CI/CD, Automated Testing & Release
- Execute full test suite: unit, integration, cross-tenant leak tests, and token replay tests.
- Push release tag (e.g. `v1.0.0`) to trigger GitHub Actions APK build workflow (`.github/workflows/build-android-release.yml`).
- Verify generated APK is attached to the latest GitHub Release.

---

## 4. Specialist Prompt Templates for Claude Code

When delegating distinct project stages to Claude, use these focused prompt templates:

### Prompt A — Database & Tenant Security Review
> "You are the Database & Security Specialist for Universal Education SaaS. Review `DATABASE_SCHEMA.md` and `ARCHITECTURE.md`. Implement the PostgreSQL schema with Drizzle ORM, ensuring every tenant table has an `institute_id` foreign key. Write Row Level Security (RLS) policies that enforce tenant isolation via `SET LOCAL app.current_tenant`. Write a test suite that proves Tenant A cannot read, insert, update, or delete records belonging to Tenant B."

### Prompt B — QR Activation & Auth Implementation
> "You are the Authentication & API Specialist. Review `QR_EMAIL_FLOW.md` and `API_SPEC.md`. Implement the account activation subsystem: (1) Generate secure random enrollment tokens valid for 48 hours, storing only their SHA-256 hash in `enrollment_tokens`. (2) Build the `/enrollment/redeem` endpoint to atomically validate, consume, and activate the account. (3) Write negative tests for token reuse, expired tokens, revoked tokens, and invalid signatures."

### Prompt C — Mobile App & Deep-Link Handler
> "You are the Mobile App Specialist. Review `UI_UX_SPEC.md` and `CI_CD_ANDROID_RELEASE.md`. Build the React Native Expo app shell with Expo Router. Implement the QR scanner using Expo Camera and deep link handler for `https://app.example.com/enroll?t=<token>`. Add role-aware screens for students (attendance, fees, notices) and parents (child switcher). Ensure the app works seamlessly with the GitHub Actions release build workflow."

### Prompt D — QA & CI/CD Pipeline Verification
> "You are the QA & DevOps Specialist. Inspect `.github/workflows/build-android-release.yml` and test suites. Run all linting, type checks, and unit tests. Verify that the GitHub Actions workflow properly compiles the Android release APK, applies keystore signing, and attaches the artifact to the latest GitHub Release using `softprops/action-gh-release@v2`."

---

## 5. Definition of Done for Milestones

A milestone is complete only when:
- All acceptance criteria in `ROADMAP_TESTING.md` pass.
- Cross-tenant negative security tests pass without exceptions.
- Zero secrets or unhashed tokens are committed to source control or logs.
- Code compiles cleanly with zero TypeScript errors under strict mode.
- Android release APK builds cleanly via the GitHub Actions workflow.
