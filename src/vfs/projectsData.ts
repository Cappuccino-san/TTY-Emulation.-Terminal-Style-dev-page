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
    name: 'A360 Aging Dataset & Compound GenAI Pipeline',
    status: 'ACTIVE',
    stars: 340,
    tags: ['pytorch', 'genai', 'langgraph', 'bedrock', 'comfyui', 'lora', 'vllm'],
    repo: 'https://github.com/Cappuccino-san/a360-aging-pipeline',
    demo: 'https://linkedin.com/in/nicholas-napoli476',
    summary: 'Compound GenAI clinical aging pipeline using AWS Bedrock, LangGraph, ComfyUI, IPAdapter FaceID, and LoRA/QLoRA fine-tuning across age cohorts (20–70).',
    description: `# A360 Aging Dataset & Compound GenAI Pipeline

**Role**: AI/ML Workflow & Systems Engineer  
**Stack**: PyTorch, AWS Bedrock, LangGraph, Stability AI, ComfyUI, IPAdapter FaceID, InsightFace, PEFT (LoRA/QLoRA), vLLM, pgvector, Docker, Linux

---

## Executive Overview
Engineered an identity-preserving synthetic data generation engine and compound AI workflow to model longitudinal human aging across age cohorts (20 through 70) for clinical and anatomical assessment.

## Technical Architecture & Innovations
- **Compound AI Workflow & Tool Calling**: Built stateful orchestration using **LangGraph** and **AWS Bedrock**, establishing deterministic fallback logic, prompt caching, and automated self-correction loops.
- **Latent Space Trajectory Interpolation & LoRA**: Formulated deterministic latent vector progression vectors in Stable Diffusion latent space combined with **PEFT (LoRA/QLoRA)** to simulate progressive biological aging while locking identity facial embeddings via IPAdapter FaceID.
- **Low-Latency vLLM & pgvector Inference**: Implemented high-throughput inference runtimes using **vLLM** and quantized open-weight architectures, integrated with **pgvector** hybrid semantic search for clinical feature retrieval.
- **High-Fidelity Synthetic Dataset**: Generated thousands of clinically-verified, photo-realistic paired facial progressions, enabling downstream model training with zero patient privacy risk.

\`\`\`python
# Latent Vector Interpolation snippet
import torch
import numpy as np

def compute_aging_latent_step(base_latent: torch.Tensor, age_vector: torch.Tensor, target_cohort: int, current_age: int = 25) -> torch.Tensor:
    delta_years = target_cohort - current_age
    scale = np.clip(delta_years / 50.0, 0.0, 1.0)
    # Project along calibrated age manifold with identity anchor
    transformed_latent = base_latent + (scale * age_vector)
    return transformed_latent
\`\`\`
`
  },
  {
    slug: 'multimodal-clinical-etl-engine',
    filename: 'multimodal-clinical-etl-engine.md',
    name: 'Multimodal Lakehouse Data Pipeline & Airflow Orchestrator',
    status: 'SHIPPED',
    stars: 215,
    tags: ['pyspark', 'databricks', 'deltalake', 'airflow', 'aws-glue', 'bigdata'],
    repo: 'https://github.com/Cappuccino-san/clinical-etl-spark',
    summary: 'Distributed Big Data lakehouse processing 10,000+ multimodal patient records and imaging feeds using PySpark, Databricks, Delta Lake, and Apache Airflow.',
    description: `# Multimodal Lakehouse Data Pipeline & Airflow Orchestrator

**Role**: AI/ML Workflow & Data Systems Architect  
**Stack**: PySpark, Apache Spark, Databricks, Delta Lake, Apache Airflow, AWS Glue, AWS S3, MLflow, Python, SQL

---

## Overview
Architected a high-throughput, fault-tolerant distributed Big Data lakehouse to clean, validate, tokenize, and transform 10,000+ multimodal patient records, high-resolution dermatological photos, and metadata feeds with strict ACID transactional guarantees.

## Key Outcomes
- **Distributed PySpark & Delta Lake**: Parallelized multimodal image normalization, EXIF extraction, and schema enforcement across scalable Databricks clusters with Delta Lake time-travel and ACID compliance.
- **Automated Airflow DAGs & MLflow**: Scheduled complex interdependent ingestion and retraining tasks via **Apache Airflow**, tracking experiment metrics and model versioning in **MLflow**.
- **AWS Glue & Lakehouse Storage**: Reduced batch ETL duration by 68% while guaranteeing zero-data-loss through dead-letter queues and automated partition compaction.

\`\`\`python
# PySpark Multimodal Batch Processing with Delta Lake
from pyspark.sql import functions as F

def process_clinical_stream(df):
    return (
        df.filter(F.col("image_quality_score") >= 0.85)
          .withColumn("interocular_dist_norm", F.col("iod_px") / F.col("image_width"))
          .withColumn("ingested_at", F.current_timestamp())
    )
\`\`\`
`
  },
  {
    slug: 'optics-vision-landmark-extractor',
    filename: 'optics-vision-landmark-extractor.md',
    name: 'Optics-Aligned Computer Vision & 3D LiDAR Extractor (SAM 2)',
    status: 'ACTIVE',
    stars: 480,
    tags: ['opencv', 'sam2', 'mediapipe', 'pytorch', 'open3d', 'lidar'],
    repo: 'https://github.com/Cappuccino-san/optics-vision-extractor',
    summary: 'Sub-millimeter facial landmark detection, Segment Anything 2 (SAM 2) boundary tracking, and 3D LiDAR point cloud registration with Open3D.',
    description: `# Optics-Aligned Computer Vision & 3D LiDAR Extractor (SAM 2)

**Role**: Computer Vision & Systems Engineer  
**Stack**: PyTorch, OpenCV, Segment Anything 2 (SAM 2), MediaPipe, Open3D, PyTorch3D, 3D LiDAR Point Clouds, NumPy, C++

---

## Overview
Built high-precision computer vision algorithms aligned to optical physics for anatomical landmark extraction, zero-shot boundary segmentation via SAM 2, and 3D LiDAR spatial depth registration with Open3D.

## Engineering Highlights
- **SAM 2 Zero-Shot Segmentation**: Integrated Segment Anything 2 for promptable edge boundary extraction and tissue contour tracking.
- **468-Point Mesh Alignment**: Utilized MediaPipe and custom PyTorch refinement heads to lock 3D mesh coordinates on facial topologies under varied focal lengths and clinical illumination.
- **3D LiDAR Point Cloud Fusion (Open3D)**: Registered and reconstructed depth sensor point cloud surfaces to compute calibrated volumetric depth and interocular distance (IOD) factoring in lens intrinsic parameters.

\`\`\`python
# Calibration and Interocular Distance Calculation
import cv2
import numpy as np

def calculate_calibrated_iod(p_left_eye: np.ndarray, p_right_eye: np.ndarray, camera_matrix: np.ndarray) -> float:
    # Compute Euclidean distance in image plane
    pixel_dist = np.linalg.norm(p_left_eye - p_right_eye)
    focal_length_px = camera_matrix[0, 0]
    # Millimeter projection at calibrated working distance
    return float(pixel_dist / focal_length_px * 500.0)
\`\`\`
`
  },
  {
    slug: 'mlops-cloudwatch-drift-sentinel',
    filename: 'mlops-cloudwatch-drift-sentinel.md',
    name: 'Production MLOps, CI/CD, NIST AI RMF & AI Red Teaming',
    status: 'SHIPPED',
    stars: 190,
    tags: ['mlops', 'docker', 'aws', 'nist-ai-rmf', 'owasp-llm', 'guardrails', 'presidio'],
    repo: 'https://github.com/Cappuccino-san/mlops-drift-sentinel',
    summary: 'Hardened AWS MLOps platform aligned to NIST AI RMF, OWASP Top 10 for LLMs, Guardrails AI, and Microsoft Presidio PHI/PII sanitization.',
    description: `# Production MLOps, CI/CD, NIST AI RMF & AI Red Teaming

**Role**: AI/ML Cloud, Security & MLOps Engineer  
**Stack**: Docker, Amazon ECR, EKS, SageMaker, CloudWatch, GitHub Actions, Terraform, NIST AI RMF, NIST CSF, OWASP Top 10 for LLMs, Guardrails AI, Presidio, AWS KMS

---

## Overview
Engineered a secure, enterprise-grade MLOps deployment and observability platform for containerized AI/ML models on AWS adhering to the **NIST AI Risk Management Framework (AI RMF)**, **NIST CSF**, and **OWASP Top 10 for LLMs**.

## System Features
- **AI Red Teaming & Privacy Sanitization**: Conducted prompt injection red teaming and integrated **Guardrails AI** and **Microsoft Presidio** for automated PHI/PII de-identification across full-stack applications.
- **Zero-Downtime CI/CD & Terraform**: Automated multi-stage GitHub Actions workflows that run automated unit testing, build multi-arch Docker images, push to Amazon ECR, and deploy blue/green SageMaker / EKS clusters.
- **Statistical Model Drift Telemetry**: Tracked Kolmogorov-Smirnov test statistics and Population Stability Index (PSI) against baseline distributions via CloudWatch and Matplotlib.
- **KMS & Least-Privilege Hardening**: Enforced customer-managed envelope encryption, VPC peering, and IAM least-privilege role boundaries.
`
  },
  {
    slug: 'fastapi-react-clinical-platform',
    filename: 'fastapi-react-clinical-platform.md',
    name: 'Secure Full-Stack AI Clinical Suite',
    status: 'ACTIVE',
    stars: 310,
    tags: ['fastapi', 'react', 'typescript', 'postgresql', 'cognito', 'rest'],
    repo: 'https://github.com/Cappuccino-san/clinical-ai-platform',
    summary: 'High-performance full-stack web application combining React + TypeScript UI with FastAPI backend, pgvector hybrid search, and AWS Cognito OAuth2.',
    description: `# Secure Full-Stack AI Clinical Suite

**Role**: Full-Stack & Systems Developer  
**Stack**: React 19, TypeScript, Tailwind CSS, FastAPI, PostgreSQL, pgvector, AWS Cognito (OAuth2), Marshmallow, REST APIs

---

## Overview
Developed an end-to-end clinical portal integrating interactive web UIs with containerized machine learning inference endpoints and pgvector hybrid semantic search.

## Architecture
- **Interactive UI**: Responsive single-page application built with React, TypeScript, and hardware-accelerated canvas rendering for real-time visualization of image transformations and landmark overlays.
- **FastAPI Async Backend**: High-throughput REST API layer handling asynchronous ML job scheduling, status polling, and token-authenticated requests.
- **Cognito & OAuth2 Security**: Enforced role-based access control (RBAC), token refreshing, and strict CORS policies across clinical tiers.
`
  }
];

