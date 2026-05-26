'use client'

import { useEffect } from 'react'
import { Technology } from '@/types/mlops'

interface TechnologyModalProps {
  technology: Technology | null
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
  onRemove?: () => void
  isAlreadyAdded?: boolean
}

export default function TechnologyModal({
  technology,
  isOpen,
  onClose,
  onAdd,
  onRemove,
  isAlreadyAdded = false
}: TechnologyModalProps) {
  // ESC key handler
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !technology) {
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 my-8 max-h-screen overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button in top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          style={{ lineHeight: '1' }}
        >
          <span style={{ transform: 'translateY(-1px)' }}>×</span>
        </button>

        <div className="flex justify-between items-start mb-4 pr-10">
          <div className="flex items-center space-x-3">
            {technology.icon && (
              <img src={technology.icon} alt={technology.name} className="w-6 h-6 object-contain" />
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{technology.name}</h2>
            </div>
          </div>
          <div className="flex items-center">
            {!isAlreadyAdded ? (
              <button
                onClick={onAdd}
                className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors text-sm"
              >
                Add to Stack
              </button>
            ) : (
              <button
                onClick={onRemove}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                Remove from Stack
              </button>
            )}
          </div>
        </div>

        {/* Subcategories */}
        {technology.subcategories && technology.subcategories.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {technology.subcategories.map(subcategory => (
                <span
                  key={subcategory}
                  className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded"
                >
                  {subcategory}
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="text-gray-600 mb-4">{technology.description}</p>

        {/* Use When */}
        {technology.useWhen &&
          Array.isArray(technology.useWhen) &&
          technology.useWhen.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Use it when</h4>
              <ul className="space-y-1">
                {technology.useWhen.map((useCase, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span className="text-gray-600">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* Watch Out */}
        {technology.watchOut &&
          Array.isArray(technology.watchOut) &&
          technology.watchOut.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Watch out</h4>
              <ul className="space-y-1">
                {technology.watchOut.map((warning, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-amber-500 mr-2 mt-1">⚠</span>
                    <span className="text-gray-600">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* Integrations */}
        {technology.integrations &&
          Array.isArray(technology.integrations) &&
          technology.integrations.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Integrates with</h4>
              <div className="space-y-2">
                {technology.integrations.map((integration, index) => (
                  <div key={index} className="border border-gray-200 rounded p-3">
                    <div className="flex justify-between items-start">
                      <h5 className="font-medium text-gray-900">
                        {integration?.tool || 'Unknown'}
                      </h5>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          integration?.type === 'built-in'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {integration?.type === 'built-in' ? 'Built-in support' : 'Plugin'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{integration?.description || ''}</p>
                    {integration?.url && (
                      <a
                        href={integration.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 underline text-xs mt-1 inline-block"
                      >
                        Learn more →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Example Stacks */}
        {technology.exampleStacks &&
          Array.isArray(technology.exampleStacks) &&
          technology.exampleStacks.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Example stacks</h4>
              <div className="flex flex-wrap gap-1">
                {technology.exampleStacks.map((stack, index) => (
                  <span
                    key={index}
                    className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Installation */}
        {technology.installation && technology.installation.code && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Installation</h4>
            <div className="bg-gray-100 rounded p-2">
              <code className="text-sm text-gray-800">{technology.installation.code}</code>
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3 text-sm">
          {technology.websiteUrl && (
            <a
              href={technology.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              Website →
            </a>
          )}
          {technology.repoUrl && (
            <a
              href={technology.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              Repository →
            </a>
          )}
          {technology.docsUrl && (
            <a
              href={technology.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              Documentation →
            </a>
          )}
          {technology.url && (
            <a
              href={technology.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              Learn more →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
