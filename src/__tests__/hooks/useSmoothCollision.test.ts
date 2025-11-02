import { renderHook, act } from '@testing-library/react'
import { useSmoothCollision } from '@/hooks/useSmoothCollision'

describe('useSmoothCollision', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('collision detection with growing boxes', () => {
    it('should reposition overlapping boxes when one grows taller', () => {
      const { result } = renderHook(() =>
        useSmoothCollision({
          elasticity: 0.35,
          damping: 0.85,
          maxPushDistance: 60,
          influenceRadius: 180,
          animationSpeed: 0.25
        })
      )

      // Add two boxes, one above the other
      act(() => {
        result.current.updateNode({
          id: 'box-a',
          x: 200,
          y: 100,
          width: 200,
          height: 120
        })
        result.current.updateNode({
          id: 'box-b',
          x: 200,
          y: 300, // Further apart to avoid initial collision
          width: 200,
          height: 120
        })
      })

      // Initial collision check - should be no updates needed
      let updates = result.current.checkCollisions()
      console.log('Initial collision check:', updates.size, 'updates')
      if (updates.size > 0) {
        console.log('Unexpected collisions:', Array.from(updates.entries()))
      }
      expect(updates.size).toBe(0)

      // Make box-a taller (simulating adding technologies)
      act(() => {
        result.current.updateNode({
          id: 'box-a',
          x: 200,
          y: 100,
          width: 200,
          height: 152 // Added 1 technology (32px)
        })
      })

      // Should still be no collision
      updates = result.current.checkCollisions()
      expect(updates.size).toBe(0)

      // Make box-a even taller
      act(() => {
        result.current.updateNode({
          id: 'box-a',
          x: 200,
          y: 100,
          width: 200,
          height: 184 // Added 2 technologies (64px)
        })
      })

      // Should still be no collision
      updates = result.current.checkCollisions()
      expect(updates.size).toBe(0)

      // Make box-a much taller - should cause collision
      act(() => {
        result.current.updateNode({
          id: 'box-a',
          x: 200,
          y: 100,
          width: 200,
          height: 248 // Added 4 technologies (128px) - should now overlap with box-b
        })
      })

      // Now there should be a collision requiring both boxes to move apart
      updates = result.current.checkCollisions()
      expect(updates.size).toBe(2) // Both boxes should move to resolve collision
      expect(updates.has('box-a')).toBe(true)
      expect(updates.has('box-b')).toBe(true)

      const boxAUpdate = updates.get('box-a')
      const boxBUpdate = updates.get('box-b')
      expect(boxAUpdate).toBeDefined()
      expect(boxBUpdate).toBeDefined()

      // Box-a should be pushed up, box-b should be pushed down
      expect(boxAUpdate!.y).toBeLessThan(100)
      expect(boxBUpdate!.y).toBeGreaterThan(300)
    })

    it('should continue repositioning through multiple technology additions', () => {
      const { result } = renderHook(() =>
        useSmoothCollision({
          elasticity: 0.35,
          damping: 0.85,
          maxPushDistance: 60,
          influenceRadius: 180,
          animationSpeed: 0.25
        })
      )

      // Set up two boxes in vertical stack
      act(() => {
        result.current.updateNode({
          id: 'top-box',
          x: 200,
          y: 100,
          width: 200,
          height: 120
        })
        result.current.updateNode({
          id: 'bottom-box',
          x: 200,
          y: 240, // Just touching the bottom of top-box
          width: 200,
          height: 120
        })
      })

      const techHeights = [152, 184, 216, 248, 280, 312, 344, 376] // Heights for 1-8 technologies
      const bottomBoxPositions: number[] = []

      // Simulate adding technologies 1-8
      for (let i = 0; i < techHeights.length; i++) {
        act(() => {
          result.current.updateNode({
            id: 'top-box',
            x: 200,
            y: 100,
            width: 200,
            height: techHeights[i]
          })
        })

        const updates = result.current.checkCollisions()

        // After technology 1, there should be collisions requiring bottom-box to move
        if (i > 0) {
          expect(updates.size).toBeGreaterThan(0)
          expect(updates.has('bottom-box')).toBe(true)

          const bottomUpdate = updates.get('bottom-box')
          expect(bottomUpdate).toBeDefined()
          bottomBoxPositions.push(bottomUpdate!.y)

          // Update the bottom box position for next iteration
          act(() => {
            result.current.updateNode({
              id: 'bottom-box',
              x: 200,
              y: bottomUpdate!.y,
              width: 200,
              height: 120
            })
          })
        } else {
          bottomBoxPositions.push(240) // Original position
        }
      }

      // Verify that bottom-box keeps moving down with each technology addition
      for (let i = 1; i < bottomBoxPositions.length; i++) {
        expect(bottomBoxPositions[i]).toBeGreaterThan(bottomBoxPositions[i - 1])
      }

      // The final position should be significantly lower than the start
      expect(bottomBoxPositions[bottomBoxPositions.length - 1]).toBeGreaterThan(300)
    })

    it('should handle repulsion strength calculation correctly', () => {
      const { result } = renderHook(() =>
        useSmoothCollision({
          elasticity: 0.35,
          damping: 0.85,
          maxPushDistance: 60,
          influenceRadius: 180,
          animationSpeed: 0.25
        })
      )

      // Create two overlapping boxes
      act(() => {
        result.current.updateNode({
          id: 'box-1',
          x: 200,
          y: 200,
          width: 200,
          height: 120
        })
        result.current.updateNode({
          id: 'box-2',
          x: 200,
          y: 250, // Overlapping by 70px
          width: 200,
          height: 120
        })
      })

      const updates1 = result.current.checkCollisions()
      expect(updates1.size).toBe(1)
      const firstPush = updates1.get('box-2')!.y

      // Make them overlap more
      act(() => {
        result.current.updateNode({
          id: 'box-2',
          x: 200,
          y: 230, // Overlapping by 90px
          width: 200,
          height: 120
        })
      })

      const updates2 = result.current.checkCollisions()
      expect(updates2.size).toBe(1)
      const secondPush = updates2.get('box-2')!.y

      // More overlap should result in stronger push (greater distance moved)
      expect(secondPush).toBeGreaterThan(firstPush)
    })
  })

  describe('intelligent return behavior', () => {
    it('should allow boxes to return to original positions when space is available', () => {
      const { result } = renderHook(() =>
        useSmoothCollision({
          elasticity: 0.35,
          damping: 0.85,
          maxPushDistance: 60,
          influenceRadius: 180,
          animationSpeed: 0.25
        })
      )

      // Set up initial positions
      act(() => {
        result.current.updateNode({
          id: 'pusher',
          x: 200,
          y: 100,
          width: 200,
          height: 120
        })
        result.current.updateNode({
          id: 'pushed',
          x: 200,
          y: 250,
          width: 200,
          height: 120
        })
      })

      // Make pusher taller to push the other box
      act(() => {
        result.current.updateNode({
          id: 'pusher',
          x: 200,
          y: 100,
          width: 200,
          height: 200 // Much taller, should push 'pushed' box
        })
      })

      let updates = result.current.checkCollisions()
      expect(updates.has('pushed')).toBe(true)
      const pushedNewY = updates.get('pushed')!.y

      // Update the pushed box position
      act(() => {
        result.current.updateNode({
          id: 'pushed',
          x: 200,
          y: pushedNewY,
          width: 200,
          height: 120
        })
      })

      // Now move the pusher away
      act(() => {
        result.current.updateNode({
          id: 'pusher',
          x: 500, // Move far away
          y: 100,
          width: 200,
          height: 200
        })
      })

      // Check if pushed box can return to original position
      updates = result.current.checkForReturns()
      expect(updates.has('pushed')).toBe(true)
      expect(updates.get('pushed')!.y).toBe(250) // Should snap back to original position
    })
  })

  describe('edge cases and error conditions', () => {
    it('should handle boxes with zero dimensions', () => {
      const { result } = renderHook(() => useSmoothCollision())

      act(() => {
        result.current.updateNode({
          id: 'zero-box',
          x: 200,
          y: 200,
          width: 0,
          height: 0
        })
        result.current.updateNode({
          id: 'normal-box',
          x: 200,
          y: 200,
          width: 200,
          height: 120
        })
      })

      // Should not crash
      expect(() => result.current.checkCollisions()).not.toThrow()
    })

    it('should handle identical positions', () => {
      const { result } = renderHook(() => useSmoothCollision())

      act(() => {
        result.current.updateNode({
          id: 'box-1',
          x: 200,
          y: 200,
          width: 200,
          height: 120
        })
        result.current.updateNode({
          id: 'box-2',
          x: 200,
          y: 200,
          width: 200,
          height: 120
        })
      })

      // Should handle identical positions without crashing
      const updates = result.current.checkCollisions()
      expect(updates.size).toBeGreaterThan(0) // Should detect collision and separate them
    })
  })
})
