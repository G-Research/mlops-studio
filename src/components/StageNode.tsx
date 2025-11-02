'use client'

import { MLOpsStageInfo, Technology } from '@/types/mlops'

interface StageNodeProps {
  stage: MLOpsStageInfo
  technologies: Technology[]
  isSelected: boolean
  onSelect: () => void
  onRemoveTechnology: (techId: string) => void
}

export default function StageNode({
  stage,
  technologies,
  isSelected,
  onSelect,
  onRemoveTechnology
}: StageNodeProps) {
  return (
    <div
      className={`stage-node ${isSelected ? 'selected' : ''}`}
      style={{
        left: stage.position.x,
        top: stage.position.y
      }}
      onClick={onSelect}
    >
      <div className="stage-node-header">
        <h3 className="stage-node-title">{stage.name}</h3>
      </div>

      <div className="stage-node-content">
        <div className="space-y-1">
          {technologies.map(tech => (
            <div key={tech.id} className="technology-item group">
              <div className="flex items-center flex-1">
                <span className="technology-dot bg-blue-500"></span>
                <span className="font-medium text-gray-700">{tech.name}</span>
              </div>
              <button
                onClick={e => {
                  e.stopPropagation()
                  onRemoveTechnology(tech.id)
                }}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {technologies.length === 0 && (
          <div className="text-gray-400 text-xs italic text-center py-4">
            Click to add technologies
          </div>
        )}
      </div>
    </div>
  )
}
