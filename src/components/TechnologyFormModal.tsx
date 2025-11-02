'use client'

import { useState, useEffect, useMemo } from 'react'
import { Technology, MLOpsStage } from '@/types/mlops'
import { getAllStages } from '@/lib/customStages'

interface TechnologyFormModalProps {
  isOpen: boolean
  onClose: () => void
  editingTechnology?: Technology | null
  onSave: (technology: Partial<Technology>) => void
  suggestions?: {
    useWhen: string[]
    watchOut: string[]
  }
}

export default function TechnologyFormModal({
  isOpen,
  onClose,
  editingTechnology,
  onSave,
  suggestions
}: TechnologyFormModalProps) {
  const [formData, setFormData] = useState<Partial<Technology>>({
    name: '',
    description: '',
    category: 'experiment_tracking',
    url: '',
    websiteUrl: '',
    repoUrl: '',
    docsUrl: '',
    icon: '',
    tags: [],
    useWhen: [],
    watchOut: [],
    installation: { method: '', code: '' },
    integrations: []
  })

  const [tagInput, setTagInput] = useState('')
  const [useWhenInput, setUseWhenInput] = useState('')
  const [watchOutInput, setWatchOutInput] = useState('')
  const [showUseWhenSuggestions, setShowUseWhenSuggestions] = useState(false)
  const [showWatchOutSuggestions, setShowWatchOutSuggestions] = useState(false)
  const [useWhenHighlightedIndex, setUseWhenHighlightedIndex] = useState(-1)
  const [watchOutHighlightedIndex, setWatchOutHighlightedIndex] = useState(-1)
  const [allStages] = useState(getAllStages())

  // Load editing technology data
  useEffect(() => {
    if (editingTechnology) {
      setFormData(editingTechnology)
    } else {
      setFormData({
        name: '',
        description: '',
        category: 'experiment_tracking',
        url: '',
        websiteUrl: '',
        repoUrl: '',
        docsUrl: '',
        icon: '',
        tags: [],
        useWhen: [],
        watchOut: [],
        installation: { method: '', code: '' },
        integrations: []
      })
    }
  }, [editingTechnology])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.description) {
      alert('Name and description are required')
      return
    }
    onSave(formData)
    onClose()
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const addUseWhen = () => {
    if (useWhenInput.trim() && !formData.useWhen?.includes(useWhenInput.trim())) {
      setFormData(prev => ({
        ...prev,
        useWhen: [...(prev.useWhen || []), useWhenInput.trim()]
      }))
      setUseWhenInput('')
      setShowUseWhenSuggestions(false)
      setUseWhenHighlightedIndex(-1)
    }
  }

  const handleUseWhenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUseWhenInput(value)
    setUseWhenHighlightedIndex(-1)
    setShowUseWhenSuggestions(value.length >= 2)
  }

  const handleUseWhenKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showUseWhenSuggestions || filteredUseWhenSuggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault()
        addUseWhen()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setUseWhenHighlightedIndex(prev =>
          prev < filteredUseWhenSuggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setUseWhenHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : filteredUseWhenSuggestions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (useWhenHighlightedIndex >= 0) {
          selectUseWhenSuggestion(filteredUseWhenSuggestions[useWhenHighlightedIndex])
        } else {
          addUseWhen()
        }
        break
      case 'Escape':
        setShowUseWhenSuggestions(false)
        setUseWhenHighlightedIndex(-1)
        break
    }
  }

  const addWatchOut = () => {
    if (watchOutInput.trim() && !formData.watchOut?.includes(watchOutInput.trim())) {
      setFormData(prev => ({
        ...prev,
        watchOut: [...(prev.watchOut || []), watchOutInput.trim()]
      }))
      setWatchOutInput('')
      setShowWatchOutSuggestions(false)
      setWatchOutHighlightedIndex(-1)
    }
  }

  const handleWatchOutInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setWatchOutInput(value)
    setWatchOutHighlightedIndex(-1)
    setShowWatchOutSuggestions(value.length >= 2)
  }

  const handleWatchOutKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showWatchOutSuggestions || filteredWatchOutSuggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault()
        addWatchOut()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setWatchOutHighlightedIndex(prev =>
          prev < filteredWatchOutSuggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setWatchOutHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : filteredWatchOutSuggestions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (watchOutHighlightedIndex >= 0) {
          selectWatchOutSuggestion(filteredWatchOutSuggestions[watchOutHighlightedIndex])
        } else {
          addWatchOut()
        }
        break
      case 'Escape':
        setShowWatchOutSuggestions(false)
        setWatchOutHighlightedIndex(-1)
        break
    }
  }

  const selectUseWhenSuggestion = (suggestion: string) => {
    if (!formData.useWhen?.includes(suggestion)) {
      setFormData(prev => ({
        ...prev,
        useWhen: [...(prev.useWhen || []), suggestion]
      }))
    }
    setUseWhenInput('')
    setShowUseWhenSuggestions(false)
    setUseWhenHighlightedIndex(-1)
  }

  const selectWatchOutSuggestion = (suggestion: string) => {
    if (!formData.watchOut?.includes(suggestion)) {
      setFormData(prev => ({
        ...prev,
        watchOut: [...(prev.watchOut || []), suggestion]
      }))
    }
    setWatchOutInput('')
    setShowWatchOutSuggestions(false)
    setWatchOutHighlightedIndex(-1)
  }

  // Filter suggestions based on current input and exclude already added items
  const filteredUseWhenSuggestions = useMemo(() => {
    if (!useWhenInput.trim() || useWhenInput.length < 2 || !suggestions?.useWhen) {
      return []
    }

    return suggestions.useWhen
      .filter(
        suggestion =>
          suggestion.toLowerCase().includes(useWhenInput.toLowerCase()) &&
          !formData.useWhen?.includes(suggestion) &&
          suggestion.toLowerCase() !== useWhenInput.toLowerCase()
      )
      .sort((a, b) => {
        const aStartsWith = a.toLowerCase().startsWith(useWhenInput.toLowerCase())
        const bStartsWith = b.toLowerCase().startsWith(useWhenInput.toLowerCase())
        if (aStartsWith && !bStartsWith) {
          return -1
        }
        if (!aStartsWith && bStartsWith) {
          return 1
        }
        return a.localeCompare(b)
      })
      .slice(0, 6) // Limit to 6 suggestions
  }, [useWhenInput, suggestions?.useWhen, formData.useWhen])

  const filteredWatchOutSuggestions = useMemo(() => {
    if (!watchOutInput.trim() || watchOutInput.length < 2 || !suggestions?.watchOut) {
      return []
    }

    return suggestions.watchOut
      .filter(
        suggestion =>
          suggestion.toLowerCase().includes(watchOutInput.toLowerCase()) &&
          !formData.watchOut?.includes(suggestion) &&
          suggestion.toLowerCase() !== watchOutInput.toLowerCase()
      )
      .sort((a, b) => {
        const aStartsWith = a.toLowerCase().startsWith(watchOutInput.toLowerCase())
        const bStartsWith = b.toLowerCase().startsWith(watchOutInput.toLowerCase())
        if (aStartsWith && !bStartsWith) {
          return -1
        }
        if (!aStartsWith && bStartsWith) {
          return 1
        }
        return a.localeCompare(b)
      })
      .slice(0, 6) // Limit to 6 suggestions
  }, [watchOutInput, suggestions?.watchOut, formData.watchOut])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingTechnology ? 'Edit Technology' : 'Add New Technology'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technology Name *
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              value={formData.description || ''}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stage Category *</label>
            <select
              value={formData.category || 'experiment_tracking'}
              onChange={e =>
                setFormData(prev => ({ ...prev, category: e.target.value as MLOpsStage }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {allStages.map(stage => (
                <option key={stage.id} value={stage.id}>
                  {stage.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
              <input
                type="url"
                value={formData.url || ''}
                onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon URL</label>
              <input
                type="url"
                value={formData.icon || ''}
                onChange={e => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData(prev => ({
                        ...prev,
                        tags: prev.tags?.filter((_, i) => i !== index)
                      }))
                    }
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Use When */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Use When</label>
            <div className="relative">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={useWhenInput}
                  onChange={handleUseWhenInputChange}
                  onKeyDown={handleUseWhenKeyDown}
                  onFocus={() => useWhenInput.length >= 2 && setShowUseWhenSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowUseWhenSuggestions(false), 150)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="When to use this technology..."
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={addUseWhen}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Add
                </button>
              </div>

              {/* Autocomplete Suggestions Dropdown */}
              {showUseWhenSuggestions && filteredUseWhenSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b-md shadow-lg z-20 max-h-48 overflow-y-auto">
                  {filteredUseWhenSuggestions.map((suggestion, index) => (
                    <div
                      key={suggestion}
                      onClick={() => selectUseWhenSuggestion(suggestion)}
                      className={`px-3 py-2 cursor-pointer transition-colors ${
                        index === useWhenHighlightedIndex
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-sm">
                        {suggestion
                          .split(new RegExp(`(${useWhenInput})`, 'gi'))
                          .map((part, partIndex) =>
                            part.toLowerCase() === useWhenInput.toLowerCase() ? (
                              <strong key={partIndex} className="bg-yellow-200">
                                {part}
                              </strong>
                            ) : (
                              part
                            )
                          )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-1">
              {formData.useWhen?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-green-50 rounded border"
                >
                  <span className="text-sm">{item}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData(prev => ({
                        ...prev,
                        useWhen: prev.useWhen?.filter((_, i) => i !== index)
                      }))
                    }
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Watch Out */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Watch Out</label>
            <div className="relative">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={watchOutInput}
                  onChange={handleWatchOutInputChange}
                  onKeyDown={handleWatchOutKeyDown}
                  onFocus={() => watchOutInput.length >= 2 && setShowWatchOutSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowWatchOutSuggestions(false), 150)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Potential issues or limitations..."
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={addWatchOut}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Add
                </button>
              </div>

              {/* Autocomplete Suggestions Dropdown */}
              {showWatchOutSuggestions && filteredWatchOutSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b-md shadow-lg z-20 max-h-48 overflow-y-auto">
                  {filteredWatchOutSuggestions.map((suggestion, index) => (
                    <div
                      key={suggestion}
                      onClick={() => selectWatchOutSuggestion(suggestion)}
                      className={`px-3 py-2 cursor-pointer transition-colors ${
                        index === watchOutHighlightedIndex
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-sm">
                        {suggestion
                          .split(new RegExp(`(${watchOutInput})`, 'gi'))
                          .map((part, partIndex) =>
                            part.toLowerCase() === watchOutInput.toLowerCase() ? (
                              <strong key={partIndex} className="bg-yellow-200">
                                {part}
                              </strong>
                            ) : (
                              part
                            )
                          )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-1">
              {formData.watchOut?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-yellow-50 rounded border"
                >
                  <span className="text-sm">{item}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData(prev => ({
                        ...prev,
                        watchOut: prev.watchOut?.filter((_, i) => i !== index)
                      }))
                    }
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {editingTechnology ? 'Update Technology' : 'Add Technology'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
