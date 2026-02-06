# Contributing to MONOLITH

First off, thank you for considering contributing to MONOLITH! 🎉

It's people like you that make MONOLITH such a great project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** explaining why this would be useful
- **Possible implementation** if you have ideas
- **Examples** from other projects

### Your First Code Contribution

Unsure where to begin? Look for issues tagged with:

- `good first issue` - Simple issues perfect for beginners
- `help wanted` - Issues that need attention

## 🛠 Development Setup

1. **Fork the repository**

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/monolith.git
   cd monolith
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Run tests**
   ```bash
   npm test
   npm run lint
   ```

## 🔄 Pull Request Process

1. **Update documentation** - Ensure README and comments reflect your changes

2. **Add tests** - All new features should include tests

3. **Run the test suite** - Ensure all tests pass
   ```bash
   npm test
   npm run build
   ```

4. **Update CHANGELOG.md** - Add your changes under "Unreleased"

5. **Follow commit conventions** - Use conventional commits (see below)

6. **Submit PR** with:
   - Clear description of changes
   - Related issue numbers
   - Screenshots for UI changes
   - Breaking changes notes

7. **Code review** - Address feedback from maintainers

## 💻 Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types, avoid `any`
- Use interfaces for object shapes
- Enable strict mode

### Component Structure

```typescript
// components/Example.tsx
import { FC } from 'react'

interface ExampleProps {
  title: string
  description?: string
}

export const Example: FC<ExampleProps> = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  )
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow existing design system
- Ensure responsive design (mobile-first)
- Test dark mode compatibility

### Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`)
- **CSS Classes**: kebab-case or Tailwind

## 📝 Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
feat(gallery): add horizontal scroll parallax effect

fix(quiz): resolve physics calculation error

docs(readme): update installation instructions

test(utils): add tests for date formatting
```

## 🧪 Testing Guidelines

- Write tests for new features
- Maintain >50% code coverage
- Test edge cases and error states
- Use descriptive test names

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // test implementation
  })

  it('should handle user interaction', () => {
    // test implementation
  })
})
```

## 🎨 Design Guidelines

- Follow existing visual style
- Maintain consistent spacing
- Ensure accessibility (WCAG 2.1 AA)
- Test on multiple devices
- Support keyboard navigation

## 📞 Questions?

Feel free to:
- Open a [Discussion](https://github.com/eugenewu1019/monolith/discussions)
- Ask in existing issues
- Contact maintainers

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort! 🚀

---

*Happy Coding! Made with 🖤 by the MONOLITH community*