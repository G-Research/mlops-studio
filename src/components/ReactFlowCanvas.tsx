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
  const { setViewport } = useReactFlow()
  const [hasRestoredViewport, setHasRestoredViewport] = useState(false)

  // Load viewport from localStorage
  const loadViewport = (): Viewport => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mlops-studio-viewport')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.warn('Failed to parse saved viewport:', e)
        }
      }
    }
    // Default viewport
    return { x: 0, y: 0, zoom: 1 }
  }

  // Save viewport to localStorage
  const saveViewport = (viewport: Viewport) => {
    if (typeof window !== 'undefined') {
      console.log('Saving viewport:', viewport)
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

  // State for dynamic collision detection during drag
  const [originalPositions, setOriginalPositions] = useState<
    Record<string, { x: number; y: number }>
  >({})
  const [draggedNode, setDraggedNode] = useState<string | null>(null)

  // Convert stage definitions to React Flow nodes with local state management
  const [nodes, setNodes] = useState<Node[]>(() => {
    let savedPositions = {}
    if (typeof window !== 'undefined') {
      savedPositions = JSON.parse(localStorage.getItem('custom-stage-positions') || '{}')
    }
    return stageDefinitions.map(stage => ({
      id: stage.id,
      type: 'mlopsStage',
      position: savedPositions[stage.id] || stage.position,
      data: {
        stage,
        technologies: currentStack.technologies[stage.id] || [],
        isSelected: selectedStage === stage.id,
        onSelect: () => onStageSelect(stage.id),
        onRemoveTechnology: (techId: string) => onRemoveTechnology(stage.id, techId),
        onTechnologyClick: onTechnologyClick
      },
      draggable: true
    }))
  })

  // Collision detection and repositioning logic
  const detectCollisions = (nodes: any[]) => {
    const PADDING = 20 // Minimum distance between boxes
    const adjustedNodes = [...nodes]

    for (let i = 0; i < adjustedNodes.length; i++) {
      for (let j = i + 1; j < adjustedNodes.length; j++) {
        const nodeA = adjustedNodes[i]
        const nodeB = adjustedNodes[j]

        // Calculate node dimensions based on content
        const techCountA = nodeA.data.technologies?.length || 0
        const techCountB = nodeB.data.technologies?.length || 0

        // Dynamic height based on technology count (base 120px + 32px per tech)
        const heightA = Math.max(120, 120 + techCountA * 32)
        const heightB = Math.max(120, 120 + techCountB * 32)
        const width = 200 // Fixed width

        // Check for overlap with padding
        const overlapX =
          nodeA.position.x < nodeB.position.x + width + PADDING &&
          nodeA.position.x + width + PADDING > nodeB.position.x
        const overlapY =
          nodeA.position.y < nodeB.position.y + heightB + PADDING &&
          nodeA.position.y + heightA + PADDING > nodeB.position.y

        if (overlapX && overlapY) {
          // Calculate push direction (move the node with more technologies)
          const pushNode = techCountA >= techCountB ? nodeB : nodeA
          const staticNode = techCountA >= techCountB ? nodeA : nodeB

          // Calculate push distance and direction
          const centerAX = nodeA.position.x + width / 2
          const centerAY = nodeA.position.y + heightA / 2
          const centerBX = nodeB.position.x + width / 2
          const centerBY = nodeB.position.y + heightB / 2

          const distanceX = centerBX - centerAX
          const distanceY = centerBY - centerAY
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

          if (distance > 0) {
            // Normalize and apply minimum separation
            const minSeparation = Math.max(heightA, heightB) / 2 + width / 2 + PADDING
            const pushDistance = minSeparation - distance + 50 // Extra push

            const pushX = (distanceX / distance) * pushDistance
            const pushY = (distanceY / distance) * pushDistance

            // Apply the push
            pushNode.position = {
              x: Math.max(0, pushNode.position.x + pushX),
              y: Math.max(0, pushNode.position.y + pushY)
            }
          }
        }
      }
    }

    return adjustedNodes
  }

  // Update nodes when stage definitions, stack, or selection changes
  useEffect(() => {
    let savedPositions = {}
    if (typeof window !== 'undefined') {
      savedPositions = JSON.parse(localStorage.getItem('custom-stage-positions') || '{}')
    }

    let updatedNodes = stageDefinitions.map(stage => ({
      id: stage.id,
      type: 'mlopsStage',
      position: savedPositions[stage.id] || stage.position,
      data: {
        stage,
        technologies: currentStack.technologies[stage.id] || [],
        isSelected: selectedStage === stage.id,
        onSelect: () => onStageSelect(stage.id),
        onRemoveTechnology: (techId: string) => onRemoveTechnology(stage.id, techId),
        onTechnologyClick: onTechnologyClick
      },
      draggable: true
    }))

    // Apply collision detection and auto-repositioning
    updatedNodes = detectCollisions(updatedNodes)

    setNodes(updatedNodes)
  }, [
    stageDefinitions,
    currentStack,
    selectedStage,
    onStageSelect,
    onRemoveTechnology,
    onTechnologyClick
  ])

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
      // Call the stage select handler
      onStageSelect(node.id as MLOpsStage)
    },
    [onStageSelect]
  )

  // Real-time collision detection during drag with elastic behavior
  const handleDragCollisions = useCallback(
    (nodes: any[], draggedNodeId: string) => {
      const PADDING = 20
      const INFLUENCE_DISTANCE = 120 // Distance at which nodes start to repel
      const adjustedNodes = [...nodes]
      const draggedNodeIndex = adjustedNodes.findIndex(n => n.id === draggedNodeId)

      if (draggedNodeIndex === -1) {
        return adjustedNodes
      }

      const draggedNode = adjustedNodes[draggedNodeIndex]
      const draggedTechCount = draggedNode.data.technologies?.length || 0
      const draggedHeight = Math.max(120, 120 + draggedTechCount * 32)
      const width = 200

      // Check against all other nodes
      for (let i = 0; i < adjustedNodes.length; i++) {
        if (i === draggedNodeIndex) {
          continue
        }

        const otherNode = adjustedNodes[i]
        const otherTechCount = otherNode.data.technologies?.length || 0
        const otherHeight = Math.max(120, 120 + otherTechCount * 32)

        // Calculate distances between centers
        const centerDraggedX = draggedNode.position.x + width / 2
        const centerDraggedY = draggedNode.position.y + draggedHeight / 2
        const centerOtherX = otherNode.position.x + width / 2
        const centerOtherY = otherNode.position.y + otherHeight / 2

        const distanceX = centerOtherX - centerDraggedX
        const distanceY = centerOtherY - centerDraggedY
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

        // Calculate minimum safe distance
        const minSafeDistance = Math.max(draggedHeight, otherHeight) / 2 + width / 2 + PADDING

        if (distance < INFLUENCE_DISTANCE && distance > 0) {
          // Store original position if not already stored
          if (!originalPositions[otherNode.id]) {
            setOriginalPositions(prev => ({
              ...prev,
              [otherNode.id]: { ...otherNode.position }
            }))
          }

          if (distance < minSafeDistance) {
            // Push away from dragged node with smooth easing
            const pushStrength = Math.pow((minSafeDistance - distance) / minSafeDistance, 0.8)
            const pushDistance = pushStrength * 100 // Max push distance

            const pushX = (distanceX / distance) * pushDistance
            const pushY = (distanceY / distance) * pushDistance

            adjustedNodes[i] = {
              ...otherNode,
              position: {
                x: Math.max(0, Math.min(1500, otherNode.position.x + pushX)), // Keep within bounds
                y: Math.max(0, Math.min(1000, otherNode.position.y + pushY))
              }
            }
          } else if (originalPositions[otherNode.id] && distance > minSafeDistance + 20) {
            // Elastic return behavior - gradually move back to original position
            const returnStrength = Math.min(
              1,
              (distance - minSafeDistance) / (INFLUENCE_DISTANCE - minSafeDistance)
            )
            const originalPos = originalPositions[otherNode.id]

            const returnForce = returnStrength * 0.15 // Gentle return
            adjustedNodes[i] = {
              ...otherNode,
              position: {
                x: otherNode.position.x + (originalPos.x - otherNode.position.x) * returnForce,
                y: otherNode.position.y + (originalPos.y - otherNode.position.y) * returnForce
              }
            }
          }
        }
      }

      return adjustedNodes
    },
    [originalPositions]
  )

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      console.log('Node changes:', changes)
      let updatedNodes = applyNodeChanges(changes, nodes)

      // Handle drag start - track which node is being dragged
      const dragStart = changes.find(
        change =>
          change.type === 'position' &&
          'dragging' in change &&
          change.dragging === true &&
          !draggedNode
      )
      if (dragStart) {
        console.log('Drag started:', dragStart.id)
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
        console.log('Drag ended:', dragEnd.id)
        setDraggedNode(null)
        setOriginalPositions({}) // Clear stored positions for next drag

        // Save final positions to localStorage
        if (typeof window !== 'undefined') {
          const customPositions = JSON.parse(localStorage.getItem('custom-stage-positions') || '{}')
          updatedNodes.forEach(node => {
            customPositions[node.id] = node.position
          })
          localStorage.setItem('custom-stage-positions', JSON.stringify(customPositions))
        }
      }

      // Apply real-time collision detection during active drag
      if (draggedNode) {
        const activeDragChange = changes.find(
          change =>
            change.type === 'position' &&
            change.id === draggedNode &&
            'dragging' in change &&
            change.dragging === true
        )
        if (activeDragChange) {
          console.log('Active drag collision check for:', draggedNode)
          updatedNodes = handleDragCollisions(updatedNodes, draggedNode)
        }
      }

      setNodes(updatedNodes)
    },
    [nodes, draggedNode, handleDragCollisions]
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
