export interface Project {
  slug: string;
  filename: string;
  name: string;
  status: 'ACTIVE' | 'SHIPPED' | 'PROTOTYPE' | 'OPEN SOURCE';
  stars?: number;
  tags: string[];
  repo?: string;
  demo?: string;
  summary: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'a360-aging-dataset-pipeline',
    filename: 'a360-aging-dataset-pipeline.md',
    name: 'A360 Synthetic Aging & Compound GenAI Pipeline',
    status: 'ACTIVE',
    stars: 340,
    tags: ['pytorch', 'bedrock', 'langgraph', 'vllm', 'tensorrt-llm', 'pgvector', 'comfyui', 'peft', 'lora'],
    repo: 'https://github.com/cappuccino-san/a360-aging-pipeline',
    demo: 'https://linkedin.com/in/nicholas-napoli476',
    summary: 'End-to-end GenAI workflows using AWS Bedrock, LangGraph, vLLM, pgvector, ComfyUI, IPAdapter FaceID, and LoRA/QLoRA across age cohorts (20–70).',
    description: `# A360 Synthetic Aging & Compound GenAI Pipeline

**Role**: AI/ML Workflow Engineer | Aesthetic360  
**Stack**: AWS Bedrock, LangGraph, Stability AI, vLLM, pgvector, ComfyUI, IPAdapter FaceID, PEFT (LoRA/QLoRA), PyTorch

---

## Systems & Technical Implementation
- **End-to-End GenAI Workflows**: Led software application development and training pipelines for end-to-end GenAI workflows using AWS Bedrock, LangGraph, and Stability AI, establishing deterministic fallback logic, tool calling, and self-correction loops.
- **Low-Latency Model Inference & Vector Retrieval**: Implemented high-throughput, low-latency model inference using vLLM and quantized open-weight architectures, integrating pgvector hybrid semantic search and prompt caching for clinical workflows.
- **Identity-Preserving Synthetic Aging Pipeline**: Engineered the A360 synthetic aging pipeline via ComfyUI, IPAdapter FaceID, and parameter-efficient fine-tuning (LoRA/QLoRA), utilizing advanced algorithms to generate identity-preserving clinical data across age cohorts (20–70).
`
  },
  {
    slug: 'multimodal-clinical-etl-engine',
    filename: 'multimodal-clinical-etl-engine.md',
    name: 'Distributed Big Data Lakehouse & Retraining Pipeline',
    status: 'SHIPPED',
    stars: 215,
    tags: ['pyspark', 'databricks', 'deltalake', 'aws-glue', 'airflow', 'mlflow', 'cicd'],
    repo: 'https://github.com/cappuccino-san/clinical-etl-spark',
    summary: 'Distributed lakehouse data pipelines processing 10,000+ multimodal patient records using PySpark, Databricks, Delta Lake, AWS Glue, MLflow, and Apache Airflow.',
    description: `# Distributed Big Data Lakehouse & Retraining Pipeline

**Role**: AI/ML Workflow Engineer | Aesthetic360  
**Stack**: PySpark, Databricks, Delta Lake, AWS Glue, MLflow, Apache Airflow, GitHub Actions CI/CD

---

## Systems & Technical Implementation
- **Distributed Lakehouse Pipelines**: Architected distributed lakehouse data pipelines leveraging Big Data technologies (PySpark, Databricks, Delta Lake, AWS Glue) to process, clean, and transform 10,000+ multimodal patient records with strict ACID transactional guarantees.
- **Model Lifecycle Tracking & Automated Retraining**: Standardized model lifecycle tracking via MLflow; automated DAG task scheduling and retraining pipelines using Apache Airflow and GitHub Actions CI/CD for continuous, zero-downtime deployment.
`
  },
  {
    slug: 'optics-vision-landmark-extractor',
    filename: 'optics-vision-landmark-extractor.md',
    name: 'Deterministic Vision Validation & 3D LiDAR Registration',
    status: 'ACTIVE',
    stars: 480,
    tags: ['pytorch', 'opencv', 'sam2', 'mediapipe', 'open3d', 'matlab', 'linux'],
    repo: 'https://github.com/cappuccino-san/optics-vision-extractor',
    summary: 'Deterministic vision validation using PyTorch, OpenCV, SAM 2, MediaPipe, Open3D point cloud registration, and MATLAB test engineering.',
    description: `# Deterministic Vision Validation & 3D LiDAR Registration

**Role**: AI/ML Workflow Engineer (Aesthetic360) & QA / Integration (Rx Photo)  
**Stack**: PyTorch, OpenCV, SAM 2, MediaPipe, Open3D, 3D LiDAR, MATLAB, Linux, JIRA, Confluence

---

## Systems & Technical Implementation
- **Optics-Aligned Feature Extraction & Boundary Tracking**: Built deterministic vision validation and optics-aligned feature extraction pipelines using PyTorch, OpenCV, SAM 2, and MediaPipe for landmark boundary tracking and 3D LiDAR point cloud registration (Open3D).
- **Software Test Engineering & Defect Isolation**: Executed software test engineering, automated defect isolation, and requirements management (JIRA, Confluence) on computer vision & optics software using OpenCV, MATLAB, and Linux, accelerating engineering patch cycles.
`
  },
  {
    slug: 'mlops-cloudwatch-drift-sentinel',
    filename: 'mlops-cloudwatch-drift-sentinel.md',
    name: 'AWS Cloud Security, NIST AI RMF & AI Red Teaming',
    status: 'SHIPPED',
    stars: 190,
    tags: ['aws', 'kms', 'iam', 's3', 'nist-ai-rmf', 'nist-csf', 'iso-iec-42001', 'owasp-llm', 'guardrails', 'presidio', 'fastapi', 'react'],
    repo: 'https://github.com/cappuccino-san/mlops-drift-sentinel',
    summary: 'Cloud infrastructure hardening aligned to NIST AI RMF and NIST CSF, with OWASP Top 10 for LLMs red teaming, Guardrails AI, and Presidio sanitization.',
    description: `# AWS Cloud Security, NIST AI RMF & AI Red Teaming

**Role**: AI/ML Workflow Engineer | Aesthetic360  
**Stack**: AWS (IAM, KMS, S3), NIST AI RMF, NIST CSF, OWASP Top 10 for LLMs, Guardrails AI, Presidio, FastAPI, React

---

## Systems & Technical Implementation
- **AWS Infrastructure Hardening**: Hardened AWS cloud infrastructure with IAM least-privilege policies, KMS envelope encryption, and S3 controls aligned to NIST AI RMF, NIST CSF, and aerospace-grade engineering standards.
- **AI Red Teaming & Privacy Sanitization**: Conducted AI red teaming and security auditing adhering to OWASP Top 10 for LLMs; implemented Guardrails AI and Presidio for automated PHI/PII sanitization across full-stack FastAPI and React applications.
- **Vulnerability Assessments**: Supported executive engineering initiatives and MBSE alignments, conducting CI/CD configuration and OWASP vulnerability assessments across production software source code.
`
  },
  {
    slug: 'enterprise-transit-data-audit',
    filename: 'enterprise-transit-data-audit.md',
    name: 'Enterprise Operational Data Engineering & Audit Workflow',
    status: 'SHIPPED',
    stars: 175,
    tags: ['data-engineering', 'transit-feeds', 'statistical-precision', 'kpi-reporting', 'sop'],
    repo: 'https://github.com/cappuccino-san/transit-data-audit',
    summary: 'Enterprise operational data engineering workflows to audit high-volume transit feeds, resolve data discrepancies, and verify port financial settlements.',
    description: `# Enterprise Operational Data Engineering & Audit Workflow

**Role**: Sales Relationship Coordinator | BOC International  
**Stack**: Operational Data Engineering, Transit Feeds, KPI Reporting, Statistical Reconciliation, SOP Development

---

## Systems & Technical Implementation
- **High-Volume Transit Audit & Reconciliation**: Directed enterprise operational data engineering workflows to audit high-volume transit feeds, resolve data discrepancies, and verify port financial settlements with strict statistical precision.
- **Enterprise Client KPI Reporting**: Owned daily, weekly, and monthly transit KPI reporting across enterprise client portfolios, ensuring SLA adherence and automated data delivery for logistics operations.
- **Strategic Route Research**: Conducted lane feasibility and trade route research across foreign and domestic logistics partners, synthesizing market intelligence to guide strategic routing and business expansion.
- **Operational SOPs & Payment Settlements**: Standardized account tracking systems, operational SOPs, and inbound port container payment settlements, serving as primary escalation point for client inquiry resolution.
`
  },
  {
    slug: 'rxphoto-qa-client-integration',
    filename: 'rxphoto-qa-client-integration.md',
    name: 'Computer Vision Test Engineering & Client Integration',
    status: 'SHIPPED',
    stars: 160,
    tags: ['opencv', 'matlab', 'linux', 'jira', 'confluence', 'cicd', 'owasp', 'client-integration'],
    repo: 'https://github.com/cappuccino-san/cv-qa-integration',
    summary: 'Software test engineering on computer vision & optics software using OpenCV, MATLAB, and Linux, paired with direct client integration.',
    description: `# Computer Vision Test Engineering & Client Integration

**Role**: Project Liaison / QA & Integration | Rx Photo  
**Stack**: OpenCV, MATLAB, Linux, JIRA, Confluence, CI/CD, OWASP, Client Workflow Troubleshooting

---

## Systems & Technical Implementation
- **Software Test Engineering & Defect Isolation**: Executed software test engineering, automated defect isolation, and requirements management (JIRA, Confluence) on computer vision & optics software using OpenCV, MATLAB, and Linux, accelerating engineering patch cycles.
- **CI/CD & OWASP Vulnerability Assessments**: Supported executive engineering initiatives and MBSE alignments, conducting CI/CD configuration and OWASP vulnerability assessments across production software source code.
- **Enterprise Client Workflow Troubleshooting**: Interfaced directly with enterprise clients via phone to validate credit card processing workflows, troubleshoot integration blockers, and train end users on core software functionality.
`
  }
];

