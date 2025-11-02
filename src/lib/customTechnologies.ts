import { Technology, MLOpsStage } from '@/types/mlops'
import { technologies } from '@/lib/data'

// Get custom technologies from localStorage
export function getCustomTechnologies(): Record<MLOpsStage, Technology[]> {
  if (typeof window === 'undefined') {
    // SSR safety
    const emptyTech: Record<MLOpsStage, Technology[]> = {
      experiment_tracking: [],
      data_versioning: [],
      orchestration: [],
      model_training: [],
      model_registry: [],
      model_monitoring: [],
      continuous_deployment: [],
      infrastructure: []
    }
    return emptyTech
  }

  const savedTechnologies = localStorage.getItem('customMLOpsTechnologies')
  if (savedTechnologies) {
    try {
      return JSON.parse(savedTechnologies)
    } catch (e) {
      console.error('Failed to load custom technologies:', e)
      return {
        experiment_tracking: [],
        data_versioning: [],
        orchestration: [],
        model_training: [],
        model_registry: [],
        model_monitoring: [],
        continuous_deployment: [],
        infrastructure: []
      }
    }
  }
  return {
    experiment_tracking: [],
    data_versioning: [],
    orchestration: [],
    model_training: [],
    model_registry: [],
    model_monitoring: [],
    continuous_deployment: [],
    infrastructure: []
  }
}

// Get all technologies (default + custom)
export function getAllTechnologies(): Record<MLOpsStage, Technology[]> {
  const customTech = getCustomTechnologies()
  const allTech: Record<MLOpsStage, Technology[]> = {} as Record<MLOpsStage, Technology[]>

  // Merge default and custom technologies for each stage
  Object.keys(technologies).forEach(stageKey => {
    const stage = stageKey as MLOpsStage
    allTech[stage] = [...(technologies[stage] || []), ...(customTech[stage] || [])]
  })

  return allTech
}

// Save custom technologies to localStorage
export function saveCustomTechnologies(customTech: Record<MLOpsStage, Technology[]>): void {
  if (typeof window === 'undefined') {
    return // SSR safety
  }

  try {
    localStorage.setItem('customMLOpsTechnologies', JSON.stringify(customTech))
  } catch (e) {
    console.error('Failed to save custom technologies:', e)
  }
}

// Add a new technology to the custom storage
export function addCustomTechnology(technology: Technology): void {
  const currentCustom = getCustomTechnologies()
  const stage = technology.category as MLOpsStage

  // Generate a unique ID if not provided
  if (!technology.id) {
    technology.id = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Add to the appropriate stage
  currentCustom[stage] = [...(currentCustom[stage] || []), technology]

  saveCustomTechnologies(currentCustom)
}

// Update an existing technology
export function updateCustomTechnology(updatedTechnology: Technology): void {
  const currentCustom = getCustomTechnologies()
  const stage = updatedTechnology.category as MLOpsStage

  // Find and update the technology
  const stageIndex = currentCustom[stage]?.findIndex(tech => tech.id === updatedTechnology.id)
  if (stageIndex !== undefined && stageIndex !== -1) {
    currentCustom[stage][stageIndex] = updatedTechnology
    saveCustomTechnologies(currentCustom)
  } else {
    // If it's not in custom storage, it might be a default technology being edited
    // For now, we'll treat edited default technologies as new custom ones
    addCustomTechnology(updatedTechnology)
  }
}

// Delete a custom technology
export function deleteCustomTechnology(technologyId: string): void {
  const currentCustom = getCustomTechnologies()

  // Find and remove the technology from all stages
  Object.keys(currentCustom).forEach(stageKey => {
    const stage = stageKey as MLOpsStage
    currentCustom[stage] = currentCustom[stage]?.filter(tech => tech.id !== technologyId) || []
  })

  saveCustomTechnologies(currentCustom)
}

// Check if a technology is custom (not from default data)
export function isCustomTechnology(technologyId: string): boolean {
  const customTech = getCustomTechnologies()

  return Object.values(customTech).some(stageTech =>
    stageTech.some(tech => tech.id === technologyId)
  )
}
