const router = require('express').Router();
const path = require('path');
const fs = require('fs');

// Utility to read a package.json safely
function readPkg(pkgPath) {
  try {
    const raw = fs.readFileSync(pkgPath, 'utf8');
    const json = JSON.parse(raw);
    return {
      name: json.name,
      version: json.version,
      dependencies: json.dependencies || {},
      devDependencies: json.devDependencies || {},
    };
  } catch (e) {
    return { name: null, version: null, dependencies: {}, devDependencies: {} };
  }
}

// GET /api/meta/dependencies → returns server & client dependency manifests
router.get('/dependencies', (_req, res) => {
  const serverPkgPath = path.join(__dirname, '..', 'package.json');
  const clientPkgPath = path.join(__dirname, '..', '..', 'Client', 'package.json');

  const server = readPkg(serverPkgPath);
  const client = readPkg(clientPkgPath);

  // Do not include scripts or private fields to reduce disclosure
  res.json({ server, client });
});

module.exports = router;

