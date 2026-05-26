# Contributing to MLOps Studio

Thank you for your interest in contributing to MLOps Studio! We welcome contributions from the community.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/mlops-studio.git
   cd mlops-studio
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Development Workflow

### Code Quality

Before submitting any changes, ensure your code passes all quality checks:

```bash
# Run all quality checks
npm run quality

# Individual checks
npm run type-check    # TypeScript compilation
npm run lint         # ESLint
npm run format       # Prettier formatting
npm run test         # Jest tests
```

### Pre-commit Hooks

We use Husky to run linting and formatting automatically before commits. The pre-commit hook will:

- Run ESLint with auto-fix
- Format code with Prettier
- Ensure code quality standards

### Making Changes

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following these guidelines:
   - Follow the existing code style and conventions
   - Add tests for new functionality
   - Update documentation as needed
   - Keep commits focused and atomic

3. **Test your changes**:

   ```bash
   npm test
   npm run test:coverage
   ```

4. **Commit your changes**:
   ```bash
   git commit -m "feat: add new MLOps tool integration"
   ```

### Commit Message Format

We follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Types of Contributions

### Adding New MLOps Tools

To add a new tool to the database:

1. **Update the tool data** in `src/lib/data.ts`
2. **Add the tool icon** to `public/icons/`
3. **Include tool information**:
   - Name and description
   - Official website
   - Use cases
   - Integration details
   - Pricing model

### Bug Reports

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

### Feature Requests

For feature requests, provide:

- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Any relevant mockups or examples

## Code Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utility functions and data
├── types/           # TypeScript type definitions
└── __tests__/       # Test files
```

## Style Guidelines

- **TypeScript**: Use strict TypeScript with proper typing
- **React**: Use functional components with hooks
- **Styling**: Use Tailwind CSS utilities
- **File naming**: Use kebab-case for files, PascalCase for components
- **Variables**: Use camelCase for variables and functions

## Testing

- Write unit tests for utility functions
- Write component tests for React components
- Aim for good test coverage
- Use descriptive test names

## Documentation

- Update README.md for significant changes
- Add JSDoc comments for complex functions
- Update type definitions when needed

## Review Process

1. **Submit a Pull Request** with:
   - Clear title and description
   - Reference any related issues
   - Screenshots for UI changes

2. **Code Review**:
   - Maintainers will review your PR
   - Address any feedback or requested changes
   - Keep discussions constructive and respectful

3. **Merge**:
   - PRs are merged after approval
   - We use squash merging for clean history

## Questions?

- **GitHub Discussions**: For general questions and ideas
- **GitHub Issues**: For bug reports and feature requests
- **Documentation**: Check the wiki for detailed guides

Thank you for contributing to MLOps Studio!
