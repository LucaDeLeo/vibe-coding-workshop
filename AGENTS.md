# Agent Guidelines for Simple Todo App

## Build, Lint, and Test Commands

**Build:** `npm run build` (TypeScript compilation + Vite build)
**Lint:** `npm run lint` (ESLint with TypeScript/React rules)
**Format:** `npm run format` (Prettier auto-formatting)
**Test:** `npm run test` (Jest with React Testing Library)
**Test Coverage:** `npm run test:coverage` (with coverage report)
**Test Watch:** `npm run test:watch` (watch mode)
**Single Test:** `npm run test -- AddTodo.test.tsx` (run specific test file)

## Code Style Guidelines

### Imports

- React imports first: `import { useState } from 'react'`
- Local components next: `import { TodoList } from './components/TodoList'`
- Types last: `import { Todo } from './types/todo'`
- Use absolute imports with `@/` alias for src directory

### Formatting

- **Prettier config:** No semicolons, single quotes, 2-space indentation
- **Print width:** 100 characters
- **Trailing commas:** ES5 style
- **Arrow parens:** Avoid when possible
- **End of line:** Auto-detect

### Types

- **Strict TypeScript:** All files use `.ts/.tsx` with strict mode enabled
- **Explicit typing:** No implicit `any`, use interfaces for object shapes
- **Generics:** Use for reusable components and utilities
- **Union types:** For optional or variant properties

### Naming Conventions

- **Components:** PascalCase (e.g., `TodoItem`, `AddTodo`)
- **Functions/Variables:** camelCase (e.g., `handleAddTodo`, `newTodo`)
- **Interfaces/Types:** PascalCase (e.g., `Todo`, `TodoItemProps`)
- **CSS Classes:** camelCase (e.g., `todoItem`, `deleteButton`)
- **File names:** PascalCase for components, camelCase for utilities

### Error Handling

- **Input validation:** Check for empty strings, length limits (200 chars)
- **User feedback:** Display error messages for invalid inputs
- **Type safety:** Use TypeScript to catch errors at compile time
- **Testing:** Cover error scenarios in unit tests

### React Patterns

- **Functional components:** Use arrow functions with React.FC typing
- **Hooks:** Prefer custom hooks for complex state logic
- **Props:** Destructure in function parameters, use interfaces for typing
- **State:** Use useState for simple state, consider useReducer for complex
- **Styling:** CSS modules with `.module.css` files
- **Accessibility:** Proper ARIA labels, semantic HTML elements

### Testing

- **Jest + React Testing Library:** Focus on user interactions
- **Test structure:** describe/it blocks with descriptive names
- **Mocks:** Use jest.fn() for event handlers
- **Coverage:** Maintain 60%+ coverage for branches, functions, lines, statements
- **Setup:** Custom setup in `setupTests.ts` for global test configuration
