export interface Technology {
  id: string
  name: string
  description: string
  category: MLOpsStage
  icon?: string
  url?: string
  tags?: string[]
  // Extended information fields from MyMLOps
  subcategories?: string[] // e.g., ['Runtime engine', 'Pipeline orchestration', 'Model serving']
  useWhen?: string[] // Array of use case descriptions
  watchOut?: string[] // Array of limitations/warnings
  installation?: TechnologyInstallation // Installation instructions
  integrations?: TechnologyIntegration[] // Array of integration details
  exampleStacks?: string[] // Array of example stack names or descriptions
  websiteUrl?: string // Clean website URL (not archive)
  repoUrl?: string // Clean repository URL (not archive)
  docsUrl?: string // Clean documentation URL (not archive)
}

export interface TechnologyInstallation {
  method: 'pip' | 'helm' | 'apt' | 'docker' | 'manual'
  code: string // Installation command(s)
}

export interface TechnologyIntegration {
  tool: string // Name of the tool it integrates with
  type: 'built-in' | 'plugin' | 'api' | 'manual' // Type of integration
  description: string // Description of the integration
  url?: string // Link to integration documentation
}

export interface MLOpsStageInfo {
  id: MLOpsStage
  name: string
  description: string
  position: {
    x: number
    y: number
  }
}

export interface StageConnection {
  from: MLOpsStage
  to: MLOpsStage
  type: 'one-way' | 'bi-directional'
  animated?: boolean
}

export type MLOpsStage =
  | 'experiment_tracking'
  | 'experimentation'
  | 'data_versioning'
  | 'code_versioning'
  | 'pipeline_orchestration'
  | 'artifact_tracking'
  | 'model_registry'
  | 'model_serving'
  | 'model_monitoring'
  | 'runtime_engine'

export interface MLOpsStack {
  id: string
  name: string
  description?: string
  technologies: Record<MLOpsStage, Technology[]>
  created: Date
  updated: Date
}

export interface DashboardState {
  currentStack: MLOpsStack
  selectedStage: MLOpsStage | null
  showTechnologyModal: boolean
  selectedTechnology: Technology | null
}
