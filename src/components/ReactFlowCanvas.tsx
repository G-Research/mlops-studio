'use client'

import { useCallback, useMemo, useState, useEffect } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  ConnectionMode,
  ReactFlowProvider,
  MarkerType,
  Panel,
  NodeChange,
  applyNodeChanges,
  Viewport,
  useReactFlow,
  useOnViewportChange
} from 'reactflow'
import 'reactflow/dist/style.css'

import {
  stageDefinitions as defaultStageDefinitions,
  stageConnections as defaultStageConnections
} from '@/lib/data'
import { MLOpsStack, MLOpsStage, MLOpsStageInfo, StageConnection, Technology } from '@/types/mlops'
import CustomNode from './CustomNode'
import { useSmoothCollision } from '@/hooks/useSmoothCollision'

interface ReactFlowCanvasProps {
  currentStack: MLOpsStack
  selectedStage: MLOpsStage | null
  onStageSelect: (stageId: MLOpsStage) => void
  onRemoveTechnology: (stageId: MLOpsStage, techId: string) => void
  onTechnologyClick: (technology: Technology) => void
  stageDefinitions?: MLOpsStageInfo[]
  stageConnections?: StageConnection[]
}

const nodeTypes = {
  mlopsStage: CustomNode
}

function ReactFlowCanvas({
  currentStack,
  selectedStage,
  onStageSelect,
  onRemoveTechnology,
  onTechnologyClick,
  stageDefinitions = defaultStageDefinitions,
  stageConnections = defaultStageConnections
}: ReactFlowCanvasProps) {
  const {} = useReactFlow()
  const [hasRestoredViewport, setHasRestoredViewport] = useState(false)

  // Load viewport from localStorage
  const loadViewport = (): Viewport => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mlops-studio-viewport')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          // Failed to parse saved viewport
        }
      }
    }
    // Default viewport
    return { x: 0, y: 0, zoom: 1 }
  }

  // Save viewport to localStorage
  const saveViewport = (viewport: Viewport) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mlops-studio-viewport', JSON.stringify(viewport))
    }
  }

  // Get initial viewport to prevent flash
  const initialViewport = useMemo(() => loadViewport(), [])

  // Mark as restored immediately since we're using defaultViewport
  useEffect(() => {
    setHasRestoredViewport(true)
  }, [])

  // Use the React Flow hook to handle viewport changes with debouncing
  useOnViewportChange({
    onEnd: useCallback(
      (viewport: Viewport) => {
        // Only save if we've restored the initial viewport to avoid overwriting saved state
        if (hasRestoredViewport) {
          setTimeout(() => {
            saveViewport(viewport)
          }, 100)
        }
      },
      [hasRestoredViewport]
    )
  })

  // Initialize smooth collision detection
  const {
    updateNode,
    handleDrag,
    endDrag,
    checkCollisions,
    startReturnAnimation,
    triggerReturn,
    undo,
    redo,
    canUndo,
    canRedo,
    savePositionHistory
  } = useSmoothCollision({
    elasticity: 0.35,
    damping: 0.85,
    maxPushDistance: 60,
    influenceRadius: 180,
    animationSpeed: 0.25
  })

  // State for drag tracking
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [lastCleanupPositions, setLastCleanupPositions] = useState<string>('')

  // Convert stage definitions to React Flow nodes with local state management
  const [nodes, setNodes] = useState<Node[]>(() => {
    let savedPositions = {}
    if (typeof window !== 'undefined') {
      savedPositions = JSON.parse(localStorage.getItem('custom-stage-positions') || '{}')
    }
    const initialNodes = stageDefinitions.map(stage => {
      const position = savedPositions[stage.id] || stage.position
      const techCount = currentStack.technologies[stage.id]?.length || 0
      const height = Math.max(120, 120 + techCount * 32)

      // Initialize collision detection nodes
      updateNode({
        id: stage.id,
        x: position.x,
        y: position.y,
        width: 200,
        height: height
      })

      return {
        id: stage.id,
        type: 'mlopsStage',
        position,
        data: {
          stage,
          technologies: currentStack.technologies[stage.id] || [],
          isSelected: selectedStage === stage.id,
          onSelect: () => onStageSelect(stage.id),
          onRemoveTechnology: (techId: string) => onRemoveTechnology(stage.id, techId),
          onTechnologyClick: onTechnologyClick
        },
        draggable: true
      }
    })
    return initialNodes
  })

  // Handle position updates from smooth collision system
  const handlePositionUpdates = useCallback((updates: Map<string, { x: number; y: number }>) => {
    setNodes(currentNodes => {
      return currentNodes.map(node => {
        const update = updates.get(node.id)
        if (update) {
          return {
            ...node,
            position: update
          }
        }
        return node
      })
    })
  }, [])

  // Cleanup function to align nearby boxes without causing overlaps
  const handleCleanup = useCallback(() => {
    const SNAP_THRESHOLD = 12 // Pixels within which nodes should snap to each other

    setNodes(currentNodes => {
      // Check if positions are the same as last cleanup to avoid duplicates
      const currentPositionsString = JSON.stringify(
        currentNodes.map(n => ({ id: n.id, position: n.position }))
      )
      if (currentPositionsString === lastCleanupPositions) {
        return currentNodes // No changes, don't save duplicate history
      }
      setLastCleanupPositions(currentPositionsString)

      const updatedNodes = [...currentNodes]

      // Check if two nodes would overlap after alignment
      const wouldOverlap = (
        nodeA: any,
        nodeB: any,
        newPosA: { x: number; y: number },
        newPosB: { x: number; y: number }
      ) => {
        const techCountA = nodeA.data.technologies?.length || 0
        const techCountB = nodeB.data.technologies?.length || 0
        const heightA = Math.max(120, 120 + techCountA * 32)
        const heightB = Math.max(120, 120 + techCountB * 32)
        const width = 200
        const padding = 30

        return (
          newPosA.x < newPosB.x + width + padding &&
          newPosA.x + width + padding > newPosB.x &&
          newPosA.y < newPosB.y + heightB + padding &&
          newPosA.y + heightA + padding > newPosB.y
        )
      }

      // Process nodes multiple times to handle complex alignments in one go
      let hasChanges = true
      let iterations = 0
      const maxIterations = 3 // Prevent infinite loops

      while (hasChanges && iterations < maxIterations) {
        hasChanges = false
        iterations++

        // Process nodes pair by pair for careful alignment
        for (let i = 0; i < updatedNodes.length; i++) {
          const currentNode = updatedNodes[i]

          for (let j = i + 1; j < updatedNodes.length; j++) {
            const otherNode = updatedNodes[j]

            const xDiff = Math.abs(currentNode.position.x - otherNode.position.x)
            const yDiff = Math.abs(currentNode.position.y - otherNode.position.y)

            // Only align if they're close but not overlapping
            if (xDiff <= SNAP_THRESHOLD && xDiff > 0) {
              // Align vertically (same X position) - use the average
              const alignX =
                Math.round((currentNode.position.x + otherNode.position.x) / 2 / 20) * 20
              const newPosA = { ...currentNode.position, x: alignX }
              const newPosB = { ...otherNode.position, x: alignX }

              // Only apply if no overlap would occur
              if (!wouldOverlap(currentNode, otherNode, newPosA, newPosB)) {
                updatedNodes[i] = { ...currentNode, position: newPosA }
                updatedNodes[j] = { ...otherNode, position: newPosB }
                hasChanges = true
              }
            } else if (yDiff <= SNAP_THRESHOLD && yDiff > 0) {
              // Align horizontally (same Y position) - use the average
              const alignY =
                Math.round((currentNode.position.y + otherNode.position.y) / 2 / 20) * 20
              const newPosA = { ...currentNode.position, y: alignY }
              const newPosB = { ...otherNode.position, y: alignY }

              // Only apply if no overlap would occur
              if (!wouldOverlap(currentNode, otherNode, newPosA, newPosB)) {
                updatedNodes[i] = { ...currentNode, position: newPosA }
                updatedNodes[j] = { ...otherNode, position: newPosB }
                hasChanges = true
              }
            }
          }
        }
      }

      // Update collision system with new positions
      updatedNodes.forEach(node => {
        const techCount = node.data.technologies?.length || 0
        const height = Math.max(120, 120 + techCount * 32)
        updateNode({
          id: node.id,
          x: node.position.x,
          y: node.position.y,
          width: 200,
          height: height
        })
      })

      // Save updated positions to localStorage and save to history
      if (typeof window !== 'undefined') {
        const customPositions = JSON.parse(localStorage.getItem('custom-stage-positions') || '{}')
        updatedNodes.forEach(node => {
          customPositions[node.id] = node.position
        })
        localStorage.setItem('custom-stage-positions', JSON.stringify(customPositions))
      }

      // Save this as a history state
      setTimeout(() => savePositionHistory(), 100)

      return updatedNodes
    })
  }, [updateNode, savePositionHistory, lastCleanupPositions])

  // Update nodes when stage definitions or stack changes (position-affecting changes)
  useEffect(() => {
    // Debug: stack change tracking
    // Object.entries(currentStack.technologies).map(([stageId, techs]) => ({
    //   stageId,
    //   count: techs.length
    // }))
    let savedPositions = {}
    if (typeof window !== 'undefined') {
      savedPositions = JSON.parse(localStorage.getItem('custom-stage-positions') || '{}')
    }

    const updatedNodes = stageDefinitions.map(stage => {
      const position = savedPositions[stage.id] || stage.position
      const techCount = currentStack.technologies[stage.id]?.length || 0
      const height = Math.max(120, 120 + techCount * 32)

      // Update collision detection nodes
      updateNode({
        id: stage.id,
        x: position.x,
        y: position.y,
        width: 200,
        height: height
      })

      return {
        id: stage.id,
        type: 'mlopsStage',
        position,
        data: {
          stage,
          technologies: currentStack.technologies[stage.id] || [],
          isSelected: selectedStage === stage.id,
          onSelect: () => onStageSelect(stage.id),
          onRemoveTechnology: (techId: string) => onRemoveTechnology(stage.id, techId),
          onTechnologyClick: onTechnologyClick
        },
        draggable: true
      }
    })

    setNodes(updatedNodes)

    // Save position history on initial load if positions differ from defaults
    const isInitialLoad = !nodes.length
    if (isInitialLoad) {
      setTimeout(() => {
        const hasNonDefaultPositions = updatedNodes.some(node => {
          const stageDefault = stageDefinitions.find(s => s.id === node.id)
          return (
            !stageDefault ||
            node.position.x !== stageDefault.position.x ||
            node.position.y !== stageDefault.position.y
          )
        })
        if (hasNonDefaultPositions) {
          savePositionHistory()
        }
      }, 100)
    }

    // Trigger collision detection for initial positioning and after technology changes
    // Ensure all node updates are processed before checking collisions
    setTimeout(() => {
      // Re-update collision system with final dimensions just before collision check
      updatedNodes.forEach(node => {
        const techCount = node.data.technologies?.length || 0
        const height = Math.max(120, 120 + techCount * 32)
        updateNode({
          id: node.id,
          x: node.position.x,
          y: node.position.y,
          width: 200,
          height: height
        })
      })

      const collisionUpdates = checkCollisions()
      if (collisionUpdates.size > 0) {
        // Apply the collision updates to reposition overlapping nodes
        setNodes(currentNodes => {
          return currentNodes.map(node => {
            const update = collisionUpdates.get(node.id)
            if (update) {
              // Update collision system with new position immediately
              updateNode({
                id: node.id,
                x: update.x,
                y: update.y,
                width: 200,
                height: node.data.technologies ? 120 + node.data.technologies.length * 32 : 120
              })

              return {
                ...node,
                position: update
              }
            }
            return node
          })
        })

        // Save updated positions to localStorage
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            const customPositions = JSON.parse(
              localStorage.getItem('custom-stage-positions') || '{}'
            )
            updatedNodes.forEach(node => {
              const finalUpdate = collisionUpdates.get(node.id)
              if (finalUpdate) {
                customPositions[node.id] = finalUpdate
              }
            })
            localStorage.setItem('custom-stage-positions', JSON.stringify(customPositions))
          }
        }, 100)

        // Also start return animation to allow pushed boxes to return to original positions
        setTimeout(() => {
          startReturnAnimation(handlePositionUpdates)
        }, 200)
      }
    }, 50)
  }, [
    stageDefinitions,
    currentStack, // Only these two should trigger position changes
    updateNode,
    checkCollisions,
    startReturnAnimation,
    handlePositionUpdates
  ])

  // Update node selection state only (no position changes)
  useEffect(() => {
    setNodes(currentNodes =>
      currentNodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          isSelected: selectedStage === node.id
        }
      }))
    )
  }, [selectedStage])

  // Calculate optimal handle positions for edges
  const getOptimalHandles = (
    sourceId: string,
    sourcePos: { x: number; y: number },
    targetPos: { x: number; y: number }
  ) => {
    const dx = targetPos.x - sourcePos.x
    const dy = targetPos.y - sourcePos.y

    // Special case: experimentation should use bottom handle for both connections
    if (sourceId === 'experimentation') {
      return {
        sourceHandle: 'bottom',
        targetHandle: dy > 0 ? 'top' : 'bottom'
      }
    }

    // Determine best source handle
    let sourceHandle = 'right'
    if (Math.abs(dy) > Math.abs(dx)) {
      sourceHandle = dy > 0 ? 'bottom' : 'top'
    } else {
      sourceHandle = dx > 0 ? 'right' : 'left'
    }

    // Determine best target handle (opposite direction)
    let targetHandle = 'left'
    if (Math.abs(dy) > Math.abs(dx)) {
      targetHandle = dy > 0 ? 'top' : 'bottom'
    } else {
      targetHandle = dx > 0 ? 'left' : 'right'
    }

    return { sourceHandle, targetHandle }
  }

  // Convert stage connections to React Flow edges - updates when nodes change
  const edges: Edge[] = useMemo(() => {
    return stageConnections.map((connection, index) => {
      // Find current positions from the nodes state instead of static stageDefinitions
      const sourceNode = nodes.find(n => n.id === connection.from)
      const targetNode = nodes.find(n => n.id === connection.to)

      if (!sourceNode || !targetNode) {
        return {
          id: `${connection.from}-${connection.to}-${index}`,
          source: connection.from,
          target: connection.to,
          type: 'default',
          animated: connection.animated
        }
      }

      const { sourceHandle, targetHandle } = getOptimalHandles(
        connection.from,
        sourceNode.position,
        targetNode.position
      )

      return {
        id: `${connection.from}-${connection.to}-${index}`,
        source: connection.from,
        target: connection.to,
        sourceHandle,
        targetHandle,
        type: 'default',
        animated: connection.animated,
        style: {
          stroke: '#94a3b8',
          strokeWidth: 2,
          strokeDasharray: '5'
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#94a3b8'
        },
        markerStart:
          connection.type === 'bi-directional'
            ? {
                type: MarkerType.ArrowClosed,
                color: '#94a3b8'
              }
            : undefined
      }
    })
  }, [nodes]) // Recalculate edges when nodes change

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Call the stage select handler without saving to history
      // This prevents position jumps when clicking after undo
      onStageSelect(node.id as MLOpsStage)
    },
    [onStageSelect]
  )

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes)

      // Handle drag start - track which node is being dragged
      const dragStart = changes.find(
        change =>
          change.type === 'position' &&
          'dragging' in change &&
          change.dragging === true &&
          !draggedNode
      )
      if (dragStart) {
        setDraggedNode(dragStart.id)
      }

      // Handle drag end - save positions and clear drag state
      const dragEnd = changes.find(
        change =>
          change.type === 'position' &&
          'dragging' in change &&
          change.dragging === false &&
          draggedNode
      )
      if (dragEnd) {
        setDraggedNode(null)
        endDrag(dragEnd.id)

        // Start return animation to check for boxes that can return to original positions
        setTimeout(() => {
          triggerReturn(handlePositionUpdates)
        }, 300)

        // Save final positions to localStorage
        if (typeof window !== 'undefined') {
          const customPositions = JSON.parse(localStorage.getItem('custom-stage-positions') || '{}')
          updatedNodes.forEach(node => {
            customPositions[node.id] = node.position
          })
          localStorage.setItem('custom-stage-positions', JSON.stringify(customPositions))
        }
      }

      // Handle active drag - use smooth collision system
      const activeDragChange = changes.find(
        change =>
          change.type === 'position' &&
          change.id === draggedNode &&
          'dragging' in change &&
          change.dragging === true &&
          'position' in change &&
          change.position
      )

      if (activeDragChange && 'position' in activeDragChange && activeDragChange.position) {
        // Update the collision system with new position and trigger smooth repulsion
        handleDrag(activeDragChange.id, activeDragChange.position, handlePositionUpdates)
      }

      setNodes(updatedNodes)
    },
    [nodes, draggedNode, handleDrag, endDrag, handlePositionUpdates, triggerReturn]
  )

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        onNodesChange={handleNodesChange}
        connectionMode={ConnectionMode.Loose}
        fitView={false}
        defaultViewport={initialViewport}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
        panOnDrag={[1, 2]} // Only pan with middle mouse button or right mouse button
        selectionOnDrag={false}
        selectNodesOnDrag={false}
        multiSelectionKeyCode={null}
      >
        <Background gap={20} size={1} color="#e2e8f0" />
        <Controls />
        <MiniMap
          nodeStrokeColor="#374151"
          nodeColor="#f3f4f6"
          nodeBorderRadius={8}
          maskColor="rgba(0, 0, 0, 0.2)"
        />
        <Panel position="top-right" className="react-flow__panel">
          <div className="flex gap-2">
            <button
              onClick={handleCleanup}
              className="bg-white border border-gray-300 rounded-md p-2 hover:bg-gray-50 shadow-sm"
              title="Clean up and align nearby boxes"
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
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => undo(handlePositionUpdates)}
              disabled={!canUndo()}
              className={`border border-gray-300 rounded-md p-2 shadow-sm ${
                canUndo()
                  ? 'bg-white hover:bg-gray-50 cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              title="Undo last position change"
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
                <path d="M3 7v6h6" />
                <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
              </svg>
            </button>
            <button
              onClick={() => redo(handlePositionUpdates)}
              disabled={!canRedo()}
              className={`border border-gray-300 rounded-md p-2 shadow-sm ${
                canRedo()
                  ? 'bg-white hover:bg-gray-50 cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              title="Redo last undone change"
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
                <path d="M21 7v6h-6" />
                <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
              </svg>
            </button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  )
}

export default function ReactFlowCanvasWrapper(props: ReactFlowCanvasProps) {
  return (
    <ReactFlowProvider>
      <ReactFlowCanvas {...props} />
    </ReactFlowProvider>
  )
}
