'use client'

import { useState } from 'react'
import { MLOpsStack } from '@/types/mlops'
import { saveStack, getSavedStacks, deleteStack, createNewStack } from '@/lib/storage'

interface StackActionsProps {
  currentStack: MLOpsStack
  onStackChange: (stack: MLOpsStack) => void
}

export default function StackActions({ currentStack, onStackChange }: StackActionsProps) {
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showLoadModal, setShowLoadModal] = useState(false)
  const [stackName, setStackName] = useState(currentStack.name)
  const [savedStacks, setSavedStacks] = useState<MLOpsStack[]>([])

  const handleSave = () => {
    const updatedStack = {
      ...currentStack,
      name: stackName,
      updated: new Date()
    }

    saveStack(updatedStack)
    onStackChange(updatedStack)
    setShowSaveModal(false)
  }

  const handleLoad = () => {
    const stacks = getSavedStacks()
    setSavedStacks(stacks)
    setShowLoadModal(true)
  }

  const handleLoadStack = (stack: MLOpsStack) => {
    onStackChange(stack)
    setStackName(stack.name)
    setShowLoadModal(false)
  }

  const handleDeleteStack = (stackId: string) => {
    deleteStack(stackId)
    setSavedStacks(prev => prev.filter(s => s.id !== stackId))
  }

  const handleNewStack = () => {
    const newStack = createNewStack()
    onStackChange(newStack)
    setStackName(newStack.name)
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => {
          setStackName(currentStack.name)
          setShowSaveModal(true)
        }}
        className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
        title="Save current stack"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17,21 17,13 7,13 7,21" />
          <polyline points="7,3 7,8 15,8" />
        </svg>
        Save
      </button>

      <button
        onClick={handleLoad}
        className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
        title="Load saved stack"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
        Load
      </button>

      <button
        onClick={handleNewStack}
        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
        title="Create new stack"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        New
      </button>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Save Stack</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Stack Name</label>
              <input
                type="text"
                value={stackName}
                onChange={e => setStackName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter stack name"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Load Stack</h2>
              <button
                onClick={() => setShowLoadModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {savedStacks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No saved stacks found.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedStacks.map(stack => (
                  <div
                    key={stack.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleLoadStack(stack)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{stack.name}</h3>
                        <p className="text-sm text-gray-500">
                          Updated: {new Date(stack.updated).toLocaleDateString()}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {Object.entries(stack.technologies).map(([stageId, techs]) =>
                            techs.map(tech => (
                              <span
                                key={`${stageId}-${tech.id}`}
                                className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs"
                              >
                                {tech.name}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          if (confirm(`Delete "${stack.name}"?`)) {
                            handleDeleteStack(stack.id)
                          }
                        }}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
