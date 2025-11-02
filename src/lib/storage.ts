import { MLOpsStack } from '@/types/mlops'

const STORAGE_KEY = 'mlops-stacks'
const CURRENT_STACK_KEY = 'mlops-current-stack'

export function saveStack(stack: MLOpsStack): void {
  try {
    const stacks = getSavedStacks()
    const existingIndex = stacks.findIndex(s => s.id === stack.id)

    if (existingIndex >= 0) {
      stacks[existingIndex] = stack
    } else {
      stacks.push(stack)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stacks))
    localStorage.setItem(CURRENT_STACK_KEY, JSON.stringify(stack))
  } catch (error) {
    console.error('Failed to save stack:', error)
  }
}

export function getSavedStacks(): MLOpsStack[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Failed to get saved stacks:', error)
    return []
  }
}

export function getCurrentStack(): MLOpsStack | null {
  try {
    const saved = localStorage.getItem(CURRENT_STACK_KEY)
    return saved ? JSON.parse(saved) : null
  } catch (error) {
    console.error('Failed to get current stack:', error)
    return null
  }
}

export function deleteStack(stackId: string): void {
  try {
    const stacks = getSavedStacks().filter(s => s.id !== stackId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stacks))

    // If the deleted stack was the current one, clear it
    const currentStack = getCurrentStack()
    if (currentStack?.id === stackId) {
      localStorage.removeItem(CURRENT_STACK_KEY)
    }
  } catch (error) {
    console.error('Failed to delete stack:', error)
  }
}

export function createNewStack(name: string = 'My MLOps Stack'): MLOpsStack {
  return {
    id: `stack-${Date.now()}`,
    name,
    technologies: {
      experiment_tracking: [],
      experimentation: [],
      data_versioning: [],
      code_versioning: [],
      pipeline_orchestration: [],
      artifact_tracking: [],
      model_registry: [],
      model_serving: [],
      model_monitoring: [],
      runtime_engine: []
    },
    created: new Date(),
    updated: new Date()
  }
}
