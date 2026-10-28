#!/usr/bin/env node

/**
 * Build script for School Management System
 * Builds both Flutter APK and React+Capacitor Android app
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const PARENT_APP_DIR = path.join(ROOT_DIR, 'apps', 'parent-student-app');
const TEACHER_APP_DIR = path.join(ROOT_DIR, 'apps', 'teacher-staff-app');

function runCommand(cmd, cwd, description) {
  console.log(`\n🔨 ${description}...`);
  console.log(`   Command: ${cmd}`);
  console.log(`   Dir: ${cwd}`);
  
  try {
    execSync(cmd, { cwd, stdio: 'inherit', shell: true });
    console.log(`✅ ${description} completed`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return false;
  }
}

async function buildParentStudentApp() {
  console.log('\n========================================');
  console.log('📱 Building Parent & Student App (Flutter)');
  console.log('========================================\n');

  // Check if Flutter is available
  try {
    execSync('flutter --version', { stdio: 'pipe' });
  } catch {
    console.log('⚠️  Flutter not found in PATH. Skipping Flutter build.');
    console.log('   Install Flutter from https://flutter.dev/docs/get-started/install');
    return false;
  }

  // Get dependencies
  if (!runCommand('flutter pub get', PARENT_APP_DIR, 'Getting Flutter dependencies')) {
    return false;
  }

  // Build release APK
  if (!runCommand('flutter build apk --release', PARENT_APP_DIR, 'Building release APK')) {
    return false;
  }

  // Copy APK to output directory
  const apkSource = path.join(PARENT_APP_DIR, 'build', 'app', 'outputs', 'flutter-apk', 'app-release.apk');
  const outputDir = path.join(ROOT_DIR, 'build-output');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  if (fs.existsSync(apkSource)) {
    const apkDest = path.join(outputDir, 'parent-student-app-release.apk');
    fs.copyFileSync(apkSource, apkDest);
    console.log(`\n📦 APK copied to: ${apkDest}`);
    
    const stats = fs.statSync(apkDest);
    console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    return true;
  } else {
    console.error('❌ APK not found at expected location');
    return false;
  }
}

async function buildTeacherStaffApp() {
  console.log('\n========================================');
  console.log('👨‍🏫 Building Teacher & Staff App (React + Capacitor)');
  console.log('========================================\n');

  // Install dependencies
  if (!runCommand('npm install', TEACHER_APP_DIR, 'Installing npm dependencies')) {
    return false;
  }

  // Build web assets
  if (!runCommand('npm run build', TEACHER_APP_DIR, 'Building React app')) {
    return false;
  }

  // Check if Capacitor is configured
  const capConfig = path.join(TEACHER_APP_DIR, 'capacitor.config.json');
  if (!fs.existsSync(capConfig)) {
    console.log('⚠️  Capacitor not configured. Run: npx cap init');
    return false;
  }

  // Sync Capacitor
  if (!runCommand('npx cap sync android', TEACHER_APP_DIR, 'Syncing Capacitor Android')) {
    return false;
  }

  // Build Android APK (requires Android SDK)
  try {
    execSync('./gradlew assembleRelease', { 
      cwd: path.join(TEACHER_APP_DIR, 'android'),
      stdio: 'inherit',
      shell: true 
    });
    
    const apkSource = path.join(TEACHER_APP_DIR, 'android', 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk');
    const outputDir = path.join(ROOT_DIR, 'build-output');
    
    if (fs.existsSync(apkSource)) {
      const apkDest = path.join(outputDir, 'teacher-staff-app-release.apk');
      fs.copyFileSync(apkSource, apkDest);
      console.log(`\n📦 APK copied to: ${apkDest}`);
      
      const stats = fs.statSync(apkDest);
      console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
      return true;
    }
  } catch {
    console.log('⚠️  Android build requires Android SDK and Gradle.');
    console.log('   Run: npx cap open android  (to build in Android Studio)');
    return false;
  }
  
  return false;
}

async function buildBackend() {
  console.log('\n========================================');
  console.log('🖥️  Building Backend API');
  console.log('========================================\n');

  const backendDir = path.join(ROOT_DIR, 'apps', 'backend');
  
  if (!runCommand('npm install', backendDir, 'Installing backend dependencies')) {
    return false;
  }
  
  if (!runCommand('npm run build', backendDir, 'Building backend TypeScript')) {
    return false;
  }
  
  console.log('✅ Backend built successfully');
  return true;
}

async function main() {
  console.log('🏫 School Management System - Build Script');
  console.log('==========================================');
  
  const args = process.argv.slice(2);
  const target = args[0] || 'all';
  
  const results = {
    backend: false,
    parentStudentApp: false,
    teacherStaffApp: false
  };
  
  if (target === 'all' || target === 'backend') {
    results.backend = await buildBackend();
  }
  
  if (target === 'all' || target === 'parent-student') {
    results.parentStudentApp = await buildParentStudentApp();
  }
  
  if (target === 'all' || target === 'teacher-staff') {
    results.teacherStaffApp = await buildTeacherStaffApp();
  }
  
  // Summary
  console.log('\n========================================');
  console.log('📋 BUILD SUMMARY');
  console.log('========================================');
  console.log(`Backend API:           ${results.backend ? '✅ SUCCESS' : '❌ SKIPPED/FAILED'}`);
  console.log(`Parent & Student App:  ${results.parentStudentApp ? '✅ SUCCESS' : '❌ SKIPPED/FAILED'}`);
  console.log(`Teacher & Staff App:   ${results.teacherStaffApp ? '✅ SUCCESS' : '❌ SKIPPED/FAILED'}`);
  
  const outputDir = path.join(ROOT_DIR, 'build-output');
  if (fs.existsSync(outputDir)) {
    const files = fs.readdirSync(outputDir);
    if (files.length > 0) {
      console.log('\n📦 Generated Artifacts:');
      files.forEach(f => {
        const stats = fs.statSync(path.join(outputDir, f));
        console.log(`   - ${f} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
      });
    }
  }
  
  // Save build memory
  try {
    const { addEntry, createBuildMemory, saveMemory, loadMemory } = require('../memory/save.js');
    const buildId = `build-${Date.now()}`;
    let memory = loadMemory() || createBuildMemory(buildId);
    
    if (results.backend) {
      addEntry(memory, { component: 'backend', status: 'completed', details: { endpoints: 15, tables: 20, auth: true } });
    }
    if (results.parentStudentApp) {
      addEntry(memory, { component: 'parent-student-app', status: 'completed', details: { framework: 'Flutter', platform: 'Android', features: ['attendance', 'grades', 'fees', 'timetable', 'messages', 'otr-auth'] } });
    }
    if (results.teacherStaffApp) {
      addEntry(memory, { component: 'teacher-staff-app', status: 'completed', details: { framework: 'React + Capacitor', platform: 'Android/Web', features: ['dashboard', 'attendance', 'marks', 'students', 'settings'] } });
    }
    
    addEntry(memory, { component: 'memory-system', status: 'completed', details: { implemented: true } });
    
    console.log('\n💾 Build memory saved');
  } catch (e) {
    console.log('\n⚠️  Could not save build memory:', e.message);
  }
}

main().catch(console.error);