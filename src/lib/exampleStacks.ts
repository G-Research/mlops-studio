import { MLOpsStack } from '@/types/mlops'
import { technologies } from './data'

export const exampleStacks: MLOpsStack[] = [
  {
    id: 'enterprise-stack',
    name: 'Enterprise MLOps Stack',
    description:
      'A comprehensive MLOps stack suitable for large organizations with robust monitoring and governance.',
    technologies: {
      experiment_tracking: [technologies.experiment_tracking[0]], // Weights & Biases
      experimentation: [technologies.experimentation[1]], // Jupyter
      data_versioning: [technologies.data_versioning[0]], // DVC
      code_versioning: [technologies.code_versioning[1]], // GitHub
      pipeline_orchestration: [technologies.pipeline_orchestration[0]], // Apache Airflow
      artifact_tracking: [technologies.artifact_tracking[2]], // MLflow
      model_registry: [technologies.model_registry[1]], // MLflow
      model_serving: [technologies.model_serving[3]], // TensorFlow Serving
      model_monitoring: [technologies.model_monitoring[0]], // Prometheus
      runtime_engine: [technologies.runtime_engine[2]] // Apache Spark
    },
    created: new Date('2024-01-15'),
    updated: new Date('2024-01-20')
  },
  {
    id: 'startup-stack',
    name: 'Startup MLOps Stack',
    description: 'A lightweight, cost-effective MLOps stack perfect for startups and small teams.',
    technologies: {
      experiment_tracking: [technologies.experiment_tracking[3]], // MLflow
      experimentation: [technologies.experimentation[1]], // Jupyter
      data_versioning: [technologies.data_versioning[2]], // Weights & Biases
      code_versioning: [technologies.code_versioning[0]], // Git
      pipeline_orchestration: [technologies.pipeline_orchestration[9]], // Prefect
      artifact_tracking: [technologies.artifact_tracking[2]], // MLflow
      model_registry: [technologies.model_registry[1]], // MLflow
      model_serving: [technologies.model_serving[5]], // FastAPI
      model_monitoring: [technologies.model_monitoring[1]], // Grafana
      runtime_engine: [technologies.runtime_engine[1]] // Dask
    },
    created: new Date('2024-02-01'),
    updated: new Date('2024-02-05')
  }
]
