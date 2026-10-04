import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import net from "node:net";
import { spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(project, ".verification", "phase-0");
fs.mkdirSync(output, { recursive: true });
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const cleanIndex = process.argv.indexOf("--clean-dir");
let root = project;
let cleanSnapshot;

if (cleanIndex !== -1) {
  assert(process.argv[cleanIndex + 1], "--clean-dir requires an external parent directory");
  const parent = path.resolve(process.argv[cleanIndex + 1]);
  assert(!parent.startsWith(`${project}${path.sep}`) && parent !== project, "Use an external snapshot directory");
  fs.mkdirSync(parent, { recursive: true });
  cleanSnapshot = fs.mkdtempSync(path.join(parent, "snapshot-"));
  const excluded = new Set([".git", "node_modules", ".next", ".verification", "data"]);
  fs.cpSync(project, cleanSnapshot, {
    recursive: true,
    filter(source) {
      const relative = path.relative(project, source);
      const first = relative.split(path.sep)[0];
      return !excluded.has(first) && !/\.env(?!\.example$)|\.tsbuildinfo$|\.log$/.test(relative);
    },
  });
  root = cleanSnapshot;
  for (const args of [["ci"], ["run", "check"]]) {
    const result = spawnSync("npm", args, { cwd: root, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
    process.stdout.write(result.stdout || "");
    process.stderr.write(result.stderr || "");
    fs.writeFileSync(path.join(output, args[0] === "ci" ? "clean-install.log" : "quality.log"), `${result.stdout || ""}${result.stderr || ""}`);
    assert.equal(result.status, 0, `Clean snapshot failed: npm ${args.join(" ")}`);
  }
}

const pinnedNode = fs.readFileSync(path.join(root, ".nvmrc"), "utf8").trim();
assert.equal(process.versions.node, pinnedNode, "Use the pinned Node version for Phase 0 verification");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const nextPackage = JSON.parse(fs.readFileSync(path.join(root, "node_modules", "next", "package.json"), "utf8"));
const audits = {};
for (const [name, args] of [["production", ["audit", "--json", "--omit=dev"]], ["all", ["audit", "--json"]]]) {
  const result = spawnSync("npm", args, { cwd: root, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  const report = JSON.parse(result.stdout);
  assert(report.metadata?.vulnerabilities, `Incomplete ${name} dependency audit`);
  audits[name] = report.metadata.vulnerabilities;
  fs.writeFileSync(path.join(output, `${name}-dependencies.json`), `${JSON.stringify(report, null, 2)}\n`);
}
assert.equal(audits.production.critical, 0, "Critical production dependency finding");
assert.equal(audits.production.high, 0, "High production dependency finding");

async function freePort() {
  const server = net.createServer().listen(0, "127.0.0.1");
  await once(server, "listening");
  const port = server.address().port;
  await new Promise((resolve) => server.close(resolve));
  return port;
}

async function verifyServer(cwd, args, mode) {
  const port = await freePort();
  const base = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, args.map((arg) => arg === "$PORT" ? String(port) : arg), {
    cwd,
    env: { ...process.env, NODE_ENV: "production", HOSTNAME: "127.0.0.1", PORT: String(port), ADMIN_API_KEY: "" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let logs = "";
  child.stdout.on("data", (data) => { logs += data; });
  child.stderr.on("data", (data) => { logs += data; });
  const requests = [];
  async function expectStatus(route, status, options) {
    const response = await fetch(`${base}${route}`, { ...options, redirect: "manual", signal: AbortSignal.timeout(15000) });
    requests.push({ route, method: options?.method || "GET", status: response.status });
    assert.equal(response.status, status, `${mode}: ${options?.method || "GET"} ${route}`);
    assert(!response.headers.get("set-cookie")?.includes("auth_token="), `${mode}: unexpected mock auth cookie`);
    return response;
  }
  try {
    let started = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      try { if ((await fetch(base)).ok) { started = true; break; } } catch { /* Wait for startup. */ }
      if (child.exitCode !== null) break;
      await pause(200);
    }
    assert(started, `${mode}: production server did not start\n${logs}`);
    const html = await (await expectStatus("/", 200)).text();
    assert.equal((html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").match(/<h1\b/g) || []).length, 1);
    assert(html.includes("farm-to-business agritech platform"));
    assert(!/href="\/login(?:["?#])/.test(html), `${mode}: withdrawn login still linked`);
    const script = html.match(/<script[^>]+src="([^"]+)"/)[1].replaceAll("&amp;", "&");
    const style = html.match(/<link[^>]+href="([^"]+\.css(?:\?[^"]*)?)"/)[1].replaceAll("&amp;", "&");
    await expectStatus(script, 200);
    await expectStatus(style, 200);
    await expectStatus("/logo/logo_horizontal_web.png", 200);
    await expectStatus("/images/hero/farmer.png", 200);
    await expectStatus("/_next/image?url=%2Fimages%2Fhero%2Ffarmer.png&w=640&q=75", 200, { headers: { accept: "image/webp" } });
    await expectStatus("/robots.txt", 200);
    await expectStatus("/sitemap.xml", 200);
    const redirect = await expectStatus("/home", 308);
    assert.equal(new URL(redirect.headers.get("location"), base).pathname, "/");
    for (const route of ["/login", "/api/auth/demo-login", "/api/listings", "/api/orders"]) {
      await expectStatus(route, 404);
      await expectStatus(route, 404, { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
    }
    for (const role of ["contact", "farmer", "buyer", "hauler"]) {
      await expectStatus(`/api/leads/${role}`, 401);
      await expectStatus(`/api/leads/${role}`, 401, { headers: { "x-api-key": "" } });
    }
    await expectStatus("/api/leads/contact", 400, { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
    return { mode, requests, passed: true };
  } finally {
    const ended = once(child, "exit");
    child.kill("SIGTERM");
    await Promise.race([ended, pause(3000)]);
    if (child.exitCode === null) child.kill("SIGKILL");
    fs.writeFileSync(path.join(output, `${mode}-server.log`), logs);
  }
}

const normal = await verifyServer(root, ["node_modules/next/dist/bin/next", "start", "-p", "$PORT", "-H", "127.0.0.1"], "next-start");
const standalone = path.join(root, ".next", "standalone");
assert(fs.existsSync(path.join(standalone, "server.js")), "Standalone build output missing");
const runtime = fs.mkdtempSync(path.join(output, "standalone-"));
fs.cpSync(standalone, runtime, { recursive: true });
fs.cpSync(path.join(root, ".next", "static"), path.join(runtime, ".next", "static"), { recursive: true });
fs.cpSync(path.join(root, "public"), path.join(runtime, "public"), { recursive: true });
const standaloneResult = await verifyServer(runtime, ["server.js"], "standalone");
const result = {
  date: new Date().toISOString(),
  scope: cleanSnapshot ? "isolated current-source snapshot; not a committed checkout or remote CI run" : "local current working tree",
  cleanSnapshot,
  node: process.version,
  next: nextPackage.version,
  react: packageJson.dependencies.react,
  audits,
  servers: [normal, standaloneResult],
  externalVerification: { remoteCI: "pending", branchProtection: "pending", dockerImage: "pending", liveDeployment: "pending" },
};
fs.writeFileSync(path.join(output, "result.json"), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
