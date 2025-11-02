import {
  getCustomStages,
  saveCustomStages,
  getCustomConnections,
  saveCustomConnections,
  getAllStages,
  getAllConnections
} from '@/lib/customStages'
import { MLOpsStageInfo, StageConnection } from '@/types/mlops'

describe('Custom Stages Utilities', () => {
  beforeEach(() => {
    // Clear localStorage mock implementation before each test
    jest.clearAllMocks()

    // Reset localStorage mock to default behavior
    const mockLocalStorage = {
      store: {} as Record<string, string>,
      getItem: jest.fn((key: string) => mockLocalStorage.store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        mockLocalStorage.store[key] = value
      }),
      removeItem: jest.fn((key: string) => {
        delete mockLocalStorage.store[key]
      }),
      clear: jest.fn(() => {
        mockLocalStorage.store = {}
      })
    }

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    })
  })

  describe('getCustomStages', () => {
    it('should return empty array when no custom stages exist', () => {
      const customStages = getCustomStages()
      expect(customStages).toEqual([])
    })

    it('should return stored custom stages', () => {
      const mockStages: MLOpsStageInfo[] = [
        {
          id: 'custom_stage_1',
          name: 'Custom Stage',
          description: 'A custom stage for testing',
          position: { x: 100, y: 200 }
        }
      ]

      localStorage.setItem('customMLOpsStages', JSON.stringify(mockStages))

      const customStages = getCustomStages()
      expect(customStages).toEqual(mockStages)
    })

    it('should handle invalid JSON gracefully', () => {
      // Temporarily suppress console.error for this test
      const originalConsoleError = console.error
      console.error = jest.fn()

      localStorage.setItem('customMLOpsStages', 'invalid-json')

      const customStages = getCustomStages()
      expect(customStages).toEqual([])

      // Restore console.error
      console.error = originalConsoleError
    })
  })

  describe('saveCustomStages', () => {
    it('should save custom stages to localStorage', () => {
      const mockStages: MLOpsStageInfo[] = [
        {
          id: 'test_stage',
          name: 'Test Stage',
          description: 'Test description',
          position: { x: 50, y: 100 }
        }
      ]

      saveCustomStages(mockStages)

      const stored = localStorage.getItem('customMLOpsStages')
      expect(stored).toBe(JSON.stringify(mockStages))
    })

    it('should overwrite existing custom stages', () => {
      const initialStages: MLOpsStageInfo[] = [
        {
          id: 'initial',
          name: 'Initial',
          description: 'Initial stage',
          position: { x: 0, y: 0 }
        }
      ]

      const newStages: MLOpsStageInfo[] = [
        {
          id: 'new',
          name: 'New',
          description: 'New stage',
          position: { x: 100, y: 100 }
        }
      ]

      saveCustomStages(initialStages)
      saveCustomStages(newStages)

      const stored = getCustomStages()
      expect(stored).toEqual(newStages)
    })
  })

  describe('getCustomConnections', () => {
    it('should return empty array when no custom connections exist', () => {
      const customConnections = getCustomConnections()
      expect(customConnections).toEqual([])
    })

    it('should return stored custom connections', () => {
      const mockConnections: StageConnection[] = [
        {
          from: 'stage1',
          to: 'stage2',
          type: 'default',
          animated: true
        }
      ]

      localStorage.setItem('customMLOpsConnections', JSON.stringify(mockConnections))

      const customConnections = getCustomConnections()
      expect(customConnections).toEqual(mockConnections)
    })

    it('should handle invalid JSON gracefully', () => {
      // Temporarily suppress console.error for this test
      const originalConsoleError = console.error
      console.error = jest.fn()

      localStorage.setItem('customMLOpsConnections', 'invalid-json')

      const customConnections = getCustomConnections()
      expect(customConnections).toEqual([])

      // Restore console.error
      console.error = originalConsoleError
    })
  })

  describe('saveCustomConnections', () => {
    it('should save custom connections to localStorage', () => {
      const mockConnections: StageConnection[] = [
        {
          from: 'test1',
          to: 'test2',
          type: 'bi-directional',
          animated: false
        }
      ]

      saveCustomConnections(mockConnections)

      const stored = localStorage.getItem('customMLOpsConnections')
      expect(stored).toBe(JSON.stringify(mockConnections))
    })
  })

  describe('getAllStages', () => {
    it('should return default stages when no custom stages exist', () => {
      const allStages = getAllStages()
      expect(allStages.length).toBeGreaterThan(0)

      // Should contain some default stages
      const stageIds = allStages.map(stage => stage.id)
      expect(stageIds).toContain('experiment_tracking')
      expect(stageIds).toContain('experimentation')
    })

    it('should include custom stages with default stages', () => {
      const customStages: MLOpsStageInfo[] = [
        {
          id: 'custom_test',
          name: 'Custom Test',
          description: 'Custom test stage',
          position: { x: 500, y: 500 }
        }
      ]

      saveCustomStages(customStages)

      const allStages = getAllStages()
      const stageIds = allStages.map(stage => stage.id)

      // Should contain default stages
      expect(stageIds).toContain('experiment_tracking')
      expect(stageIds).toContain('experimentation')

      // Should contain custom stage
      expect(stageIds).toContain('custom_test')
    })
  })

  describe('getAllConnections', () => {
    it('should return default connections when no custom connections exist', () => {
      const allConnections = getAllConnections()
      expect(allConnections.length).toBeGreaterThan(0)
    })

    it('should include custom connections with default connections', () => {
      const customConnections: StageConnection[] = [
        {
          from: 'custom1',
          to: 'custom2',
          type: 'default',
          animated: true
        }
      ]

      saveCustomConnections(customConnections)

      const allConnections = getAllConnections()

      // Should include the custom connection
      const customConnection = allConnections.find(
        conn => conn.from === 'custom1' && conn.to === 'custom2'
      )
      expect(customConnection).toBeDefined()
      expect(customConnection?.type).toBe('default')
      expect(customConnection?.animated).toBe(true)
    })
  })
})
