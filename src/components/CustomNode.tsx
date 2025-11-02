'use client'

import { Handle, Position, NodeProps } from 'reactflow'
import { MLOpsStageInfo, Technology } from '@/types/mlops'

interface CustomNodeData {
  stage: MLOpsStageInfo
  technologies: Technology[]
  isSelected: boolean
  onSelect: () => void
  onRemoveTechnology: (techId: string) => void
  onTechnologyClick?: (technology: Technology) => void
}

export default function CustomNode({ data }: NodeProps<CustomNodeData>) {
  const { stage, technologies, isSelected, onSelect, onRemoveTechnology, onTechnologyClick } = data

  return (
    <div className="min-w-[200px] min-h-[120px]">
      {/* Invisible handles for connections on all sides */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom"
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ opacity: 0 }}
        isConnectable={false}
      />

      {/* Stage Node Content */}
      <div
        className={`stage-node ${isSelected ? 'selected' : ''}`}
        onClick={e => {
          // Only handle click if it's not a drag
          if (e.detail === 1) {
            // Single click, not drag
            onSelect()
          }
        }}
        style={{ position: 'relative', cursor: 'move' }}
      >
        <div className="stage-node-header">
          <h3
            className="stage-node-title uppercase text-gray-500 tracking-wide"
            style={{ fontSize: '11px', fontWeight: 'normal' }}
          >
            {stage.name}
          </h3>
        </div>

        <div className="stage-node-content">
          <div className="space-y-1">
            {(technologies || []).map(tech => (
              <div key={tech.id} className="technology-item group">
                <div
                  className="flex items-center flex-1 cursor-pointer hover:bg-gray-100 rounded px-1 py-0.5 transition-colors"
                  onClick={e => {
                    e.stopPropagation()
                    if (onTechnologyClick) {
                      onTechnologyClick(tech)
                    }
                  }}
                >
                  {tech.icon ? (
                    <img src={tech.icon} alt={tech.name} className="w-3 h-3 flex-shrink-0 mr-2" />
                  ) : (
                    <span className="technology-dot bg-blue-500"></span>
                  )}
                  <span className="text-gray-700" style={{ fontSize: '18px', fontWeight: '600' }}>
                    {tech.name}
                  </span>
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

          {(!technologies || technologies.length === 0) && (
            <div className="text-gray-400 text-xs italic text-center py-4">
              Click to add technologies
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
