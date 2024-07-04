import * as fs from 'fs';
import * as path from 'path';

export const workspaces = ['templates', 'libs', 'libs'];

function findFirstLevelDirs(rootDirs: string[]): string[] {
  const dirs: string[] = [];
  for (const dir of rootDirs) {
    const dirPath = path.resolve(__dirname, '../../', dir);
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const theDir = path.join(dirPath, file);
      if (fs.lstatSync(theDir).isSymbolicLink()) {
        continue;
      }
      if (fs.statSync(theDir).isDirectory() && fs.existsSync(path.join(theDir, 'package.json'))) {
        dirs.push(theDir);
      }
    }
  }
  return dirs;
}
export const allDirs = findFirstLevelDirs(workspaces);
export const needLinkDirs = allDirs.filter(x=> x.indexOf('templates/bun') === -1);
console.log('--debug--', allDirs);