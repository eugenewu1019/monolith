# Security Policy

## 🔒 Reporting a Vulnerability

We take the security of MONOLITH seriously. If you believe you have found a security vulnerability, please report it to us as described below.

## 📝 How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

- **GitHub Security Advisories**: [Report a vulnerability](https://github.com/eugenewu1019/monolith/security/advisories/new)
- **Email**: Create a GitHub issue with `[SECURITY]` tag (maintainers will contact you privately)

## 📋 What to Include

Please include the following information:

- **Type of vulnerability** (e.g., XSS, CSRF, injection, etc.)
- **Location** of the affected source code (file path, line number)
- **Step-by-step instructions** to reproduce the issue
- **Proof of concept** or exploit code (if possible)
- **Impact** of the vulnerability
- **Possible solution** (if you have one)

## ⏱️ Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 1-7 days
  - High: 7-30 days
  - Medium: 30-90 days
  - Low: Next release cycle

## 🛡️ Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | ✅ Yes             |
| < 1.0   | ❌ No              |

## 🔐 Security Best Practices

When using MONOLITH:

1. **Keep dependencies updated**
   ```bash
   npm audit
   npm audit fix
   ```

2. **Use environment variables** for sensitive data
   - Never commit `.env` files
   - Use `.env.local` for local development

3. **Enable security features**
   - CSP headers
   - HTTPS only
   - Secure cookies

4. **Regular security scans**
   - Enable Dependabot
   - Use CodeQL scanning
   - Review security advisories

## 🏆 Recognition

We appreciate security researchers and will:

- Acknowledge your contribution (with your permission)
- Provide credit in release notes
- Keep you informed throughout the process

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)

---

Thank you for helping keep MONOLITH and our users safe! 🙏