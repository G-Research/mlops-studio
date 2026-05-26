import { useRef, useCallback, useEffect } from 'react'
import Matter from 'matter-js'

interface PhysicsBody {
  id: string
  x: number
  y: number
  width: number
  height: number
}

interface UsePhysicsOptions {
  gravity: number
  restitution: number
  frictionAir: number
  enableGravity?: boolean
}

interface UsePhysicsReturn {
  updateBodyPosition: (id: string, x: number, y: number) => void
  createBody: (body: PhysicsBody) => void
  removeBody: (id: string) => void
  getBodyPosition: (id: string) => { x: number; y: number } | null
  startDrag: (id: string) => void
  endDrag: (id: string) => void
  cleanup: () => void
}

export function usePhysics(
  options: UsePhysicsOptions = {
    gravity: 0,
    restitution: 0.8,
    frictionAir: 0.02,
    enableGravity: false
  }
): UsePhysicsReturn {
  const engineRef = useRef<Matter.Engine | null>(null)
  const worldRef = useRef<Matter.World | null>(null)
  const bodiesRef = useRef<Map<string, Matter.Body>>(new Map())
  const constraintsRef = useRef<Map<string, Matter.Constraint>>(new Map())
  const runnerRef = useRef<Matter.Runner | null>(null)

  // Initialize physics engine
  useEffect(() => {
    const engine = Matter.Engine.create()
    engine.world.gravity.y = options.enableGravity ? options.gravity : 0
    engine.world.gravity.x = 0

    const world = engine.world
    const runner = Matter.Runner.create()

    engineRef.current = engine
    worldRef.current = world
    runnerRef.current = runner

    Matter.Runner.run(runner, engine)

    return () => {
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current)
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current)
      }
      bodiesRef.current.clear()
      constraintsRef.current.clear()
    }
  }, [options.gravity, options.enableGravity])

  const createBody = useCallback(
    (bodyData: PhysicsBody) => {
      if (!worldRef.current || bodiesRef.current.has(bodyData.id)) {
        return
      }

      const body = Matter.Bodies.rectangle(
        bodyData.x + bodyData.width / 2,
        bodyData.y + bodyData.height / 2,
        bodyData.width,
        bodyData.height,
        {
          restitution: options.restitution,
          frictionAir: options.frictionAir,
          friction: 0.1,
          render: {
            fillStyle: 'transparent'
          },
          label: bodyData.id
        }
      )

      Matter.World.add(worldRef.current, body)
      bodiesRef.current.set(bodyData.id, body)
    },
    [options.restitution, options.frictionAir]
  )

  const removeBody = useCallback((id: string) => {
    const body = bodiesRef.current.get(id)
    if (body && worldRef.current) {
      Matter.World.remove(worldRef.current, body)
      bodiesRef.current.delete(id)
    }
  }, [])

  const updateBodyPosition = useCallback((id: string, x: number, y: number) => {
    const body = bodiesRef.current.get(id)
    if (body) {
      // Get body dimensions to calculate center position
      const bounds = body.bounds
      const width = bounds.max.x - bounds.min.x
      const height = bounds.max.y - bounds.min.y

      Matter.Body.setPosition(body, {
        x: x + width / 2,
        y: y + height / 2
      })
    }
  }, [])

  const getBodyPosition = useCallback((id: string): { x: number; y: number } | null => {
    const body = bodiesRef.current.get(id)
    if (!body) {
      return null
    }

    // Convert center position back to top-left corner
    const bounds = body.bounds
    const width = bounds.max.x - bounds.min.x
    const height = bounds.max.y - bounds.min.y

    return {
      x: body.position.x - width / 2,
      y: body.position.y - height / 2
    }
  }, [])

  const startDrag = useCallback((id: string) => {
    const body = bodiesRef.current.get(id)
    if (body) {
      // Make body static during drag to prevent physics interference
      Matter.Body.setStatic(body, true)
    }
  }, [])

  const endDrag = useCallback((id: string) => {
    const body = bodiesRef.current.get(id)
    if (body) {
      // Re-enable physics after drag
      Matter.Body.setStatic(body, false)

      // Apply a small impulse to trigger collision detection
      Matter.Body.applyForce(body, body.position, { x: 0.001, y: 0.001 })
    }
  }, [])

  const cleanup = useCallback(() => {
    if (runnerRef.current && engineRef.current) {
      Matter.Runner.stop(runnerRef.current)
      Matter.Engine.clear(engineRef.current)
      bodiesRef.current.clear()
      constraintsRef.current.clear()
    }
  }, [])

  return {
    updateBodyPosition,
    createBody,
    removeBody,
    getBodyPosition,
    startDrag,
    endDrag,
    cleanup
  }
}
