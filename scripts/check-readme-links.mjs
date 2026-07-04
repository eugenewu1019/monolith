import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const docs = ["README.md", "README.zh-TW.md"];
const productionUrl = "https://eugenewu1019.github.io/monolith";
const skippedExternalHosts = new Set(["localhost", "127.0.0.1", "::1"]);
const skippedExternalDomains = ["linkedin.com"];
const outdatedPatterns = [
  /Next\.js-14/i,
  /React-18/i,
  /demo-online/i,
  /Live Demo/i,
  /線上展示/i,
];

const failures = [];
const skipped = [];

const markdownLinkPattern = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

function recordFailure(message) {
  failures.push(message);
}

function normalizeUrl(rawUrl) {
  return rawUrl.replace(/^<|>$/g, "").trim();
}

function isExternal(url) {
  return /^https?:\/\//i.test(url);
}

function shouldSkipExternalUrl(url) {
  const parsed = new URL(url);
  return (
    skippedExternalHosts.has(parsed.hostname) ||
    skippedExternalDomains.some((domain) => parsed.hostname.endsWith(domain))
  );
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    return await fetch(url, {
      headers: {
        "user-agent": "monolith-readme-link-check/1.0",
      },
      redirect: "follow",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function checkExternalUrl(url, sourceFile) {
  if (shouldSkipExternalUrl(url)) {
    skipped.push(`${sourceFile}: ${url}`);
    return null;
  }

  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) {
      recordFailure(`${sourceFile}: ${url} returned HTTP ${response.status}`);
    }
    return response;
  } catch (error) {
    recordFailure(`${sourceFile}: ${url} failed: ${error.message}`);
    return null;
  }
}

async function checkLocalUrl(url, sourceFile) {
  const [pathname] = url.split("#");
  if (!pathname || pathname.startsWith("#") || pathname.startsWith("mailto:")) {
    return;
  }

  const target = path.resolve(root, pathname);
  if (!(await exists(target))) {
    recordFailure(`${sourceFile}: local link does not exist: ${url}`);
  }
}

async function checkProductionPage(sourceFile) {
  const response = await checkExternalUrl(productionUrl, sourceFile);
  if (!response?.ok) {
    return;
  }

  const html = await response.text();
  const markers = ["MONOLITH", "/monolith/_next/", "原石結構"];
  const missingMarkers = markers.filter((marker) => !html.includes(marker));

  if (missingMarkers.length > 0) {
    recordFailure(
      `${sourceFile}: production page did not include expected current-site markers: ${missingMarkers.join(
        ", ",
      )}`,
    );
  }
}

for (const doc of docs) {
  const content = await fs.readFile(path.join(root, doc), "utf8");

  for (const pattern of outdatedPatterns) {
    if (pattern.test(content)) {
      recordFailure(`${doc}: outdated README text matched ${pattern}`);
    }
  }

  const links = new Set();
  let match;
  while ((match = markdownLinkPattern.exec(content)) !== null) {
    links.add(normalizeUrl(match[1]));
  }

  for (const link of links) {
    if (isExternal(link)) {
      await checkExternalUrl(link, doc);
    } else {
      await checkLocalUrl(link, doc);
    }
  }
}

await checkProductionPage("README production entry");

if (failures.length > 0) {
  console.error("README link check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

if (skipped.length > 0) {
  console.log("Skipped non-CI-verifiable README links:");
  for (const item of skipped) {
    console.log(`- ${item}`);
  }
}

console.log("README links and production entry points are valid.");
