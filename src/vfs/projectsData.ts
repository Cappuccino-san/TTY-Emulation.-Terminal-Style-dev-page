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
    name: 'A360 Aging Dataset & Latent Interpolation Pipeline',
    status: 'ACTIVE',
    stars: 340,
    tags: ['pytorch', 'genai', 'comfyui', 'bedrock', 'python'],
    repo: 'https://github.com/Cappuccino-san/a360-aging-pipeline',
    demo: 'https://linkedin.com/in/nicholas-napoli476',
    summary: 'End-to-end GenAI clinical aging pipeline using ComfyUI, latent interpolation, and IPAdapter FaceID across cohorts (20–70).',
    description: `# A360 Aging Dataset & Latent Interpolation Pipeline

**Role**: Lead AI/ML Workflow Engineer  
**Stack**: PyTorch, AWS Bedrock, Stability AI, ComfyUI, IPAdapter FaceID, InsightFace, NumPy, Pandas, Docker, Linux

---

## Executive Overview
Engineered an identity-preserving synthetic data generation engine designed to model longitudinal human aging across age cohorts (20 through 70) for clinical skin and anatomical assessment.

## Technical Architecture & Innovations
- **Latent Space Trajectory Interpolation**: Formulated deterministic latent vector progression vectors in Stable Diffusion latent space to simulate progressive biological aging while locking identity facial embeddings via IPAdapter FaceID and InsightFace.
- **Deterministic Fallback Engine**: Built automated failover routing between local custom PyTorch / ComfyUI pipelines and AWS Bedrock (Stability AI Foundation Models), guaranteeing 99.9% uptime during clinical workloads.
- **High-Fidelity Synthetic Dataset**: Generated thousands of clinically-verified, photo-realistic paired facial progressions, enabling training of downstream skin feature assessment models with zero patient privacy risk.

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
    name: 'Multimodal Clinical Big Data ETL Engine',
    status: 'SHIPPED',
    stars: 215,
    tags: ['pyspark', 'databricks', 'aws-glue', 's3', 'bigdata'],
    repo: 'https://github.com/Cappuccino-san/clinical-etl-spark',
    summary: 'Distributed data engineering pipeline processing 10,000+ multimodal clinical records and high-res imagery using PySpark & Databricks.',
    description: `# Multimodal Clinical Big Data ETL Engine

**Role**: AI/ML Workflow & Data Systems Architect  
**Stack**: PySpark, Apache Spark, Databricks, AWS Glue, AWS S3, Delta Lake, Python, SQL

---

## Overview
Architected a high-throughput, fault-tolerant distributed data processing engine to clean, validate, tokenize, and transform 10,000+ multimodal patient records, high-resolution dermatological photos, and metadata feeds in large-scale systems.

## Key Outcomes
- **Distributed PySpark Transforms**: Parallelized image normalization, EXIF metadata extraction, and clinical metric validation across scalable Databricks clusters.
- **AWS Glue & Delta Lake Integration**: Reduced batch ETL duration by 68% while guaranteeing ACID transactional integrity and schema enforcement across S3 data lakes.
- **Zero-Data-Loss Pipeline**: Implemented dead-letter queues, deterministic schema validation via Pydantic & Marshmallow, and automated partition compaction.

\`\`\`python
# PySpark Multimodal Batch Processing
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
    name: 'Optics-Aligned Computer Vision & 3D LiDAR Extractor',
    status: 'ACTIVE',
    stars: 480,
    tags: ['opencv', 'mediapipe', 'pytorch', 'lidar', 'optics'],
    repo: 'https://github.com/Cappuccino-san/optics-vision-extractor',
    summary: 'Sub-millimeter facial landmark detection, interocular distance measurement, and 3D LiDAR point cloud processing.',
    description: `# Optics-Aligned Computer Vision & 3D LiDAR Extractor

