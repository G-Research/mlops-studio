'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import TechnologyFormModal from '@/components/TechnologyFormModal'
import { stageDefinitions } from '@/lib/data'
import {
  getAllTechnologies,
  addCustomTechnology,
  updateCustomTechnology
} from '@/lib/customTechnologies'
import { MLOpsStage, Technology } from '@/types/mlops'

export default function ToolsPage() {
  const [selectedStage, setSelectedStage] = useState<MLOpsStage | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [technologies, setTechnologies] = useState(getAllTechnologies())

  // Technology form modal state
  const [showTechModal, setShowTechModal] = useState(false)
  const [editingTech, setEditingTech] = useState<Technology | null>(null)

  // Autocomplete state
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  // Compute suggestions from existing technologies
  const suggestions = useMemo(() => {
    const allTechs = Object.values(technologies).flat()
    const useWhenSet = new Set<string>()
    const watchOutSet = new Set<string>()

    allTechs.forEach(tech => {
      if (tech.useWhen) {
        tech.useWhen.forEach(item => useWhenSet.add(item))
      }
      if (tech.watchOut) {
        tech.watchOut.forEach(item => watchOutSet.add(item))
      }
    })

    return {
      useWhen: Array.from(useWhenSet).sort(),
      watchOut: Array.from(watchOutSet).sort()
    }
  }, [])

  // Auto-focus the search input when the page loads
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  // Reload technologies when component mounts to get latest data
  useEffect(() => {
    setTechnologies(getAllTechnologies())
  }, [])

  const filteredTechnologies = selectedStage
    ? technologies[selectedStage].sort((a, b) => a.name.localeCompare(b.name))
    : (() => {
        // Create a unique list of technologies by ID, keeping the first occurrence
        const uniqueTechs = new Map()
        Object.values(technologies)
          .flat()
          .forEach(tech => {
            if (!uniqueTechs.has(tech.id)) {
              uniqueTechs.set(tech.id, tech)
            }
          })
        return Array.from(uniqueTechs.values()).sort((a, b) => a.name.localeCompare(b.name))
      })()

  const searchFilteredTechs = filteredTechnologies.filter(
    tech =>
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Autocomplete suggestions - matching technology names
  const autocompleteSuggestions = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) {
      return []
    }

    const allTechNames = Object.values(technologies)
      .flat()
      .map(tech => tech.name)
      .filter((name, index, arr) => arr.indexOf(name) === index) // unique names
      .filter(
        name =>
          name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          name.toLowerCase() !== searchTerm.toLowerCase()
      )
      .sort((a, b) => {
        // Prioritize matches that start with the search term
        const aStartsWith = a.toLowerCase().startsWith(searchTerm.toLowerCase())
        const bStartsWith = b.toLowerCase().startsWith(searchTerm.toLowerCase())
        if (aStartsWith && !bStartsWith) {
          return -1
        }
        if (!aStartsWith && bStartsWith) {
          return 1
        }
        return a.localeCompare(b)
      })
      .slice(0, 8) // Limit to 8 suggestions

    return allTechNames
  }, [searchTerm])

  const handleEditTechnology = (tech: Technology) => {
    setEditingTech(tech)
    setShowTechModal(true)
  }

  const handleAddNewTechnology = () => {
    setEditingTech(null)
    setShowTechModal(true)
  }

  const handleSaveTechnology = (techData: Partial<Technology>) => {
    try {
      if (editingTech) {
        // Update existing technology
        const updatedTech = { ...editingTech, ...techData } as Technology
        updateCustomTechnology(updatedTech)
      } else {
        // Create new technology
        const newTech = {
          id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          ...techData
        } as Technology
        addCustomTechnology(newTech)
      }

      // Refresh the technologies list
      setTechnologies(getAllTechnologies())

      alert(`Technology "${techData.name}" ${editingTech ? 'updated' : 'created'} successfully!`)
    } catch (error) {
      console.error('Error saving technology:', error)
      alert('Failed to save technology. Please try again.')
    }
  }

  // Autocomplete handlers
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setHighlightedIndex(-1)
    setShowSuggestions(value.length >= 2)
  }

  const handleSearchInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || autocompleteSuggestions.length === 0) {
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => (prev < autocompleteSuggestions.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : autocompleteSuggestions.length - 1))
        break
      case 'Enter':
        if (highlightedIndex >= 0) {
          e.preventDefault()
          setSearchTerm(autocompleteSuggestions[highlightedIndex])
          setShowSuggestions(false)
          setHighlightedIndex(-1)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setHighlightedIndex(-1)
        break
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    setShowSuggestions(false)
    setHighlightedIndex(-1)
    searchInputRef.current?.focus()
  }

  const handleSearchInputBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setShowSuggestions(false), 150)
  }

  const handleSearchInputFocus = () => {
    if (searchTerm.length >= 2) {
      setShowSuggestions(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">MLOps Tools Directory</h1>
              <p className="text-gray-600">
                Explore all available MLOps tools and technologies organized by stage.
              </p>
            </div>
            <button
              onClick={handleAddNewTechnology}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Add Technology
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchInputKeyDown}
              onBlur={handleSearchInputBlur}
              onFocus={handleSearchInputFocus}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoComplete="off"
            />

            {/* Autocomplete Suggestions Dropdown */}
            {showSuggestions && autocompleteSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b-md shadow-lg z-10 max-h-48 overflow-y-auto">
                {autocompleteSuggestions.map((suggestion, index) => (
                  <div
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`px-4 py-2 cursor-pointer transition-colors ${
                      index === highlightedIndex
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm">
                      {suggestion
                        .split(new RegExp(`(${searchTerm})`, 'gi'))
                        .map((part, partIndex) =>
                          part.toLowerCase() === searchTerm.toLowerCase() ? (
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

          {/* Stage Filter */}
          <div className="lg:w-64">
            <select
              value={selectedStage || ''}
              onChange={e => setSelectedStage((e.target.value as MLOpsStage) || null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Stages</option>
              {stageDefinitions
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(stage => (
                  <option key={stage.id} value={stage.id}>
                    {stage.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchFilteredTechs.map(tech => {
            // Find all stages where this technology appears
            const availableStages = Object.entries(technologies)
              .filter(([stageId, stageTechs]) => stageTechs.some(t => t.id === tech.id))
              .map(([stageId]) => stageDefinitions.find(s => s.id === stageId))
              .filter(Boolean)

            return (
              <div key={tech.id} className="relative group">
                <Link href={`/tools/${tech.id}`} className="block">
                  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{tech.name}</h3>
                      <div className="flex items-center gap-2">
                        {tech.icon && <img src={tech.icon} alt={tech.name} className="w-6 h-6" />}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm">{tech.description}</p>

                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {availableStages.map(stage => (
                          <span
                            key={`${tech.id}-${stage?.id}`}
                            className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded"
                          >
                            {stage?.name}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-4">
                        {tech.url && (
                          <span
                            onClick={e => {
                              e.preventDefault()
                              e.stopPropagation()
                              window.open(tech.url, '_blank', 'noopener,noreferrer')
                            }}
                            className="text-indigo-600 hover:text-indigo-800 text-sm underline cursor-pointer"
                          >
                            Official Site →
                          </span>
                        )}
                      </div>
                    </div>

                    {tech.tags && tech.tags.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex flex-wrap gap-1">
                          {tech.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Edit Button - appears on hover */}
                <button
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleEditTechnology(tech)
                  }}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
                  title="Edit Technology"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>
            )
          })}
        </div>

        {searchFilteredTechs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No tools found</h2>
            <p className="text-gray-500">
              {searchTerm
                ? `No tools match "${searchTerm}"`
                : selectedStage
                  ? `No tools available for ${stageDefinitions.find(s => s.id === selectedStage)?.name}`
                  : 'No tools available'}
            </p>
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">MLOps Stages Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stageDefinitions.map(stage => (
              <div key={stage.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{stage.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
                <div className="text-xs text-indigo-600">
                  {technologies[stage.id].length} tool
                  {technologies[stage.id].length !== 1 ? 's' : ''} available
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Form Modal */}
      <TechnologyFormModal
        isOpen={showTechModal}
        onClose={() => {
          setShowTechModal(false)
          setEditingTech(null)
        }}
        editingTechnology={editingTech}
        onSave={handleSaveTechnology}
        suggestions={suggestions}
      />
    </div>
  )
}
