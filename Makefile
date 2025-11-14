# ==============================================================================
# Node Tests
# ==============================================================================

.PHONY: test
test:
	npm test

# ==============================================================================
# Static Analysis
# ==============================================================================

.PHONY: lint
lint:
	npm run lint

.PHONY: lint-fix
lint-fix:
	npm run lint -- --fix

prettier:
	npm run prettier

# ==============================================================================
# Combined Commands
# ==============================================================================

.PHONY: check
check: lint test

.PHONY: install
install:
	npm install

.PHONY: clean
clean:
	rm -rf node_modules
	rm -rf coverage

.PHONY: help
help:
	@echo "Available targets:"
	@echo "  make test     - Run tests"
	@echo "  make lint     - Run linter"
	@echo "  make check    - Run lint and tests"
	@echo "  make install  - Install dependencies"
	@echo "  make clean    - Clean node_modules and coverage"
