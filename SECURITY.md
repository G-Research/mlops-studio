# Security Policy

## Supported Versions

We actively support security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly by following these steps:

### Private Reporting

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities to:

- **Email**: [security@yourproject.com] (replace with actual email)
- **Subject**: "Security Vulnerability Report - MLOps Studio"

### What to Include

Please include the following information in your report:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if available)
- Your contact information

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Updates**: Every 72 hours until resolved
- **Resolution Target**: 30 days for critical issues, 90 days for others

### Responsible Disclosure

We follow responsible disclosure practices:

1. We will acknowledge receipt of your report
2. We will investigate and validate the vulnerability
3. We will develop and test a fix
4. We will coordinate the release of the fix
5. We will publicly acknowledge your contribution (with your permission)

## Security Considerations

### Client-Side Security

This application runs entirely in the browser and:

- Does not collect or transmit personal data
- Stores configurations locally in browser storage
- Does not require user authentication
- Does not make external API calls with sensitive data

### Dependencies

We regularly:

- Update dependencies to latest secure versions
- Run security audits with `npm audit`
- Monitor security advisories for our dependencies

### Reporting Security Issues in Dependencies

If you find security issues in our dependencies, please:

1. Report to the upstream project first
2. Notify us so we can track and update when fixes are available

## Security Best Practices for Contributors

- Never commit sensitive information (API keys, passwords, etc.)
- Use environment variables for configuration
- Follow secure coding practices
- Keep dependencies up to date
- Run security linters and audits

Thank you for helping keep MLOps Studio secure!
