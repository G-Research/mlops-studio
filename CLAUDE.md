# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server

### Code Quality

- `npm run quality` - Run all quality checks (typecheck + lint + format check)
- `npm run quality:fix` - Run typecheck + lint fix + format
- `npm run type-check` - TypeScript type checking
- `npm run lint` - ESLint checking
- `npm run lint:fix` - ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting without changing files

### Testing

- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ci` - Run tests for CI (no watch)

### Single Test Execution

- `npm test -- --testNamePattern="test name"` - Run specific test by name
- `npm test -- path/to/test.test.ts` - Run specific test file

## Architecture Overview

### Core Application Structure

MLOps Studio is a Next.js 15 React application for building MLOps technology stacks visually using React Flow.

**Key architectural components:**

- **State Management**: React hooks with localStorage persistence via `/src/lib/storage.ts`
- **Data Layer**: `/src/lib/data.ts` contains 60+ MLOps technologies across 8 predefined stages
- **Custom Extensions**: `/src/lib/customStages.ts` and `/src/lib/customTechnologies.ts` for user-defined elements
- **Physics Engine**: Matter.js integration in `/src/hooks/usePhysics.ts` and `/src/hooks/useSmoothCollision.ts` for advanced collision detection

### Main Pages & Features

- **Main Canvas** (`/src/app/page.tsx`): Interactive React Flow builder with drag-and-drop stages
- **Tools Browser** (`/src/app/tools/page.tsx`): Browse all available MLOps technologies
- **Examples** (`/src/app/examples/page.tsx`): Pre-built example stacks
- **Admin Panel** (`/src/app/admin/page.tsx`): Custom technology and stage management

### Component Architecture

- **ReactFlowCanvas** (`/src/components/ReactFlowCanvas.tsx`): Main visual builder with physics integration
- **CustomNode** (`/src/components/CustomNode.tsx`): Interactive stage nodes with technology management
- **TechnologyPanel** (`/src/components/TechnologyPanel.tsx`): Side panel for adding technologies to stages
- **TechnologyModal** & **TechnologyFormModal**: Technology viewing and editing interfaces

### Type System

Central types defined in `/src/types/mlops.ts`:

- `Technology` - MLOps tool definitions with installation, integrations, use cases
- `MLOpsStage` - Pipeline stages (experiment_tracking, model_serving, etc.)
- `MLOpsStack` - Complete user-built technology stacks
- `StageConnection` - Directional connections between stages

### Data Flow

1. **Default Data**: 60+ technologies across 8 stages loaded from `/src/lib/data.ts`
2. **Custom Extensions**: User-defined stages/technologies stored in localStorage
3. **Stack Management**: Complete stacks saved/loaded via `/src/lib/storage.ts`
4. **Physics Integration**: Real-time collision detection and smooth positioning

### Project Configuration

- **TypeScript**: Strict mode with `@/*` path aliases pointing to `src/*`
- **Testing**: Jest with React Testing Library, jsdom environment
- **Code Quality**: ESLint + Prettier + Husky pre-commit hooks
- **Styling**: Tailwind CSS with component-based architecture
