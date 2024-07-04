import * as fs from 'node:fs';
import * as path from 'node:path';
import { needLinkDirs } from './workspaces';


// 定义要链接的文件和目录
const filesToLink = [
  '.gitignore',
  'biome.json',
  'tsconfig.json',
  ".husky",
];

const sourceDir = path.resolve(__dirname, '../..', '@amarkdown-template-bun');
for (const targetDir of needLinkDirs) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  filesToLink.forEach(file => {
    const sourcePath = path.resolve(sourceDir, file);
    const targetPath = path.resolve(targetDir, file);
  
    try {
      fs.unlinkSync(targetPath);
      fs.rmSync(targetPath, { force: true, recursive: true });
    } catch(err) {
      //
    }
    fs.cpSync(sourcePath, targetPath, { recursive: true });
    console.log(`Linked ${sourcePath} -> ${targetPath}`);
  });    
}
