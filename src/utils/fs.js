import fs from 'fs/promises';
import path from 'path';

export async function readFile(filePath) {
  return await fs.readFile(filePath, 'utf-8');
}

export async function writeFile(filePath, content) {
  await fs.writeFile(filePath, content, 'utf-8');
}

export async function copyFile(src, dest) {
  await fs.copyFile(src, dest);
}

export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
