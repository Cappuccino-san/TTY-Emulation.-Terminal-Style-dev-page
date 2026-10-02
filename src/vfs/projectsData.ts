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
    slug: 'ma-flight-tracker',
    filename: 'ma-flight-tracker.md',
    name: 'MA Flight Tracker',
    status: 'ACTIVE',
    stars: 0,
    tags: ['react', 'nextjs', 'tailwind', 'flight-tracker', 'aviation', 'ma', 'opensky-network'],
    repo: 'https://github.com/cappuccino-san/MAFlightTracker',
    summary: 'A real-time flight tracker focused exclusively on Massachusetts aircraft and airports, influenced by OpenSky Network.',
    description: `# MA Flight Tracker\n\n**Role**: Full Stack Engineer\n**Stack**: React, Next.js, Tailwind, Mapping APIs, OpenSky Network\n\n---\n\n## Systems & Technical Implementation\n- **Real-Time Aviation Tracking**: Engineered a real-time flight tracker focused solely on Massachusetts airspace, integrating live aviation telemetry data.\n- **OpenSky Network Integration**: Leveraged OpenSky Network APIs to parse and render live flight data onto interactive maps, reducing payload size by geofencing coordinates.\n- **Optimized Rendering**: Dynamically interpolates aircraft state vectors (altitude, velocity, callsign) to create a smooth, radar-like tracking experience.`
  },
  {
    slug: 'a360-aging-dataset-pipeline',
    filename: 'a360-aging-dataset-pipeline.md',
    name: 'A360 Synthetic Aging Pipeline',
    status: 'ACTIVE',
    stars: 340,
    tags: ['comfyui', 'ipadapter', 'peft', 'lora', 'qlora'],
    repo: 'https://github.com/cappuccino-san/a360-aging-pipeline',
    demo: 'https://linkedin.com/in/nicholas-napoli476',
    summary: 'Engineered the A360 synthetic aging pipeline via ComfyUI, IPAdapter FaceID, and parameter-efficient fine-tuning (LoRA/QLoRA).',
    description: `# A360 Synthetic Aging Pipeline\n\n**Role**: AI/ML Workflow Engineer | Aesthetic360\n**Stack**: ComfyUI, IPAdapter FaceID, PEFT (LoRA/QLoRA), PyTorch\n\n---\n\n## Systems & Technical Implementation\n- **Identity-Preserving Synthetic Aging Pipeline**: Engineered the A360 synthetic aging pipeline via ComfyUI, IPAdapter FaceID, and parameter-efficient fine-tuning (LoRA/QLoRA) via single-GPU fine-tuning to generate identity-consistent synthetic portraits across age cohorts (20–70), validated by visual inspection at 5-year intervals.`
  },
  {
    slug: 'distributed-clinical-data-pipeline',
    filename: 'distributed-clinical-data-pipeline.md',
    name: 'Distributed Clinical Data Pipeline',
    status: 'SHIPPED',
    stars: 215,
    tags: ['pyspark', 'aws-glue', 's3', 'data-engineering'],
    repo: 'https://github.com/cappuccino-san/clinical-etl-spark',
    summary: 'Distributed data pipelines processing 10,000+ before/after clinical image pairs across S3 buckets using PySpark and AWS Glue.',
    description: `# Distributed Clinical Data Pipeline\n\n**Role**: AI/ML Workflow Engineer | Aesthetic360\n**Stack**: PySpark, AWS Glue, Amazon S3, Big Data\n\n---\n\n## Systems & Technical Implementation\n- **Distributed Data Pipelines**: Architected distributed data pipelines leveraging Big Data technologies (PySpark, AWS Glue) to process, clean, and transform 10,000+ before/after clinical image pairs across S3 buckets and real-time data.`
  },
  {
    slug: 'optics-vision-landmark-extractor',
    filename: 'optics-vision-landmark-extractor.md',
    name: 'Compound GenAI & Optics Vision Landmark Extractor',
    status: 'ACTIVE',
    stars: 480,
    tags: ['pytorch', 'bedrock', 'langgraph', 'step-functions', 'vllm', 'pgvector', 'opencv', 'sam2', 'mediapipe', 'open3d', 'jupyter', 'sagemaker'],
    repo: 'https://github.com/cappuccino-san/optics-vision-extractor',
    summary: 'End-to-end GenAI workflows using AWS Bedrock, LangGraph, vLLM, pgvector, alongside vision extraction using OpenCV, SAM 2, and MediaPipe.',
    description: `# Compound GenAI & Optics Vision Landmark Extractor\n\n**Role**: AI/ML Workflow Engineer | Aesthetic360\n**Stack**: AWS Bedrock, LangGraph, vLLM, pgvector, PyTorch, OpenCV, SAM 2, MediaPipe, Open3D\n\n---\n\n## Systems & Technical Implementation\n- **End-to-End GenAI Workflows**: Owned software application development and training pipelines for end-to-end GenAI workflows and agentic systems for clinical photo processing (cropping, upscaling, enhancement, background removal) using AWS Bedrock, LangGraph, and Step Functions, with per-stage validation checks gating each pipeline step.\n- **Real-Time Inference & Vector Retrieval**: Evaluated real-time inference stacks for background-removal pipelines — vLLM serving models including Amazon Titan and Stability AI, paired with pgvector hybrid search over S3 data, versus HuggingFace tooling — with retrieval supplying project context for clinical workflows.\n- **Optics-Aligned Feature Extraction & Boundary Tracking**: Built deterministic vision validation and optics-aligned feature extraction pipelines using PyTorch, OpenCV, SAM 2, and MediaPipe for landmark boundary tracking and 3D LiDAR point cloud registration (Open3D).`
  },
  {
    slug: 'aws-cloud-security-auditing',
    filename: 'aws-cloud-security-auditing.md',
    name: 'AWS Cloud Security & AI Auditing Workflow',
    status: 'SHIPPED',
    stars: 190,
    tags: ['aws', 'kms', 'iam', 's3', 'nist-ai-rmf', 'nist-csf', 'owasp-llm', 'guardrails', 'fastapi', 'react'],
    repo: 'https://github.com/cappuccino-san/mlops-drift-sentinel',
    summary: 'Cloud infrastructure hardening aligned to NIST AI RMF and NIST CSF, with OWASP Top 10 for LLMs security auditing and Guardrails AI.',
    description: `# AWS Cloud Security & AI Auditing Workflow\n\n**Role**: AI/ML Workflow Engineer | Aesthetic360\n**Stack**: AWS (IAM, KMS, S3), NIST AI RMF, NIST CSF, OWASP Top 10 for LLMs, Guardrails AI, FastAPI, React\n\n---\n\n## Systems & Technical Implementation\n- **AWS Infrastructure Hardening**: Hardened AWS cloud infrastructure with IAM least-privilege policies, KMS envelope encryption, and S3 controls aligned to NIST AI RMF, NIST CSF, and defense-in-depth design principles.\n- **AI Security Auditing**: Conducted security auditing adhering to OWASP Top 10 for LLMs; implemented Guardrails AI input/output checks across full-stack FastAPI and React applications.`
  },
  {
    slug: 'enterprise-transit-data-audit',
    filename: 'enterprise-transit-data-audit.md',
    name: 'Enterprise Operational Data Engineering & Audit Workflow',
    status: 'SHIPPED',
    stars: 175,
    tags: ['data-engineering', 'transit-feeds', 'statistical-precision', 'kpi-reporting', 'sop'],
    repo: 'https://github.com/cappuccino-san/transit-data-audit',
    summary: 'Enterprise operational data reporting workflows to audit high-volume transit feeds, resolve data discrepancies, and verify port financial settlements.',
    description: `# Enterprise Operational Data Engineering & Audit Workflow\n\n**Role**: Sales Relationship Coordinator | BOC International\n**Stack**: Operational Data Reporting, Transit Feeds, KPI Reporting, Statistical Reconciliation, SOP Development\n\n---\n\n## Systems & Technical Implementation\n- **High-Volume Transit Audit & Reconciliation**: Ran operational data reporting workflows to audit high-volume transit feeds, resolve data discrepancies, and verify port financial settlements for enterprise clients with strict statistical precision.\n- **Enterprise Client KPI Reporting**: Owned daily, weekly, and monthly transit Key Performance Indicators reporting across enterprise client portfolios, ensuring Service-Level Agreement adherence and automated data delivery for logistics operations.\n- **Strategic Route Research**: Conducted lane feasibility and trade route research across foreign and domestic logistics partners, synthesizing market intelligence to guide strategic routing and business expansion.\n- **Operational SOPs & Payment Settlements**: Standardized account tracking systems, operational SOPs, and inbound port container payment settlements, serving as primary escalation point for client inquiry resolution.`
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
    description: `# Computer Vision Test Engineering & Client Integration\n\n**Role**: Project Liaison / QA & Integration | Rx Photo\n**Stack**: OpenCV, MATLAB, Linux, JIRA, Confluence, CI/CD, OWASP, Client Workflow Troubleshooting\n\n---\n\n## Systems & Technical Implementation\n- **Software Test Engineering & Defect Isolation**: Executed software test engineering, automated defect isolation, and requirements management (JIRA, Confluence) on computer vision & optics software using OpenCV, MATLAB, and Linux, accelerating engineering patch cycles.\n- **CI/CD & OWASP Vulnerability Assessments**: Supported executive engineering initiatives and model-based systems engineering alignments through Cross-Functional Collaboration, conducting CI/CD configuration and OWASP vulnerability assessments across production software source code.\n- **Enterprise Client Workflow Troubleshooting**: Interfaced directly with enterprise clients via phone to validate credit card processing workflows, troubleshoot integration blockers, and train end users on core software functionality.`
  }
];
