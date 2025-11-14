# Node.js Version Support

## Current Support Policy

This package follows the [Node.js Release Schedule](https://nodejs.org/en/about/previous-releases) and supports all **Active LTS** and **Current** releases.

### Supported Versions

| Node.js Version | Support Status | Notes |
|-----------------|----------------|-------|
| 22.x            | ✅ Current     | Fully tested and supported |
| 20.x            | ✅ Active LTS  | Fully tested and supported |
| 18.x            | ✅ Active LTS  | Fully tested and supported |
| 16.x and below  | ❌ Unsupported | End of Life |

### Minimum Required Version

**Node.js 18.0.0** or higher is required to use this package.

## Testing Matrix

Our continuous integration pipeline tests against:

- **Node.js 18.x** (LTS - Hydrogen)
- **Node.js 20.x** (LTS - Iron)
- **Node.js 22.x** (Current)

Tests are run on multiple operating systems:
- Ubuntu (Linux)
- Windows
- macOS

## Version Support Timeline

We will continue to support Node.js versions that are in Active LTS or Current status according to the [official Node.js release schedule](https://github.com/nodejs/release#release-schedule).

When a Node.js version enters Maintenance LTS, we will continue to support it for a transition period but will not guarantee full compatibility with future releases of this package.

When a Node.js version reaches End of Life (EOL), support will be dropped in the next major version release of this package.

## Checking Your Node.js Version

To check which version of Node.js you're running:

```bash
node --version
```

## Upgrading Node.js

If you're running an unsupported version, we recommend upgrading to the latest LTS version:

### Using nvm (recommended)

```bash
# Install latest LTS
nvm install --lts

# Use latest LTS
nvm use --lts
```

### Using Node Version Manager on Windows (nvm-windows)

```bash
# Install latest LTS
nvm install lts

# Use latest LTS
nvm use lts
```

### Using official installers

Download from [nodejs.org](https://nodejs.org/)

## Migration Guide

### From Node.js < 18 to Node.js 18+

This package has been updated to require Node.js 18.0.0 or higher. Key changes:

1. **No Breaking API Changes**: The API remains the same
2. **Modern JavaScript**: The codebase now leverages features available in Node.js 18+
3. **Improved Performance**: Takes advantage of performance improvements in newer V8 engines
4. **Security**: Benefits from security patches in supported Node.js versions

#### Dependencies

If you're upgrading from an older Node.js version, ensure all your dependencies are also compatible:

```bash
npm outdated
npm update
```

## Compatibility with Express

This package is compatible with:

- **Express 4.x** and higher (recommended)
- **Express 3.x** (legacy support, no longer maintained)

### Modern Express Setup (Express 4.x+)

```javascript
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(flash());
```

## Testing on Specific Node.js Versions

If you need to test this package on a specific Node.js version:

```bash
# Using nvm
nvm install 18
nvm use 18
npm install
npm test

nvm install 20
nvm use 20
npm test

nvm install 22
nvm use 22
npm test
```

## Continuous Integration

Our CI pipeline automatically tests against all supported Node.js versions on every commit and pull request. You can view the test results in the GitHub Actions tab of the repository.

## Reporting Issues

If you encounter issues with a specific Node.js version within our supported range, please [open an issue](https://github.com/jaredhanson/connect-flash/issues) with:

1. Your Node.js version (`node --version`)
2. Your npm version (`npm --version`)
3. Your operating system
4. A minimal reproduction example

## Future Support

We are committed to supporting new Node.js versions as they are released. When a new major version of Node.js becomes Active LTS, we will add it to our testing matrix and ensure full compatibility.

## Questions?

If you have questions about Node.js version support, please:

1. Check the [Node.js Release Schedule](https://nodejs.org/en/about/previous-releases)
2. Review our [CHANGELOG.md](./CHANGELOG.md)
3. Open a discussion in our [GitHub Issues](https://github.com/jaredhanson/connect-flash/issues)