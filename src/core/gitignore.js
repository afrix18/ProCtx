import fs from 'fs/promises';
import path from 'path';

export async function parseGitignore(projectPath) {
  const gitignorePath = path.join(projectPath, '.gitignore');
  try {
    const content = await fs.readFile(gitignorePath, 'utf-8');
    return content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  } catch {
    return [];
  }
}

export function shouldIgnore(filePath, patterns) {
  return patterns.some(pattern => {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    return regex.test(filePath);
  });
}
