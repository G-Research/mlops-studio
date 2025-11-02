'use client'

import { stageDefinitions, stageConnections } from '@/lib/data'

export default function ConnectionLines() {
  const STAGE_WIDTH = 200
  const STAGE_HEIGHT = 140

  const getConnectionPoints = (fromStageId: string, toStageId: string) => {
    const fromStage = stageDefinitions.find(s => s.id === fromStageId)
    const toStage = stageDefinitions.find(s => s.id === toStageId)

    if (!fromStage || !toStage) {
      return { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } }
    }

    // Calculate stage bounds
    const fromBounds = {
      left: fromStage.position.x,
      right: fromStage.position.x + STAGE_WIDTH,
      top: fromStage.position.y,
      bottom: fromStage.position.y + STAGE_HEIGHT,
      centerX: fromStage.position.x + STAGE_WIDTH / 2,
      centerY: fromStage.position.y + STAGE_HEIGHT / 2
    }

    const toBounds = {
      left: toStage.position.x,
      right: toStage.position.x + STAGE_WIDTH,
      top: toStage.position.y,
      bottom: toStage.position.y + STAGE_HEIGHT,
      centerX: toStage.position.x + STAGE_WIDTH / 2,
      centerY: toStage.position.y + STAGE_HEIGHT / 2
    }

    // Determine connection points based on relative positions
    let fromX, fromY, toX, toY

    // Horizontal positioning
    if (fromBounds.right < toBounds.left) {
      // From is to the left of to
      fromX = fromBounds.right
      toX = toBounds.left
    } else if (toBounds.right < fromBounds.left) {
      // From is to the right of to
      fromX = fromBounds.left
      toX = toBounds.right
    } else {
      // Overlapping horizontally, use centers
      fromX = fromBounds.centerX
      toX = toBounds.centerX
    }

    // Vertical positioning
    if (fromBounds.bottom < toBounds.top) {
      // From is above to
      fromY = fromBounds.bottom
      toY = toBounds.top
    } else if (toBounds.bottom < fromBounds.top) {
      // From is below to
      fromY = fromBounds.top
      toY = toBounds.bottom
    } else {
      // Overlapping vertically, use centers
      fromY = fromBounds.centerY
      toY = toBounds.centerY
    }

    // If using centers due to overlap, connect from edges instead
    if (fromX === fromBounds.centerX && fromY === fromBounds.centerY) {
      // Determine which edge to use based on direction
      const deltaX = toBounds.centerX - fromBounds.centerX
      const deltaY = toBounds.centerY - fromBounds.centerY

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal connection
        if (deltaX > 0) {
          fromX = fromBounds.right
          toX = toBounds.left
        } else {
          fromX = fromBounds.left
          toX = toBounds.right
        }
        fromY = fromBounds.centerY
        toY = toBounds.centerY
      } else {
        // Vertical connection
        if (deltaY > 0) {
          fromY = fromBounds.bottom
          toY = toBounds.top
        } else {
          fromY = fromBounds.top
          toY = toBounds.bottom
        }
        fromX = fromBounds.centerX
        toX = toBounds.centerX
      }
    }

    return {
      from: { x: fromX, y: fromY },
      to: { x: toX, y: toY }
    }
  }

  // Debug
  console.log(
    'Available stages:',
    stageDefinitions.map(s => s.id)
  )
  console.log('Rendering', stageConnections.length, 'connections')
  stageConnections.forEach((conn, i) => {
    const fromExists = stageDefinitions.find(s => s.id === conn.from)
    const toExists = stageDefinitions.find(s => s.id === conn.to)
    console.log(
      `${i}: ${conn.from} -> ${conn.to} (${conn.type}) - From: ${!!fromExists}, To: ${!!toExists}`
    )
  })

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {/* Test line */}
      <line x1="100" y1="100" x2="300" y2="200" stroke="red" strokeWidth="3" />

      {stageConnections.map((connection, index) => {
        const points = getConnectionPoints(connection.from, connection.to)

        if (connection.type === 'bi-directional') {
          return (
            <g key={`${connection.from}-${connection.to}-${index}`}>
              <line
                x1={points.from.x}
                y1={points.from.y}
                x2={points.to.x}
                y2={points.to.y}
                className={`connection-line bi-directional ${connection.animated ? 'animated' : ''}`}
                markerEnd="url(#arrowhead-bi)"
                markerStart="url(#arrowhead-reverse-bi)"
              />
              {/* Debug dots */}
              <circle cx={points.from.x} cy={points.from.y} r="4" fill="orange" />
              <circle cx={points.to.x} cy={points.to.y} r="4" fill="purple" />
            </g>
          )
        }

        return (
          <g key={`${connection.from}-${connection.to}-${index}`}>
            <line
              x1={points.from.x}
              y1={points.from.y}
              x2={points.to.x}
              y2={points.to.y}
              className={`connection-line ${connection.animated ? 'animated' : ''}`}
              markerEnd="url(#arrowhead)"
            />
            {/* Debug dots */}
            <circle cx={points.from.x} cy={points.from.y} r="3" fill="green" />
            <circle cx={points.to.x} cy={points.to.y} r="3" fill="blue" />
          </g>
        )
      })}

      <defs>
        <marker
          id="arrowhead"
          markerWidth="12"
          markerHeight="8"
          refX="10"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 12 4, 0 8" fill="#94a3b8" stroke="#94a3b8" strokeWidth="0.5" />
        </marker>
        <marker
          id="arrowhead-reverse"
          markerWidth="12"
          markerHeight="8"
          refX="2"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="12 0, 0 4, 12 8" fill="#94a3b8" stroke="#94a3b8" strokeWidth="0.5" />
        </marker>

        {/* Bi-directional arrows (purple) */}
        <marker
          id="arrowhead-bi"
          markerWidth="12"
          markerHeight="8"
          refX="10"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 12 4, 0 8" fill="#6366f1" stroke="#6366f1" strokeWidth="0.5" />
        </marker>
        <marker
          id="arrowhead-reverse-bi"
          markerWidth="12"
          markerHeight="8"
          refX="2"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="12 0, 0 4, 12 8" fill="#6366f1" stroke="#6366f1" strokeWidth="0.5" />
        </marker>
      </defs>
    </svg>
  )
}
