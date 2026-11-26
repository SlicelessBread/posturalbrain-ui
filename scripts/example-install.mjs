// Installs this package into example/ the way an app gets it: as a packed archive,
// so the example resolves React from its own node_modules and sees only the shipped files.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const run = (cmd, args, cwd = '.') => execFileSync(cmd, args, { cwd, stdio: ['ignore', 'pipe', 'inherit'], encoding: 'utf8' });

const [{ filename }] = JSON.parse(run('npm', ['pack', '--json']));
fs.renameSync(filename, path.join('example', 'posturalbrain-ui.tgz'));
// npm keeps an already installed copy of the same version: remove it so the new archive is unpacked.
fs.rmSync(path.join('example', 'node_modules', 'posturalbrain-ui'), { recursive: true, force: true });
run('npm', ['install', '--no-package-lock', '--no-audit', '--no-fund'], 'example');
console.log('example: installed posturalbrain-ui from the packed archive');
