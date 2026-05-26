'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import Header from '@/components/Header'
import TechnologyFormModal from '@/components/TechnologyFormModal'
import { stageDefinitions } from '@/lib/data'
import { getAllTechnologies, updateCustomTechnology } from '@/lib/customTechnologies'
import { Technology } from '@/types/mlops'

export default function ToolDetailPage() {
  const params = useParams()
  const toolId = params.toolId as string
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [technologies, setTechnologies] = useState(getAllTechnologies())

  // Find the technology by ID across all stages
  let tool: Technology | undefined
  for (const stageTechs of Object.values(technologies)) {
    tool = stageTechs.find(t => t.id === toolId)
    if (tool) {
      break
    }
  }

  const displayTool = tool

  const handleEditTechnology = () => {
    if (displayTool) {
      setIsEditModalOpen(true)
    }
  }

  const handleSaveTechnology = (updatedTech: Partial<Technology>) => {
    if (displayTool) {
      try {
        const newTech = { ...displayTool, ...updatedTech } as Technology
        updateCustomTechnology(newTech)

        // Refresh the technologies list
        setTechnologies(getAllTechnologies())

        alert(`Technology "${newTech.name}" updated successfully!`)
      } catch (error) {
        console.error('Error updating technology:', error)
        alert('Failed to update technology. Please try again.')
      }
    }
    setIsEditModalOpen(false)
  }

  if (!displayTool) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
            <Link href="/tools" className="text-indigo-600 hover:text-indigo-800 underline">
              ← Back to Tools Directory
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Find all stages where this technology appears
  const availableStages = Object.entries(technologies)
    .filter(([_stageId, stageTechs]) => stageTechs.some(t => t.id === displayTool!.id))
    .map(([stageId]) => stageDefinitions.find(s => s.id === stageId))
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Link href="/tools" className="text-indigo-600 hover:text-indigo-800 text-sm underline">
            ← Back to Tools Directory
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              {displayTool.icon && (
                <img src={displayTool.icon} alt={displayTool.name} className="w-12 h-12" />
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{displayTool.name}</h1>
              </div>
            </div>
            <button
              onClick={handleEditTechnology}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Tool
            </button>
          </div>

          {/* Subcategories */}
          {displayTool.subcategories && displayTool.subcategories.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {displayTool.subcategories.map(subcategory => (
                  <span
                    key={subcategory}
                    className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded"
                  >
                    {subcategory}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{displayTool.description}</p>
          </div>

          {/* Use When */}
          {displayTool.useWhen &&
            Array.isArray(displayTool.useWhen) &&
            displayTool.useWhen.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Use it when</h2>
                <ul className="space-y-2">
                  {displayTool.useWhen.map((useCase, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Watch Out */}
          {displayTool.watchOut &&
            Array.isArray(displayTool.watchOut) &&
            displayTool.watchOut.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Watch out</h2>
                <ul className="space-y-2">
                  {displayTool.watchOut.map((warning, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-500 mr-2 mt-1">⚠</span>
                      <span className="text-gray-700">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Integrations */}
          {displayTool.integrations &&
            Array.isArray(displayTool.integrations) &&
            displayTool.integrations.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Integrates with</h2>
                <div className="text-gray-600 mb-2">Touch or hover for more information</div>
                <div className="space-y-3">
                  {displayTool.integrations.map((integration, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{integration.tool}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            integration.type === 'built-in'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {integration.type === 'built-in' ? 'Built-in support' : 'Plugin'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{integration.description}</p>
                      {integration.url && (
                        <a
                          href={integration.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 underline text-sm"
                        >
                          Learn more →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Available in Stages */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Available in stages</h2>
            <div className="flex flex-wrap gap-2">
              {availableStages.map(stage => (
                <span
                  key={stage?.id}
                  className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded"
                >
                  {stage?.name}
                </span>
              ))}
            </div>
          </div>

          {/* Installation */}
          {displayTool.installation && displayTool.installation.code && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Installation</h2>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                {displayTool.installation.code}
              </div>
            </div>
          )}

          {/* Example Stacks - placeholder for now */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Example stacks</h2>
            <div className="text-gray-500 italic">Example stacks coming soon...</div>
          </div>

          {/* External Link */}
          {displayTool.url && (
            <div className="pt-6 border-t border-gray-200">
              <a
                href={displayTool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Visit Official Website →
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Edit Technology Modal */}
      <TechnologyFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editingTechnology={displayTool}
        onSave={handleSaveTechnology}
      />
    </div>
  )
}
