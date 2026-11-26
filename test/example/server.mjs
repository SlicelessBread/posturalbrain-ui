// Starts the built example app (`next start`) for a test and stops it afterwards.
import { spawn } from 'node:child_process';
import net from 'node:net';

/** A port nobody is listening on, so a leftover server from an earlier run can never answer for this one. */
const freePort = () => new Promise((resolve, reject) => {
  const probe = net.createServer();
  probe.once('error', reject);
  probe.listen(0, () => {
    const { port } = probe.address();
    probe.close(() => resolve(port));
  });
});

export async function startExample() {
  const port = await freePort();
  const child = spawn('npx', ['next', 'start', '-p', String(port)], { cwd: 'example', stdio: ['ignore', 'pipe', 'pipe'], detached: true });
  let log = '';
  child.stdout.on('data', (d) => { log += d; });
  child.stderr.on('data', (d) => { log += d; });
  const url = `http://localhost:${port}`;
  const stop = () => { try { process.kill(-child.pid, 'SIGTERM'); } catch { /* already gone */ } };
  for (let i = 0; i < 100; i += 1) {
    if (child.exitCode !== null) throw new Error(`example app exited early:\n${log}`);
    try {
      const res = await fetch(url);
      // The answer counts only while our own server is alive.
      if (res.ok && child.exitCode === null) return { url, stop };
    } catch { /* not listening yet */ }
    await new Promise((r) => setTimeout(r, 200));
  }
  stop();
  throw new Error(`example app did not start:\n${log}`);
}
