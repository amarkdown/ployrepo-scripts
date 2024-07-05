import { $ } from "bun";
import * as path from "node:path";
import { allDirs } from "./workspaces";
import { env } from "@polyrepo/env";

async function start() {
	await Promise.allSettled(
		allDirs.map((dir) => {
			const project = path.resolve(env("LINK_WORKSPACE") || "", dir);
			console.log("install project:", project);
			return $`cd ${project} && bun install`;
		}),
	);
}

start();
