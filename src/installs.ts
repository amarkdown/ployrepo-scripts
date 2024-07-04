import { $ } from "bun";
import * as path from "node:path";
import { allDirs } from "./workspaces";


async function start(){
  await Promise.allSettled(allDirs.map((dir) => {
    const project = path.resolve(__dirname, '../../..', dir);
    console.log('install project:', project)
    return $`cd ${project} && bun install`
  }));
}

start();
