import { MLOpsStageInfo, StageConnection } from '@/types/mlops'
import { stageDefinitions, stageConnections } from '@/lib/data'

// Get custom stages from localStorage
export function getCustomStages(): MLOpsStageInfo[] {
  if (typeof window === 'undefined') {
    return []
  } // SSR safety

  const savedStages = localStorage.getItem('customMLOpsStages')
  if (savedStages) {
    try {
      return JSON.parse(savedStages)
    } catch (e) {
      console.error('Failed to load custom stages:', e)
      return []
    }
  }
  return []
}

// Get all stages (default + custom)
export function getAllStages(): MLOpsStageInfo[] {
  return [...stageDefinitions, ...getCustomStages()]
}

// Get custom stage connections from localStorage
export function getCustomConnections(): StageConnection[] {
  if (typeof window === 'undefined') {
    return []
  } // SSR safety

  const savedConnections = localStorage.getItem('customMLOpsConnections')
  if (savedConnections) {
    try {
      return JSON.parse(savedConnections)
    } catch (e) {
      console.error('Failed to load custom connections:', e)
      return []
    }
  }
  return []
}

// Get all stage connections (default + custom)
export function getAllConnections(): StageConnection[] {
  return [...stageConnections, ...getCustomConnections()]
}

// Save custom stage connections to localStorage
export function saveCustomConnections(connections: StageConnection[]): void {
  if (typeof window === 'undefined') {
    return
  } // SSR safety

  try {
    localStorage.setItem('customMLOpsConnections', JSON.stringify(connections))
  } catch (e) {
    console.error('Failed to save custom connections:', e)
  }
}

// Save custom stages to localStorage
export function saveCustomStages(stages: MLOpsStageInfo[]): void {
  if (typeof window === 'undefined') {
    return
  } // SSR safety

  try {
    localStorage.setItem('customMLOpsStages', JSON.stringify(stages))
  } catch (e) {
    console.error('Failed to save custom stages:', e)
  }
}
