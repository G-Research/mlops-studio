import { Technology, MLOpsStageInfo, MLOpsStage, StageConnection } from '@/types/mlops'

export const technologies: Record<MLOpsStage, Technology[]> = {
  experiment_tracking: [
    {
      id: 'weights-biases',
      name: 'Weights & Biases',
      description:
        'Weights & Biases is a tool to track and visualize your machine learning pipeline pieces, from datasets to production models.',
      category: 'experiment_tracking',
      icon: '/icons/wandb.c05fb0a7.svg',
      url: 'https://wandb.ai/site',
      websiteUrl: 'https://wandb.ai/site',
      repoUrl: 'https://github.com/wandb/client',
      docsUrl: 'https://docs.wandb.ai/',
      useWhen: [
        'You want a lightweight Python library specialized in experiment tracking, artifact tracking, and visualization.',
        'You want to get started quickly with a free (for personal use) hosted platform.',
        'You want built-in integrations with popular ML Frameworks (Keras, Fastai, etc.), repositories (Hugging Face, XGBoost, etc.), and tools (Kubeflow Pipelines, OpenAI Gym, etc.)',
        'You want project management and collaboration tools for machine learning projects.'
      ],
      watchOut: [
        'Only the client is open-source and requires signing up.',
        'The client covers data logging to Weights & Biases, data queries, and downloads of your logged data.',
        'The free plan is only for personal projects.',
        'Self-hosted deployment requires an Enterprise plan.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install wandb'
      },
      integrations: []
    },
    {
      id: 'kedro',
      name: 'Kedro',
      description:
        'Kedro is an open-source Python framework for creating reproducible, maintainable, and modular data science code.',
      category: 'experiment_tracking',
      icon: '/icons/kedro.6008c76a.svg',
      url: 'https://kedro.org/',
      websiteUrl: 'https://kedro.org/',
      repoUrl: 'https://github.com/kedro-org/kedro',
      docsUrl: 'https://kedro.readthedocs.io/en/stable/',
      useWhen: [
        'You want a framework for pipelining both data engineering- and data science-related tasks.',
        'You need a data science framework that supports collaboration in a single code base.',
        'You want to generate pipelines as Python code.',
        'You want to visualize data pipelines.',
        'You want to execute tasks in parallel efficiently.',
        'You want to manage data in data catalogs.'
      ],
      watchOut: [
        'Data catalogs are difficult to implement when the existing data workflow is non-structured with flat file data and manual file movement.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install kedro'
      },
      integrations: []
    },
    {
      id: 'modeldb',
      name: 'ModelDB',
      description:
        'Keep track of important information about your experiments such as parameters, metrics and models.',
      category: 'experiment_tracking',
      icon: '/icons/modeldb.svg'
    },
    {
      id: 'mlflow',
      name: 'MLflow',
      description:
        'MLflow is an open-source platform for managing the end-to-end machine learning lifecycle.',
      category: 'experiment_tracking',
      icon: '/icons/mlflow.0f53ee8c.svg',
      url: 'https://mlflow.org/',
      websiteUrl: 'https://mlflow.org/',
      repoUrl: 'https://github.com/mlflow/mlflow/',
      docsUrl: 'https://mlflow.org/docs/latest/index.html',
      useWhen: [
        'You want to organize projects and runs and track your experiments (manual and automatic logging), artifacts, and data.',
        'You want to keep track of your models with a model registry and serve them using integrations.',
        'You want a platform that is non-opinionated and gives you flexibility.'
      ],
      watchOut: [
        'MLflow can track data but provides limited capability in terms of data versioning. You may have to integrate other tools.',
        "MLflow's built-in model serving is quite limited. You will likely need to integrate with a third-party tool for a robust solution."
      ],
      installation: {
        method: 'pip',
        code: 'pip install mlflow'
      },
      integrations: []
    },
    {
      id: 'determined',
      name: 'Determined',
      description:
        'Determined is an open-source deep learning training platform that makes building models fast and easy.',
      category: 'experiment_tracking',
      icon: '/icons/determined.34aaa33a.svg',
      url: 'https://www.determined.ai/',
      websiteUrl: 'https://www.determined.ai/',
      repoUrl: 'https://github.com/determined-ai/determined',
      docsUrl: 'https://docs.determined.ai/latest/',
      useWhen: [
        'You want a framework-agnostic platform for training models, tuning hyperparameters, tracking experiments, and a built-in model registry.',
        'You want a platform that is opinionated and works with minimal effort.',
        'You want a declarative API.',
        'You want a platform that manages your training infrastructure with autoscaling to reduce cloud costs.',
        'You want to be able to deploy on-prem, major cloud providers, and Kubernetes. '
      ],
      watchOut: [],
      installation: {
        method: 'pip',
        code: 'pip install determined'
      },
      integrations: []
    },
    {
      id: 'exp-dvc',
      name: 'DVC',
      description: 'DVC is an open-source version control system for machine learning projects.',
      category: 'experiment_tracking',
      icon: '/icons/dvc.168eef99.svg',
      url: 'https://dvc.org/',
      websiteUrl: 'https://dvc.org/',
      repoUrl: 'https://github.com/iterative/dvc',
      docsUrl: 'https://dvc.org/doc',
      useWhen: [
        'You want to be able to version arbitrarily large files, datasets, and models using a similar workflow as Git.',
        'You want many options for remote storage of your data (S3, Minio, Google Cloud Storage, Google Drive, Azure Blob Storage, etc.)',
        'You want to create pipelines and track your experiments.'
      ],
      watchOut: ['You must use DVC alongside a Git repository to enable its versioning features.'],
      installation: {
        method: 'pip',
        code: 'pip install dvc'
      },
      integrations: []
    },
    {
      id: 'neptune',
      name: 'Neptune',
      description:
        'Neptune is a flexible metadata store for MLOps that allows teams to log, store, display, organize, compare, and query model-building metadata.',
      category: 'experiment_tracking',
      icon: '/icons/neptune.719fd442.svg',
      url: 'https://neptune.ai/',
      websiteUrl: 'https://neptune.ai/',
      repoUrl: 'https://github.com/neptune-ai/neptune-client',
      docsUrl: 'https://docs.neptune.ai/',
      useWhen: [
        'You want a lightweight tool to cover data versioning, model registry, experiment, and artifact tracking.',
        'You want to record and monitor model training, evaluation, or production runs.',
        'You want a tool that covers a wide range of metadata types to log and display, from model parameters to audio and video files.',
        'You want 25+ built-in integrations with popular Python libraries.'
      ],
      watchOut: [
        'Only the Neptune client is open-source and requires signing up.',
        'The Neptune client covers data logging to the Neptune server, data queries, and downloads of your logged data.',
        'The free plan is only for individual use up to 200 monitoring hours/month.',
        'Self-hosted deployment requires an Organization plan.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install neptune-client'
      },
      integrations: []
    },
    {
      id: 'polyaxon',
      name: 'Polyaxon',
      description:
        'Polyaxon is a platform for building, training, and monitoring large-scale deep learning applications.',
      category: 'experiment_tracking',
      icon: '/icons/polyaxon.326d1db6.svg',
      url: 'https://polyaxon.com/',
      websiteUrl: 'https://polyaxon.com/',
      repoUrl: 'https://github.com/polyaxon/polyaxon',
      docsUrl: 'https://polyaxon.com/docs/',
      useWhen: [
        'You want a self-hosted platform with a library for tracking experiments and data, hyperparameter tuning, and visualizing results.',
        'You would like to use YAML to configure training jobs, pipelines, and deployments.',
        'You want to have many integration options with your favorite artifact store, container registry, git provider, notification and alerting, etc.'
      ],
      watchOut: [],
      installation: {
        method: 'pip',
        code: 'pip install polyaxon'
      },
      integrations: []
    },
    {
      id: 'clearml',
      name: 'ClearML',
      description:
        'ClearML is an end-to-end platform with an auto-magical suite of tools to streamline your ML workflow.',
      category: 'experiment_tracking',
      icon: '/icons/clearml.73e47861.svg',
      url: 'https://clear.ml/',
      websiteUrl: 'https://clear.ml/',
      repoUrl: 'https://github.com/allegroai/clearml',
      docsUrl: 'https://clear.ml/docs/latest/docs/',
      useWhen: [
        'You want an all-in-one tool that tracks experiments (including hyperparameters, data, artifacts, and models),  handles pipelines and serves models.',
        'You prefer to use a Python API for creating and configuring resources.'
      ],
      watchOut: [],
      installation: {
        method: 'pip',
        code: 'pip install clearml-agent'
      },
      integrations: []
    },
    {
      id: 'tensorboard',
      name: 'TensorBoard',
      description: 'TensorBoard is a visualization toolkit to optimize and debug ML models.',
      category: 'experiment_tracking',
      icon: '/icons/tensorboard.svg',
      url: 'https://tensorboard.dev/',
      websiteUrl: 'https://tensorboard.dev/',
      repoUrl: 'https://github.com/tensorflow/tensorboard',
      docsUrl: 'https://www.tensorflow.org/tensorboard/get_started',
      useWhen: [
        'You want to track ML experiment metrics like loss and accuracy.',
        'You want to visualize the tracked metrics and model architecture.',
        'You want to view model histograms.',
        'You want to log diagnostic data as images.',
        'You want an integrated What-if Tool to analyze black-box classification and regression ML models.',
        'You want an integrated debugger tool. '
      ],
      watchOut: [
        'What-if Tool requires TensorFlow Serving tool, and the dataset must be in a TFRecord file accessible by TensorBoard. '
      ],
      installation: {
        method: 'pip',
        code: 'pip install tensorboard'
      },
      integrations: []
    },
    {
      id: 'dagshub',
      name: 'DagsHub',
      description:
        'Keep track of important information about your experiments such as parameters, metrics and models.',
      category: 'experiment_tracking',
      icon: '/icons/dagshub.svg'
    }
  ],

  experimentation: [
    {
      id: 'kubeflow',
      name: 'Kubeflow',
      description:
        ' Kubeflow makes deploying ML workflows on Kubernetes simple, portable and scalable.',
      category: 'experimentation',
      icon: '/icons/kubeflow.b23d7704.svg',
      url: 'https://www.kubeflow.org/',
      websiteUrl: 'https://www.kubeflow.org/',
      repoUrl: 'https://github.com/kubeflow/kubeflow',
      docsUrl: 'https://www.kubeflow.org/docs/',
      useWhen: [
        'You want an opinionated pipeline orchestration toolbox that is focused on ML-specific workloads on Kubernetes.',
        'You want a tool that is cloud provider agnostic.',
        'You want a framework that integrates all components to cover each phase of the ML lifecycle.',
        'You want to run Jupyter Notebooks on GPU instances with shared data backends.',
        'You want to autoscale compute resources to your workload needs.',
        'You want to deploy ML models to production.'
      ],
      watchOut: [
        'Extensive configuration options require significant expertise and experimentation to get the optimal configuration.',
        'Reliability issues may arise from component dependencies and their version incompatibilities. Updating one component might break other parts due to incompatibilities.',
        'Kubeflow expects that containers are in cloud container registries.'
      ],
      integrations: []
    },
    {
      id: 'jupyter',
      name: 'Jupyter',
      description:
        'Jupyter Notebook is an open-source web application where you can create and share documents that contain live code, equations, visualizations, and text.',
      category: 'experimentation',
      icon: '/icons/jupyter.svg',
      url: 'https://jupyter.org/',
      websiteUrl: 'https://jupyter.org/',
      repoUrl: 'https://github.com/jupyter/notebook',
      docsUrl: 'https://docs.jupyter.org/en/latest/',
      useWhen: [
        'You want a web-based notebook where you can interactively run pieces of code, visualize the outcomes and embed text and images.',
        'You want to be able to share and present data easily.',
        'You want a tool with a large community and many extensions.'
      ],
      watchOut: [
        "Jupyter doesn't have the full capabilities of an IDE, such as code completion, linting and debugging.",
        'You can execute code cells in any order, leading to experiments that you may not be able to reproduce.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install jupyterlab'
      },
      integrations: []
    },
    {
      id: 'polynote',
      name: 'Polynote',
      description:
        "Netflix's open-source polyglot notebook environment that supports multiple programming languages (Scala, Python, SQL) within single notebooks. Features IDE-like capabilities with autocomplete, parameter hints, and seamless Apache Spark integration for data science workflows.",
      category: 'experimentation',
      icon: '/icons/polynote.c94a7518.svg',
      url: 'https://polynote.org/',
      websiteUrl: 'https://polynote.org/',
      repoUrl: 'https://github.com/polynote/polynote',
      docsUrl: 'https://polynote.org/docs/installation/',
      useWhen: [
        'Working with mixed Scala and Python codebases in ML projects',
        'Need IDE-like features (autocomplete, error highlighting) in notebook environment',
        'Integrating with Apache Spark for distributed computing workloads',
        'Reproducible notebooks with automatic dependency and state management',
        'Data visualization with native support for Vega and Matplotlib',
        'JVM-based ML platform integration requiring Scala interoperability',
        "Teams familiar with Netflix's ML infrastructure and practices",
        'Projects requiring polyglot programming within single notebook interface'
      ],
      watchOut: [
        'No official Windows support (only Linux/macOS, WSL for Windows users)',
        'Limited community adoption compared to Jupyter ecosystem',
        'More complex installation process due to JVM requirements',
        'Scala expertise required for full platform utilization',
        'Browser compatibility primarily tested with Chrome',
        'Limited programmatic notebook execution capabilities',
        'Debugging Python through JVM can be challenging',
        'Smaller ecosystem of extensions and community tools'
      ],
      installation: {
        method: 'download',
        code: 'Download polynote-dist.tar.gz from https://github.com/polynote/polynote/releases'
      },
      integrations: []
    },
    {
      id: 'apache-zeppelin',
      name: 'Apache Zeppelin',
      description:
        'Apache Zeppelin is a web-based notebook for interactive data analytics and collaborative documents with built-in Apache Spark integration for ML experimentation.',
      category: 'experimentation',
      icon: '/icons/apache-zeppelin.svg',
      url: 'https://zeppelin.apache.org',
      websiteUrl: 'https://zeppelin.apache.org',
      repoUrl: 'https://github.com/apache/zeppelin',
      docsUrl: 'https://zeppelin.apache.org/docs/latest/',
      useWhen: [
        'Prototyping and experimenting with ML models interactively.',
        'Performing exploratory data analysis on large datasets.',
        'Collaborating on ML experiments with team members.',
        'Working with Apache Spark for distributed ML computations.',
        'Creating data visualizations and interactive dashboards.',
        'Building collaborative documents that combine code, text, and visualizations.',
        'Need real-time data analysis and streaming data processing.'
      ],
      watchOut: [
        'Limited MLOps integration: Lacks native experiment tracking and model management.',
        'Deployment complexity: Challenging to operationalize models in production environments.',
        'Resource requirements: Can be resource-intensive for large-scale operations.',
        'Kubernetes integration: Limited native support for containerized deployments.',
        'Learning curve: Requires understanding of multiple interpreters and configurations.',
        'Production limitations: Not ideal for automated ML pipelines or production workflows.'
      ],
      installation: {
        method: 'manual',
        code: 'wget https://archive.apache.org/dist/zeppelin/zeppelin-0.11.2/zeppelin-0.11.2-bin-all.tgz && tar -xzf zeppelin-0.11.2-bin-all.tgz && ./bin/zeppelin-daemon.sh start'
      },
      integrations: []
    },
    {
      id: 'spyder',
      name: 'Spyder',
      description:
        'A powerful scientific Python development environment designed by and for scientists, engineers, and data analysts. Combines advanced code editing and debugging capabilities with interactive data exploration, visualization, and analysis tools from popular scientific libraries.',
      category: 'experimentation',
      icon: '/icons/spyder.dd15ab9c.svg',
      url: 'https://www.spyder-ide.org/',
      websiteUrl: 'https://www.spyder-ide.org/',
      repoUrl: 'https://github.com/spyder-ide/spyder',
      docsUrl: 'https://docs.spyder-ide.org/current/',
      useWhen: [
        'Interactive development and testing of ML models with immediate variable inspection',
        'Debugging complex data science algorithms with integrated profiler and debugger',
        'Exploratory data analysis requiring seamless integration with NumPy, Pandas, Matplotlib',
        'Prototyping ML experiments when you need both script and notebook-like functionality',
        'Educational ML projects requiring comprehensive IDE features with scientific focus',
        'Data visualization tasks requiring integrated plotting and variable exploration',
        'Code analysis and optimization using built-in static analyzer and profiler',
        'Cross-platform ML development requiring consistent scientific computing environment'
      ],
      watchOut: [
        'Resource intensive - requires significant memory and CPU for large datasets',
        'Limited collaboration features compared to cloud-based notebooks like Google Colab',
        'Package management can be complex when mixing conda and pip environments',
        'GUI can become slow with very large datasets or complex visualizations',
        'Not designed for production deployment or containerized environments',
        'Plugin ecosystem is smaller compared to VSCode or PyCharm',
        'Learning curve for users transitioning from Jupyter notebooks',
        'May have compatibility issues with certain third-party scientific libraries'
      ],
      installation: {
        method: 'conda',
        code: 'conda install spyder'
      },
      integrations: []
    }
  ],

  data_versioning: [
    {
      id: 'dvc',
      name: 'DVC',
      description:
        'Open-source version control system designed specifically for data science and machine learning projects. Provides Git-like functionality for datasets, models, and ML pipelines with support for experiment tracking and reproducible workflows.',
      category: 'data_versioning',
      icon: '/icons/dvc.168eef99.svg',
      url: 'https://dvc.org/',
      websiteUrl: 'https://dvc.org/',
      repoUrl: 'https://github.com/iterative/dvc',
      docsUrl: 'https://dvc.org/doc',
      useWhen: [
        'Versioning large datasets and ML models alongside code',
        'Creating reproducible ML pipelines with dependency tracking',
        'Comparing experiments and tracking metrics across iterations',
        'Collaborating on data science projects with consistent data states',
        'Managing multiple environments (dev/test/prod) with different data configurations',
        'Integrating with CI/CD systems for automated model validation',
        'Sharing datasets and models across teams without duplicating large files',
        'Rolling back to previous data or model versions when issues arise'
      ],
      watchOut: [
        'Cache management can consume significant disk space with copy cache type',
        'Pipeline definitions in YAML lack expressiveness for complex dynamic workflows',
        "Single dvc.lock file per repo doesn't support multiple execution environments well",
        'Remote storage configuration issues when not set up from project start',
        'Stage and output conflicts between DVC tracking and pipeline definitions',
        'Requires mental adjustment to make regular data commits alongside code commits',
        'Limited support for appending to datasets - full regeneration required',
        'Performance issues with very large datasets during checkout operations'
      ],
      installation: {
        method: 'pip',
        code: 'pip install dvc'
      },
      integrations: []
    },
    {
      id: 'dolt',
      name: 'Dolt',
      description:
        'Dolt is a SQL database that you can fork, clone, branch, merge, push and pull just like a Git repository - like Git and MySQL had a baby.',
      category: 'data_versioning',
      icon: '/icons/dolt.b1a4e0ea.svg',
      url: 'https://www.dolthub.com/',
      websiteUrl: 'https://www.dolthub.com/',
      repoUrl: 'https://github.com/dolthub/dolt',
      docsUrl: 'https://docs.dolthub.com/',
      useWhen: [
        'Database version control needed: When you need full Git-like version control for database schema and data.',
        'Data collaboration: When multiple teams need to work on the same dataset with branching and merging capabilities.',
        'Audit requirements: When you need complete audit trails of all database changes.',
        'Data curation workflows: When doing manual data curation with review and approval processes.',
        'Configuration management: When managing configuration data that needs version control.',
        'Data sharing: When you need to share datasets with full history and provenance.',
        'Application version control: When your application data itself needs to be versioned.'
      ],
      watchOut: [
        'Performance overhead: Dolt is about 10% slower than MySQL on standard queries.',
        'Memory requirements: Requires minimum 2GB RAM for production use cases.',
        'Storage overhead: Storing full historical versions can result in significant storage requirements.',
        'MySQL compatibility gaps: While aiming for 100% MySQL compatibility, some features are missing.',
        'Concurrent write behavior: Under concurrent writes to the same row, Dolt and MySQL produce different results.',
        'Disk garbage creation: Creates disk garbage on write, which can become substantial.',
        'PostgreSQL limitation: Currently only MySQL-compatible; PostgreSQL version is experimental.'
      ],
      integrations: []
    },
    {
      id: 'dv-weights-biases',
      name: 'Weights & Biases',
      description:
        'Weights & Biases is a tool to track and visualize your machine learning pipeline pieces, from datasets to production models.',
      category: 'data_versioning',
      icon: '/icons/wandb.c05fb0a7.svg',
      url: 'https://wandb.ai/site',
      websiteUrl: 'https://wandb.ai/site',
      repoUrl: 'https://github.com/wandb/client',
      docsUrl: 'https://docs.wandb.ai/',
      useWhen: [
        'You want a lightweight Python library specialized in experiment tracking, artifact tracking, and visualization.',
        'You want to get started quickly with a free (for personal use) hosted platform.',
        'You want built-in integrations with popular ML Frameworks (Keras, Fastai, etc.), repositories (Hugging Face, XGBoost, etc.), and tools (Kubeflow Pipelines, OpenAI Gym, etc.)',
        'You want project management and collaboration tools for machine learning projects.'
      ],
      watchOut: [
        'Only the client is open-source and requires signing up.',
        'The client covers data logging to Weights & Biases, data queries, and downloads of your logged data.',
        'The free plan is only for personal projects.',
        'Self-hosted deployment requires an Enterprise plan.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install wandb'
      },
      integrations: []
    },
    {
      id: 'dv-neptune',
      name: 'Neptune',
      description:
        'Neptune is a flexible metadata store for MLOps that allows teams to log, store, display, organize, compare, and query model-building metadata.',
      category: 'data_versioning',
      icon: '/icons/neptune.719fd442.svg',
      url: 'https://neptune.ai/',
      websiteUrl: 'https://neptune.ai/',
      repoUrl: 'https://github.com/neptune-ai/neptune-client',
      docsUrl: 'https://docs.neptune.ai/',
      useWhen: [
        'You want a lightweight tool to cover data versioning, model registry, experiment, and artifact tracking.',
        'You want to record and monitor model training, evaluation, or production runs.',
        'You want a tool that covers a wide range of metadata types to log and display, from model parameters to audio and video files.',
        'You want 25+ built-in integrations with popular Python libraries.'
      ],
      watchOut: [
        'Only the Neptune client is open-source and requires signing up.',
        'The Neptune client covers data logging to the Neptune server, data queries, and downloads of your logged data.',
        'The free plan is only for individual use up to 200 monitoring hours/month.',
        'Self-hosted deployment requires an Organization plan.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install neptune-client'
      },
      integrations: []
    },
    {
      id: 'gitlfs',
      name: 'Git LFS',
      description:
        'Git extension that replaces large files with text pointers while storing the actual files on a remote server. Enables version control of large assets while maintaining normal Git workflows and keeping repository sizes manageable.',
      category: 'data_versioning',
      icon: '/icons/gitlfs.efee9fbe.svg',
      url: 'https://git-lfs.com/',
      websiteUrl: 'https://git-lfs.com/',
      repoUrl: 'https://github.com/git-lfs/git-lfs',
      docsUrl: 'https://git-lfs.com/',
      useWhen: [
        'Managing large datasets, models, or media files in Git repositories',
        'Maintaining Git workflow familiarity while handling files over 100MB',
        'Version controlling binary assets like images, videos, or trained models',
        'Collaborating on projects with mixed small code and large data files',
        'Working with existing Git infrastructure and CI/CD pipelines',
        'Need simple large file storage without complex data pipeline features',
        'Teams already invested in Git-based workflows and tooling',
        'Projects with modest storage requirements fitting within budget constraints'
      ],
      watchOut: [
        'High storage costs beyond free tier (1GB/month free on GitHub)',
        'Irreversible implementation - requires history rewrite to add/remove LFS',
        'All collaborators must install Git LFS or receive metadata files instead',
        'Performance issues during clone/pull operations with large repositories',
        'All file revisions count toward storage limits, costs accumulate quickly',
        "Limited customization options, locked into provider's storage pricing",
        'Bandwidth costs for every push/pull/clone operation by team members',
        'Cross-platform compatibility issues when switching hosting providers'
      ],
      installation: {
        method: 'installer',
        code: 'Download installer from https://git-lfs.com/ then git lfs install'
      },
      integrations: []
    },
    {
      id: 'fastds',
      name: 'FastDS',
      description:
        'A command-line wrapper that combines Git and DVC functionality to streamline data science workflows. Automates repetitive version control tasks and reduces errors in Git+DVC operations through simplified command interfaces.',
      category: 'data_versioning',
      icon: '/icons/fastds.1f5e86ad.svg',
      url: 'https://mymlops.com/tools/fastds',
      websiteUrl: 'https://mymlops.com/tools/fastds',
      repoUrl: '',
      docsUrl: 'https://mymlops.com/tools/fastds',
      useWhen: [
        'Simplifying Git+DVC workflows for data science teams new to version control',
        'Reducing human errors in repetitive data versioning operations',
        'Standardizing data science workflows across development teams',
        'Automating common Git+DVC command sequences in MLOps pipelines',
        'Training environments where simplified interfaces improve adoption',
        'Rapid prototyping scenarios requiring minimal version control overhead',
        'Integration with Airflow and MLflow-based MLOps stacks',
        'Teams transitioning from manual processes to automated data workflows'
      ],
      watchOut: [
        'Limited documentation and community support compared to native Git+DVC',
        'Abstraction layer may hide important Git+DVC concepts from users',
        'Additional dependency that could introduce maintenance overhead',
        'May not support all advanced Git+DVC features and configurations',
        'Risk of vendor lock-in to specific workflow patterns',
        'Troubleshooting issues requires understanding both FastDS and underlying tools',
        'Updates may lag behind Git+DVC feature releases',
        'Limited customization options compared to direct Git+DVC usage'
      ],
      installation: {
        method: 'custom',
        code: 'Requires Git and DVC - installation details not widely documented'
      },
      integrations: []
    },
    {
      id: 'dv-dagshub',
      name: 'DAGsHub',
      description:
        'Platform for data scientists that combines GitHub-like repository management with integrated data versioning, experiment tracking, and model management. Built on top of Git and DVC with zero-configuration setup for MLOps workflows.',
      category: 'data_versioning',
      icon: '/icons/dagshub.svg',
      url: 'https://dagshub.com/',
      websiteUrl: 'https://dagshub.com/',
      repoUrl: 'https://github.com/DAGsHub',
      docsUrl: 'https://dagshub.com/docs/',
      useWhen: [
        'Need GitHub-like interface specifically designed for data science projects',
        'Want zero-configuration setup for DVC remote storage and MLflow tracking',
        'Viewing and collaborating on Jupyter notebooks with built-in rendering',
        'Comparing experiments alongside code and datasets in unified interface',
        'Managing both open source and private data science projects with teams',
        'Integrating data science workflows with existing GitHub repositories',
        'Need free storage and experiment tracking for small to medium teams',
        'Want to sync pull requests and issues between GitHub and specialized DS platform'
      ],
      watchOut: [
        'Free tier limited to 2 additional collaborators for private projects',
        'Storage capacity limits not clearly specified in documentation',
        'Relatively newer platform with smaller community compared to alternatives',
        "Dependency on DAGsHub's continued service availability and pricing",
        'Enterprise features only available in paid tiers (isolated/on-prem installs)',
        'Limited customization compared to self-hosted solutions',
        'Potential vendor lock-in for teams heavily invested in platform features',
        'Usage limitations may incur excess charges if exceeded'
      ],
      installation: {
        method: 'web',
        code: 'Sign up at https://dagshub.com/ and connect GitHub repository'
      },
      integrations: []
    },
    {
      id: 'pachyderm',
      name: 'Pachyderm',
      description: 'Pachyderm is a tool for data versioning and pipelines for MLOps.',
      category: 'data_versioning',
      icon: '/icons/pachyderm.9a34e8cf.svg',
      url: 'https://www.pachyderm.com/',
      websiteUrl: 'https://www.pachyderm.com/',
      repoUrl: 'https://github.com/pachyderm/pachyderm',
      docsUrl: 'https://docs.pachyderm.com/latest/',
      useWhen: [
        'You would like a tool that handles data versioning and pipeline automation.',
        'You want a language-agnostic tool that uses JSON or YAML to create and configure resources.'
      ],
      watchOut: [],
      installation: {
        method: 'helm',
        code: 'helm repo add pach https://helm.pachyderm.com\nhelm repo update\nhelm install pachd pach/pachyderm --set deployTarget=LOCAL'
      },
      integrations: []
    },
    {
      id: 'lakefs',
      name: 'lakeFS',
      description:
        'Open-source data version control platform that transforms object storage into Git-like repositories. Enables atomic operations, branching, and versioning for data lakes with support for S3, GCS, Azure Blob, and other cloud storage systems.',
      category: 'data_versioning',
      icon: '/icons/lakefs.ad82f03c.svg',
      url: 'https://lakefs.io/',
      websiteUrl: 'https://lakefs.io/',
      repoUrl: 'https://github.com/treeverse/lakeFS',
      docsUrl: 'https://docs.lakefs.io/',
      useWhen: [
        'Managing data lakes with git-like operations (branch, commit, merge)',
        'Need atomic and isolated operations in data pipelines',
        'Creating isolated dev/test environments from production data',
        'Implementing data governance and audit trails for compliance',
        'Rolling back data changes safely without data duplication',
        'Setting up CI/CD workflows for data quality validation',
        'Managing multiple data environments with lightweight branching',
        'Integrating with existing MLOps tools for complete ML lifecycle management'
      ],
      watchOut: [
        'Performance bottlenecks with extremely large datasets (millions of files)',
        'Additional storage overhead from branching and versioning mechanisms',
        'Not suitable for real-time streaming or low-latency requirements',
        'Operational complexity in managing branching strategies and merge conflicts',
        'Some analytics tools may need modifications for S3-compatible API',
        'Limitations with certain file formats and data processing engines',
        'Learning curve for teams new to data versioning concepts',
        'Infrastructure requirements for self-hosting and maintenance overhead'
      ],
      installation: {
        method: 'docker',
        code: 'docker run --pull always --rm --publish 8000:8000 treeverse/lakefs:latest run --quickstart'
      },
      integrations: []
    },
    {
      id: 'quilt',
      name: 'Quilt',
      description:
        'A data mesh platform that enables teams to manage large datasets like code packages, providing centralized data cataloging, automatic versioning, and collaborative data workflows. Designed for machine learning, biotech, and analytics teams requiring robust data lineage and reproducibility.',
      category: 'data_versioning',
      icon: '/icons/quilt.svg',
      url: 'https://www.quilt.bio/',
      websiteUrl: 'https://www.quilt.bio/',
      repoUrl: 'https://github.com/quiltdata/quilt',
      docsUrl: 'https://docs.quilt.bio/',
      useWhen: [
        "Version control for large datasets that exceed Git's capabilities",
        'Managing ML training data with automatic lineage tracking and rollback capabilities',
        'Collaborative data science projects requiring centralized data package management',
        'Data governance initiatives needing audit trails and access control',
        'ML model versioning alongside corresponding training datasets',
        'Scientific research requiring reproducible data workflows and provenance',
        'Cross-team data sharing with standardized packaging and metadata',
        'AWS-native data management workflows requiring S3 integration'
      ],
      watchOut: [
        'Primarily designed for AWS ecosystem, limited support for other cloud providers',
        'Learning curve for teams unfamiliar with package management concepts',
        'Storage costs can accumulate quickly with large datasets and multiple versions',
        'Requires additional infrastructure setup beyond basic Git workflows',
        'Limited community compared to established version control systems',
        'Documentation gaps for advanced use cases and enterprise deployments',
        'Performance overhead for small datasets where Git LFS might suffice',
        'Dependency on specific Python SDK for programmatic access'
      ],
      installation: {
        method: 'pip',
        code: 'pip install quilt3'
      },
      integrations: []
    },
    {
      id: 'delta-lake',
      name: 'Delta Lake',
      description:
        'Delta Lake is an open-source storage framework that enables building Lakehouse architectures with ACID transactions and scalable metadata handling on data lakes.',
      category: 'data_versioning',
      icon: '/icons/delta-lake.svg',
      url: 'https://delta.io/',
      websiteUrl: 'https://delta.io/',
      repoUrl: 'https://github.com/delta-io/delta',
      docsUrl: 'https://docs.delta.io/',
      useWhen: [
        'ACID compliance needed: When you need Atomicity, Consistency, Isolation, and Durability for data lake operations.',
        'Time travel requirements: When you need to query previous table versions, perform audits, or rollbacks.',
        'Mixed batch/streaming: When you need unified batch and streaming data processing.',
        'Schema evolution: When your data schemas change over time and you need enforcement and evolution capabilities.',
        'Multi-engine access: When you need to access the same data with different compute engines (Spark, Flink, Trino, etc.).',
        'Large-scale data operations: When working with massive datasets that require reliable, consistent updates.',
        'Data reliability critical: When data corruption or partial updates could have significant business impact.'
      ],
      watchOut: [
        'Multi-table transaction limitations: Delta Lake does not support multi-table transactions and foreign keys - transactions work only at the table level.',
        'Version compatibility issues: While backward compatible, forward compatibility may break with new features.',
        'Concurrency control problems: Metadata update exceptions occur during concurrent transactions.',
        "Storage dependency: ACID guarantees depend on the underlying storage system's atomicity and durability guarantees.",
        'S3 limitations: Delta Lake on S3 has several limitations not found on other storage systems.',
        'Spark dependency: Primarily designed for Spark ecosystem, though other engines are supported.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install delta-spark'
      },
      integrations: []
    },
    {
      id: 'guild-ai',
      name: 'Guild AI',
      description:
        'An open-source experiment tracking and optimization toolkit that automatically captures training runs, hyperparameters, and results without code modification. Provides systematic experiment management with built-in hyperparameter optimization and model comparison capabilities.',
      category: 'data_versioning',
      icon: '/icons/guild-ai.svg',
      url: 'https://guild.ai/',
      websiteUrl: 'https://guild.ai/',
      repoUrl: 'https://github.com/guildai/guildai',
      docsUrl: 'https://guild.ai/docs/',
      useWhen: [
        'Hyperparameter optimization using grid search, random search, and Bayesian methods',
        'Experiment tracking without modifying existing training scripts',
        'Comparing model performance across multiple training runs and configurations',
        'Reproducible ML experiments requiring detailed run metadata and artifacts',
        'Teams preferring lightweight, file-system based tracking over database solutions',
        'Multi-framework projects supporting TensorFlow, PyTorch, scikit-learn, and others',
        "Local development environments where cloud-based tracking isn't feasible",
        'Research projects requiring systematic experiment organization and analysis'
      ],
      watchOut: [
        'Limited web UI compared to modern experiment tracking platforms',
        'No built-in model registry or deployment capabilities',
        'Lacks collaborative features for team-based experiment management',
        'File-system storage can become unwieldy with large numbers of experiments',
        'No native integration with cloud platforms or MLOps orchestration tools',
        'Limited visualization options compared to dedicated ML platforms',
        'Community size smaller than established alternatives like MLflow or Weights & Biases',
        'Documentation could be more comprehensive for advanced use cases'
      ],
      installation: {
        method: 'pip',
        code: 'pip install guildai'
      },
      integrations: []
    }
  ],

  code_versioning: [
    {
      id: 'git',
      name: 'Git',
      description:
        'Git is a free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.',
      category: 'code_versioning',
      icon: '/icons/git.svg',
      url: 'https://git-scm.com',
      websiteUrl: 'https://git-scm.com',
      repoUrl: 'https://github.com/git/git',
      docsUrl: 'https://git-scm.com/docs',
      useWhen: [
        'Managing ML model code, training scripts, and configuration files.',
        'Collaborating on ML projects with multiple team members.',
        'Implementing CI/CD pipelines for ML workflows.',
        'Tracking changes in feature engineering code and model architectures.',
        'Creating reproducible ML experiments with proper branching strategies.',
        'Integrating with MLOps platforms that require version control.'
      ],
      watchOut: [
        'Not suitable for large datasets: Git struggles with large binary files and datasets.',
        'Repository bloat: Including model artifacts and data can make repos unwieldy.',
        'Branching complexity: ML experiments can create complex branching patterns.',
        'Merge conflicts: Model configuration files can be difficult to merge.',
        "Limited ML-specific features: Doesn't provide experiment tracking or model metrics."
      ],
      installation: {
        method: 'manual',
        code: 'Download from git-scm.com or use package manager (brew install git, apt install git, yum install git)'
      },
      integrations: []
    },
    {
      id: 'github',
      name: 'Github',
      description:
        "GitHub is the world's most widely adopted AI-powered developer platform that provides collaborative software development capabilities with specialized MLOps features.",
      category: 'code_versioning',
      icon: '/icons/github.svg',
      url: 'https://github.com',
      websiteUrl: 'https://github.com',
      repoUrl: 'https://github.com',
      docsUrl: 'https://docs.github.com',
      useWhen: [
        'Building end-to-end MLOps pipelines with GitHub Actions.',
        'Implementing automated model training and deployment workflows.',
        'Collaborating on ML projects with code review and issue tracking.',
        'Integrating ML workflows with 17,000+ tools in the GitHub ecosystem.',
        'Setting up automated testing for ML models and data pipelines.',
        'Using GitHub Copilot for AI-assisted ML code development.',
        'Managing ML project lifecycles with GitHub Projects.'
      ],
      watchOut: [
        'Cloud dependency: Requires internet connectivity for full functionality.',
        'Cost for private repos: Enterprise features require paid plans.',
        'Actions limitations: GitHub Actions has execution time and resource limits.',
        'Learning curve: MLOps-specific workflows require GitHub Actions expertise.',
        'Vendor lock-in: Heavy integration creates dependency on GitHub ecosystem.'
      ],
      integrations: []
    },
    {
      id: 'cv-fastds',
      name: 'FastDS',
      description: 'Version your notebooks, pipelines and configuration files.',
      category: 'code_versioning',
      icon: '/icons/fastds.1f5e86ad.svg'
    },
    {
      id: 'cv-dagshub',
      name: 'DAGsHub',
      description: 'Version your notebooks, pipelines and configuration files.',
      category: 'code_versioning',
      icon: '/icons/dagshub.svg'
    }
  ],

  pipeline_orchestration: [
    {
      id: 'apache-airflow',
      name: 'Apache Airflow',
      description:
        'Apache Airflow is a platform created by the community to programmatically author, schedule and monitor workflows using Python DAGs.',
      category: 'pipeline_orchestration',
      icon: '/icons/airflow.95e57932.svg',
      url: 'https://airflow.apache.org/',
      websiteUrl: 'https://airflow.apache.org/',
      repoUrl: 'https://github.com/apache/airflow',
      docsUrl: 'https://airflow.apache.org/docs/apache-airflow/stable/',
      useWhen: [
        'You need to orchestrate complex, multi-step machine learning workflows and data pipelines.',
        'Your team prefers Python-native workflow definition with version control capabilities.',
        'You require robust monitoring, alerting, and retry mechanisms for production ML operations.',
        'You need tool-agnostic orchestration that can integrate with any MLOps tool with an API.',
        'You want to convert existing ML scripts into scheduled, monitored workflows using TaskFlow API.',
        'Your workflows are mostly static and slowly changing (not streaming data).',
        'You need dynamic pipeline generation and complex dependency management.',
        'You require extensive integration with cloud providers (AWS, GCP, Azure) and MLOps tools.'
      ],
      watchOut: [
        'Installation complexity: Direct pip install often fails; requires constraint files for repeatable installations.',
        'Python expertise required: Not suitable for teams without strong Python programming skills.',
        'Resource intensive: Can consume significant memory and CPU; requires proper resource configuration and monitoring.',
        'Not for streaming: Designed for batch processing, not real-time streaming data.',
        'Docker challenges: Custom dependencies and GPU support require specialized Docker expertise.',
        'Production deployment complexity: Requires careful setup of monitoring, security, and infrastructure management.',
        'Learning curve: Understanding DAGs, operators, and Airflow concepts takes time.',
        'Overhead for simple tasks: May be overkill for basic scheduling needs.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install \'apache-airflow==3.0.6\' --constraint "https://raw.githubusercontent.com/apache/airflow/constraints-3.0.6/constraints-3.10.txt"'
      },
      integrations: []
    },
    {
      id: 'argo',
      name: 'Argo Workflows',
      description:
        'Argo Workflows is an open-source, container-native workflow engine for orchestrating parallel jobs on Kubernetes, particularly suited for MLOps pipeline orchestration.',
      category: 'pipeline_orchestration',
      icon: '/icons/argo.378887ab.svg',
      url: 'https://argoproj.github.io/workflows/',
      websiteUrl: 'https://argoproj.github.io/workflows/',
      repoUrl: 'https://github.com/argoproj/argo-workflows',
      docsUrl: 'https://argo-workflows.readthedocs.io/en/latest/',
      useWhen: [
        'Running ML workflows on Kubernetes clusters.',
        'Orchestrating complex, multi-step ML pipelines.',
        'Need parallel execution of ML training jobs.',
        'Working with containerized ML workloads.',
        'Implementing CI/CD for ML models in Kubernetes environments.',
        'Managing compute-intensive ML jobs that require scaling.',
        'Building cloud-agnostic ML pipelines.',
        'Integrating with existing Kubernetes infrastructure.'
      ],
      watchOut: [
        'Kubernetes expertise required: Steep learning curve for non-Kubernetes users.',
        'YAML complexity: Workflows defined in YAML can become complex.',
        'Local debugging challenges: Requires Kubernetes for local development.',
        'Limited ML-specific features: Lacks experiment tracking, hyperparameter optimization.',
        'Configuration overhead: Requires additional tools (MLflow, etc.) for complete MLOps.',
        'Resource management: DevOps teams concerned about compute/storage scaling demands.'
      ],
      installation: {
        method: 'kubectl',
        code: 'kubectl create namespace argo && kubectl apply -n argo -f https://github.com/argoproj/argo-workflows/releases/download/v3.5.0/install.yaml'
      },
      integrations: []
    },
    {
      id: 'luigi',
      name: 'Luigi',
      description:
        'Luigi is a lightweight Python workflow scheduler built at Spotify that helps you build complex pipelines of batch jobs with dependency resolution and workflow management.',
      category: 'pipeline_orchestration',
      icon: '/icons/luigi.svg',
      url: 'https://github.com/spotify/luigi',
      websiteUrl: 'https://github.com/spotify/luigi',
      repoUrl: 'https://github.com/spotify/luigi',
      docsUrl: 'https://github.com/spotify/luigi',
      useWhen: [
        'Complex batch processing: When you need to run thousands of tasks organized in complex dependency graphs.',
        'Hadoop ecosystem integration: When working extensively with Hadoop, Hive, and Pig jobs.',
        'File system operations: When you need atomic file system operations for HDFS and local files.',
        'Simple dependency management: When you need lightweight workflow management with visual task tracking.',
        'Python-centric workflows: When your entire workflow can be defined in Python rather than XML.',
        'Traditional batch jobs: When focusing on sizable chunks of work rather than real-time processing.'
      ],
      watchOut: [
        'Spotify has moved on: Spotify itself no longer actively maintains Luigi and has migrated to Flyte for better visibility and automation.',
        'Architectural constraints: Without DAG support, developing highly complex pipelines with many dependencies and branches is extremely difficult.',
        'Limited scheduling: Lacks sophisticated scheduling capabilities and cloud-native features.',
        'Scalability limits: Not meant to scale beyond tens of thousands of jobs.',
        'Language limitations: Only supports Python, while many organizations need Java support.',
        "Real-time limitations: Focus is on batch processing, so it's less useful for near real-time pipelines.",
        'Basic monitoring: Limited monitoring and observability tools compared to modern alternatives.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install luigi'
      },
      integrations: []
    },
    {
      id: 'pipe-kubeflow',
      name: 'Kubeflow',
      description:
        'Open-source machine learning platform for Kubernetes that provides portable and scalable ML workflows. Offers comprehensive MLOps capabilities including pipeline orchestration, model serving, experiment tracking, and multi-framework support in cloud-native environments.',
      category: 'pipeline_orchestration',
      icon: '/icons/kubeflow.b23d7704.svg',
      url: 'https://www.kubeflow.org/',
      websiteUrl: 'https://www.kubeflow.org/',
      repoUrl: 'https://github.com/kubeflow/kubeflow',
      docsUrl: 'https://www.kubeflow.org/docs/',
      useWhen: [
        'Building portable ML workflows across different Kubernetes environments',
        'Need standardized ML pipeline orchestration with component reusability',
        'Multi-framework ML projects requiring unified platform (TensorFlow, PyTorch, XGBoost)',
        'Scaling ML workloads on Kubernetes with automated resource management',
        'Implementing MLOps practices with end-to-end lifecycle management',
        'Model serving with KServe for production-grade inference endpoints',
        'Organizations already invested in Kubernetes infrastructure',
        'Multi-cloud or hybrid deployments requiring platform consistency'
      ],
      watchOut: [
        'High complexity requiring Kubernetes expertise for setup and management',
        'Significant infrastructure overhead and resource requirements',
        'Steep learning curve for teams new to Kubernetes and cloud-native concepts',
        'Complex troubleshooting across distributed components and services',
        'Version compatibility issues between Kubeflow components and Kubernetes',
        'Limited local development experience compared to cloud deployments',
        'Security configuration complexity in multi-tenant environments',
        'Ongoing maintenance burden for cluster management and updates'
      ],
      installation: {
        method: 'kubectl',
        code: 'kubectl apply -k "github.com/kubeflow/pipelines/manifests/kustomize/env/dev?ref=$PIPELINE_VERSION"'
      },
      integrations: []
    },
    {
      id: 'pipe-kedro',
      name: 'Kedro',
      description:
        'Automate the steps of your ML experiments. Schedule automatic pipeline runs to retrain the model on new data.',
      category: 'pipeline_orchestration',
      icon: '/icons/kedro.6008c76a.svg'
    },
    {
      id: 'nextflow',
      name: 'Nextflow',
      description:
        'A workflow framework for creating scalable, portable, and reproducible computational pipelines based on dataflow programming principles. Designed for bioinformatics and data-intensive applications with strong containerization and cloud deployment support.',
      category: 'pipeline_orchestration',
      icon: '/icons/nextflow.svg',
      url: 'https://www.nextflow.io/',
      websiteUrl: 'https://www.nextflow.io/',
      repoUrl: 'https://github.com/nextflow-io/nextflow',
      docsUrl: 'https://www.nextflow.io/docs/latest/index.html',
      useWhen: [
        'Bioinformatics and genomics data processing workflows requiring reproducibility',
        'Scientific computing pipelines with complex data dependencies and parallelization needs',
        'Multi-environment deployments across local HPC, cloud, and container platforms',
        'Workflows requiring automatic resumption from failure points with checkpointing',
        'Cross-platform pipeline development supporting Docker, Singularity, and Kubernetes',
        'Research collaborations needing version-controlled, shareable computational workflows',
        'Data processing requiring integration with multiple compute environments and schedulers',
        "Pipelines leveraging the nf-core community's curated, peer-reviewed workflows"
      ],
      watchOut: [
        'Learning curve for teams unfamiliar with dataflow programming concepts',
        'Groovy-based DSL may be challenging for Python-centric data science teams',
        'Resource management complexity in heterogeneous computing environments',
        'Limited built-in support for real-time streaming data processing',
        'Debugging distributed workflows can be challenging across different execution platforms',
        'Configuration overhead for simple, linear data processing tasks',
        'Container dependency management requires additional expertise',
        'Performance optimization may require deep understanding of execution engines'
      ],
      installation: {
        method: 'curl',
        code: 'curl -s https://get.nextflow.io | bash'
      },
      integrations: []
    },
    {
      id: 'dagster',
      name: 'Dagster',
      description:
        'Dagster is an orchestration platform for developing, producing, and observing data assets.',
      category: 'pipeline_orchestration',
      icon: '/icons/dagster.1eb08458.svg',
      url: 'https://dagster.io/',
      websiteUrl: 'https://dagster.io/',
      repoUrl: 'https://github.com/dagster-io/dagster',
      docsUrl: 'https://docs.dagster.io/getting-started',
      useWhen: [
        'You want to create workflows as DAGs (Direct Acyclic Graphs).',
        'You need flexibility (manual, scheduled, modify individual jobs according to schedule) when running DAGs.',
        'You want to define inputs and output for individual jobs more explicitly to streamline data movement between tasks.',
        'You want an easy way to create dynamic workflows.',
        'You want to generate pipelines as Python code.',
        'You want to automate ML workflows.',
        'You want to separately abstract compute and storage.'
      ],
      watchOut: [],
      installation: {
        method: 'pip',
        code: 'pip install dagster dagit'
      },
      integrations: []
    },
    {
      id: 'beam',
      name: 'Apache Beam',
      description:
        'Automate the steps of your ML experiments. Schedule automatic pipeline runs to retrain the model on new data.',
      category: 'pipeline_orchestration',
      icon: '/icons/beam.a5f488b8.svg'
    },
    {
      id: 'zenml',
      name: 'ZenML',
      description:
        'ZenML is a unified, extensible, open-source MLOps framework for creating portable, production-ready MLOps pipelines that work across different infrastructure platforms.',
      category: 'pipeline_orchestration',
      icon: '/icons/zenml.84bd21d1.svg',
      url: 'https://www.zenml.io',
      websiteUrl: 'https://www.zenml.io',
      repoUrl: 'https://github.com/zenml-io/zenml',
      docsUrl: 'https://docs.zenml.io/',
      useWhen: [
        'Multi-cloud/Infrastructure agnostic deployments: When you need pipelines that can run on Kubernetes, AWS SageMaker, GCP Vertex AI, Kubeflow, Apache Airflow.',
        'Team collaboration: When data scientists, ML engineers, and MLOps developers need a single framework to collaborate effectively.',
        'Automated model deployment: When you want streamlined model deployment that automatically deploys models when defined as a pipeline.',
        'Complex ML workflows: When building sophisticated ML pipelines from classical ML to AI agents.',
        'Metadata tracking needs: When you need comprehensive tracking of pipelines, runs, components, and artifacts with a user-friendly dashboard.'
      ],
      watchOut: [
        'Learning curve complexity: Organizations face challenges transitioning from manual, ad-hoc ML workflows to scalable, automated MLOps practices.',
        'Infrastructure complexity: Managing multiple compute environments creates operational overhead, and Kubernetes integration can deliver "infinite YAML".',
        'Resource management: GPU cost observability issues in Kubernetes environments where tracking resource consumption becomes difficult.',
        'Scaling bottlenecks: Manual retraining processes, limited experimentation velocity due to setup overhead, and technical debt accumulation.',
        'Multi-persona challenges: Balancing powerful tools for advanced users while maintaining accessibility for those with limited technical backgrounds.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install "zenml[server]"'
      },
      integrations: []
    },
    {
      id: 'flyte',
      name: 'Flyte',
      description:
        'Flyte is a workflow automation platform for mission-critical data and machine learning processes at scale.',
      category: 'pipeline_orchestration',
      icon: '/icons/flyte.a73ea03f.svg',
      url: 'https://flyte.org/',
      websiteUrl: 'https://flyte.org/',
      repoUrl: 'https://github.com/flyteorg/flyte',
      docsUrl: 'https://docs.flyte.org/en/latest/getting_started/index.html',
      useWhen: [
        'You want to create reproducible ML pipelines for production.',
        'You want a fault-tolerant platform with built-in fault recovery functions.',
        'You want an open-source Kubernetes-native workflow automation platform.',
        'You want a cloud-agnostic framework expandable with other tools.',
        'You want Python, Java, and Scala SDK support.',
        'You want a platform that natively understands data flow between tasks.',
        'You want a reliable platform in edge case deployments and large-scale workflows.',
        'You want support for DAG or Steps based declaration of workflows.'
      ],
      watchOut: [],
      installation: {
        method: 'pip',
        code: 'pip install flytekit'
      },
      integrations: []
    },
    {
      id: 'prefect',
      name: 'Prefect',
      description:
        'Prefect is an open-source workflow management system designed for modern infrastructure.',
      category: 'pipeline_orchestration',
      icon: '/icons/prefect.9f12c3df.svg',
      url: 'https://www.prefect.io/',
      websiteUrl: 'https://www.prefect.io/',
      repoUrl: 'https://github.com/prefecthq/prefect',
      docsUrl: 'https://docs.prefect.io/core/',
      useWhen: [
        'You want to create workflows as DAGs (Direct Acyclic Graphs).',
        'You want to define workflows as standalone objects.',
        'You need fast scheduling of DAGs.',
        'You want to explicitly define input and output for individual jobs to streamline data movement between tasks.',
        'You want to cache and persist inputs and outputs.',
        'You want a transform function that accepts both reference data (batch) and live data.',
        'You want an easy way to create dynamic workflows.',
        'You want to generate pipelines as Python code.',
        'You want to automate ML workflows.'
      ],
      watchOut: [
        'The abstraction of computing and storage is limited, making local development tricky with large datasets.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install prefect'
      },
      integrations: []
    },
    {
      id: 'pipe-ray',
      name: 'Ray',
      description:
        'Automate the steps of your ML experiments. Schedule automatic pipeline runs to retrain the model on new data.',
      category: 'pipeline_orchestration',
      icon: '/icons/ray.dae6468e.svg'
    },
    {
      id: 'pipe-dvc',
      name: 'DVC',
      description:
        'Automate the steps of your ML experiments. Schedule automatic pipeline runs to retrain the model on new data.',
      category: 'pipeline_orchestration',
      icon: '/icons/dvc.168eef99.svg'
    },
    {
      id: 'pipe-polyaxon',
      name: 'Polyaxon',
      description:
        'Automate the steps of your ML experiments. Schedule automatic pipeline runs to retrain the model on new data.',
      category: 'pipeline_orchestration',
      icon: '/icons/polyaxon.326d1db6.svg'
    },
    {
      id: 'pipe-clearml',
      name: 'ClearML',
      description:
        'Automate the steps of your ML experiments. Schedule automatic pipeline runs to retrain the model on new data.',
      category: 'pipeline_orchestration',
      icon: '/icons/clearml.73e47861.svg'
    },
    {
      id: 'pipe-pachyderm',
      name: 'Pachyderm',
      description:
        'Automate the steps of your ML experiments. Schedule automatic pipeline runs to retrain the model on new data.',
      category: 'pipeline_orchestration',
      icon: '/icons/pachyderm.9a34e8cf.svg'
    },
    {
      id: 'orchest',
      name: 'Orchest',
      description:
        'A visual pipeline builder for data science workflows that enabled interactive development without DAGs. **Note: Project is no longer actively developed** - creators recommend Apache Airflow for robust workflow solutions.',
      category: 'pipeline_orchestration',
      icon: '/icons/orchest.a781163f.svg',
      url: 'https://github.com/orchest/orchest',
      websiteUrl: 'https://github.com/orchest/orchest',
      repoUrl: 'https://github.com/orchest/orchest',
      docsUrl: 'https://docs.orchest.io/',
      useWhen: [
        'Legacy support for existing Orchest pipelines (maintenance mode only)',
        'Educational purposes to understand visual pipeline concepts',
        'Prototype development before migrating to actively maintained alternatives',
        'Teams evaluating visual pipeline builders should consider alternatives like Apache Airflow',
        'Converting existing Orchest workflows to modern orchestration platforms',
        'Understanding pipeline visualization concepts before adopting production tools',
        'Historical analysis of visual pipeline building approaches',
        'Research into discontinued MLOps tool architectures'
      ],
      watchOut: [
        '**CRITICAL: No longer actively developed** - not suitable for new projects',
        'Security vulnerabilities will not receive updates or patches',
        'No community support or maintenance for bug fixes',
        'Integration with modern tools and frameworks will degrade over time',
        'Documentation may become outdated and inaccessible',
        'Docker images may become incompatible with newer systems',
        'Migration path to alternative solutions required for production workloads',
        'Risk of data lock-in with proprietary pipeline formats'
      ],
      installation: {
        method: 'docker',
        code: 'git clone https://github.com/orchest/orchest.git && cd orchest ./orchest install (deprecated)'
      },
      integrations: []
    },
    {
      id: 'mlrun',
      name: 'MLRun',
      description:
        'Automate the steps of your ML experiments. Schedule automatic pipeline runs to retrain the model on new data.',
      category: 'pipeline_orchestration',
      icon: '/icons/mlrun.svg'
    },
    {
      id: 'jenkins',
      name: 'Jenkins',
      description:
        'A Java-based open-source automation server that provides robust CI/CD pipeline capabilities for MLOps workflows. Offers extensive plugin ecosystem, flexible pipeline configuration, and strong integration with containerization and cloud platforms for machine learning model deployment.',
      category: 'pipeline_orchestration',
      icon: '/icons/jenkins.e7ff4f38.svg',
      url: 'https://www.jenkins.io/',
      websiteUrl: 'https://www.jenkins.io/',
      repoUrl: 'https://github.com/jenkinsci/jenkins',
      docsUrl: 'https://www.jenkins.io/doc/',
      useWhen: [
        'Implementing CI/CD pipelines for ML model training, testing, and deployment',
        'Automating model retraining workflows triggered by data changes or schedules',
        'Integrating ML workflows with existing enterprise DevOps infrastructure',
        'Multi-stage model deployment requiring approval gates and rollback capabilities',
        'Complex ML pipelines requiring integration with diverse tools and cloud services',
        'Organizations requiring on-premises automation server with full control',
        'Batch model training and evaluation workflows with distributed computing needs',
        'MLOps workflows requiring detailed audit trails and compliance reporting'
      ],
      watchOut: [
        'Significant setup and configuration overhead compared to cloud-native solutions',
        'Requires Java expertise for advanced customization and troubleshooting',
        'Security management responsibility falls on organization (patches, access control)',
        'Plugin compatibility issues can arise with frequent updates',
        'Resource intensive for simple ML workflows that could use lightweight alternatives',
        'UI/UX less modern compared to contemporary CI/CD platforms',
        'Scaling challenges for high-frequency ML training jobs without proper architecture',
        'Maintenance overhead for plugin updates and system administration'
      ],
      installation: {
        method: 'multiple',
        code: 'Platform-specific (e.g., apt-get install jenkins for Ubuntu)'
      },
      integrations: []
    },
    {
      id: 'kestra',
      name: 'Kestra',
      description:
        'An open-source, infinitely-scalable orchestration platform that enables declarative workflow definition using YAML. Designed for event-driven and scheduled data workflows with rich plugin ecosystem and multi-language support for MLOps automation.',
      category: 'pipeline_orchestration',
      icon: '/icons/kestra.d1ea7b6e.svg',
      url: 'https://kestra.io/',
      websiteUrl: 'https://kestra.io/',
      repoUrl: 'https://github.com/kestra-io/kestra',
      docsUrl: 'https://kestra.io/docs/',
      useWhen: [
        'Declarative workflow definition requiring minimal coding and YAML-based configuration',
        'Event-driven MLOps pipelines triggered by data changes, model updates, or external events',
        'Multi-language ML workflows integrating Python, R, Julia, and other data science languages',
        'Scalable data orchestration requiring millions of workflow executions',
        'Teams preferring visual pipeline editor with infrastructure-as-code practices',
        'Dynamic resource provisioning for compute-heavy ML tasks using cloud services',
        'MLOps workflows requiring integration with diverse data sources and APIs',
        'Organizations needing both scheduled and real-time data processing capabilities'
      ],
      watchOut: [
        'Relatively new platform with smaller community compared to established alternatives',
        'Learning curve for teams transitioning from code-first to declarative approaches',
        'Limited third-party integrations compared to mature orchestration platforms',
        'Documentation gaps for complex enterprise deployment scenarios',
        "Plugin ecosystem still developing compared to Airflow's extensive library",
        'Performance characteristics not yet proven at massive enterprise scale',
        'Requires minimum 4GiB RAM and 2vCPU resources for proper operation',
        'Docker-in-Docker limitations in certain cloud environments like AWS Fargate'
      ],
      installation: {
        method: 'docker',
        code: 'docker run -p 8080:8080 kestra/kestra:latest server standalone'
      },
      integrations: []
    }
  ],

  artifact_tracking: [
    {
      id: 'art-modeldb',
      name: 'ModelDB',
      description:
        'Store and keep track of datasets, models, and evaluation across your experiments and pipelines.',
      category: 'artifact_tracking',
      icon: '/icons/modeldb.svg'
    },
    {
      id: 'art-kubeflow',
      name: 'Kubeflow',
      description:
        'Open-source machine learning platform for Kubernetes that provides portable and scalable ML workflows. Offers comprehensive MLOps capabilities including pipeline orchestration, model serving, experiment tracking, and multi-framework support in cloud-native environments.',
      category: 'artifact_tracking',
      icon: '/icons/kubeflow.b23d7704.svg',
      url: 'https://www.kubeflow.org/',
      websiteUrl: 'https://www.kubeflow.org/',
      repoUrl: 'https://github.com/kubeflow/kubeflow',
      docsUrl: 'https://www.kubeflow.org/docs/',
      useWhen: [
        'Building portable ML workflows across different Kubernetes environments',
        'Need standardized ML pipeline orchestration with component reusability',
        'Multi-framework ML projects requiring unified platform (TensorFlow, PyTorch, XGBoost)',
        'Scaling ML workloads on Kubernetes with automated resource management',
        'Implementing MLOps practices with end-to-end lifecycle management',
        'Model serving with KServe for production-grade inference endpoints',
        'Organizations already invested in Kubernetes infrastructure',
        'Multi-cloud or hybrid deployments requiring platform consistency'
      ],
      watchOut: [
        'High complexity requiring Kubernetes expertise for setup and management',
        'Significant infrastructure overhead and resource requirements',
        'Steep learning curve for teams new to Kubernetes and cloud-native concepts',
        'Complex troubleshooting across distributed components and services',
        'Version compatibility issues between Kubeflow components and Kubernetes',
        'Limited local development experience compared to cloud deployments',
        'Security configuration complexity in multi-tenant environments',
        'Ongoing maintenance burden for cluster management and updates'
      ],
      installation: {
        method: 'kubectl',
        code: 'kubectl apply -k "github.com/kubeflow/pipelines/manifests/kustomize/env/dev?ref=$PIPELINE_VERSION"'
      },
      integrations: []
    },
    {
      id: 'art-mlflow',
      name: 'MLflow',
      description:
        'Store and keep track of datasets, models, and evaluation across your experiments and pipelines.',
      category: 'artifact_tracking',
      icon: '/icons/mlflow.0f53ee8c.svg'
    },
    {
      id: 'art-weights-biases',
      name: 'Weights & Biases',
      description:
        'Weights & Biases is a tool to track and visualize your machine learning pipeline pieces, from datasets to production models.',
      category: 'artifact_tracking',
      icon: '/icons/wandb.c05fb0a7.svg',
      url: 'https://wandb.ai/site',
      websiteUrl: 'https://wandb.ai/site',
      repoUrl: 'https://github.com/wandb/client',
      docsUrl: 'https://docs.wandb.ai/',
      useWhen: [
        'You want a lightweight Python library specialized in experiment tracking, artifact tracking, and visualization.',
        'You want to get started quickly with a free (for personal use) hosted platform.',
        'You want built-in integrations with popular ML Frameworks (Keras, Fastai, etc.), repositories (Hugging Face, XGBoost, etc.), and tools (Kubeflow Pipelines, OpenAI Gym, etc.)',
        'You want project management and collaboration tools for machine learning projects.'
      ],
      watchOut: [
        'Only the client is open-source and requires signing up.',
        'The client covers data logging to Weights & Biases, data queries, and downloads of your logged data.',
        'The free plan is only for personal projects.',
        'Self-hosted deployment requires an Enterprise plan.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install wandb'
      },
      integrations: []
    },
    {
      id: 'art-neptune',
      name: 'Neptune',
      description:
        'Store and keep track of datasets, models, and evaluation across your experiments and pipelines.',
      category: 'artifact_tracking',
      icon: '/icons/neptune.719fd442.svg'
    },
    {
      id: 'art-polyaxon',
      name: 'Polyaxon',
      description:
        'Store and keep track of datasets, models, and evaluation across your experiments and pipelines.',
      category: 'artifact_tracking',
      icon: '/icons/polyaxon.326d1db6.svg'
    },
    {
      id: 'art-clearml',
      name: 'ClearML',
      description:
        'ClearML is an end-to-end platform with an auto-magical suite of tools to streamline your ML workflow.',
      category: 'artifact_tracking',
      icon: '/icons/clearml.73e47861.svg',
      url: 'https://clear.ml/',
      websiteUrl: 'https://clear.ml/',
      repoUrl: 'https://github.com/allegroai/clearml',
      docsUrl: 'https://clear.ml/docs/latest/docs/',
      useWhen: [
        'You want an all-in-one tool that tracks experiments (including hyperparameters, data, artifacts, and models), handles pipelines and serves models.',
        'You prefer to use a Python API for creating and configuring resources.'
      ],
      watchOut: [],
      installation: {
        method: 'pip',
        code: 'pip install clearml-agent'
      },
      integrations: []
    },
    {
      id: 'art-pachyderm',
      name: 'Pachyderm',
      description: 'Pachyderm is a tool for data versioning and pipelines for MLOps.',
      category: 'artifact_tracking',
      icon: '/icons/pachyderm.9a34e8cf.svg',
      url: 'https://www.pachyderm.com/',
      websiteUrl: 'https://www.pachyderm.com/',
      repoUrl: 'https://github.com/pachyderm/pachyderm',
      docsUrl: 'https://docs.pachyderm.com/latest/',
      useWhen: [
        'You would like a tool that handles data versioning and pipeline automation.',
        'You want a language-agnostic tool that uses JSON or YAML to create and configure resources.'
      ],
      watchOut: [],
      installation: {
        method: 'helm',
        code: 'helm repo add pach https://helm.pachyderm.com\nhelm repo update\nhelm install pachd pach/pachyderm --set deployTarget=LOCAL'
      },
      integrations: []
    },
    {
      id: 'art-mlrun',
      name: 'MLRun',
      description:
        'Store and keep track of datasets, models, and evaluation across your experiments and pipelines.',
      category: 'artifact_tracking',
      icon: '/icons/mlrun.svg'
    },
    {
      id: 'art-dagshub',
      name: 'DagsHub',
      description:
        'Store and keep track of datasets, models, and evaluation across your experiments and pipelines.',
      category: 'artifact_tracking',
      icon: '/icons/dagshub.svg'
    }
  ],

  model_registry: [
    {
      id: 'bentoml',
      name: 'BentoML',
      description:
        'BentoML is an open platform that simplifies ML model deployment and enables you to serve your models at a production scale in minutes.',
      category: 'model_registry',
      icon: '/icons/bentoml.0a56dfe1.svg',
      url: 'https://www.bentoml.com/',
      websiteUrl: 'https://www.bentoml.com/',
      repoUrl: 'https://github.com/bentoml/BentoML',
      docsUrl: 'https://docs.bentoml.org/',
      useWhen: [
        'You want a serving framework that supports a wide range of ML frameworks.',
        'You want an end-to-end model serving solution which provides a model API server, model packaging, management, deployment automation, and offline batch serving features.',
        'You want to do preprocessing and post-processing in serving endpoints.',
        'You want built-in model monitoring features.',
        'You want support for adaptive micro-batching.',
        'You want model registry features through integration with Yatai.',
        'You want to run on Google Colab.'
      ],
      watchOut: [
        'Currently, there is no multi-language support. Only Python is supported.',
        'BentoML does not handle horizontal scaling. Users have to separately build Kubernetes-based solutions or use cloud platforms like AWS Lambda, AWS ECS, and Google Cloud Run to scale served models.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install bentoml'
      },
      integrations: []
    },
    {
      id: 'reg-mlflow',
      name: 'MLflow',
      description:
        'MLflow is an open-source platform for managing the end-to-end machine learning lifecycle.',
      category: 'model_registry',
      icon: '/icons/mlflow.0f53ee8c.svg',
      url: 'https://mlflow.org/',
      websiteUrl: 'https://mlflow.org/',
      repoUrl: 'https://github.com/mlflow/mlflow/',
      docsUrl: 'https://mlflow.org/docs/latest/index.html',
      useWhen: [
        'You want to organize projects and runs and track your experiments (manual and automatic logging), artifacts, and data.',
        'You want to keep track of your models with a model registry and serve them using integrations.',
        'You want a platform that is non-opinionated and gives you flexibility.'
      ],
      watchOut: [
        'MLflow can track data but provides limited capability in terms of data versioning. You may have to integrate other tools.',
        "MLflow's built-in model serving is quite limited. You will likely need to integrate with a third-party tool for a robust solution."
      ],
      installation: {
        method: 'pip',
        code: 'pip install mlflow'
      },
      integrations: []
    },
    {
      id: 'reg-determined',
      name: 'Determined',
      description: 'Store your models in a centralized repository to track and deploy them.',
      category: 'model_registry',
      icon: '/icons/determined.34aaa33a.svg'
    },
    {
      id: 'reg-weights-biases',
      name: 'Weights & Biases',
      description: 'Store your models in a centralized repository to track and deploy them.',
      category: 'model_registry',
      icon: '/icons/wandb.c05fb0a7.svg'
    },
    {
      id: 'reg-neptune',
      name: 'Neptune',
      description: 'Store your models in a centralized repository to track and deploy them.',
      category: 'model_registry',
      icon: '/icons/neptune.719fd442.svg'
    },
    {
      id: 'reg-clearml',
      name: 'ClearML',
      description: 'Store your models in a centralized repository to track and deploy them.',
      category: 'model_registry',
      icon: '/icons/clearml.73e47861.svg'
    },
    {
      id: 'reg-mlrun',
      name: 'MLRun',
      description: 'Store your models in a centralized repository to track and deploy them.',
      category: 'model_registry',
      icon: '/icons/mlrun.svg'
    },
    {
      id: 'reg-dagshub',
      name: 'DagsHub',
      description: 'Store your models in a centralized repository to track and deploy them.',
      category: 'model_registry',
      icon: '/icons/dagshub.svg'
    }
  ],

  model_serving: [
    {
      id: 'triton',
      name: 'Triton Inference Server',
      description:
        'NVIDIA Triton Inference Server is an open-source AI inference serving platform that standardizes AI model deployment across different workloads with high-performance inference.',
      category: 'model_serving',
      icon: '/icons/nvidia.b35989a4.svg',
      url: 'https://developer.nvidia.com/nvidia-triton-inference-server',
      websiteUrl: 'https://developer.nvidia.com/nvidia-triton-inference-server',
      repoUrl: 'https://github.com/triton-inference-server/server',
      docsUrl:
        'https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/index.html',
      useWhen: [
        'You need to deploy models from multiple different AI frameworks in a unified manner.',
        'High-performance inference is critical, especially on NVIDIA GPU infrastructure.',
        "You're building real-time, batch, or streaming inference applications.",
        'You need to create ensemble models or AI pipelines connecting multiple models.',
        'You want to standardize model deployment across cloud and on-premises environments.',
        'Your team is comfortable with Docker-based deployments and has deep learning infrastructure expertise.',
        'You need support for both C++ and Python client libraries with gRPC integration.'
      ],
      watchOut: [
        'Throughput limitations: Documented bottleneck of approximately 50k-60k inferences per second per Triton server instance.',
        'Windows limitations: Beta Windows release has limited functionality, non-optimized performance, and latency issues.',
        'Learning curve: Complex setup and configuration, especially for users unfamiliar with deep learning infrastructure.',
        'Real-time performance challenges: Achieving sub-200ms latency can be difficult depending on model complexity.',
        'Security considerations: Requires careful attention to secure deployment practices.',
        'CUDA compatibility issues: CuPy has problems with CUDA 13 Device API in multithreaded contexts.',
        'Resource management complexity: Distributed scaling introduces challenges in data synchronization and consistency.',
        'Limited language support: Currently supports only C++ and Python client libraries.'
      ],
      installation: {
        method: 'docker',
        code: 'docker run --gpus=1 --rm -p8000:8000 -p8001:8001 -p8002:8002 -v/path/to/models:/models nvcr.io/nvidia/tritonserver:latest-py3 tritonserver --model-repository=/models'
      },
      integrations: []
    },
    {
      id: 'seldoncore',
      name: 'Seldon Core',
      description:
        'Seldon Core 2 is a Kubernetes-native MLOps and LLMOps framework for deploying machine learning models and Large Language Model systems at scale.',
      category: 'model_serving',
      icon: '/icons/seldoncore.36bf93ec.svg',
      url: 'https://docs.seldon.ai/seldon-core-2',
      websiteUrl: 'https://docs.seldon.ai/seldon-core-2',
      repoUrl: 'https://github.com/SeldonIO/seldon-core',
      docsUrl: 'https://docs.seldon.ai/seldon-core-2',
      useWhen: [
        'You need a Kubernetes-native solution for ML model deployment.',
        "You're deploying both traditional ML models and Large Language Models (LLMs).",
        'You require advanced MLOps features like A/B testing, canary deployments, and experiment routing.',
        'Your infrastructure spans multiple environments (on-premise, hybrid, multi-cloud).',
        'You need sophisticated monitoring and observability for ML systems with auditable prediction data.',
        'You want to reduce infrastructure costs through multi-model serving and resource optimization.',
        'You have a team with strong Kubernetes and MLOps expertise.',
        'You need to compose complex AI applications through pipelines.'
      ],
      watchOut: [
        'Auto-scaling limitations: Requires additional setup (like KEDA) and does not support scaling to zero when idle.',
        'Kubernetes expertise required: Not suitable for companies with limited MLOps capabilities.',
        'Community support: Only average community support available compared to more established platforms.',
        'Configuration complexity: Common deployment issues include incorrect configuration settings and accessibility problems.',
        'Local model deployment issues: Problems with syncing/copying local models to persistent volumes.',
        'Network timing issues: Istio VirtualServices may not be ready immediately after container startup.',
        'Metrics integration challenges: Issues with integrating Triton metrics and port recognition.',
        'Resource-intensive operations: May exceed allocated limits if not properly configured.'
      ],
      installation: {
        method: 'helm',
        code: 'helm repo add seldon-charts https://seldonio.github.io/helm-charts\nhelm install seldon-core-v2-crds seldon-charts/seldon-core-v2-crds\nhelm install seldon-core-v2 seldon-charts/seldon-core-v2-setup --namespace seldon-mesh'
      },
      integrations: []
    },
    {
      id: 'serve-bentoml',
      name: 'BentoML',
      description:
        'BentoML is an open platform that simplifies ML model deployment and enables you to serve your models at a production scale in minutes.',
      category: 'model_serving',
      icon: '/icons/bentoml.0a56dfe1.svg',
      url: 'https://www.bentoml.com/',
      websiteUrl: 'https://www.bentoml.com/',
      repoUrl: 'https://github.com/bentoml/BentoML',
      docsUrl: 'https://docs.bentoml.org/',
      useWhen: [
        'You want a serving framework that supports a wide range of ML frameworks.',
        'You want an end-to-end model serving solution which provides a model API server, model packaging, management, deployment automation, and offline batch serving features.',
        'You want to do preprocessing and post-processing in serving endpoints.',
        'You want built-in model monitoring features.',
        'You want support for adaptive micro-batching.',
        'You want model registry features through integration with Yatai.',
        'You want to run on Google Colab.'
      ],
      watchOut: [
        'Currently, there is no multi-language support. Only Python is supported.',
        'BentoML does not handle horizontal scaling. Users have to separately build Kubernetes-based solutions or use cloud platforms like AWS Lambda, AWS ECS, and Google Cloud Run to scale served models.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install bentoml'
      },
      integrations: []
    },
    {
      id: 'tensorflow-serving',
      name: 'TensorFlow Serving',
      description:
        'A flexible, high-performance serving system designed specifically for machine learning models in production environments. Provides efficient model version management, RESTful and gRPC APIs, and seamless integration with TensorFlow ecosystem for scalable ML inference.',
      category: 'model_serving',
      icon: '/icons/tensorflow.b4d34a5e.svg',
      url: 'https://www.tensorflow.org/tfx/guide/serving',
      websiteUrl: 'https://www.tensorflow.org/tfx/guide/serving',
      repoUrl: 'https://github.com/tensorflow/serving',
      docsUrl: 'https://www.tensorflow.org/tfx/guide/serving',
      useWhen: [
        'Production deployment of TensorFlow models requiring high-performance inference',
        'Model version management with automated rollout and rollback capabilities',
        'Serving multiple model versions simultaneously for A/B testing and gradual deployment',
        'High-throughput inference workloads requiring optimized batch processing',
        'Microservices architecture requiring containerized ML model serving',
        'Real-time inference applications needing low-latency gRPC endpoints',
        'MLOps pipelines requiring separation between model training and serving code',
        'Kubernetes-based deployments requiring scalable, cloud-native model serving'
      ],
      watchOut: [
        'Limited to TensorFlow models - not suitable for PyTorch, scikit-learn, or other frameworks',
        'Complex configuration for advanced use cases like custom preprocessing',
        'Learning curve for gRPC API compared to simple REST endpoints',
        'Resource overhead may be excessive for simple models or low-traffic scenarios',
        'Monitoring and observability require additional tooling and configuration',
        'Version management complexity increases with multiple models and environments',
        'Custom business logic requires writing custom ops or external preprocessing',
        'Debugging inference issues can be challenging in distributed deployments'
      ],
      installation: {
        method: 'docker',
        code: 'docker pull tensorflow/serving'
      },
      integrations: []
    },
    {
      id: 'kserve',
      name: 'KServe',
      description:
        'KServe is a Kubernetes-native platform for deploying both generative and predictive AI inference at scale, supporting OpenAI-compatible protocols and multi-framework deployment.',
      category: 'model_serving',
      icon: '/icons/kserve.ce0005de.svg',
      url: 'https://kserve.github.io/website/',
      websiteUrl: 'https://kserve.github.io/website/',
      repoUrl: 'https://github.com/kserve/kserve',
      docsUrl: 'https://kserve.github.io/website/docs/',
      useWhen: [
        'You need a unified platform for both generative AI (LLMs) and predictive AI models.',
        'You want OpenAI-compatible inference protocols for LLM deployment.',
        "You're deploying models across multiple frameworks (TensorFlow, PyTorch, scikit-learn, etc.).",
        'You need enterprise-scale workload handling with Kubernetes-native design.',
        'You want intelligent request routing and advanced deployment options like canary deployments.',
        'You require model explainability and advanced monitoring capabilities.',
        'You need cost-efficient auto-scaling and request-based scaling.',
        'You want native integration with Hugging Face models and GPU acceleration.',
        'Your team has strong Kubernetes expertise and wants a CNCF-backed solution.'
      ],
      watchOut: [
        'Large model deployment timeouts: Takes longer than 5 minutes to deploy large models, causing container termination issues.',
        "Auto-scaling limitations: Needs additional setup (KEDA) and doesn't support scaling to zero when idle.",
        'Model transition issues: InferenceServices can get stuck in "InProgress" status indefinitely.',
        'Multi-node/Multi-GPU limitations: Current design is insufficient for multi-node/multi-GPU use cases.',
        'Monitoring gaps: Lacks comprehensive built-in model monitoring tools, requiring external solutions.',
        'Community support: Only average community support compared to more established platforms.',
        'Complex setup requirements: Requires significant Kubernetes expertise.',
        'PyTorch engineering effort: Teams running PyTorch models require additional engineering work.',
        'Resource management complexity: Scaling behavior issues, especially with Prometheus metrics integration.'
      ],
      installation: {
        method: 'kubectl',
        code: 'curl -s "https://raw.githubusercontent.com/kserve/kserve/release-0.15/hack/quick_install.sh" | bash'
      },
      integrations: []
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      description:
        'FastAPI is a modern, high-performance web framework for building APIs with Python.',
      category: 'model_serving',
      icon: '/icons/fastapi.svg',
      url: 'https://fastapi.tiangolo.com/',
      websiteUrl: 'https://fastapi.tiangolo.com/',
      repoUrl: 'https://github.com/tiangolo/fastapi',
      docsUrl: 'https://fastapi.tiangolo.com/',
      useWhen: [
        'You want a simple syntax that makes creating endpoints fast.',
        'You want to have automatic API docs based on Swagger or ReDoc.'
      ],
      watchOut: [
        'FastAPI does not provide model management features as dedicated model servers do, such as model versioning, scaling, and A/B testing.',
        'FastAPI creates APIs, but it does not come with a webserver. You will need to deploy it with a Python webserver.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install fastapi'
      },
      integrations: []
    },
    {
      id: 'torchserve',
      name: 'TorchServe',
      description:
        'A flexible and easy-to-use tool for serving and scaling PyTorch models in production environments. Supports both eager mode and TorchScript models with built-in multi-worker scaling, metrics collection, and seamless API access for high-performance inference.',
      category: 'model_serving',
      icon: '/icons/pytorch.796df496.svg',
      url: 'https://docs.pytorch.org/serve/',
      websiteUrl: 'https://pytorch.org/serve/',
      repoUrl: 'https://github.com/pytorch/serve',
      docsUrl: 'https://docs.pytorch.org/serve/',
      useWhen: [
        'Production deployment of PyTorch models with optimized inference performance',
        'Multi-model serving requiring independent scaling and resource allocation',
        'Complex ML workflows with interdependent models using TorchServe Workflows',
        'High-throughput inference requiring GPU acceleration and batch processing',
        'MLOps pipelines needing model versioning and A/B testing capabilities',
        'Containerized deployments requiring Docker and Kubernetes integration',
        'Applications requiring custom preprocessing and postprocessing logic',
        'Production monitoring requiring Prometheus metrics and custom observability'
      ],
      watchOut: [
        'Requires Java 11 runtime environment in addition to Python dependencies',
        'Model archiving process (MAR files) adds complexity compared to simple model files',
        'Configuration complexity for multi-GPU deployments and worker scaling',
        'Limited community resources compared to TensorFlow Serving ecosystem',
        'Debugging custom handlers and preprocessing logic can be challenging',
        'Performance tuning requires understanding of worker threads and batch configurations',
        'Memory management complexity with large models and concurrent requests',
        'Integration with non-PyTorch components requires additional wrapper development'
      ],
      installation: {
        method: 'conda',
        code: 'conda install torchserve torch-model-archiver -c pytorch'
      },
      integrations: []
    },
    {
      id: 'serve-ray',
      name: 'Ray',
      description:
        'Ray is an open-source tool that makes it simple to scale compute-intensive Python workloads.',
      category: 'model_serving',
      icon: '/icons/ray.dae6468e.svg',
      url: 'https://www.ray.io/',
      websiteUrl: 'https://www.ray.io/',
      repoUrl: 'https://github.com/ray-project/ray',
      docsUrl: 'https://docs.ray.io/en/latest/',
      useWhen: [
        'You want to parallelize your machine learning computation across several machines.',
        'You want a general-purpose distributed computing library that supports heterogeneous workloads and is not restricted to structured data.',
        'You want to seamlessly scale your code from your local machine to a cluster.',
        'You want high-level libraries that support model training, hyperparameter tuning, building pipelines, and serving models.'
      ],
      watchOut: [],
      installation: {
        method: 'pip',
        code: 'pip install ray'
      },
      integrations: []
    },
    {
      id: 'serve-mlflow',
      name: 'MLflow',
      description:
        'MLflow is an open-source platform for managing the end-to-end machine learning lifecycle.',
      category: 'model_serving',
      icon: '/icons/mlflow.0f53ee8c.svg',
      url: 'https://mlflow.org/',
      websiteUrl: 'https://mlflow.org/',
      repoUrl: 'https://github.com/mlflow/mlflow/',
      docsUrl: 'https://mlflow.org/docs/latest/index.html',
      useWhen: [
        'You want to organize projects and runs and track your experiments (manual and automatic logging), artifacts, and data.',
        'You want to keep track of your models with a model registry and serve them using integrations.',
        'You want a platform that is non-opinionated and gives you flexibility.'
      ],
      watchOut: [
        'MLflow can track data but provides limited capability in terms of data versioning. You may have to integrate other tools.',
        "MLflow's built-in model serving is quite limited. You will likely need to integrate with a third-party tool for a robust solution."
      ],
      installation: {
        method: 'pip',
        code: 'pip install mlflow'
      },
      integrations: []
    },
    {
      id: 'serve-clearml',
      name: 'ClearML',
      description:
        'ClearML is an end-to-end platform with an auto-magical suite of tools to streamline your ML workflow.',
      category: 'model_serving',
      icon: '/icons/clearml.73e47861.svg',
      url: 'https://clear.ml/',
      websiteUrl: 'https://clear.ml/',
      repoUrl: 'https://github.com/allegroai/clearml',
      docsUrl: 'https://clear.ml/docs/latest/docs/',
      useWhen: [
        'You want an all-in-one tool that tracks experiments (including hyperparameters, data, artifacts, and models), handles pipelines and serves models.',
        'You prefer to use a Python API for creating and configuring resources.'
      ],
      watchOut: [],
      installation: {
        method: 'pip',
        code: 'pip install clearml-agent'
      },
      integrations: []
    },
    {
      id: 'nuclio',
      name: 'Nuclio',
      description:
        'A high-performance serverless computing platform designed for data-intensive and compute-intensive workloads. Provides 10-100x faster execution than traditional frameworks with built-in support for machine learning, real-time analytics, and event-driven architectures.',
      category: 'model_serving',
      icon: '/icons/nuclio.svg',
      url: 'https://nuclio.io/',
      websiteUrl: 'https://nuclio.io/',
      repoUrl: 'https://github.com/nuclio/nuclio',
      docsUrl: 'https://nuclio.io/docs/',
      useWhen: [
        'High-performance ML model serving requiring extremely low latency and high throughput',
        'Real-time inference applications processing hundreds of thousands of requests per second',
        'Event-driven ML workflows triggered by data streams, IoT devices, or message queues',
        'GPU-accelerated ML workloads requiring serverless scaling and resource efficiency',
        'Integration with MLRun framework for complete MLOps lifecycle management',
        'Jupyter notebook-based development requiring seamless serverless deployment',
        'Data processing pipelines requiring 13+ protocol support (HTTP, Kafka, Kinesis, etc.)',
        'Scientific computing workloads requiring unlimited execution time and elastic scaling'
      ],
      watchOut: [
        'Learning curve for teams unfamiliar with serverless computing paradigms',
        'Limited ecosystem compared to AWS Lambda or Google Cloud Functions',
        'Documentation could be more comprehensive for enterprise deployment scenarios',
        'Vendor lock-in risk when deeply integrated with Iguazio or MLRun platforms',
        'Cold start times may impact latency-sensitive applications',
        'Debugging distributed serverless functions can be complex',
        'Cost optimization requires careful monitoring of resource usage patterns',
        'Integration complexity with existing enterprise infrastructure and security policies'
      ],
      installation: {
        method: 'docker',
        code: 'docker run -p 8070:8070 -v /var/run/docker.sock:/var/run/docker.sock --name nuclio-dashboard quay.io/nuclio/dashboard:stable-amd64'
      },
      integrations: []
    },
    {
      id: 'serve-mlrun',
      name: 'MLRun',
      description:
        'Open-source MLOps orchestration framework that provides automated pipeline management, real-time model serving, and feature store capabilities. Enables serverless ML deployment on Kubernetes with comprehensive monitoring and drift detection.',
      category: 'model_serving',
      icon: '/icons/mlrun.svg',
      url: 'https://www.iguazio.com/open-source/mlrun/',
      websiteUrl: 'https://www.iguazio.com/open-source/mlrun/',
      repoUrl: 'https://github.com/mlrun/mlrun',
      docsUrl: 'https://docs.mlrun.org/',
      useWhen: [
        'Deploying ML models with auto-scaling serverless functions',
        'Building end-to-end ML pipelines with experiment tracking',
        'Real-time inference with streaming data integration (Kafka, Kinesis)',
        'Feature engineering and sharing across training and serving',
        'Model monitoring with automated drift detection at scale',
        'Converting notebook code to production pipelines with minimal effort',
        'Kubernetes-based ML workload orchestration and management',
        'Enterprise MLOps requiring comprehensive model lifecycle management'
      ],
      watchOut: [
        'Steep learning curve for teams new to Kubernetes and serverless concepts',
        'Requires Kubernetes cluster for full functionality and scalability',
        'Complex setup and configuration for on-premises deployments',
        'Resource overhead from Kubernetes infrastructure requirements',
        'Dependency on Iguazio ecosystem for enterprise features',
        'Limited documentation for advanced customization scenarios',
        "Potential vendor lock-in with Iguazio's commercial platform",
        'Performance tuning complexity for high-throughput serving scenarios'
      ],
      installation: {
        method: 'pip',
        code: 'pip install mlrun'
      },
      integrations: []
    }
  ],

  model_monitoring: [
    {
      id: 'prometheus',
      name: 'Prometheus',
      description: 'Prometheus is an open-source system monitoring and alerting toolkit.',
      category: 'model_monitoring',
      icon: '/icons/prometheus.6b2dff7e.svg',
      url: 'https://prometheus.io/',
      websiteUrl: 'https://prometheus.io/',
      repoUrl: 'https://github.com/prometheus/prometheus',
      docsUrl: 'https://prometheus.io/docs/introduction/overview/',
      useWhen: [
        'You want a general-purpose lightweight library to log metrics about your system available in many languages.',
        'You want a server that automatically collects and stores metrics data from any number of targets.',
        'You want a long list of tools that export existing metrics as Prometheus metrics with out-of-the-box support.',
        'You want to store metrics locally or have many integration options for remote storage.'
      ],
      watchOut: [
        'You will likely use Prometheus with complementary tools that help calculate data and model metrics. You may also use a tool to create dashboards - Grafana is a popular option.',
        'If tools in your ML stack automatically collect metrics and provide support for exporting them to Prometheus, integration is easy. Otherwise, you will need to define which metrics to log and add custom code to log that data.'
      ],
      integrations: []
    },
    {
      id: 'grafana',
      name: 'Grafana',
      description: 'Grafana is an open-source tool for online system analytics & monitoring.',
      category: 'model_monitoring',
      icon: '/icons/grafana.440e5584.svg',
      url: 'https://grafana.com/',
      websiteUrl: 'https://grafana.com/',
      repoUrl: 'https://github.com/grafana/grafana',
      docsUrl: 'https://grafana.com/docs/grafana/latest/',
      useWhen: [
        'You want to create interactive dashboards, graphs, and alerts to improve your system monitoring.',
        'You want integration with several popular data sources such as Prometheus, Postgres, MySQL, etc.'
      ],
      watchOut: [
        'Grafana is a general-purpose tool for creating dashboards and alerts and should be used next to tools that calculate and log information about your models and data.'
      ],
      installation: {
        method: 'apt',
        code: 'sudo apt-get install -y adduser libfontconfig1\nwget https://dl.grafana.com/oss/release/grafana_8.5.5_amd64.deb\nsudo dpkg -i grafana_8.5.5_amd64.deb'
      },
      integrations: []
    },
    {
      id: 'evidently',
      name: 'Evidently',
      description:
        'Evidently is a tool for analyzing and tracking data and ML model quality throughout the model lifecycle.',
      category: 'model_monitoring',
      icon: '/icons/evidently.svg',
      url: 'https://evidentlyai.com/',
      websiteUrl: 'https://evidentlyai.com/',
      repoUrl: 'https://github.com/evidentlyai/evidently',
      docsUrl: 'https://docs.evidentlyai.com/',
      useWhen: [
        'You want to calculate data drift, target drift, and model performance as part of a pipeline or monitor deployed models.',
        'You want out-of-the-box interactive reports.',
        'You want easy integration with Grafana, Apache Airflow, or MLflow.'
      ],
      watchOut: [],
      installation: {
        method: 'pip',
        code: 'pip install evidently'
      },
      integrations: []
    },
    {
      id: 'alibi-detect',
      name: 'Alibi Detect',
      description:
        'Track your model to detect performance degradation, bias and data drift. Detect issues early and take action.',
      category: 'model_monitoring',
      icon: '/icons/alibi-detect.svg'
    },
    {
      id: 'mon-clearml',
      name: 'ClearML',
      description:
        'Track your model to detect performance degradation, bias and data drift. Detect issues early and take action.',
      category: 'model_monitoring',
      icon: '/icons/clearml.73e47861.svg'
    },
    {
      id: 'mon-mlrun',
      name: 'MLRun',
      description:
        'Track your model to detect performance degradation, bias and data drift. Detect issues early and take action.',
      category: 'model_monitoring',
      icon: '/icons/mlrun.svg'
    },
    {
      id: 'nannyml',
      name: 'NannyML',
      description:
        'NannyML is an open-source post-deployment data science library that detects silent model failures in production and estimates ML model performance without ground truth.',
      category: 'model_monitoring',
      icon: '/icons/nannyml.42501b86.svg',
      url: 'https://www.nannyml.com/',
      websiteUrl: 'https://www.nannyml.com/',
      repoUrl: 'https://github.com/NannyML/nannyml',
      docsUrl: 'https://nannyml.readthedocs.io/',
      useWhen: [
        'Ground truth delays: When actual outcome labels are delayed or completely absent in production.',
        'Performance estimation needed: When you need to estimate model performance without waiting for target labels.',
        'Meaningful alerts required: When you want alerts focused on actual performance impact rather than just data drift.',
        'Silent failure detection: When you need to detect model performance degradation that occurs without obvious warning signs.',
        'Business impact tracking: When you need to tie model performance to monetary or business-oriented outcomes.',
        'Multi-model type support: When working with binary classification, multiclass, or regression models.',
        'Production model reliability: When maintaining model reliability and performance in real-world deployments is critical.'
      ],
      watchOut: [
        'Reference dataset requirements: Requires stable reference datasets that meet evaluation metrics; common mistake is using training data as reference.',
        'False alarm potential: Can overwhelm teams with false alarms if not properly configured, though focuses on meaningful alerts.',
        'Chunk size sensitivity: Requires careful chunk size configuration - too small chunks lead to unreliable statistical results.',
        'Univariate detection limitations: May miss complex system changes when monitoring individual variables.',
        'Drift-performance misalignment: Not every data drift affects model performance, and performance degradation can result from other causes.',
        'Statistical sensitivity: Drift detection methods can be overly sensitive and require careful configuration.',
        'Multivariate complexity: Detecting multivariate drift is more complex than single variable monitoring.',
        'Outlier sensitivity: May be sensitive to extreme values leading to false alarms or missed detections.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install nannyml'
      },
      integrations: []
    }
  ],

  runtime_engine: [
    {
      id: 'ray',
      name: 'Ray',
      description:
        'Ray is an open-source tool that makes it simple to scale compute-intensive Python workloads.',
      category: 'runtime_engine',
      icon: '/icons/ray.dae6468e.svg',
      url: 'https://www.ray.io/',
      websiteUrl: 'https://www.ray.io/',
      repoUrl: 'https://github.com/ray-project/ray',
      docsUrl: 'https://docs.ray.io/en/latest/',
      useWhen: [
        'You want to parallelize your machine learning computation across several machines.',
        'You want a general-purpose distributed computing library that supports heterogeneous workloads and is not restricted to structured data.',
        'You want to seamlessly scale your code from your local machine to a cluster.',
        'You want high-level libraries that support model training, hyperparameter tuning, building pipelines, and serving models.'
      ],
      watchOut: [],
      installation: {
        method: 'pip',
        code: 'pip install ray'
      },
      integrations: []
    },
    {
      id: 'dask',
      name: 'Dask',
      description:
        'Optimize your code and distribute execution across multiple machines to improve performance.',
      category: 'runtime_engine',
      icon: '/icons/dask.0ff0ca57.svg'
    },
    {
      id: 'apache-spark',
      name: 'Apache Spark',
      description:
        'Apache Spark is a data processing framework for large datasets and distributed computing.',
      category: 'runtime_engine',
      icon: '/icons/spark.93af465b.svg',
      url: 'https://spark.apache.org/',
      websiteUrl: 'https://spark.apache.org/',
      repoUrl: 'https://github.com/apache/spark',
      docsUrl: 'https://spark.apache.org/docs/latest/',
      useWhen: [
        'You are working with big data (large datasets).',
        'You would like to parallelize computation across multiple machines.',
        'You want fast large-scale data processing.',
        'You want a machine learning-specific API and many operators that facilitate transforming data.'
      ],
      watchOut: [
        'Requires clusters with higher RAM since it stores datasets in memory.',
        'Higher infrastructure and setup costs.'
      ],
      integrations: []
    },
    {
      id: 'rt-nuclio',
      name: 'Nuclio',
      description:
        'A high-performance serverless computing platform designed for data-intensive and compute-intensive workloads. Provides 10-100x faster execution than traditional frameworks with built-in support for machine learning, real-time analytics, and event-driven architectures.',
      category: 'runtime_engine',
      icon: '/icons/nuclio.svg',
      url: 'https://nuclio.io/',
      websiteUrl: 'https://nuclio.io/',
      repoUrl: 'https://github.com/nuclio/nuclio',
      docsUrl: 'https://nuclio.io/docs/',
      useWhen: [
        'High-performance ML model serving requiring extremely low latency and high throughput',
        'Real-time inference applications processing hundreds of thousands of requests per second',
        'Event-driven ML workflows triggered by data streams, IoT devices, or message queues',
        'GPU-accelerated ML workloads requiring serverless scaling and resource efficiency',
        'Integration with MLRun framework for complete MLOps lifecycle management',
        'Jupyter notebook-based development requiring seamless serverless deployment',
        'Data processing pipelines requiring 13+ protocol support (HTTP, Kafka, Kinesis, etc.)',
        'Scientific computing workloads requiring unlimited execution time and elastic scaling'
      ],
      watchOut: [
        'Learning curve for teams unfamiliar with serverless computing paradigms',
        'Limited ecosystem compared to AWS Lambda or Google Cloud Functions',
        'Documentation could be more comprehensive for enterprise deployment scenarios',
        'Vendor lock-in risk when deeply integrated with Iguazio or MLRun platforms',
        'Cold start times may impact latency-sensitive applications',
        'Debugging distributed serverless functions can be complex',
        'Cost optimization requires careful monitoring of resource usage patterns',
        'Integration complexity with existing enterprise infrastructure and security policies'
      ],
      installation: {
        method: 'docker',
        code: 'docker run -p 8070:8070 -v /var/run/docker.sock:/var/run/docker.sock --name nuclio-dashboard quay.io/nuclio/dashboard:stable-amd64'
      },
      integrations: []
    },
    {
      id: 'horovod',
      name: 'Horovod',
      description:
        'Horovod is a distributed deep learning training framework developed by Uber for TensorFlow, Keras, PyTorch, and Apache MXNet that makes distributed training fast and easy.',
      category: 'runtime_engine',
      icon: '/icons/horovod.a8834a3c.svg',
      url: 'https://horovod.ai/',
      websiteUrl: 'https://horovod.ai/',
      repoUrl: 'https://github.com/horovod/horovod',
      docsUrl: 'https://horovod.readthedocs.io/',
      useWhen: [
        'Scaling single-GPU scripts: When you have working single-GPU training code that needs to scale to multiple GPUs.',
        'Multi-framework support needed: When working with TensorFlow, Keras, PyTorch, or MXNet and need consistent distributed training approach.',
        'High scaling efficiency required: When you need to achieve near-linear scaling across hundreds of GPUs.',
        'Minimal code changes preferred: When you want to add distributed training with minimal modifications to existing code.',
        'Established ecosystem integration: When using platforms like AWS, Azure, Databricks, or NVIDIA GPU Cloud that have built-in Horovod support.'
      ],
      watchOut: [
        'MPI complexity: Requires careful MPI configuration - Open MPI 3.1.3 has hanging issues, and specific flags are required.',
        'Network interface issues: Non-routed interfaces (like docker0) can cause Open MPI to hang and require explicit exclusion.',
        'Installation dependencies: Requires CMake and specific compiler versions (g++-5 or above for TensorFlow/PyTorch).',
        'Version compatibility: Must reinstall Horovod when upgrading/downgrading TensorFlow, Keras, or PyTorch.',
        'Synchronization overhead: Distribution adds synchronization costs that vary by cluster configuration.',
        "TCP vs RDMA tradeoffs: Default RDMA doesn't work well with multithreading, requiring TCP communication in some cases.",
        'Environment-specific issues: Common problems in Databricks/Spark environments with TensorFlow object pickling.'
      ],
      installation: {
        method: 'pip',
        code: 'pip install horovod'
      },
      integrations: []
    }
  ]
}

