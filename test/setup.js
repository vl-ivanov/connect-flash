/**
 * Test setup for mocha
 * Configures NODE_PATH to allow requiring from lib directory
 */

const path = require('path');
const Module = require('module');

// Add lib directory to module search paths
const libPath = path.resolve(__dirname, '../lib');
const originalResolveLookupPaths = Module._resolveLookupPaths;

Module._resolveLookupPaths = function(request, parent) {
  const paths = originalResolveLookupPaths.apply(this, arguments);
  if (paths && Array.isArray(paths)) {
    paths.push(libPath);
  }
  return paths;
};
