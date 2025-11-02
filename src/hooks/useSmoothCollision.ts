import { useCallback, useRef, useEffect } from 'react'

interface CollisionNode {
  id: string
  x: number
  y: number
  width: number
  height: number
  isDragging?: boolean
}

interface UseSmoothCollisionOptions {
  elasticity?: number // 0-1, how bouncy the collision response is
  damping?: number // 0-1, how much to dampen the movement
  maxPushDistance?: number // Maximum distance to push away
  influenceRadius?: number // Distance at which nodes start to repel
  animationSpeed?: number // How fast the smooth animation should be (0-1)
}

export function useSmoothCollision(options: UseSmoothCollisionOptions = {}) {
  const { elasticity = 0.3, damping = 0.85, maxPushDistance = 80, animationSpeed = 0.15 } = options

  const nodesRef = useRef<Map<string, CollisionNode>>(new Map())
  const animationRef = useRef<number | null>(null)
  const targetPositionsRef = useRef<Map<string, { x: number; y: number }>>(new Map())
  const velocitiesRef = useRef<Map<string, { x: number; y: number }>>(new Map())
  const originalPositionsRef = useRef<Map<string, { x: number; y: number }>>(new Map())
  const positionHistoryRef = useRef<Map<string, { x: number; y: number }>[]>([])
  const historyIndexRef = useRef(0)

  const updateNode = useCallback((node: CollisionNode) => {
    const isNewNode = !nodesRef.current.has(node.id)

    nodesRef.current.set(node.id, { ...node })

    if (!targetPositionsRef.current.has(node.id)) {
      targetPositionsRef.current.set(node.id, { x: node.x, y: node.y })
    }
    if (!velocitiesRef.current.has(node.id)) {
      velocitiesRef.current.set(node.id, { x: 0, y: 0 })
    }

    // Only store original position for new nodes - don't overwrite existing original positions
    if (isNewNode && !originalPositionsRef.current.has(node.id)) {
      originalPositionsRef.current.set(node.id, { x: node.x, y: node.y })
    }
  }, [])

  const removeNode = useCallback((id: string) => {
    nodesRef.current.delete(id)
    targetPositionsRef.current.delete(id)
    velocitiesRef.current.delete(id)
    originalPositionsRef.current.delete(id)
  }, [])

  const checkCollisions = useCallback(() => {
    const nodes = Array.from(nodesRef.current.values())
    const updates = new Map<string, { x: number; y: number }>()

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i]
        const nodeB = nodes[j]

        // Skip if both nodes are being dragged
        if (nodeA.isDragging && nodeB.isDragging) {
          continue
        }

        // Calculate centers
        const centerAX = nodeA.x + nodeA.width / 2
        const centerAY = nodeA.y + nodeA.height / 2
        const centerBX = nodeB.x + nodeB.width / 2
        const centerBY = nodeB.y + nodeB.height / 2

        const dx = centerBX - centerAX
        const dy = centerBY - centerAY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Calculate minimum safe distance - use proper bounding box collision
        // Distance between centers should be greater than sum of half-dimensions
        const halfWidthA = nodeA.width / 2
        const halfHeightA = nodeA.height / 2
        const halfWidthB = nodeB.width / 2
        const halfHeightB = nodeB.height / 2
        const padding = 5

        // Check if boxes overlap by comparing distance in each axis
        // For two rectangles to collide, they must overlap in BOTH X and Y axes
        const xOverlap = Math.abs(dx) < halfWidthA + halfWidthB + padding
        const yOverlap = Math.abs(dy) < halfHeightA + halfHeightB + padding
        const isColliding = xOverlap && yOverlap

        if (distance > 0 && isColliding) {
          // Simple consistent repulsion for all colliding boxes (ignore distance limit)
          const repulsionStrength = 0.8
          const pushDistance = repulsionStrength * maxPushDistance

          const pushX = (dx / distance) * pushDistance
          const pushY = (dy / distance) * pushDistance

          // Determine which node to move (prefer moving non-dragged nodes)
          if (nodeA.isDragging && !nodeB.isDragging) {
            // Move B away from A
            const currentTarget = targetPositionsRef.current.get(nodeB.id) || {
              x: nodeB.x,
              y: nodeB.y
            }
            updates.set(nodeB.id, {
              x: Math.max(0, Math.min(1400, currentTarget.x + pushX)),
              y: Math.max(0, Math.min(900, currentTarget.y + pushY))
            })
          } else if (nodeB.isDragging && !nodeA.isDragging) {
            // Move A away from B
            const currentTarget = targetPositionsRef.current.get(nodeA.id) || {
              x: nodeA.x,
              y: nodeA.y
            }
            updates.set(nodeA.id, {
              x: Math.max(0, Math.min(1400, currentTarget.x - pushX)),
              y: Math.max(0, Math.min(900, currentTarget.y - pushY))
            })
          } else if (!nodeA.isDragging && !nodeB.isDragging) {
            // Both can move - split the difference
            const currentTargetA = targetPositionsRef.current.get(nodeA.id) || {
              x: nodeA.x,
              y: nodeA.y
            }
            const currentTargetB = targetPositionsRef.current.get(nodeB.id) || {
              x: nodeB.x,
              y: nodeB.y
            }

            updates.set(nodeA.id, {
              x: Math.max(0, Math.min(1400, currentTargetA.x - pushX * 0.5)),
              y: Math.max(0, Math.min(900, currentTargetA.y - pushY * 0.5))
            })
            updates.set(nodeB.id, {
              x: Math.max(0, Math.min(1400, currentTargetB.x + pushX * 0.5)),
              y: Math.max(0, Math.min(900, currentTargetB.y + pushY * 0.5))
            })
          }
        }
      }
    }

    // Check for elastic return behavior - nodes not being pushed should try to return to original positions
    // Allow return behavior even during dragging for instant snap-back
    for (const node of nodes) {
      if (node.isDragging || updates.has(node.id)) {
        continue
      }

      const originalPos = originalPositionsRef.current.get(node.id)
      const currentTarget = targetPositionsRef.current.get(node.id)

      if (originalPos && currentTarget) {
        const distanceFromOriginal = Math.sqrt(
          Math.pow(currentTarget.x - originalPos.x, 2) +
            Math.pow(currentTarget.y - originalPos.y, 2)
        )

        // If node has been pushed away from its original position
        if (distanceFromOriginal > 15) {
          // Check if original position is now free of conflicts
          let canReturn = true

          for (const otherNode of nodes) {
            if (otherNode.id === node.id) {
              continue
            }

            // Use current position for dragged nodes, target position for others
            const otherPos = otherNode.isDragging
              ? { x: otherNode.x, y: otherNode.y }
              : targetPositionsRef.current.get(otherNode.id) || { x: otherNode.x, y: otherNode.y }

            const distance = Math.sqrt(
              Math.pow(originalPos.x - otherPos.x, 2) + Math.pow(originalPos.y - otherPos.y, 2)
            )

            const minDistance =
              (node.width + otherNode.width) / 2 + (node.height + otherNode.height) / 2 + 50

            if (distance < minDistance) {
              canReturn = false
              break
            }
          }

          if (canReturn) {
            // Snap back to original position instantly
            updates.set(node.id, {
              x: Math.max(0, Math.min(1400, originalPos.x)),
              y: Math.max(0, Math.min(900, originalPos.y))
            })
          }
        }
      }
    }

    // Update target positions
    updates.forEach((pos, id) => {
      targetPositionsRef.current.set(id, pos)
    })

    return updates
  }, [maxPushDistance])

  const animate = useCallback(() => {
    const nodes = Array.from(nodesRef.current.entries())
    const positionUpdates = new Map<string, { x: number; y: number }>()
    let hasMovement = false

    for (const [id, node] of nodes) {
      if (node.isDragging) {
        continue
      }

      const target = targetPositionsRef.current.get(id)
      const velocity = velocitiesRef.current.get(id)

      if (!target || !velocity) {
        continue
      }

      const dx = target.x - node.x
      const dy = target.y - node.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 0.5) {
        // Only animate if there's meaningful movement
        hasMovement = true

        // Apply spring physics
        const springForceX = dx * elasticity
        const springForceY = dy * elasticity

        // Update velocity with spring force and damping
        velocity.x = (velocity.x + springForceX) * damping
        velocity.y = (velocity.y + springForceY) * damping

        // Update position
        const newX = node.x + velocity.x * animationSpeed
        const newY = node.y + velocity.y * animationSpeed

        positionUpdates.set(id, { x: newX, y: newY })

        // Update the node reference
        nodesRef.current.set(id, { ...node, x: newX, y: newY })
      } else {
        // Snap to target and stop velocity
        velocity.x = 0
        velocity.y = 0
        if (distance > 0.1) {
          positionUpdates.set(id, { x: target.x, y: target.y })
          nodesRef.current.set(id, { ...node, x: target.x, y: target.y })
        }
      }
    }

    return { positionUpdates, hasMovement }
  }, [elasticity, damping, animationSpeed])

  const startAnimation = useCallback(
    (onUpdate: (updates: Map<string, { x: number; y: number }>) => void) => {
      const animateFrame = () => {
        const { positionUpdates, hasMovement } = animate()

        if (positionUpdates.size > 0) {
          onUpdate(positionUpdates)
        }

        // Continue animation if there's still movement
        if (hasMovement) {
          animationRef.current = requestAnimationFrame(animateFrame)
        } else {
          animationRef.current = null
        }
      }

      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animateFrame)
      }
    },
    [animate]
  )

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  const handleDrag = useCallback(
    (
      draggedId: string,
      newPosition: { x: number; y: number },
      onUpdate: (updates: Map<string, { x: number; y: number }>) => void
    ) => {
      // Update dragged node position immediately
      const draggedNode = nodesRef.current.get(draggedId)
      if (draggedNode) {
        nodesRef.current.set(draggedId, {
          ...draggedNode,
          x: newPosition.x,
          y: newPosition.y,
          isDragging: true
        })

        // Update target position for dragged node
        targetPositionsRef.current.set(draggedId, newPosition)
      }

      // Check for collisions and start smooth animation for other nodes
      const collisionUpdates = checkCollisions()

      if (collisionUpdates.size > 0) {
        startAnimation(onUpdate)
      }
    },
    [checkCollisions, startAnimation]
  )

  // Save current positions to history
  const savePositionHistory = useCallback(() => {
    const currentPositions = new Map<string, { x: number; y: number }>()
    nodesRef.current.forEach((node, id) => {
      currentPositions.set(id, { x: node.x, y: node.y })
    })

    // Check if this state is the same as the current one to avoid duplicates
    if (positionHistoryRef.current.length > 0) {
      const currentState = positionHistoryRef.current[historyIndexRef.current]
      if (currentState) {
        let isDuplicate = currentState.size === currentPositions.size
        if (isDuplicate) {
          for (const [id, pos] of currentPositions) {
            const existingPos = currentState.get(id)
            if (!existingPos || existingPos.x !== pos.x || existingPos.y !== pos.y) {
              isDuplicate = false
              break
            }
          }
        }
        if (isDuplicate) {
          return // Don't save duplicate states
        }
      }
    }

    // Remove any future history if we're not at the end (this handles issue #4)
    positionHistoryRef.current = positionHistoryRef.current.slice(0, historyIndexRef.current + 1)

    // Add new position state
    positionHistoryRef.current.push(currentPositions)
    historyIndexRef.current = positionHistoryRef.current.length - 1

    // Keep only last 20 states to prevent memory issues
    if (positionHistoryRef.current.length > 20) {
      positionHistoryRef.current = positionHistoryRef.current.slice(-20)
      historyIndexRef.current = positionHistoryRef.current.length - 1
    }
  }, [])

  const endDrag = useCallback(
    (draggedId: string) => {
      const draggedNode = nodesRef.current.get(draggedId)
      if (draggedNode) {
        nodesRef.current.set(draggedId, {
          ...draggedNode,
          isDragging: false
        })

        // Update original position to the new dragged position
        // This makes the new position the "home" position to return to
        originalPositionsRef.current.set(draggedId, { x: draggedNode.x, y: draggedNode.y })

        // Save position history after drag ends (only if not restoring)
        if (!isRestoringRef.current) {
          savePositionHistory()
        }
      }
    },
    [savePositionHistory]
  )

  // Check specifically for return opportunities without collision detection
  const checkForReturns = useCallback(() => {
    const nodes = Array.from(nodesRef.current.values())
    const updates = new Map<string, { x: number; y: number }>()

    // Only check for return behavior - no collision detection
    for (const node of nodes) {
      if (node.isDragging) {
        continue
      }

      const originalPos = originalPositionsRef.current.get(node.id)
      const currentTarget = targetPositionsRef.current.get(node.id)

      if (originalPos && currentTarget) {
        const distanceFromOriginal = Math.sqrt(
          Math.pow(currentTarget.x - originalPos.x, 2) +
            Math.pow(currentTarget.y - originalPos.y, 2)
        )

        // If node has been pushed away from its original position
        if (distanceFromOriginal > 15) {
          // Check if original position is now free of conflicts
          let canReturn = true
          const blockingBoxes = []

          for (const otherNode of nodes) {
            if (otherNode.id === node.id) {
              continue
            }

            const otherTarget = targetPositionsRef.current.get(otherNode.id) || {
              x: otherNode.x,
              y: otherNode.y
            }
            const distance = Math.sqrt(
              Math.pow(originalPos.x - otherTarget.x, 2) +
                Math.pow(originalPos.y - otherTarget.y, 2)
            )

            // Smaller padding for intelligent return - allows easier return to original positions
            const minDistance =
              (node.width + otherNode.width) / 2 + (node.height + otherNode.height) / 2 + 10

            if (distance < minDistance) {
              canReturn = false
              blockingBoxes.push({
                id: otherNode.id,
                position: { x: Math.round(otherTarget.x), y: Math.round(otherTarget.y) },
                distance: Math.round(distance),
                minRequired: Math.round(minDistance),
                tooClose: Math.round(minDistance - distance) + 'px'
              })
            }
          }

          if (canReturn) {
            // Snap back to original position instantly
            updates.set(node.id, {
              x: Math.max(0, Math.min(1400, originalPos.x)),
              y: Math.max(0, Math.min(900, originalPos.y))
            })
          }
        }
      }
    }

    // Update target positions
    updates.forEach((pos, id) => {
      targetPositionsRef.current.set(id, pos)
    })

    return updates
  }, [])

  // Start return checks - since we snap instantly, we only need a few checks
  const startReturnAnimation = useCallback(
    (onUpdate: (updates: Map<string, { x: number; y: number }>) => void) => {
      let checksCount = 0
      const maxChecks = 5 // Just a few checks since we snap instantly

      const doReturnCheck = () => {
        checksCount++
        const returnUpdates = checkForReturns()

        if (returnUpdates.size > 0 && checksCount < maxChecks) {
          onUpdate(returnUpdates)
          // Check again after a short delay in case more boxes can now return
          setTimeout(doReturnCheck, 200)
        }
      }

      // Start checking after a brief delay
      setTimeout(doReturnCheck, 100)
    },
    [checkForReturns]
  )

  // Trigger return behavior immediately
  const triggerReturn = useCallback(
    (onUpdate: (updates: Map<string, { x: number; y: number }>) => void) => {
      const returnUpdates = checkForReturns()
      if (returnUpdates.size > 0) {
        onUpdate(returnUpdates)
        // Continue the return process
        startReturnAnimation(onUpdate)
      }
    },
    [checkForReturns, startReturnAnimation]
  )

  useEffect(() => {
    return () => {
      stopAnimation()
    }
  }, [stopAnimation])

  // Track if we're currently restoring from history to prevent saving intermediate states
  const isRestoringRef = useRef(false)

  // Undo to previous position state
  const undo = useCallback((onUpdate: (updates: Map<string, { x: number; y: number }>) => void) => {
    if (historyIndexRef.current > 0) {
      isRestoringRef.current = true
      historyIndexRef.current--
      const previousPositions = positionHistoryRef.current[historyIndexRef.current]

      if (previousPositions) {
        // Update node positions
        previousPositions.forEach((pos, id) => {
          const node = nodesRef.current.get(id)
          if (node) {
            nodesRef.current.set(id, { ...node, x: pos.x, y: pos.y })
            targetPositionsRef.current.set(id, pos)
            originalPositionsRef.current.set(id, pos) // Update original position too
          }
        })

        // Notify the UI to update
        onUpdate(previousPositions)
        isRestoringRef.current = false
        return true
      }
      isRestoringRef.current = false
    }
    return false
  }, [])

  // Redo to next position state
  const redo = useCallback((onUpdate: (updates: Map<string, { x: number; y: number }>) => void) => {
    if (historyIndexRef.current < positionHistoryRef.current.length - 1) {
      isRestoringRef.current = true
      historyIndexRef.current++
      const nextPositions = positionHistoryRef.current[historyIndexRef.current]

      if (nextPositions) {
        // Update node positions
        nextPositions.forEach((pos, id) => {
          const node = nodesRef.current.get(id)
          if (node) {
            nodesRef.current.set(id, { ...node, x: pos.x, y: pos.y })
            targetPositionsRef.current.set(id, pos)
            originalPositionsRef.current.set(id, pos) // Update original position too
          }
        })

        // Notify the UI to update
        onUpdate(nextPositions)
        isRestoringRef.current = false
        return true
      }
      isRestoringRef.current = false
    }
    return false
  }, [])

  // Check if undo/redo is available
  const canUndo = useCallback(() => historyIndexRef.current > 0, [])
  const canRedo = useCallback(
    () => historyIndexRef.current < positionHistoryRef.current.length - 1,
    []
  )

  return {
    updateNode,
    removeNode,
    handleDrag,
    endDrag,
    checkCollisions,
    checkForReturns,
    startAnimation,
    stopAnimation,
    startReturnAnimation,
    triggerReturn,
    undo,
    redo,
    canUndo,
    canRedo,
    savePositionHistory
  }
}