// Stage definitions with proper positioning (5x4 grid layout)
const initialStagePositions: MLOpsStageInfo[] = [
  // Row 1: experiment tracking, experimentation, -, -
  {
    id: 'experiment_tracking',
    name: 'Experiment Tracking',
    description:
      'Keep track of important information about your experiments such as parameters, metrics and models.',
    position: { x: 50, y: 50 }
  },
  {
    id: 'experimentation',
    name: 'Experimentation',
    description:
      'Explore your data and run scripts interactively. Have your code, text, data and visualizations in a single place.',
    position: { x: 350, y: 50 }
  },

  // Row 2: data versioning, code versioning, -, -
  {
    id: 'data_versioning',
    name: 'Data Versioning',
    description:
      'Capture versions of your data to reproduce, trace, and keep track of your ML model lineage.',
    position: { x: 50, y: 220 }
  },
  {
    id: 'code_versioning',
    name: 'Code Versioning',
    description: 'Version your notebooks, pipelines and configuration files.',
    position: { x: 350, y: 220 }
  },

  // Row 3: -, pipeline orchestration, model registry, model serving
  {
    id: 'pipeline_orchestration',
    name: 'Pipeline Orchestration',
    description:
      'Automate the steps of your ML experiments. Schedule automatic pipeline runs to retrain the model on new data.',
    position: { x: 350, y: 390 }
  },
  {
    id: 'model_registry',
    name: 'Model Registry',
    description: 'Store your models in a centralized repository to track and deploy them.',
    position: { x: 650, y: 390 }
  },
  {
    id: 'model_serving',
    name: 'Model Serving',
    description: 'Create API endpoints and use your model to make predictions.',
    position: { x: 950, y: 390 }
  },

  // Row 4: -, artifact tracking, -, model monitoring
  {
    id: 'artifact_tracking',
    name: 'Artifact Tracking',
    description:
      'Store and keep track of datasets, models, and evaluation across your experiments and pipelines.',
    position: { x: 350, y: 560 }
  },
  {
    id: 'model_monitoring',
    name: 'Model Monitoring',
    description:
      'Track your model to detect performance degradation, bias and data drift. Detect issues early and take action.',
    position: { x: 950, y: 560 }
  },

  // Row 5: runtime engine, -, -, -
  {
    id: 'runtime_engine',
    name: 'Runtime Engine',
    description:
      'Optimize your code and distribute execution across multiple machines to improve performance.',
    position: { x: 50, y: 730 }
  }
]