**Role**: Computer Vision & Systems Engineer  
**Stack**: OpenCV, MediaPipe, PyTorch, 3D LiDAR Point Clouds, NumPy, C++, Python, MATLAB

---

## Overview
Built high-precision computer vision algorithms aligned to optical physics for anatomical landmark extraction, interocular distance (IOD) verification, and 3D spatial depth mapping.

## Engineering Highlights
- **468-Point Mesh Alignment**: Utilized MediaPipe and custom PyTorch refinement heads to lock 3D mesh coordinates on facial topologies under varied focal lengths and clinical illumination.
- **Optics-Calibrated Interocular Measurement**: Computed pixel-to-millimeter spatial conversions factoring in camera intrinsic matrix parameters and lens distortion coefficients (\`k1, k2, p1, p2\`).
- **3D LiDAR Point Cloud Fusion**: Processed depth sensor point clouds to reconstruct surface contour curvature and volumetric facial depth.

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
    name: 'Production MLOps, CI/CD & Drift Sentinel',
    status: 'SHIPPED',
    stars: 190,
    tags: ['docker', 'aws', 'sagemaker', 'cloudwatch', 'github-actions'],
    repo: 'https://github.com/Cappuccino-san/mlops-drift-sentinel',
    summary: 'Containerized SageMaker deployments with automated GitHub Actions CI/CD and CloudWatch/Matplotlib statistical drift monitoring.',
    description: `# Production MLOps, CI/CD & Drift Sentinel

**Role**: AI/ML Cloud & MLOps Engineer  
**Stack**: Docker, Amazon ECR, AWS SageMaker, CloudWatch, GitHub Actions, Matplotlib, NIST CSF, AWS KMS, IAM

---

## Overview
Engineered a secure, enterprise-grade MLOps deployment and observability platform for containerized AI/ML models on AWS adhering to NIST Cybersecurity Framework (CSF) standards.

## System Features
- **Zero-Downtime CI/CD**: Automated multi-stage GitHub Actions workflows that execute automated unit tests, build hardened multi-arch Docker images, push to Amazon ECR, and trigger blue/green SageMaker endpoint deployments.
- **Statistical Model Drift Telemetry**: Developed real-time telemetry tracking Kolmogorov-Smirnov test statistics and Population Stability Index (PSI) against reference baseline distributions, visualized via Matplotlib and CloudWatch alarms.
- **NIST CSF Hardening**: Enforced AWS KMS customer-managed key encryption at rest, S3 bucket policies with strict TLS 1.3 requirements, and IAM least-privilege role boundaries.
`
  },
  {
    slug: 'fastapi-react-clinical-platform',
    filename: 'fastapi-react-clinical-platform.md',
    name: 'Secure Full-Stack AI Clinical Suite',
    status: 'ACTIVE',
    stars: 310,
    tags: ['fastapi', 'react', 'typescript', 'postgresql', 'cognito'],
    repo: 'https://github.com/Cappuccino-san/clinical-ai-platform',
    summary: 'High-performance full-stack web application combining React + TypeScript UI with FastAPI backend and AWS Cognito OAuth2.',
    description: `# Secure Full-Stack AI Clinical Suite

**Role**: Full-Stack & Systems Developer  
**Stack**: React 19, TypeScript, Tailwind CSS, FastAPI, PostgreSQL, AWS Cognito (OAuth2), Marshmallow, REST APIs

---

## Overview
Developed an end-to-end clinical portal integrating interactive web UIs with containerized machine learning inference endpoints.

## Architecture
- **Interactive UI**: Responsive single-page application built with React, TypeScript, and hardware-accelerated canvas rendering for real-time visualization of image transformations and landmark overlays.
- **FastAPI Async Backend**: High-throughput REST API layer handling asynchronous ML job scheduling, status polling, and token-authenticated requests.
- **Cognito & OAuth2 Security**: Solved complex cross-origin resource sharing (CORS), token refreshing, and role-based access control (RBAC) across clinical tiers.
`
  }
];

