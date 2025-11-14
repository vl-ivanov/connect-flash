# Migration Guide: v0.1.x to v0.2.0

This guide will help you migrate from connect-flash v0.1.x to v0.2.0, which includes modernization for current Node.js LTS versions.

## Breaking Changes

### Node.js Version Requirement

**Old:** Node.js >= 0.4.0  
**New:** Node.js >= 18.0.0

The most significant breaking change is the minimum Node.js version requirement.

#### Why This Change?

- Node.js versions below 18 have reached End of Life (EOL)
- Security vulnerabilities in older versions are no longer patched
- Modern tooling and testing frameworks require newer Node.js versions
- Performance improvements in newer V8 engines

#### Action Required

Check your Node.js version:

```bash
node --version
```

If you're running Node.js < 18.0.0, you need to upgrade:

```bash
# Using nvm (recommended)
nvm install --lts
nvm use --lts

# Or download from https://nodejs.org/
```

## Non-Breaking Changes

### API Compatibility

✅ **Good News:** The API is 100% backward compatible. No code changes are required in your application!

All existing code will continue to work exactly as before:

```javascript
// This still works the same way
req.flash('info', 'Hello!');
const messages = req.flash('info');
```

### Package Structure

The package structure and exports remain the same:

```javascript
const flash = require('connect-flash');
app.use(flash());
```

## Development Changes

If you contribute to this package or run its tests locally, note these changes:

### Test Framework

**Old:** vows  
**New:** mocha + chai

The test framework has been modernized, but this doesn't affect users of the package.

### Linting

**Old:** jshint  
**New:** eslint

Again, this is a development-only change that doesn't affect package users.

### CI/CD

**Old:** Travis CI  
**New:** GitHub Actions

Continuous integration now runs on GitHub Actions with broader test coverage across multiple Node.js versions and operating systems.

## Updated Dependencies (for Development)

If you're developing or contributing to this package:

```bash
# Old devDependencies
vows: 0.6.x

# New devDependencies
mocha: ^10.7.3
chai: ^4.5.0
eslint: ^8.57.0
c8: ^10.1.2
```

## Express Version Compatibility

### Express 4.x+ (Recommended)

If you're using Express 4.x or higher, update your session configuration:

**Before (Express 3.x style):**

```javascript
var express = require('express');
var flash = require('connect-flash');
var app = express();

app.configure(function() {
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
});
```

**After (Express 4.x+ style):**

```javascript
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(flash());
```

**Note:** Express 4.x removed bundled middleware. You need to install `express-session` separately:

```bash
npm install express-session
```

### Express 3.x (Legacy)

If you're still using Express 3.x, the old configuration style still works, but we recommend upgrading to Express 4.x or higher.

## Testing Your Migration

After upgrading, verify everything works:

1. **Check Node.js version:**
   ```bash
   node --version  # Should be >= 18.0.0
   ```

2. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Test your application:**
   ```bash
   npm test  # Run your application tests
   ```

4. **Verify flash messages work:**
   ```javascript
   // In a test route
   app.get('/test-flash', (req, res) => {
     req.flash('test', 'Migration successful!');
     res.redirect('/');
   });

   app.get('/', (req, res) => {
     const messages = req.flash('test');
     res.send(messages.length ? messages[0] : 'No messages');
   });
   ```

## Common Issues

### Issue: Package won't install

**Error:**
```
npm ERR! engine Unsupported engine
npm ERR! Required: {"node":">=18.0.0"}
```

**Solution:** Upgrade Node.js to version 18 or higher.

### Issue: Tests failing after upgrade

**Possible causes:**
1. Other dependencies incompatible with Node.js 18+
2. Breaking changes in Express or express-session

**Solution:**
```bash
# Update all dependencies
npm outdated
npm update

# Or audit for security issues
npm audit fix
```

### Issue: Session not working

**Error:** `req.flash() requires sessions`

**Solution:** Ensure you've set up session middleware before flash:

```javascript
// Session MUST come before flash
app.use(session({ /* config */ }));  // ✅ Correct order
app.use(flash());
```

## Rollback Plan

If you encounter issues and need to rollback:

```bash
# Install the old version
npm install connect-flash@0.1.1

# Revert Node.js version (if using nvm)
nvm use 16  # or your previous version
```

**Note:** We strongly recommend upgrading both Node.js and the package for security and performance reasons.

## Getting Help

If you encounter issues during migration:

1. **Check the documentation:**
   - [README.md](./README.md)
   - [NODE_VERSION_SUPPORT.md](./NODE_VERSION_SUPPORT.md)
   - [CHANGELOG.md](./CHANGELOG.md)

2. **Review Node.js changes:**
   - [Node.js 18 Release Notes](https://nodejs.org/en/blog/release/v18.0.0/)
   - [Node.js 20 Release Notes](https://nodejs.org/en/blog/release/v20.0.0/)

3. **Open an issue:**
   - [GitHub Issues](https://github.com/jaredhanson/connect-flash/issues)

## Benefits of Upgrading

✅ **Security:** Active security patches and updates  
✅ **Performance:** Improved V8 engine performance  
✅ **Ecosystem:** Compatibility with modern npm packages  
✅ **Support:** Community and maintainer support  
✅ **Future-proof:** Ready for upcoming Node.js versions  

## Summary Checklist

- [ ] Verify Node.js version is >= 18.0.0
- [ ] Update to connect-flash@0.2.0
- [ ] If using Express 3.x, consider upgrading to Express 4.x+
- [ ] Reinstall dependencies
- [ ] Run tests to verify everything works
- [ ] Deploy to staging environment first
- [ ] Monitor for any issues
- [ ] Deploy to production

## Questions?

For questions or concerns about this migration, please:

- Open an issue: https://github.com/jaredhanson/connect-flash/issues
- Review the docs: See links above
- Check Node.js support: [NODE_VERSION_SUPPORT.md](./NODE_VERSION_SUPPORT.md)

Thank you for using connect-flash! 🎉