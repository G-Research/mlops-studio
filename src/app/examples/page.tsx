'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { MLOpsStack } from '@/types/mlops'
import { exampleStacks } from '@/lib/exampleStacks'
import { stageDefinitions } from '@/lib/data'

export default function ExamplesPage() {
  const [selectedStack, setSelectedStack] = useState<MLOpsStack | null>(null)

  const handleUseStack = (stack: MLOpsStack) => {
    // In a real app, this would update the global state or navigate to the builder
    localStorage.setItem('mlops-current-stack', JSON.stringify(stack))
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Example MLOps Stacks</h1>
          <p className="text-gray-600">
            Explore pre-configured MLOps stacks for different use cases and organization sizes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stack List */}
          <div className="space-y-4">
            {exampleStacks.map(stack => (
              <div
                key={stack.id}
                className={`bg-white rounded-lg shadow-md p-6 cursor-pointer border-2 transition-colors ${
                  selectedStack?.id === stack.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => setSelectedStack(stack)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{stack.name}</h3>
                  <span className="text-xs text-gray-500">
                    Updated {stack.updated.toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{stack.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.entries(stack.technologies).map(([stageId, techs]) =>
                    techs.map(tech => (
                      <span
                        key={`${stageId}-${tech.id}`}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tech.name}
                      </span>
                    ))
                  )}
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation()
                    handleUseStack(stack)
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm"
                >
                  Use This Stack
                </button>
              </div>
            ))}
          </div>

          {/* Stack Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {selectedStack ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedStack.name}</h2>
                <p className="text-gray-600 mb-6">{selectedStack.description}</p>

                <div className="space-y-4">
                  {stageDefinitions.map(stage => {
                    const techs = selectedStack.technologies[stage.id]
                    if (techs.length === 0) {
                      return null
                    }

                    return (
                      <div key={stage.id} className="border-b border-gray-200 pb-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{stage.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {techs.map(tech => (
                            <div
                              key={tech.id}
                              className="flex items-center space-x-2 bg-indigo-100 px-3 py-1 rounded-full"
                            >
                              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                              <span className="text-sm font-medium text-indigo-900">
                                {tech.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleUseStack(selectedStack)}
                    className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Use This Stack
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <h2 className="text-xl font-semibold mb-2">Select a stack</h2>
                <p>Click on a stack to see its detailed configuration.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
