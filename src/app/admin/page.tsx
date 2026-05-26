'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { MLOpsStageInfo, StageConnection } from '@/types/mlops'
import { stageDefinitions } from '@/lib/data'
import {
  getCustomStages,
  saveCustomStages,
  getCustomConnections,
  saveCustomConnections
} from '@/lib/customStages'

export default function AdminPage() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Dynamic stage management state
  const [customStages, setCustomStages] = useState<MLOpsStageInfo[]>([])
  const [customConnections, setCustomConnections] = useState<StageConnection[]>([])

  // Connection form state
  const [connectionForm, setConnectionForm] = useState({
    from: '',
    to: ''
  })
  const [showAddStageForm, setShowAddStageForm] = useState(false)
  const [editingStage, setEditingStage] = useState<MLOpsStageInfo | null>(null)
  const [newStage, setNewStage] = useState({
    id: '',
    name: '',
    description: '',
    position: { x: 100, y: 100 }
  })

  // Ref for scrolling to add stage form
  const addStageFormRef = useRef<HTMLDivElement>(null)

  // Load custom stages and connections from localStorage on mount
  useEffect(() => {
    setCustomStages(getCustomStages())
    setCustomConnections(getCustomConnections())
  }, [])

  // Save custom stages and connections to localStorage whenever they change
  useEffect(() => {
    // Always save, even if empty (to clear localStorage when all stages are deleted)
    saveCustomStages(customStages)
  }, [customStages])

  useEffect(() => {
    // Always save, even if empty (to clear localStorage when all connections are deleted)
    saveCustomConnections(customConnections)
  }, [customConnections])

  // Get all stages (default + custom)
  const allStages = useMemo(() => {
    return [...stageDefinitions, ...customStages]
  }, [customStages])

  // Stage management functions
  const handleAddStage = () => {
    if (!newStage.id || !newStage.name || !newStage.description) {
      setMessage({ type: 'error', text: 'All stage fields are required.' })
      return
    }

    // Check if stage ID already exists
    const stageExists = allStages.some(stage => stage.id === newStage.id)
    if (stageExists) {
      setMessage({ type: 'error', text: 'Stage ID already exists. Please use a unique ID.' })
      return
    }

    const stage: MLOpsStageInfo = {
      id: newStage.id,
      name: newStage.name,
      description: newStage.description,
      position: newStage.position
    }

    setCustomStages(prev => [...prev, stage])
    setNewStage({ id: '', name: '', description: '', position: { x: 100, y: 100 } })
    setShowAddStageForm(false)
    setMessage({ type: 'success', text: `Stage "${stage.name}" added successfully!` })

    // Trigger event to update other components immediately
    window.dispatchEvent(new CustomEvent('customStagesChanged'))
  }

  const handleEditStage = (stage: MLOpsStageInfo) => {
    setEditingStage(stage)
    setNewStage({
      id: stage.id,
      name: stage.name,
      description: stage.description,
      position: stage.position
    })
    setShowAddStageForm(true)
    // Scroll to form after a short delay to ensure it's rendered
    setTimeout(() => {
      addStageFormRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }

  const handleUpdateStage = () => {
    if (!editingStage) {
      return
    }

    setCustomStages(prev =>
      prev.map(stage =>
        stage.id === editingStage.id
          ? {
              ...stage,
              name: newStage.name,
              description: newStage.description,
              position: newStage.position
            }
          : stage
      )
    )

    setEditingStage(null)
    setNewStage({ id: '', name: '', description: '', position: { x: 100, y: 100 } })
    setShowAddStageForm(false)
    setMessage({ type: 'success', text: 'Stage updated successfully!' })

    // Trigger event to update other components immediately
    window.dispatchEvent(new CustomEvent('customStagesChanged'))
  }

  const handleDeleteStage = (stageId: string) => {
    if (confirm('Are you sure you want to delete this stage? This action cannot be undone.')) {
      setCustomStages(prev => prev.filter(stage => stage.id !== stageId))
      setMessage({ type: 'success', text: 'Stage deleted successfully!' })

      // Trigger event to update other components immediately
      window.dispatchEvent(new CustomEvent('customStagesChanged'))
    }
  }

  const resetStages = () => {
    if (confirm('Reset to default stages? All custom stages will be deleted.')) {
      setCustomStages([])
      localStorage.removeItem('customMLOpsStages')
      setMessage({ type: 'success', text: 'Reset to default stages successfully!' })
    }
  }

  const handleAddConnection = () => {
    if (!connectionForm.from || !connectionForm.to) {
      setMessage({ type: 'error', text: 'Please select both source and target stages' })
      return
    }

    if (connectionForm.from === connectionForm.to) {
      setMessage({ type: 'error', text: 'Source and target stages cannot be the same' })
      return
    }

    // Check if connection already exists
    const exists = customConnections.some(
      conn => conn.from === connectionForm.from && conn.to === connectionForm.to
    )

    if (exists) {
      setMessage({ type: 'error', text: 'This connection already exists' })
      return
    }

    const newConnection: StageConnection = {
      from: connectionForm.from,
      to: connectionForm.to,
      type: 'default',
      animated: true
    }

    setCustomConnections(prev => [...prev, newConnection])
    setConnectionForm({ from: '', to: '' })
    setMessage({
      type: 'success',
      text: `Connection added: ${connectionForm.from} → ${connectionForm.to}`
    })

    // Trigger event to update other components
    window.dispatchEvent(new CustomEvent('customStagesChanged'))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-1">Manage MLOps workflow stages and connections.</p>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Technology management has moved!</strong> You can now add and edit
                    technologies directly on the{' '}
                    <Link href="/tools" className="underline font-medium">
                      Tools page
                    </Link>{' '}
                    with convenient edit buttons on each tool card.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Stage Management Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Workflow Stages</h2>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowAddStageForm(true)
                  setEditingStage(null)
                  setNewStage({ id: '', name: '', description: '', position: { x: 100, y: 100 } })
                  // Scroll to form after a short delay to ensure it's rendered
                  setTimeout(() => {
                    addStageFormRef.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }, 100)
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Add Stage
              </button>
              <button
                onClick={resetStages}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Reset to Default
              </button>
            </div>
          </div>

          {/* Stages List */}
          <div className="space-y-3">
            {allStages.map(stage => {
              const isCustom = customStages.some(cs => cs.id === stage.id)
              return (
                <div
                  key={stage.id}
                  className={`p-4 rounded-lg border ${
                    isCustom ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{stage.name}</h3>
                        {isCustom && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                            Custom
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        ID: {stage.id} | Position: ({stage.position.x}, {stage.position.y})
                      </p>
                    </div>
                    {isCustom && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditStage(stage)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteStage(stage.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Add/Edit Stage Form */}
        {showAddStageForm && (
          <div ref={addStageFormRef} className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingStage ? 'Edit Stage' : 'Add New Stage'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stage ID</label>
                <input
                  type="text"
                  value={newStage.id}
                  onChange={e => setNewStage(prev => ({ ...prev, id: e.target.value }))}
                  disabled={!!editingStage}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="e.g., custom_data_processing"
                />
                {editingStage && (
                  <p className="text-xs text-gray-500 mt-1">
                    Stage ID cannot be changed when editing
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stage Name</label>
                <input
                  type="text"
                  value={newStage.name}
                  onChange={e => setNewStage(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Custom Data Processing"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newStage.description}
                  onChange={e => setNewStage(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe what this stage does..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">X Position</label>
                  <input
                    type="number"
                    value={newStage.position.x}
                    onChange={e =>
                      setNewStage(prev => ({
                        ...prev,
                        position: { ...prev.position, x: parseInt(e.target.value) || 0 }
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Y Position</label>
                  <input
                    type="number"
                    value={newStage.position.y}
                    onChange={e =>
                      setNewStage(prev => ({
                        ...prev,
                        position: { ...prev.position, y: parseInt(e.target.value) || 0 }
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={editingStage ? handleUpdateStage : handleAddStage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  {editingStage ? 'Update Stage' : 'Add Stage'}
                </button>
                <button
                  onClick={() => {
                    setShowAddStageForm(false)
                    setEditingStage(null)
                    setNewStage({ id: '', name: '', description: '', position: { x: 100, y: 100 } })
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Connection Management Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Stage Connections</h2>

          {/* Add Connection Form */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Add Connection</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Stage</label>
                <select
                  value={connectionForm.from}
                  onChange={e => setConnectionForm(prev => ({ ...prev, from: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select source stage</option>
                  {allStages.map(stage => (
                    <option key={stage.id} value={stage.id}>
                      {stage.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Stage</label>
                <select
                  value={connectionForm.to}
                  onChange={e => setConnectionForm(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select target stage</option>
                  {allStages.map(stage => (
                    <option key={stage.id} value={stage.id}>
                      {stage.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleAddConnection}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Add Connection
                </button>
              </div>
            </div>
          </div>

          {/* Connections List */}
          <div className="space-y-3">
            {customConnections.map((conn, index) => {
              const fromStage = allStages.find(s => s.id === conn.from)
              const toStage = allStages.find(s => s.id === conn.to)
              return (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium">{fromStage?.name || conn.from}</span>
                    <span className="mx-2 text-gray-500">→</span>
                    <span className="font-medium">{toStage?.name || conn.to}</span>
                  </div>
                  <button
                    onClick={() => {
                      setCustomConnections(prev => prev.filter((_, i) => i !== index))
                      setMessage({ type: 'success', text: 'Connection deleted successfully!' })
                    }}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              )
            })}
            {customConnections.length === 0 && (
              <p className="text-gray-500 text-center py-4">No custom connections added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
