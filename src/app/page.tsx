'use client'

import { useState, useCallback, useEffect } from 'react'
import Header from '@/components/Header'
import ReactFlowCanvas from '@/components/ReactFlowCanvas'
import TechnologyPanel from '@/components/TechnologyPanel'
import TechnologyModal from '@/components/TechnologyModal'
import StackActions from '@/components/StackActions'
import { MLOpsStack, MLOpsStage, Technology } from '@/types/mlops'
import { stageDefinitions } from '@/lib/data'
import { getCurrentStack, createNewStack, saveStack } from '@/lib/storage'
import { getAllStages, getAllConnections } from '@/lib/customStages'
import { getAllTechnologies } from '@/lib/customTechnologies'

export default function Home() {
  const [currentStack, setCurrentStack] = useState<MLOpsStack>(createNewStack())
  const [isInitialized, setIsInitialized] = useState(false)
  const [allStages, setAllStages] = useState(stageDefinitions)
  const [allConnections, setAllConnections] = useState(getAllConnections())

  useEffect(() => {
    const savedStack = getCurrentStack()
    if (savedStack) {
      // Refresh icon paths from current data so stale localStorage objects get updated icons
      const currentData = getAllTechnologies()
      const iconById = new Map<string, string>()
      Object.values(currentData)
        .flat()
        .forEach(t => {
          if (t.icon && !iconById.has(t.id)) {
            iconById.set(t.id, t.icon)
          }
        })
      const technologies: MLOpsStack['technologies'] = {}
      Object.entries(savedStack.technologies).forEach(([stage, techs]) => {
        technologies[stage as MLOpsStage] = techs.map(t => {
          const icon = iconById.get(t.id)
          return icon ? { ...t, icon } : t
        })
      })
      setCurrentStack({ ...savedStack, technologies })
    }
    setIsInitialized(true)

    // Load all stages and connections (default + custom)
    setAllStages(getAllStages())
    setAllConnections(getAllConnections())

    // Listen for custom stage and connection changes
    const handleStorageChange = () => {
      const newStages = getAllStages()
      const newConnections = getAllConnections()

      setAllStages(newStages)
      setAllConnections(newConnections)

      // Clean up current stack to remove technologies for deleted stages
      setCurrentStack(prevStack => {
        const validStageIds = new Set(newStages.map(stage => stage.id))
        const cleanedTechnologies: { [key: string]: Technology[] } = {}

        // Only keep technologies for stages that still exist
        Object.keys(prevStack.technologies).forEach(stageId => {
          if (validStageIds.has(stageId)) {
            cleanedTechnologies[stageId] = prevStack.technologies[stageId]
          }
        })

        // Ensure all current stages have technology arrays
        newStages.forEach(stage => {
          if (!cleanedTechnologies[stage.id]) {
            cleanedTechnologies[stage.id] = []
          }
        })

        return {
          ...prevStack,
          technologies: cleanedTechnologies,
          updated: new Date()
        }
      })
    }

    window.addEventListener('storage', handleStorageChange)
    // Also listen for custom event when stages change in the same tab
    window.addEventListener('customStagesChanged', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('customStagesChanged', handleStorageChange)
    }
  }, [])

  // Save stack whenever it changes (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      saveStack(currentStack)
    }
  }, [currentStack, isInitialized])

  const [selectedStage, setSelectedStage] = useState<MLOpsStage | null>(null)
  const [showTechnologyModal, setShowTechnologyModal] = useState(false)
  const [selectedTechnology, setSelectedTechnology] = useState<Technology | null>(null)

  const handleStageSelect = useCallback((stageId: MLOpsStage) => {
    setSelectedStage(stageId)
  }, [])

  const handleTechnologySelect = useCallback((technology: Technology) => {
    setSelectedTechnology(technology)
    setShowTechnologyModal(true)
  }, [])

  const handleAddTechnology = useCallback(() => {
    if (!selectedTechnology || !selectedStage) {
      return
    }

    setCurrentStack(prev => ({
      ...prev,
      technologies: {
        ...prev.technologies,
        [selectedStage]: [...prev.technologies[selectedStage], selectedTechnology]
      },
      updated: new Date()
    }))

    setShowTechnologyModal(false)
    setSelectedTechnology(null)
  }, [selectedTechnology, selectedStage])

  const handleQuickAddTechnology = useCallback(
    (technology: Technology) => {
      if (!selectedStage) {
        return
      }

      // Check if technology is already added
      const isAlreadyAdded = currentStack.technologies[selectedStage].some(
        t => t.id === technology.id
      )
      if (isAlreadyAdded) {
        return
      }

      setCurrentStack(prev => ({
        ...prev,
        technologies: {
          ...prev.technologies,
          [selectedStage]: [...prev.technologies[selectedStage], technology]
        },
        updated: new Date()
      }))
    },
    [selectedStage, currentStack]
  )

  const handleRemoveTechnology = useCallback((stageId: MLOpsStage, techId: string) => {
    setCurrentStack(prev => ({
      ...prev,
      technologies: {
        ...prev.technologies,
        [stageId]: prev.technologies[stageId].filter(t => t.id !== techId)
      },
      updated: new Date()
    }))
  }, [])

  const handleRemoveTechnologyFromModal = useCallback(() => {
    if (!selectedTechnology || !selectedStage) {
      return
    }

    handleRemoveTechnology(selectedStage, selectedTechnology.id)
    setShowTechnologyModal(false)
    setSelectedTechnology(null)
  }, [selectedTechnology, selectedStage, handleRemoveTechnology])

  const isAlreadyAdded = selectedTechnology
    ? Object.values(currentStack.technologies)
        .flat()
        .some(t => t.id === selectedTechnology.id)
    : false

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex h-[calc(100vh-80px)]">
        <TechnologyPanel
          selectedStage={selectedStage}
          onTechnologySelect={handleTechnologySelect}
          selectedTechnologies={selectedStage ? currentStack.technologies[selectedStage] : []}
          onAddTechnology={handleQuickAddTechnology}
          stageDefinitions={allStages}
          onStageSelect={handleStageSelect}
        />

        <div className="flex flex-col flex-1">
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Stack Builder</h1>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Stack:</span> {currentStack.name}
                </div>
              </div>
              <StackActions currentStack={currentStack} onStackChange={setCurrentStack} />
            </div>
          </div>

          <div className="flex-1 relative">
            <ReactFlowCanvas
              currentStack={currentStack}
              selectedStage={selectedStage}
              onStageSelect={handleStageSelect}
              onRemoveTechnology={handleRemoveTechnology}
              onTechnologyClick={handleTechnologySelect}
              stageDefinitions={allStages}
              stageConnections={allConnections}
            />
          </div>
        </div>
      </div>

      <TechnologyModal
        technology={selectedTechnology}
        isOpen={showTechnologyModal}
        onClose={() => {
          setShowTechnologyModal(false)
          setSelectedTechnology(null)
        }}
        onAdd={handleAddTechnology}
        onRemove={handleRemoveTechnologyFromModal}
        isAlreadyAdded={isAlreadyAdded}
      />
    </div>
  )
}
