import { technologies, stageDefinitions, stageConnections } from '@/lib/data'
import { MLOpsStage, Technology, MLOpsStageInfo, StageConnection } from '@/types/mlops'

describe('Data Structure Tests', () => {
  describe('stageDefinitions', () => {
    it('should contain valid stage definitions', () => {
      expect(stageDefinitions).toBeInstanceOf(Array)
      expect(stageDefinitions.length).toBeGreaterThan(0)

      stageDefinitions.forEach((stage: MLOpsStageInfo) => {
        expect(stage).toHaveProperty('id')
        expect(stage).toHaveProperty('name')
        expect(stage).toHaveProperty('description')
        expect(stage).toHaveProperty('position')
        expect(stage.position).toHaveProperty('x')
        expect(stage.position).toHaveProperty('y')
        expect(typeof stage.id).toBe('string')
        expect(typeof stage.name).toBe('string')
        expect(typeof stage.description).toBe('string')
        expect(typeof stage.position.x).toBe('number')
        expect(typeof stage.position.y).toBe('number')
      })
    })

    it('should have unique stage IDs', () => {
      const ids = stageDefinitions.map(stage => stage.id)
      const uniqueIds = new Set(ids)
      expect(ids.length).toBe(uniqueIds.size)
    })

    it('should contain expected core stages', () => {
      const stageIds = stageDefinitions.map(stage => stage.id)
      const expectedStages: MLOpsStage[] = [
        'experiment_tracking',
        'experimentation',
        'data_versioning',
        'code_versioning',
        'pipeline_orchestration',
        'model_registry',
        'model_serving',
        'artifact_tracking',
        'model_monitoring',
        'runtime_engine'
      ]

      expectedStages.forEach(expectedStage => {
        expect(stageIds).toContain(expectedStage)
      })
    })
  })

  describe('technologies', () => {
    it('should contain technologies for each stage', () => {
      expect(technologies).toBeInstanceOf(Object)
      expect(Object.keys(technologies).length).toBeGreaterThan(0)

      Object.entries(technologies).forEach(([stageId, stageTechs]) => {
        expect(typeof stageId).toBe('string')
        expect(stageTechs).toBeInstanceOf(Array)

        stageTechs.forEach((tech: Technology) => {
          expect(tech).toHaveProperty('id')
          expect(tech).toHaveProperty('name')
          expect(tech).toHaveProperty('description')
          expect(tech).toHaveProperty('category')
          expect(typeof tech.id).toBe('string')
          expect(typeof tech.name).toBe('string')
          expect(typeof tech.description).toBe('string')
          expect(typeof tech.category).toBe('string')
        })
      })
    })

    it('should have technologies with unique IDs across all stages', () => {
      const allTechIds: string[] = []
      const idCounts = new Map<string, number>()

      Object.values(technologies).forEach(stageTechs => {
        stageTechs.forEach(tech => {
          allTechIds.push(tech.id)
          idCounts.set(tech.id, (idCounts.get(tech.id) || 0) + 1)
        })
      })

      const uniqueTechIds = new Set(allTechIds)

      // If there are duplicates, show which ones
      if (allTechIds.length !== uniqueTechIds.size) {
        const duplicates = Array.from(idCounts.entries())
          .filter(([_id, count]) => count > 1)
          .map(([id, count]) => `${id} (${count} times)`)

        console.log('Duplicate technology IDs found:', duplicates)

        // For now, let's make this a warning rather than a failure
        // This allows us to identify the issue without breaking the test suite
        expect(duplicates.length).toBe(0) // This will show the duplicates in the test output
      } else {
        expect(allTechIds.length).toBe(uniqueTechIds.size)
      }
    })

    it('should have technologies with valid optional fields', () => {
      Object.values(technologies).forEach(stageTechs => {
        stageTechs.forEach((tech: Technology) => {
          if (tech.url) {
            expect(typeof tech.url).toBe('string')
            expect(tech.url).toMatch(/^https?:\/\//)
          }

          if (tech.icon) {
            expect(typeof tech.icon).toBe('string')
          }

          if (tech.useWhen) {
            expect(tech.useWhen).toBeInstanceOf(Array)
            tech.useWhen.forEach(item => {
              expect(typeof item).toBe('string')
            })
          }

          if (tech.watchOut) {
            expect(tech.watchOut).toBeInstanceOf(Array)
            tech.watchOut.forEach(item => {
              expect(typeof item).toBe('string')
            })
          }

          if (tech.integrations) {
            expect(tech.integrations).toBeInstanceOf(Array)
            tech.integrations.forEach(integration => {
              expect(integration).toHaveProperty('tool')
              expect(integration).toHaveProperty('type')
              expect(integration).toHaveProperty('description')
              expect(typeof integration.tool).toBe('string')
              expect(['built-in', 'plugin']).toContain(integration.type)
              expect(typeof integration.description).toBe('string')

              if (integration.url) {
                expect(typeof integration.url).toBe('string')
                expect(integration.url).toMatch(/^https?:\/\//)
              }
            })
          }
        })
      })
    })
  })

  describe('stageConnections', () => {
    it('should contain valid stage connections', () => {
      expect(stageConnections).toBeInstanceOf(Array)
      expect(stageConnections.length).toBeGreaterThan(0)

      stageConnections.forEach((connection: StageConnection) => {
        expect(connection).toHaveProperty('from')
        expect(connection).toHaveProperty('to')
        expect(connection).toHaveProperty('type')
        expect(typeof connection.from).toBe('string')
        expect(typeof connection.to).toBe('string')
        expect(typeof connection.type).toBe('string')
        expect(typeof connection.animated).toBe('boolean')
      })
    })

    it('should only reference existing stages', () => {
      const validStageIds = stageDefinitions.map(stage => stage.id)

      stageConnections.forEach(connection => {
        expect(validStageIds).toContain(connection.from)
        expect(validStageIds).toContain(connection.to)
      })
    })

    it('should not have self-referencing connections', () => {
      stageConnections.forEach(connection => {
        expect(connection.from).not.toBe(connection.to)
      })
    })
  })
})
