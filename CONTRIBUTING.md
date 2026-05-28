# Contributing to TeraBooks Player

First off, thank you for considering contributing to TeraBooks Player! It's people like you that make this project better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/your-username/terabooks-player.git
   cd terabooks-player
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a branch** for your changes
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Make your changes** and test them
6. **Commit your changes** following our commit guidelines
7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request**

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, Node.js version)

Example:
```markdown
**Bug**: Video player controls disappear

**Steps to reproduce**:
1. Go to /watch/1
2. Click play button
3. Move mouse away from video

**Expected**: Controls should reappear on mouse hover
**Actual**: Controls remain hidden
**Environment**: Chrome 120, macOS 14
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a **clear and descriptive title**
- Provide a **detailed description** of the suggested enhancement
- Explain **why this enhancement would be useful**
- Include **mockups or examples** if applicable

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `bug` - Something isn't working
- `enhancement` - New feature or request

### Code Contributions

Areas where we welcome contributions:

**Features**:
- Video recommendation system
- Social sharing functionality
- User profiles and avatars
- Playlist creation
- Comments and ratings
- Multi-language support

**Improvements**:
- Performance optimizations
- Mobile responsiveness
- Accessibility enhancements
- Documentation improvements
- Test coverage

**Bug Fixes**:
- UI/UX issues
- Video playback problems
- API endpoint issues
- Security vulnerabilities

## Style Guidelines

### TypeScript Style Guide

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

```typescript
// Good
interface VideoMetadata {
  title: string;
  duration: number;
  thumbnailUrl: string;
}

function formatDuration(seconds: number): string {
  // ...
}

// Bad
interface Data {
  a: any;
  b: any;
}

function fmt(x: any) {
  // ...
}
```

### React Component Guidelines

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use proper TypeScript typing for props

```typescript
// Good
interface ButtonProps {
  onClick: () => void;
  label: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ onClick, label, variant = 'primary' }) => {
  return <button onClick={onClick}>{label}</button>;
};

// Bad
const Button = (props: any) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};
```

### CSS/Tailwind Guidelines

- Use Tailwind utility classes
- Keep custom CSS minimal
- Follow mobile-first responsive design
- Use CSS variables for theming

```tsx
// Good
<div className="flex items-center space-x-4 p-6 bg-surface rounded-lg hover:bg-surface-light transition-colors">

// Avoid inline styles unless dynamic
<div style={{ color: 'red' }}>
```

### File Organization

```
components/
  ComponentName/
    index.tsx          # Main component
    ComponentName.tsx  # If component is complex
    styles.module.css  # Component-specific styles (if needed)
    types.ts           # Component-specific types
```

### Naming Conventions

- **Files**: PascalCase for components (`VideoCard.tsx`), camelCase for utilities (`helpers.ts`)
- **Components**: PascalCase (`VideoPlayer`, `AdminPanel`)
- **Functions**: camelCase (`formatDuration`, `validateEmail`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_FILE_SIZE`)
- **Interfaces**: PascalCase with descriptive names (`VideoMetadata`, `UserProfile`)

## Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(player): add picture-in-picture support

- Implemented PiP API integration
- Added PiP button to player controls
- Updated keyboard shortcuts

Closes #123
```

```bash
fix(auth): resolve JWT token expiration issue

Token was not properly validating expiration time.
Now correctly checks exp claim.

Fixes #456
```

```bash
docs(readme): update installation instructions

Added clarification for environment variables setup
```

## Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
   ```bash
   npm run build
   npm run lint
   ```
4. **Update CHANGELOG.md** with your changes
5. **Fill out PR template** completely
6. **Link related issues** using keywords (Fixes #123, Closes #456)
7. **Request review** from maintainers
8. **Address review comments** promptly

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
- [ ] All tests pass
```

### Review Process

- Maintainers will review your PR within 1-3 business days
- Address feedback and requested changes
- Once approved, a maintainer will merge your PR
- Your contribution will be credited in CHANGELOG.md

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Run production build locally
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Project Structure

```
terabooks-player/
├── app/              # Next.js app directory
├── components/       # React components
├── hooks/            # Custom React hooks
├── lib/              # Utility libraries
├── services/         # API services
├── types/            # TypeScript types
├── utils/            # Helper functions
└── public/           # Static assets
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Video.js Documentation](https://docs.videojs.com/)

## Questions?

Feel free to:
- Open an issue for questions
- Join our community discussions
- Reach out to maintainers

## Recognition

Contributors will be recognized in:
- README.md contributors section
- CHANGELOG.md for each release
- GitHub contributors page

Thank you for contributing to TeraBooks Player! 🎉
