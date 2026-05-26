import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Technology, MLOpsStack, MLOpsStage } from '@/types/mlops'

// Mock technology data for tests
export const mockTechnology: Technology = {
  id: 'test-tech',
  name: 'Test Technology',
  description: 'A test technology for unit tests',
  category: 'experimentation',
  url: 'https://example.com',
  icon: 'https://example.com/icon.png',
  useWhen: ['You need to test something', 'You want reliable results'],
  watchOut: ['Be careful with test data', 'Ensure proper cleanup'],
  integrations: [
    {
      tool: 'Test Framework',
      type: 'built-in',
      description: 'Built-in integration with test frameworks',
      url: 'https://example.com/integration'
    }
  ],
  installation: {
    method: 'npm',
    code: 'npm install test-technology'
  },
  tags: ['testing', 'mock'],
  subcategories: ['unit-testing'],
  exampleStacks: ['Testing Stack']
}

export const mockStack: MLOpsStack = {
  id: 'test-stack',
  name: 'Test Stack',
  description: 'A test MLOps stack',
  technologies: {
    experiment_tracking: [],
    experimentation: [mockTechnology],
    data_versioning: [],
    code_versioning: [],
    pipeline_orchestration: [],
    artifact_tracking: [],
    model_registry: [],
    model_serving: [],
    model_monitoring: [],
    runtime_engine: []
  },
  created: new Date('2024-01-01T00:00:00.000Z'),
  updated: new Date('2024-01-01T00:00:00.000Z')
}

export const mockStageDefinitions = [
  {
    id: 'experiment_tracking' as MLOpsStage,
    name: 'Experiment Tracking',
    description: 'Track experiment results',
    position: { x: 100, y: 100 }
  },
  {
    id: 'experimentation' as MLOpsStage,
    name: 'Experimentation',
    description: 'Experiment with different approaches',
    position: { x: 300, y: 100 }
  }
]

export const mockStageConnections = [
  {
    from: 'experiment_tracking',
    to: 'experimentation',
    type: 'one-way' as const,
    animated: true
  }
]

// Custom render function with common providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <div data-testid="test-provider">{children}</div>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Helper functions for testing
export const createMockLocalStorage = () => {
  const storage: Record<string, string> = {}

  return {
    getItem: jest.fn((key: string) => storage[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      storage[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete storage[key]
    }),
    clear: jest.fn(() => {
      Object.keys(storage).forEach(key => delete storage[key])
    }),
    get storage() {
      return { ...storage }
    }
  }
}

// Mock event handlers for testing
export const mockHandlers = {
  onStageSelect: jest.fn(),
  onRemoveTechnology: jest.fn(),
  onTechnologyClick: jest.fn(),
  onAdd: jest.fn(),
  onRemove: jest.fn(),
  onClose: jest.fn(),
  onSave: jest.fn()
}

// Helper to wait for async operations
export const waitFor = async (callback: () => void | Promise<void>, timeout = 1000) => {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now()

    const checkCondition = async () => {
      try {
        await callback()
        resolve()
      } catch {
        if (Date.now() - startTime > timeout) {
          reject(new Error(`Timeout after ${timeout}ms`))
        } else {
          setTimeout(checkCondition, 10)
        }
      }
    }

    checkCondition()
  })
}

// Mock next/navigation hooks
export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn()
}

export const mockParams = {
  toolId: 'test-tech'
}