// Collision avoidance function (simplified version)
function avoidCollisions(stages: MLOpsStageInfo[]): MLOpsStageInfo[] {
  return stages // For now, using manual positioning
}

// Apply collision avoidance to get final positions
export const stageDefinitions: MLOpsStageInfo[] = avoidCollisions(initialStagePositions)

export const stageConnections: StageConnection[] = [
  { from: 'experiment_tracking', to: 'experimentation', type: 'one-way', animated: true },
  { from: 'experimentation', to: 'code_versioning', type: 'one-way', animated: true },
  { from: 'experimentation', to: 'data_versioning', type: 'one-way', animated: true },
  { from: 'data_versioning', to: 'experiment_tracking', type: 'one-way', animated: true },
  { from: 'data_versioning', to: 'pipeline_orchestration', type: 'one-way', animated: true },
  { from: 'code_versioning', to: 'pipeline_orchestration', type: 'one-way', animated: true },
  { from: 'pipeline_orchestration', to: 'model_registry', type: 'one-way', animated: true },
  { from: 'pipeline_orchestration', to: 'artifact_tracking', type: 'one-way', animated: true },
  { from: 'model_registry', to: 'model_serving', type: 'one-way', animated: true },
  { from: 'model_serving', to: 'model_monitoring', type: 'one-way', animated: true },
  { from: 'model_monitoring', to: 'pipeline_orchestration', type: 'one-way', animated: true }
]
