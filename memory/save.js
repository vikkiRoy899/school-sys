#!/usr/bin/env node

/**
 * Memory System for School Management System
 * Tracks build progress, components, and status across the project
 */

const fs = require('fs');
const path = require('path');

const MEMORY_DIR = path.join(__dirname, '..', 'memory');
const MEMORY_FILE = path.join(MEMORY_DIR, 'build-memory.json');

function ensureMemoryDir() {
  if (!fs.existsSync(MEMORY_DIR)) {
    fs.mkdirSync(MEMORY_DIR, { recursive: true });
  }
}

function loadMemory() {
  ensureMemoryDir();
  if (fs.existsSync(MEMORY_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf-8'));
    } catch (e) {
      console.error('Failed to load memory:', e);
      return null;
    }
  }
  return null;
}

function saveMemory(memory) {
  ensureMemoryDir();
  memory.updatedAt = new Date().toISOString();
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
}

function createBuildMemory(buildId) {
  return {
    buildId,
    projectName: 'K-12 School Management System',
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    entries: [],
    metadata: {}
  };
}

function addEntry(memory, entry) {
  const newEntry = {
    ...entry,
    id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString()
  };
  memory.entries.push(newEntry);
  
  // Update metadata based on component
  if (entry.component === 'backend') {
    memory.metadata.backend = {
      endpoints: entry.details?.endpoints || 0,
      tables: entry.details?.tables || 0,
      auth: entry.details?.auth || false
    };
  } else if (entry.component === 'parent-student-app') {
    memory.metadata.parentStudentApp = {
      framework: entry.details?.framework || 'Flutter',
      platform: entry.details?.platform || 'Android',
      features: entry.details?.features || []
    };
  } else if (entry.component === 'teacher-staff-app') {
    memory.metadata.teacherStaffApp = {
      framework: entry.details?.framework || 'React + Capacitor',
      platform: entry.details?.platform || 'Android/Web',
      features: entry.details?.features || []
    };
  } else if (entry.component === 'memory-system') {
    memory.metadata.memorySystem = {
      implemented: true,
      entries: memory.entries.length
    };
  }
  
  saveMemory(memory);
  return newEntry;
}

function printMemory(memory) {
  console.log('\n========================================');
  console.log(`Build Memory: ${memory.projectName}`);
  console.log(`Build ID: ${memory.buildId}`);
  console.log(`Started: ${memory.startedAt}`);
  console.log(`Updated: ${memory.updatedAt}`);
  console.log('========================================\n');

  const components = [...new Set(memory.entries.map(e => e.component))];
  
  components.forEach(comp => {
    const entries = memory.entries.filter(e => e.component === comp);
    const latest = entries[entries.length - 1];
    const status = latest?.status || 'pending';
    const statusIcon = status === 'completed' ? '✅' : status === 'in_progress' ? '🔄' : status === 'failed' ? '❌' : '⏳';
    
    console.log(`${statusIcon} ${comp.toUpperCase()}: ${status}`);
    entries.forEach(e => {
      console.log(`   └─ ${e.timestamp} - ${e.status.toUpperCase()}: ${JSON.stringify(e.details)}`);
    });
    console.log('');
  });

  console.log('--- METADATA ---');
  console.log(JSON.stringify(memory.metadata, null, 2));
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'init': {
    const buildId = args[1] || `build-${Date.now()}`;
    const memory = createBuildMemory(buildId);
    saveMemory(memory);
    console.log(`Initialized build memory: ${buildId}`);
    break;
  }
  case 'add': {
    const buildId = args[1];
    const component = args[2];
    const status = args[3];
    const details = JSON.parse(args[4] || '{}');
    
    let memory = loadMemory();
    if (!memory || memory.buildId !== buildId) {
      memory = createBuildMemory(buildId);
    }
    
    addEntry(memory, { component, status, details });
    console.log(`Added memory entry for ${component}: ${status}`);
    break;
  }
  case 'show': {
    const buildId = args[1];
    const memory = loadMemory();
    if (memory && memory.buildId === buildId) {
      printMemory(memory);
    } else {
      console.log('Build memory not found');
    }
    break;
  }
  case 'list': {
    const memory = loadMemory();
    if (memory) {
      printMemory(memory);
    } else {
      console.log('No build memory found');
    }
    break;
  }
  case 'update-status': {
    const buildId = args[1];
    const entryId = args[2];
    const status = args[3];
    
    const memory = loadMemory();
    if (memory && memory.buildId === buildId) {
      const entry = memory.entries.find(e => e.id === entryId);
      if (entry) {
        entry.status = status;
        saveMemory(memory);
        console.log(`Updated ${entryId} to ${status}`);
      } else {
        console.log('Entry not found');
      }
    } else {
      console.log('Build memory not found');
    }
    break;
  }
  default: {
    console.log(`
Memory System for School Management System

Usage:
  node memory/save.js init [build-id]           - Initialize new build memory
  node memory/save.js add <build-id> <component> <status> [details-json]  - Add entry
  node memory/save.js show <build-id>           - Show build memory
  node memory/save.js list                      - List current memory
  node memory/save.js update-status <build-id> <entry-id> <status>  - Update entry status

Components: backend, parent-student-app, teacher-staff-app, memory-system
Statuses: pending, in_progress, completed, failed
    `);
  }
}

// Export functions for use in other scripts
module.exports = {
  ensureMemoryDir,
  loadMemory,
  saveMemory,
  createBuildMemory,
  addEntry,
  printMemory
};