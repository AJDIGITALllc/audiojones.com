#!/usr/bin/env node

// scripts/convert-to-ikimage.js
// Simple script to convert next/image imports to IKImage

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function convertFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Check if file contains next/image import
  if (!content.includes('from "next/image"') && !content.includes("from 'next/image'")) {
    return false;
  }

  console.log(`Converting: ${filePath}`);

  // Replace import
  const oldImport = /import\s+(?:Image|\{[^}]*Image[^}]*\}|\s*Image\s*,?[^}]*)\s+from\s+['"]next\/image['"];?\s*\n?/g;
  if (content.match(oldImport)) {
    content = content.replace(oldImport, '');
    
    // Add IKImage import if not already present
    if (!content.includes('@/components/IKImage')) {
      // Find a good place to insert the import (after React imports)
      const lines = content.split('\n');
      let insertIndex = 0;
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import') && (lines[i].includes('react') || lines[i].includes('next'))) {
          insertIndex = i + 1;
        } else if (lines[i].startsWith('import')) {
          break;
        }
      }
      
      lines.splice(insertIndex, 0, 'import IKImage from "@/components/IKImage";');
      content = lines.join('\n');
    }
    
    changed = true;
  }

  // Replace JSX tags
  const imageTagRegex = /<Image(\s[^>]*)?>/g;
  const closingTagRegex = /<\/Image>/g;
  
  if (content.match(imageTagRegex)) {
    content = content.replace(imageTagRegex, '<IKImage$1>');
    content = content.replace(closingTagRegex, '</IKImage>');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Find all TSX and JSX files
const patterns = [
  'src/app/**/*.tsx',
  'src/app/**/*.jsx', 
  'src/components/**/*.tsx',
  'src/components/**/*.jsx'
];

let totalConverted = 0;

patterns.forEach(pattern => {
  const files = glob.sync(pattern);
  files.forEach(file => {
    if (convertFile(file)) {
      totalConverted++;
    }
  });
});

console.log(`\n✅ Converted ${totalConverted} files to use IKImage`);
console.log('💡 Run "git diff" to review changes before committing');