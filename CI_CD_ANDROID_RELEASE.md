# Android CI/CD Pipeline & GitHub Release Guide

This document specifies the automated build, signing, and release pipeline for the Universal Android Student/Parent App using GitHub Actions.

## 1. Overview

Rather than requiring developers to run heavy Android Studio builds, emulators, or Gradle processes locally on resource-constrained development machines, the repository includes an automated GitHub Actions CI/CD workflow (`.github/workflows/build-android-release.yml`).

Every tagged release automatically compiles the React Native / Expo mobile application into an optimized release APK, signs it with the production release keystore, and attaches the resulting APK directly to the latest GitHub Release.

## 2. Triggering Builds

The workflow supports two execution triggers:

### Automatic Trigger (Git Tags)
Pushing a semantic version tag triggers an automated production build and creates a new GitHub Release:
```bash
git tag v1.0.0
git push origin v1.0.0
```

### Manual Trigger (`workflow_dispatch`)
From the GitHub repository:
1. Navigate to **Actions** → **Build Android APK & Publish Release**.
2. Click **Run workflow**.
3. (Optional) Provide a release tag name (e.g., `v1.0.1-beta`) and select whether it is a pre-release.
4. Click **Run workflow** to initiate the build.

## 3. GitHub Secrets Configuration

To enable automated production APK signing, configure the following repository secrets under **Settings** → **Secrets and variables** → **Actions**:

| Secret Name | Description | Example / Format |
| :--- | :--- | :--- |
| `ANDROID_KEYSTORE_BASE64` | Base64-encoded release keystore file | `base64 -w 0 release.keystore` |
| `ANDROID_KEY_ALIAS` | Key alias in the keystore | `universal-app-alias` |
| `ANDROID_KEYSTORE_PASSWORD` | Password for the keystore file | `YourKeystorePassword123` |
| `ANDROID_KEY_PASSWORD` | Password for the private key | `YourKeyPassword123` |

*Note: If signing secrets are omitted, the workflow will still assemble an unsigned release APK suitable for testing and internal verification.*

### Generating a Production Keystore
Generate a release key using Java's `keytool`:
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore \
  -alias universal-app-alias -keyalg RSA -keysize 2048 -validity 10000
```
Convert the keystore to a base64 string for GitHub Secrets:
```bash
# macOS / Linux
base64 -w 0 release.keystore
```

## 4. Pipeline Execution Stages

1. **Checkout & Cache Initialization**: Checks out repository code and restores cached Gradle, Node.js, and Android SDK dependencies.
2. **Runtime Toolchains**:
   - Node.js LTS (v20)
   - Java Development Kit (JDK 17 Temurin)
   - Android SDK Build Tools (API 34)
3. **Native Prebuild & Assembly**:
   - Executes `npm ci` inside `apps/mobile/`
   - Generates native Android project via `npx expo prebuild --platform android --clean` (if Expo is used)
   - Runs `./gradlew assembleRelease --no-daemon -x lint -x test` inside `apps/mobile/android/`
4. **Code Signing**:
   - Signs the generated APK using the decoded keystore and configured alias/passwords.
   - Aligns and verifies the APK signature schema (v2/v3).
5. **Artifact Packaging & GitHub Release Publishing**:
   - Renames output artifact to `universal-education-app-<version>.apk`.
   - Uploads artifact to the workflow run for intermediate inspection (14-day retention).
   - Creates or updates the GitHub Release tagged with `<version>`, sets `make_latest: true`, generates automated release notes, and attaches the downloadable APK.

## 5. Direct Download URL for Users & Admins

Once published, the compiled APK is permanently downloadable via a stable GitHub Release link:

```
https://github.com/<organization>/<repository>/releases/latest/download/universal-education-app-<version>.apk
```

This permanent direct-download URL can be embedded directly in the institute's **QR Account Activation Email** (`QR_EMAIL_FLOW.md`) under the app installation instructions:

> **Step 1:** Download and install the Universal Education Android App:  
> [Download Latest Android App (APK)](https://github.com/<organization>/<repository>/releases/latest/download/universal-education-app-latest.apk)  
> **Step 2:** Scan your unique institute enrollment QR code from the app to activate your account.
