# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **BREAKING**: Minimum Node.js version is now 18.0.0 (from 0.4.0)
- Migrated from Travis CI to GitHub Actions for continuous integration
- Replaced `vows` test framework with `mocha` and `chai` for modern testing
- Updated package.json metadata to use modern conventions
  - Changed `licenses` (deprecated) to `license`
  - Updated URLs from HTTP to HTTPS
  - Added `files` field to specify package contents
- Modernized test suite structure and syntax
- Updated development tooling:
  - Replaced `jshint` with `eslint` for linting
  - Added `c8` for code coverage reporting
  - Added `.mocharc.json` for test configuration
  - Added `.eslintrc.json` for linting configuration

### Added
- GitHub Actions CI workflow testing against Node.js 18.x, 20.x, and 22.x
- Cross-platform testing (Ubuntu, Windows, macOS)
- Code coverage reporting with c8
- npm scripts for modern development workflow:
  - `npm run lint` - Run ESLint
  - `npm run test:coverage` - Run tests with coverage
  - `npm run pretest` - Automatically lint before tests
- Updated README.md with:
  - Node.js version compatibility information
  - Modern Express 4.x+ usage examples
  - Updated development instructions
- Comprehensive .gitignore for modern Node.js development
- CHANGELOG.md to track version history

### Fixed
- Test compatibility with modern Node.js versions
- Linting configuration for ES2022 features
- Module path resolution in test setup

### Development
- All tests pass on Node.js 18.x, 20.x, and 22.x LTS versions
- Code style modernized while maintaining backward compatibility
- Updated Makefile with modern targets

## [0.1.1] - 2013-01-29
### Fixed
- Previous release content

## [0.1.0] - 2012-07-11
### Added
- Initial release
- Flash message middleware for Connect/Express

[Unreleased]: https://github.com/jaredhanson/connect-flash/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/jaredhanson/connect-flash/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/jaredhanson/connect-flash/releases/tag/v0.1.0