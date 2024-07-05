import * as fs from "node:fs";
import * as path from "node:path";
import { config } from "dotenv";
import { needLinkDirs } from "./workspaces";

config();

// 定义要链接的文件和目录
const filesToLink = [".gitignore", "biome.json", "tsconfig.json", ".husky"];

const sourceDir = process.env.LINK_SOURCE || "";
console.log("--debug--cccccc", sourceDir);
for (const targetDir of needLinkDirs) {
	if (!fs.existsSync(targetDir)) {
		fs.mkdirSync(targetDir, { recursive: true });
	}
	for (const file of filesToLink) {
		const sourcePath = path.resolve(sourceDir, file);
		const targetPath = path.resolve(targetDir, file);

		try {
			fs.unlinkSync(targetPath);
			fs.rmSync(targetPath, { force: true, recursive: true });
		} catch (err) {
			//
		}
		if (fs.existsSync(sourcePath)) {
			fs.cpSync(sourcePath, targetPath, { recursive: true, force: true });
			console.log(`Linked ${sourcePath} -> ${targetPath}`);
		} else {
			console.error(`Source file does not exist: ${sourcePath}`);
		}
	}
}
