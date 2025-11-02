# GitHub Actions CI/CD Setup

This directory contains GitHub Actions workflows that ensure code quality and automate the development process.

## Workflows

### 🔄 CI (`ci.yml`)

Main continuous integration workflow that runs on pushes to `main` and `develop` branches.

**What it does:**

- Tests on Node.js 18.x and 20.x
- Runs TypeScript type checking
- Performs ESLint linting
- Executes test suite with coverage
- Builds the project
- Uploads test coverage to Codecov

### 🔍 PR Checks (`pr-checks.yml`)

Comprehensive checks that run on pull requests to ensure code quality before merging.

**What it does:**

- **Pre-checks**: Validates package.json changes and dependency installation
- **Quality checks**: TypeScript, ESLint, Prettier, tests, and build verification
- **Security scan**: npm audit for vulnerabilities
- **Test matrix**: Cross-Node.js version testing
- **PR status**: Final validation summary

### 📦 Dependabot (`dependabot.yml`)

Automated dependency updates to keep the project secure and up-to-date.

**What it manages:**

- **Weekly npm updates**: Regular dependency updates every Monday
- **Daily security updates**: Critical security patches
- **GitHub Actions updates**: Keep workflow actions current

## Branch Protection Rules

To ensure these workflows are effective, configure branch protection rules in GitHub:

### Main Branch Protection

```
Branch: main
✅ Require a pull request before merging
✅ Require approvals: 1
✅ Dismiss stale PR approvals when new commits are pushed
✅ Require review from code owners
✅ Require status checks to pass before merging
    - CI / test (18.x)
    - CI / test (20.x)
    - CI / build-check
    - PR Checks / quality-checks
    - PR Checks / security-scan
    - PR Checks / test-matrix (18.x)
    - PR Checks / test-matrix (20.x)
✅ Require branches to be up to date before merging
✅ Require conversation resolution before merging
✅ Restrict pushes that create files to non-admins
```

### Develop Branch Protection

```
Branch: develop
✅ Require a pull request before merging
✅ Require approvals: 1
✅ Require status checks to pass before merging
    - PR Checks / quality-checks
    - PR Checks / test-matrix (20.x)
✅ Require branches to be up to date before merging
```

## Required Secrets

For full functionality, add these secrets to your GitHub repository:

- `CODECOV_TOKEN`: Token for code coverage reporting (optional)

## Local Development

Before pushing code, ensure it passes all checks:

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Format check
npx prettier --check .

# Tests with coverage
npm test -- --coverage --watchAll=false

# Build
npm run build

# Security audit
npm audit
```

## Workflow Status

Check workflow status at: `https://github.com/G-Research/mlops-studio/actions`

The workflows will automatically:

- ✅ Block PRs that fail quality checks
- ✅ Require all tests to pass before merge
- ✅ Ensure consistent code formatting
- ✅ Prevent security vulnerabilities
- ✅ Maintain cross-Node.js compatibility
