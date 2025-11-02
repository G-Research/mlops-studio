'use client'

import { MLOpsStage, Technology, MLOpsStageInfo } from '@/types/mlops'
import { technologies, stageDefinitions } from '@/lib/data'

interface TechnologyPanelProps {
  selectedStage: MLOpsStage | null
  onTechnologySelect: (technology: Technology) => void
  selectedTechnologies: Technology[]
  onAddTechnology?: (technology: Technology) => void
  stageDefinitions?: MLOpsStageInfo[]
}

export default function TechnologyPanel({
  selectedStage,
  onTechnologySelect,
  selectedTechnologies,
  onAddTechnology,
  stageDefinitions: customStageDefinitions = stageDefinitions
}: TechnologyPanelProps) {
  if (!selectedStage) {
    return (
      <div className="w-80 bg-gray-50 border-r border-gray-200 p-4">
        <div className="text-center text-gray-500 mt-8">
          <h2 className="text-lg font-semibold mb-2">Select a stage</h2>
          <p className="text-sm">Click on a stage in the workflow to see available technologies.</p>
        </div>
      </div>
    )
  }

  const stageInfo = customStageDefinitions.find(s => s.id === selectedStage)
  const stageTechnologies = technologies[selectedStage] || []
  const selectedTechIds = (selectedTechnologies || []).map(t => t.id)

  return (
    <div className="w-80 technology-panel p-4 overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{stageInfo?.name}</h2>
        <p className="text-sm text-gray-600">{stageInfo?.description}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
          Available Technologies
        </h3>

        {stageTechnologies.map(tech => {
          const isSelected = selectedTechIds.includes(tech.id)

          return (
            <div key={tech.id} className={`technology-card ${isSelected ? 'selected' : ''}`}>
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center space-x-2 flex-1 cursor-pointer"
                  onClick={() => onTechnologySelect(tech)}
                >
                  {tech.icon ? (
                    <img src={tech.icon} alt={tech.name} className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <div
                      className={`technology-dot ${isSelected ? 'bg-indigo-500' : 'bg-gray-400'}`}
                    ></div>
                  )}
                  <span className="font-medium text-sm">{tech.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {isSelected ? (
                    <span className="text-xs font-medium text-green-600">Added</span>
                  ) : (
                    onAddTechnology && (
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          onAddTechnology(tech)
                        }}
                        className="rounded-full bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center text-xs font-bold transition-colors"
                        title="Add to stack"
                        style={{ lineHeight: '1', width: '18px', height: '18px' }}
                      >
                        <span style={{ transform: 'translateY(-0.5px)' }}>+</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
