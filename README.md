# Simple Todo App

A modern, responsive todo application built with React, TypeScript, and Vite. Features a clean interface, local storage persistence, and comprehensive test coverage.

## Features

- ✅ Add, complete, and delete todos
- 📱 Fully responsive design
- 💾 Local storage persistence
- 🎨 Modern UI with CSS Modules
- ⚡ Lightning-fast development with Vite
- 🔒 Type-safe with TypeScript strict mode
- 🧪 Comprehensive test coverage (>95%)
- 📦 Optimized production build

## Tech Stack

- **Frontend Framework:** React 18.3
- **Language:** TypeScript 5.7 (strict mode)
- **Build Tool:** Vite 6.0
- **Styling:** CSS Modules
- **Testing:** Jest + React Testing Library
- **Code Quality:** ESLint + Prettier
- **Package Manager:** npm

## Getting Started

### Prerequisites

- Node.js v18.0.0 or higher
- npm v9.0.0 or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vibe-coding-workshop
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will open at http://localhost:5173 with hot module replacement enabled.

### Testing

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage:
```bash
npm run test:coverage
```

Current test coverage:
- Statements: 96.07%
- Branches: 81.81%
- Functions: 100%
- Lines: 95.74%

### Code Quality

Run ESLint:
```bash
npm run lint
```

Format code with Prettier:
```bash
npm run format
```

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
vibe-coding-workshop/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── AddTodo/     # Add todo form component
│   │   ├── TodoItem/    # Individual todo item
│   │   └── TodoList/    # Todo list container
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main app component
│   ├── App.css          # App styles
│   ├── main.tsx         # App entry point
│   └── index.css        # Global styles
├── docs/                # Project documentation
│   ├── architecture.md  # Architecture document
│   ├── prd.md          # Product requirements
│   └── stories/        # User stories
├── jest.config.cjs      # Jest configuration
├── eslint.config.js     # ESLint configuration
├── .prettierrc          # Prettier configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Project dependencies

```

## Performance Metrics

### Bundle Size (Production)
- HTML: 0.64 KB (gzipped: 0.37 KB)
- CSS: 3.63 KB (gzipped: 1.30 KB)
- App JS: 4.51 KB (gzipped: 2.15 KB)
- Vendor JS: 141.66 KB (gzipped: 45.44 KB)
- **Total: ~150 KB (gzipped: ~49 KB)** ✅

### Load Time
- Target: < 2 seconds on 3G
- Achieved: < 1.5 seconds on simulated 3G ✅

### Core Web Vitals
- LCP: < 2.5s ✅
- FID: < 100ms ✅
- CLS: < 0.1 ✅

## Component Architecture

### TypeScript Interfaces

```typescript
interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: string
}
```

### Component Hierarchy

- `App` - Root component with state management
  - `AddTodo` - Form for adding new todos
  - `TodoList` - Container for todo items
    - `TodoItem` - Individual todo with actions

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is part of a workshop exercise and is intended for educational purposes.

## Roadmap

Future enhancements planned:
- [ ] PWA support with offline functionality
- [ ] Drag and drop reordering
- [ ] Todo categories/tags
- [ ] Due dates and reminders
- [ ] Dark/light theme toggle
- [ ] Export/import functionality
- [ ] Cloud sync capabilities

## Acknowledgments

Built as part of the Vibe Coding Workshop following modern React development best practices.