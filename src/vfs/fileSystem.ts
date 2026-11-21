import type { VFSNode } from '../types/terminal';
import { BLOG_POSTS, type BlogPost } from './postsData';
import { PROJECTS } from './projectsData';

export type { VFSNode };

export const ABOUT_CONTENT = `# Nicholas Napoli

**Role**: AI/ML Workflow Engineer  
**Location**: Winthrop, MA & Tampa, FL  
**Phone**: (857) 205-3266  
**Email**: [njnapoli99@gmail.com](mailto:njnapoli99@gmail.com)  
**LinkedIn**: [linkedin.com/in/nicholas-napoli476](https://linkedin.com/in/nicholas-napoli476)  
**GitHub**: [github.com/cappuccino-san](https://github.com/cappuccino-san)  
**Website**: [https://napnet.click/](https://napnet.click/)  

---

## Professional Summary
AI/ML Engineer building production LLM backend systems, deterministic computer vision pipelines, and AWS SageMaker/Bedrock workflows, specializing in Python/FastAPI/PostgreSQL, AWS SageMaker/Bedrock, OpenCV/MediaPipe/ONNX, and HIPAA-oriented PHI-safe AI design.

---

## Technical Skills
- **Languages & Core**: Fluent in English and Italian, Python, SQL, TypeScript, JavaScript, Rust, Go, MATLAB, Bash, PowerShell, Linux, Data Structures & Algorithms, Statistics
- **AI/ML, LLM & Computer Vision**: AWS Bedrock, Bedrock AgentCore, Strands Agents, LangChain, RAG, Langfuse, PyTorch, Transformers, ONNX Runtime, OpenCV, MediaPipe, Florence-2, U²-Net, Diffusers, SDXL, ComfyUI, Hugging Face, Gradio, NumPy, Pillow, SciPy, scikit-image, pandas
- **Backend, Data & Cloud**: AWS (SageMaker Studio, S3, KMS, IAM, CloudWatch, EC2, Route 53), FastAPI, Node.js, Next.js, React, Svelte, gRPC, SQLAlchemy 2.0, Alembic, Pydantic v2, Supabase, PostgreSQL, SQLite, Docker, Git, GitHub Actions (CI/CD), pytest, moto, boto3, JupyterLab
- **Security & Operations**: DevSecOps, HIPAA-Oriented AI Design, NIST AI RMF, NIST CSF, OWASP Top 10 for LLMs, MITRE ATT&CK, ISO/IEC 42001, Wireshark, Model-Based Systems Engineering (MBSE), JIRA, Confluence, SOP Development

---

## Education & Certifications
- **M.S., Security Studies Conc. Cybersecurity** | University of Massachusetts Lowell (GPA: 3.90) | Jan 2023 – Sep 2025
- **B.S.B.A., International Business Conc. Italian** | High Point University (Cum Laude, Honors Scholar, GPA: 3.50) | Aug 2017 – May 2021
- **AWS Certified AI Practitioner (AIF-C01)** | Amazon Web Services | Issued Mar 2026

---

## Quick Shell Shortcuts
- Run \`resume\` or \`cat about/resume.txt\` to view full CV.
- Run \`skills\` or \`cat about/skills.json\` for the full JSON skills matrix.
- Run \`experience\` or \`education\` to inspect specific career milestones.
- Run \`ls -l projects\` or \`ls -l posts\` to browse engineering work.
- Run \`tools\` to launch the 15 Production Agentic AI engineering cockpit.
- Run \`mail\` to transmit a direct message.
`;

export const RESUME_TEXT = `================================================================================
                                NICHOLAS NAPOLI
  Winthrop, MA & Tampa, FL | (857) 205-3266 | njnapoli99@gmail.com | LinkedIn | GitHub | Portfolio
================================================================================

PROFESSIONAL SUMMARY
AI/ML Engineer building production LLM backend systems, deterministic computer
vision pipelines, and AWS SageMaker/Bedrock workflows, specializing in
Python/FastAPI/PostgreSQL, AWS SageMaker/Bedrock, OpenCV/MediaPipe/ONNX, and
HIPAA-oriented PHI-safe AI design.

--------------------------------------------------------------------------------
TECHNICAL SKILLS
--------------------------------------------------------------------------------
• Languages & Core: Fluent in English and Italian, Python, SQL, TypeScript,
  JavaScript, Rust, Go, MATLAB, Bash, PowerShell, Linux, Data Structures &
  Algorithms, Statistics
• AI/ML, LLM & Computer Vision: AWS Bedrock, Bedrock AgentCore, Strands Agents,
  LangChain, RAG, Langfuse, PyTorch, Transformers, ONNX Runtime, OpenCV,
  MediaPipe, Florence-2, U²-Net, Diffusers, SDXL, ComfyUI, Hugging Face, Gradio,
  NumPy, Pillow, SciPy, scikit-image, pandas
• Backend, Data & Cloud: AWS (SageMaker Studio, S3, KMS, IAM, CloudWatch, EC2,
  Route 53), FastAPI, Node.js, Next.js, React, Svelte, gRPC, SQLAlchemy 2.0,
  Alembic, Pydantic v2, Supabase, PostgreSQL, SQLite, Docker, Git, GitHub
  Actions (CI/CD), pytest, moto, boto3, JupyterLab
• Security & Operations: DevSecOps, HIPAA-Oriented AI Design, NIST AI RMF,
  NIST CSF, OWASP Top 10 for LLMs, MITRE ATT&CK, ISO/IEC 42001, Wireshark,
  Model-Based Systems Engineering (MBSE), JIRA, Confluence, SOP Development

--------------------------------------------------------------------------------
PROFESSIONAL EXPERIENCE
--------------------------------------------------------------------------------
Aesthetics360 — AI/ML Workflow Engineer | Boston, MA | Nov 2025 – Present
Context: B2B clinical aesthetics SaaS platform; shipped production LLM
persistence/versioning backends, AWS SageMaker CV endpoints, 6 Hugging Face
Spaces, and deterministic CV/synthetic data pipelines.
• Production LLM Backend & Audit Lineage (A360 Reach): Engineered the
  patient_emails persistence, versioning, and rerun subsystem (DAL and Alembic
  migrations) in FastAPI, SQLAlchemy 2.0, and PostgreSQL—implementing blocking
  idempotent writes (IntegrityError rollback), self-referencing rerun_parent_id
  lineage traversal, difflib version diffing, PHI-safe 6-field SHA-256
  prompt_hash fingerprinting (excluding transcripts/PII), DB CHECK & partial
  unique dedup constraints, and strict Pydantic v2 contracts (extra="forbid")
  unifying local Strands and Bedrock AgentCore paths (214 passing backend tests;
  107 newly authored).
• AWS SageMaker Background-Removal Service & ONNX Benchmarks (sagemaker-photo-
  processing & WARP): Benchmarked U²-Net, Silueta, and SAM on clinical photos
  (U²-Net 0.22s vs. SAM 2.35s, n=27) plus a 784-run ONNX Runtime benchmark
  across 196 clinical images (416ms avg for U²-Net, 100% success); deployed a
  live SageMaker U²-Net endpoint (with Silueta fallback) behind an async FastAPI
  REST API with S3 AES-256 storage, orphan cleanup, and CloudWatch metrics (100%
  endpoint smoke-test pass rate).
• Deterministic Clinical CV Suite & HF Gradio Apps (ImageIQ & 6 HF Spaces):
  Built a local-first Python CV pipeline (MediaPipe, OpenCV, NumPy, Pillow,
  boto3) featuring an anatomy-first body crop engine, composite panel splitting,
  multi-scale FaceMesh/BlazeFace fallback, before/after pairing, explicit JSON
  failure contracts, locked Eval V1 baselines (16 body / 9 face cases), and
  config-only local/S3 storage (212 pytest functions / 214 items with
  moto[s3]), plus 6 Hugging Face Gradio Spaces (Florence-2 matched B/A
  auto-cropper, MediaPipe 1:1 batch ZIP cropper, SD x4 upscaler, ONNX BG-remover
  benchmarks; 130 additional pytest tests).
• Synthetic Facial Aging Pipeline (A360-ADP): Engineered a deterministic
  synthetic facial aging workflow spanning ages 20–70 (5-year intervals) with
  zero real patient PHI—pairing Gemini 2.5 Flash age-20/70 anchors with a
  61-node ComfyUI SDXL (epicrealismXL) parallel latent-interpolation graph
  (fixed seed, low-denoise refinement), a 20-subject Fitzpatrick I–VI
  demographic cohort, and a Python watchdog/Excel metadata & prompt automation
  pipeline.
• Consultation-to-Email Pipeline (A360-Reach-Emails): Built a 4-stage
  transcript-to-email pipeline combining 3 deterministic rule-based extractors
  (visit classification, opportunity, commercial KPI) with an AWS Bedrock Claude
  3.5 Sonnet email generator, Pydantic readiness contracts (confidence and
  completeness gates), and a SHA-256-hashed markdown knowledge base.
• AWS Clinical Imaging Sandbox & 3D Depth Notebooks: Configured an SSE-KMS/
  IAM-scoped S3 data lake (a360-imaging-poc-dev) and authored 9 SageMaker
  Unified Studio JupyterLab notebooks automating metadata schema migration
  (5→12 top-level sections, 57 leaf fields), float32→uint16 depth conversion,
  SciPy bilinear depth-to-RGB alignment, OpenCV Laplacian blur/exposure QC,
  pure-NumPy camera-intrinsics 3D point-cloud export (.ply), and depth-to-
  normals Lambertian relighting.

BOC International — Sales Relationship Coordinator | Boston, MA | Sep 2021 – Jan 2023
Context: International freight forwarding and global logistics provider; ran
operational data reporting and reconciliation across high-volume enterprise
transit feeds.
• Audited high-volume transit feeds and resolved data discrepancies via
  operational reporting workflows, verifying port financial settlements for
  enterprise clients.
• Owned daily, weekly, and monthly transit KPI reporting across enterprise
  portfolios to enforce SLA adherence and automated logistics data delivery.
• Conducted lane feasibility and trade route research across foreign and
  domestic partners to guide routing and expansion; standardized SOPs and
  container payment settlements as primary client escalation point.

Rx Photo (Acquired by PatientNOW) — Project Liaison / QA & Integration | Boston, MA (Part-Time / Remote) | Jun 2018 – Mar 2021
Context: Enterprise clinical photography software provider; executed automated
QA testing and defect isolation on OpenCV/MATLAB computer vision and optics
software.
• Executed software test engineering, automated defect isolation, and
  requirements management (JIRA, Confluence) on OpenCV/MATLAB optics software
  in Linux, accelerating engineering patch cycles.
• Conducted CI/CD configuration and OWASP vulnerability assessments while
  aligning model-based systems engineering (MBSE) initiatives across teams.
• Interfaced directly with enterprise clients via phone to validate credit card
  processing workflows, troubleshoot integration blockers, and train clinical
  end users.

--------------------------------------------------------------------------------
OPEN SOURCE SYSTEMS & PUBLIC GITHUB REPOSITORIES
--------------------------------------------------------------------------------
• Production Agent Patterns (github.com/Cappuccino-san/Production-Agent-Patterns)
  15 enterprise reference architectures for agentic AI: ReAct with AST validation,
  SQLite FTS5 RAG, topological DAGs, multi-agent swarms, HITL gates, micro-sandboxes.
• TTY Emulation (github.com/Cappuccino-san/TTY-Emulation.-Terminal-Style-dev-page)
  Hardware-accurate CRT terminal portfolio (VT100/Apple II) in React 19, TypeScript,
  Vite, procedural Web Audio keypress synthesizer, and virtual filesystem.
• Aethelgard (github.com/Cappuccino-san/Aethelgard)
  Local-first sovereign cognitive twin with cryptographic provenance (BLAKE3 +
  Ed25519), 3-way hybrid RRF search (FTS5 + sqlite-vec + KùzuDB), and FastMCP bridge.
• RAG Decision System (github.com/Cappuccino-san/RAG-Decision-System)
  Policy & compliance decision engine with section-aware chunking, semantic search,
  and schema-validated approve/flag/reject decisions with exact citations.
• AI Workflow Orchestrator (github.com/Cappuccino-san/Workflow-Orchestrator)
  Deterministic triage engine normalizing tickets, emails, and alerts with LangChain
  classification, P1-P4 business rules, and full SQLite audit trails.
• Latin NLP & Virgil Corpus Browser (github.com/Cappuccino-san/latin-translator)
  Rule-based morphology, syntax parser, and bilingual reader across 83,612 tokens
  of Virgil's Aeneid, Eclogues, and Georgics with 94.0% token recognition.
• Wanderweg (github.com/Cappuccino-san/Wanderweg)
  Walking-first virtual tour guide app for Germany in Flutter/Dart with offline
  SQLite MBTiles map navigation and manifest-driven multi-city trip planner.
• Divisa (github.com/Cappuccino-san/Divisa)
  Zero-dependency outfit chatbot in vanilla JS with illustrated SVG model previews
  and flat-lay tile cards across 13 occasions and 301 apparel items.
• iPhone Lockscreen Tool (github.com/Cappuccino-san/iPhone-Lockscreen-Tool)
  Single-file on-device canvas wallpaper resizer auto-trimming screenshot black
  bars across 14 iPhone resolutions with zero cloud uploads.
• MA Flight Tracker (github.com/Cappuccino-san/MAFlightTracker)
  Real-time aviation radar focused on Massachusetts airspace, geofencing OpenSky
  Network API telemetry with dynamic state vector interpolation.
• Basic Website (github.com/Cappuccino-san/basic-website)
  Minimal zero-dependency web architecture boilerplate for standards-based HTML5.

--------------------------------------------------------------------------------
EDUCATION & CERTIFICATIONS
--------------------------------------------------------------------------------
• M.S., Security Studies Conc. Cybersecurity | University of Massachusetts Lowell (GPA: 3.90) | Jan 2023 – Sep 2025
• B.S.B.A., International Business Conc. Italian | High Point University (Cum Laude, Honors Scholar, GPA: 3.50) | Aug 2017 – May 2021
• AWS Certified AI Practitioner (AIF-C01) | Amazon Web Services | Issued Mar 2026
================================================================================`;

export const RESUME_MD = `# Nicholas Napoli

**Winthrop, MA & Tampa, FL** | **(857) 205-3266** | **[njnapoli99@gmail.com](mailto:njnapoli99@gmail.com)** | [LinkedIn](https://linkedin.com/in/nicholas-napoli476) | [GitHub](https://github.com/cappuccino-san) | [Portfolio](https://napnet.click/)

---

## PROFESSIONAL SUMMARY
AI/ML Engineer building production LLM backend systems, deterministic computer vision pipelines, and AWS SageMaker/Bedrock workflows, specializing in Python/FastAPI/PostgreSQL, AWS SageMaker/Bedrock, OpenCV/MediaPipe/ONNX, and HIPAA-oriented PHI-safe AI design.

---

## TECHNICAL SKILLS
- **Languages & Core**: Fluent in English and Italian, Python, SQL, TypeScript, JavaScript, Rust, Go, MATLAB, Bash, PowerShell, Linux, Data Structures & Algorithms, Statistics
- **AI/ML, LLM & Computer Vision**: AWS Bedrock, Bedrock AgentCore, Strands Agents, LangChain, RAG, Langfuse, PyTorch, Transformers, ONNX Runtime, OpenCV, MediaPipe, Florence-2, U²-Net, Diffusers, SDXL, ComfyUI, Hugging Face, Gradio, NumPy, Pillow, SciPy, scikit-image, pandas
- **Backend, Data & Cloud**: AWS (SageMaker Studio, S3, KMS, IAM, CloudWatch, EC2, Route 53), FastAPI, Node.js, Next.js, React, Svelte, gRPC, SQLAlchemy 2.0, Alembic, Pydantic v2, Supabase, PostgreSQL, SQLite, Docker, Git, GitHub Actions (CI/CD), pytest, moto, boto3, JupyterLab
- **Security & Operations**: DevSecOps, HIPAA-Oriented AI Design, NIST AI RMF, NIST CSF, OWASP Top 10 for LLMs, MITRE ATT&CK, ISO/IEC 42001, Wireshark, Model-Based Systems Engineering (MBSE), JIRA, Confluence, SOP Development

---

## PROFESSIONAL EXPERIENCE

### Aesthetics360 — AI/ML Workflow Engineer | Boston, MA | Nov 2025 – Present
*Context: B2B clinical aesthetics SaaS platform; shipped production LLM persistence/versioning backends, AWS SageMaker CV endpoints, 6 Hugging Face Spaces, and deterministic CV/synthetic data pipelines.*
- **Production LLM Backend & Audit Lineage (A360 Reach)**: Engineered the \`patient_emails\` persistence, versioning, and rerun subsystem (DAL and Alembic migrations) in FastAPI, SQLAlchemy 2.0, and PostgreSQL—implementing blocking idempotent writes (\`IntegrityError\` rollback), self-referencing \`rerun_parent_id\` lineage traversal, \`difflib\` version diffing, PHI-safe 6-field SHA-256 \`prompt_hash\` fingerprinting (excluding transcripts/PII), DB CHECK & partial unique dedup constraints, and strict Pydantic v2 contracts (\`extra="forbid"\`) unifying local Strands and Bedrock AgentCore paths (214 passing backend tests; 107 newly authored).
- **AWS SageMaker Background-Removal Service & ONNX Benchmarks (sagemaker-photo-processing & WARP)**: Benchmarked U²-Net, Silueta, and SAM on clinical photos (U²-Net 0.22s vs. SAM 2.35s, n=27) plus a 784-run ONNX Runtime benchmark across 196 clinical images (416ms avg for U²-Net, 100% success); deployed a live SageMaker U²-Net endpoint (with Silueta fallback) behind an async FastAPI REST API with S3 AES-256 storage, orphan cleanup, and CloudWatch metrics (100% endpoint smoke-test pass rate).
- **Deterministic Clinical CV Suite & HF Gradio Apps (ImageIQ & 6 HF Spaces)**: Built a local-first Python CV pipeline (MediaPipe, OpenCV, NumPy, Pillow, boto3) featuring an anatomy-first body crop engine, composite panel splitting, multi-scale FaceMesh/BlazeFace fallback, before/after pairing, explicit JSON failure contracts, locked Eval V1 baselines (16 body / 9 face cases), and config-only local/S3 storage (212 pytest functions / 214 items with \`moto[s3]\`), plus 6 Hugging Face Gradio Spaces (Florence-2 matched B/A auto-cropper, MediaPipe 1:1 batch ZIP cropper, SD x4 upscaler, ONNX BG-remover benchmarks; 130 additional pytest tests).
- **Synthetic Facial Aging Pipeline (A360-ADP)**: Engineered a deterministic synthetic facial aging workflow spanning ages 20–70 (5-year intervals) with zero real patient PHI—pairing Gemini 2.5 Flash age-20/70 anchors with a 61-node ComfyUI SDXL (\`epicrealismXL\`) parallel latent-interpolation graph (fixed seed, low-denoise refinement), a 20-subject Fitzpatrick I–VI demographic cohort, and a Python watchdog/Excel metadata & prompt automation pipeline.
- **Consultation-to-Email Pipeline (A360-Reach-Emails)**: Built a 4-stage transcript-to-email pipeline combining 3 deterministic rule-based extractors (visit classification, opportunity, commercial KPI) with an AWS Bedrock Claude 3.5 Sonnet email generator, Pydantic readiness contracts (confidence and completeness gates), and a SHA-256-hashed markdown knowledge base.
- **AWS Clinical Imaging Sandbox & 3D Depth Notebooks**: Configured an SSE-KMS/IAM-scoped S3 data lake (\`a360-imaging-poc-dev\`) and authored 9 SageMaker Unified Studio JupyterLab notebooks automating metadata schema migration (5→12 top-level sections, 57 leaf fields), float32→uint16 depth conversion, SciPy bilinear depth-to-RGB alignment, OpenCV Laplacian blur/exposure QC, pure-NumPy camera-intrinsics 3D point-cloud export (\`.ply\`), and depth-to-normals Lambertian relighting.

### BOC International — Sales Relationship Coordinator | Boston, MA | Sep 2021 – Jan 2023
*Context: International freight forwarding and global logistics provider; ran operational data reporting and reconciliation across high-volume enterprise transit feeds.*
- Audited high-volume transit feeds and resolved data discrepancies via operational reporting workflows, verifying port financial settlements for enterprise clients.
- Owned daily, weekly, and monthly transit KPI reporting across enterprise portfolios to enforce SLA adherence and automated logistics data delivery.
- Conducted lane feasibility and trade route research across foreign and domestic partners to guide routing and expansion; standardized SOPs and container payment settlements as primary client escalation point.

### Rx Photo (Acquired by PatientNOW) — Project Liaison / QA & Integration | Boston, MA (Part-Time / Remote) | Jun 2018 – Mar 2021
*Context: Enterprise clinical photography software provider; executed automated QA testing and defect isolation on OpenCV/MATLAB computer vision and optics software.*
- Executed software test engineering, automated defect isolation, and requirements management (JIRA, Confluence) on OpenCV/MATLAB optics software in Linux, accelerating engineering patch cycles.
- Conducted CI/CD configuration and OWASP vulnerability assessments while aligning model-based systems engineering (MBSE) initiatives across teams.
- Interfaced directly with enterprise clients via phone to validate credit card processing workflows, troubleshoot integration blockers, and train clinical end users.

---

## OPEN SOURCE SYSTEMS & PUBLIC GITHUB REPOSITORIES
- **[Production Agent Patterns](https://github.com/Cappuccino-san/Production-Agent-Patterns)**: 15 standalone reference architectures for enterprise agentic AI with FastAPI, LangGraph, Pydantic v2, SQLite WAL, and sandboxed Docker runtimes.
- **[TTY Emulation](https://github.com/Cappuccino-san/TTY-Emulation.-Terminal-Style-dev-page)**: High-fidelity retro CRT developer terminal in React 19, TypeScript, procedural Web Audio synthesizer, and virtual file system.
- **[Aethelgard](https://github.com/Cappuccino-san/Aethelgard)**: Local-first sovereign cognitive twin with cryptographic provenance (BLAKE3 + Ed25519), 3-way hybrid RRF search, and FastMCP integration.
- **[RAG Decision System](https://github.com/Cappuccino-san/RAG-Decision-System)**: Deterministic policy decision engine with calibrated confidence scoring and schema-validated citations.
- **[AI Workflow Orchestrator](https://github.com/Cappuccino-san/Workflow-Orchestrator)**: Unified deterministic triage engine across tickets, emails, and alerts with SQLite audit replay.
- **[Latin NLP & Virgil Browser](https://github.com/Cappuccino-san/latin-translator)**: Whitaker-style morphology and syntactic parsing engine across 83,612 tokens of Virgil (94.0% token coverage).
- **[Wanderweg](https://github.com/Cappuccino-san/Wanderweg)**: Walking-first tour guide app for Germany in Flutter/Dart with bundled offline SQLite MBTiles.
- **[Divisa](https://github.com/Cappuccino-san/Divisa)**: Zero-dependency JavaScript outfit chatbot with illustrated SVG model and flat-lay rendering across 13 occasions.
- **[iPhone Lockscreen Tool](https://github.com/Cappuccino-san/iPhone-Lockscreen-Tool)**: Single self-contained HTML on-device canvas wallpaper resizer across 14 iPhone models.
- **[MA Flight Tracker](https://github.com/Cappuccino-san/MAFlightTracker)**: Localized Massachusetts real-time flight radar integrating OpenSky Network telemetry.
- **[Basic Website](https://github.com/Cappuccino-san/basic-website)**: Zero-dependency web boilerplate establishing clean, standards-compliant HTML5/CSS architecture.

---

## EDUCATION & CERTIFICATIONS
- **M.S., Security Studies Conc. Cybersecurity** | University of Massachusetts Lowell (GPA: 3.90) | Jan 2023 – Sep 2025
- **B.S.B.A., International Business Conc. Italian** | High Point University (Cum Laude, Honors Scholar, GPA: 3.50) | Aug 2017 – May 2021
- **AWS Certified AI Practitioner (AIF-C01)** | Amazon Web Services | Issued Mar 2026
`;

export const SKILLS_JSON = `{
  "name": "Nicholas Napoli",
  "title": "AI/ML Workflow Engineer",
  "location": "Winthrop, MA & Tampa, FL",
  "contact": {
    "email": "njnapoli99@gmail.com",
    "phone": "(857) 205-3266",
    "linkedin": "https://linkedin.com/in/nicholas-napoli476",
    "github": "https://github.com/cappuccino-san",
    "website": "https://napnet.click/"
  },
  "certifications": [
    "AWS Certified AI Practitioner (AIF-C01) | Amazon Web Services | Issued Mar 2026"
  ],
  "technical_skills": {
    "languages_and_core": [
      "Fluent in English and Italian",
      "Python", "SQL", "TypeScript", "JavaScript", "Rust", "Go", "MATLAB",
      "Bash", "PowerShell", "Linux", "Data Structures & Algorithms", "Statistics"
    ],
    "ai_ml_llm_and_computer_vision": [
      "AWS Bedrock", "Bedrock AgentCore", "Strands Agents", "LangChain", "RAG", "Langfuse",
      "PyTorch", "Transformers", "ONNX Runtime", "OpenCV", "MediaPipe", "Florence-2",
      "U²-Net", "Diffusers", "SDXL", "ComfyUI", "Hugging Face", "Gradio",
      "NumPy", "Pillow", "SciPy", "scikit-image", "pandas"
    ],
    "backend_data_and_cloud": [
      "AWS (SageMaker Studio, S3, KMS, IAM, CloudWatch, EC2, Route 53)",
      "FastAPI", "Node.js", "Next.js", "React", "Svelte", "gRPC",
      "SQLAlchemy 2.0", "Alembic", "Pydantic v2", "Supabase", "PostgreSQL", "SQLite",
      "Docker", "Git", "GitHub Actions (CI/CD)", "pytest", "moto", "boto3", "JupyterLab"
    ],
    "security_and_operations": [
      "DevSecOps", "HIPAA-Oriented AI Design", "NIST AI RMF", "NIST CSF",
      "OWASP Top 10 for LLMs", "MITRE ATT&CK", "ISO/IEC 42001", "Wireshark",
      "Model-Based Systems Engineering (MBSE)", "JIRA", "Confluence", "SOP Development"
    ],
    "open_source_and_additional": [
      "LangGraph", "Model Context Protocol (MCP)", "FastMCP", "OpenTelemetry",
      "SQLite (WAL, FTS5, sqlite-vec)", "KùzuDB Property Graph", "MBTiles Offline",
      "Flutter", "Dart", "Cryptography (BLAKE3, Ed25519)", "Rule-Based NLP",
      "Web Audio API", "HTML5 Canvas API", "Vite", "Tailwind CSS"
    ]
  }
}`;

export const EXPERIENCE_MD = `# Professional Experience — Nicholas Napoli

## Aesthetics360 — AI/ML Workflow Engineer | Boston, MA | Nov 2025 – Present
*Context: B2B clinical aesthetics SaaS platform; shipped production LLM persistence/versioning backends, AWS SageMaker CV endpoints, 6 Hugging Face Spaces, and deterministic CV/synthetic data pipelines.*
- **Production LLM Backend & Audit Lineage (A360 Reach)**: Engineered the \`patient_emails\` persistence, versioning, and rerun subsystem (DAL and Alembic migrations) in FastAPI, SQLAlchemy 2.0, and PostgreSQL—implementing blocking idempotent writes (\`IntegrityError\` rollback), self-referencing \`rerun_parent_id\` lineage traversal, \`difflib\` version diffing, PHI-safe 6-field SHA-256 \`prompt_hash\` fingerprinting (excluding transcripts/PII), DB CHECK & partial unique dedup constraints, and strict Pydantic v2 contracts (\`extra="forbid"\`) unifying local Strands and Bedrock AgentCore paths (214 passing backend tests; 107 newly authored).
- **AWS SageMaker Background-Removal Service & ONNX Benchmarks (sagemaker-photo-processing & WARP)**: Benchmarked U²-Net, Silueta, and SAM on clinical photos (U²-Net 0.22s vs. SAM 2.35s, n=27) plus a 784-run ONNX Runtime benchmark across 196 clinical images (416ms avg for U²-Net, 100% success); deployed a live SageMaker U²-Net endpoint (with Silueta fallback) behind an async FastAPI REST API with S3 AES-256 storage, orphan cleanup, and CloudWatch metrics (100% endpoint smoke-test pass rate).
- **Deterministic Clinical CV Suite & HF Gradio Apps (ImageIQ & 6 HF Spaces)**: Built a local-first Python CV pipeline (MediaPipe, OpenCV, NumPy, Pillow, boto3) featuring an anatomy-first body crop engine, composite panel splitting, multi-scale FaceMesh/BlazeFace fallback, before/after pairing, explicit JSON failure contracts, locked Eval V1 baselines (16 body / 9 face cases), and config-only local/S3 storage (212 pytest functions / 214 items with \`moto[s3]\`), plus 6 Hugging Face Gradio Spaces (Florence-2 matched B/A auto-cropper, MediaPipe 1:1 batch ZIP cropper, SD x4 upscaler, ONNX BG-remover benchmarks; 130 additional pytest tests).
- **Synthetic Facial Aging Pipeline (A360-ADP)**: Engineered a deterministic synthetic facial aging workflow spanning ages 20–70 (5-year intervals) with zero real patient PHI—pairing Gemini 2.5 Flash age-20/70 anchors with a 61-node ComfyUI SDXL (\`epicrealismXL\`) parallel latent-interpolation graph (fixed seed, low-denoise refinement), a 20-subject Fitzpatrick I–VI demographic cohort, and a Python watchdog/Excel metadata & prompt automation pipeline.
- **Consultation-to-Email Pipeline (A360-Reach-Emails)**: Built a 4-stage transcript-to-email pipeline combining 3 deterministic rule-based extractors (visit classification, opportunity, commercial KPI) with an AWS Bedrock Claude 3.5 Sonnet email generator, Pydantic readiness contracts (confidence and completeness gates), and a SHA-256-hashed markdown knowledge base.
- **AWS Clinical Imaging Sandbox & 3D Depth Notebooks**: Configured an SSE-KMS/IAM-scoped S3 data lake (\`a360-imaging-poc-dev\`) and authored 9 SageMaker Unified Studio JupyterLab notebooks automating metadata schema migration (5→12 top-level sections, 57 leaf fields), float32→uint16 depth conversion, SciPy bilinear depth-to-RGB alignment, OpenCV Laplacian blur/exposure QC, pure-NumPy camera-intrinsics 3D point-cloud export (\`.ply\`), and depth-to-normals Lambertian relighting.

---

## BOC International — Sales Relationship Coordinator | Boston, MA | Sep 2021 – Jan 2023
*Context: International freight forwarding and global logistics provider; ran operational data reporting and reconciliation across high-volume enterprise transit feeds.*
- Audited high-volume transit feeds and resolved data discrepancies via operational reporting workflows, verifying port financial settlements for enterprise clients.
- Owned daily, weekly, and monthly transit KPI reporting across enterprise portfolios to enforce SLA adherence and automated logistics data delivery.
- Conducted lane feasibility and trade route research across foreign and domestic partners to guide routing and expansion; standardized SOPs and container payment settlements as primary client escalation point.

---

## Rx Photo (Acquired by PatientNOW) — Project Liaison / QA & Integration | Boston, MA (Part-Time / Remote) | Jun 2018 – Mar 2021
*Context: Enterprise clinical photography software provider; executed automated QA testing and defect isolation on OpenCV/MATLAB computer vision and optics software.*
- Executed software test engineering, automated defect isolation, and requirements management (JIRA, Confluence) on OpenCV/MATLAB optics software in Linux, accelerating engineering patch cycles.
- Conducted CI/CD configuration and OWASP vulnerability assessments while aligning model-based systems engineering (MBSE) initiatives across teams.
- Interfaced directly with enterprise clients via phone to validate credit card processing workflows, troubleshoot integration blockers, and train clinical end users.
`;

export const EDUCATION_MD = `# Education & Certifications — Nicholas Napoli

- **M.S., Security Studies Conc. Cybersecurity** | University of Massachusetts Lowell (GPA: 3.90) | Jan 2023 – Sep 2025
- **B.S.B.A., International Business Conc. Italian** | High Point University (Cum Laude, Honors Scholar, GPA: 3.50) | Aug 2017 – May 2021
- **AWS Certified AI Practitioner (AIF-C01)** | Amazon Web Services | Issued Mar 2026
`;

export const CONTACT_MD = `# Contact Coordinates — Nicholas Napoli

- **Name**: Nicholas Napoli
- **Title**: AI/ML Workflow Engineer
- **Location**: Winthrop, MA & Tampa, FL
- **Phone**: [(857) 205-3266](tel:+18572053266)
- **Email**: [njnapoli99@gmail.com](mailto:njnapoli99@gmail.com)
- **LinkedIn**: [linkedin.com/in/nicholas-napoli476](https://linkedin.com/in/nicholas-napoli476)
- **GitHub**: [github.com/cappuccino-san](https://github.com/cappuccino-san)
- **Website**: [https://napnet.click/](https://napnet.click/)

*Tip: Type \`mail\` in this terminal to draft a direct message!*
`;

export const PROFILE_RC = `# ~/.profile.rc - Shell Configuration
export USER="nicholas"
export HOST="boston-ml-box"
export SHELL="/bin/napoli-sh"
export TERM="xterm-256color"
export PAGER="less -R"
export EDITOR="vim"
export VISUAL="vim"

# Aliases
alias ll='ls -l'
alias la='ls -la'
alias cls='clear'
alias man='help'
alias fetch='neofetch'
alias scanlines='crt'
alias cv='resume'
`;

export const MOTD_TEXT = `
  ======================================================================
   NICHOLAS NAPOLI // AI/ML WORKFLOW ENGINEER // DEVBOX TTY
  ======================================================================
   * Type 'resume' or 'cat about/resume.txt' to view full CV.
   * Type 'ls projects' to view LLM backends, SageMaker & CV systems.
   * Type 'ls posts' to read technical deep-dives and pipeline blueprints.
   * Type 'skills' for the comprehensive technical skills matrix.
   * Type 'whoami' to view author bio, background, and contact details.
   * Type 'mail' to launch the interactive message composer.
   * Type 'dino' to play the retro CRT Dinosaur Runner arcade mini-game.
   * Type 'help' for the full commands reference manual.
  ======================================================================
`;

// Build Root VFS
export function createInitialVFS(): VFSNode {
  const postsChildren: Record<string, VFSNode> = {};
  BLOG_POSTS.forEach((post) => {
    postsChildren[post.filename] = {
      name: post.filename,
      type: 'file',
      path: `/posts/${post.filename}`,
      size: post.content.length,
      updatedAt: post.date,
      permissions: '-rw-r--r--',
      owner: 'nicholas',
      group: 'staff',
      tags: post.tags,
      title: post.title,
      summary: post.summary,
      readTime: post.readTime,
      content: post.content,
    };
  });

  const projectsChildren: Record<string, VFSNode> = {};
  PROJECTS.forEach((proj) => {
    projectsChildren[proj.filename] = {
      name: proj.filename,
      type: 'file',
      path: `/projects/${proj.filename}`,
      size: proj.description.length,
      updatedAt: '2026-11-21',
      permissions: '-rwxr-xr-x',
      owner: 'nicholas',
      group: 'staff',
      tags: proj.tags,
      title: proj.name,
      summary: proj.summary,
      content: proj.description,
    };
  });

  const aboutChildren: Record<string, VFSNode> = {
    'whoami.md': {
      name: 'whoami.md',
      type: 'file',
      path: '/about/whoami.md',
      size: ABOUT_CONTENT.length,
      updatedAt: '2026-11-21',
      permissions: '-rw-r--r--',
      owner: 'nicholas',
      group: 'staff',
      title: 'About Nicholas Napoli',
      content: ABOUT_CONTENT,
    },
    'resume.txt': {
      name: 'resume.txt',
      type: 'file',
      path: '/about/resume.txt',
      size: RESUME_TEXT.length,
      updatedAt: '2026-11-21',
      permissions: '-rw-r--r--',
      owner: 'nicholas',
      group: 'staff',
      title: 'Curriculum Vitae (Text)',
      content: RESUME_TEXT,
    },
    'resume.md': {
      name: 'resume.md',
      type: 'file',
      path: '/about/resume.md',
      size: RESUME_MD.length,
      updatedAt: '2026-11-21',
      permissions: '-rw-r--r--',
      owner: 'nicholas',
      group: 'staff',
      title: 'Curriculum Vitae (Markdown)',
      content: RESUME_MD,
    },
    'skills.json': {
      name: 'skills.json',
      type: 'file',
      path: '/about/skills.json',
      size: SKILLS_JSON.length,
      updatedAt: '2026-11-21',
      permissions: '-rw-r--r--',
      owner: 'nicholas',
      group: 'staff',
      title: 'Technical Skills Matrix',
      content: SKILLS_JSON,
    },
    'experience.md': {
      name: 'experience.md',
      type: 'file',
      path: '/about/experience.md',
      size: EXPERIENCE_MD.length,
      updatedAt: '2026-11-21',
      permissions: '-rw-r--r--',
      owner: 'nicholas',
      group: 'staff',
      title: 'Professional Experience',
      content: EXPERIENCE_MD,
    },
    'education.md': {
      name: 'education.md',
      type: 'file',
      path: '/about/education.md',
      size: EDUCATION_MD.length,
      updatedAt: '2026-11-21',
      permissions: '-rw-r--r--',
      owner: 'nicholas',
      group: 'staff',
      title: 'Education & Certifications',
      content: EDUCATION_MD,
    },
    'contact.md': {
      name: 'contact.md',
      type: 'file',
      path: '/about/contact.md',
      size: CONTACT_MD.length,
      updatedAt: '2026-11-21',
      permissions: '-rw-r--r--',
      owner: 'nicholas',
      group: 'staff',
      title: 'Contact Information',
      content: CONTACT_MD,
    },
  };

  const configChildren: Record<string, VFSNode> = {
    'profile.rc': {
      name: 'profile.rc',
      type: 'file',
      path: '/config/profile.rc',
      size: PROFILE_RC.length,
      updatedAt: '2026-11-21',
      permissions: '-rw-r--r--',
      owner: 'nicholas',
      group: 'staff',
      title: 'Shell Environment Profile',
      content: PROFILE_RC,
    },
    'motd.txt': {
      name: 'motd.txt',
      type: 'file',
      path: '/config/motd.txt',
      size: MOTD_TEXT.length,
      updatedAt: '2026-11-21',
      permissions: '-rw-r--r--',
      owner: 'nicholas',
      group: 'staff',
      title: 'Message of the Day',
      content: MOTD_TEXT,
    },
  };

  const binCommands = [
    'help', 'man', 'cat', 'ls', 'cd', 'pwd', 'whoami', 'mail',
    'resume', 'cv', 'skills', 'experience', 'education', 'contact',
    'clear', 'cls', 'history', 'theme', 'audio', 'scanlines', 'crt',
    'grep', 'tree', 'weather', 'matrix', 'neofetch', 'fetch',
    'fortune', 'cowsay', 'date', 'echo', 'sudo', 'exit',
    'dino', 'game', 'flight', 'radar'
  ];

  const binChildren: Record<string, VFSNode> = {};
  binCommands.forEach((cmd) => {
    binChildren[cmd] = {
      name: cmd,
      type: 'file',
      path: `/bin/${cmd}`,
      size: 4096,
      updatedAt: '2026-09-01',
      permissions: '-rwxr-xr-x',
      owner: 'root',
      group: 'bin',
      title: `Binary: ${cmd}`,
      content: `ELF 64-bit LSB executable, x86-64, dynamic link: ${cmd}`,
    };
  });

  const root: VFSNode = {
    name: '',
    type: 'dir',
    path: '/',
    size: 4096,
    updatedAt: '2026-09-01',
    permissions: 'drwxr-xr-x',
    owner: 'root',
    group: 'root',
    children: {
      'about': {
        name: 'about',
        type: 'dir',
        path: '/about',
        size: 4096,
        updatedAt: '2026-09-01',
        permissions: 'drwxr-xr-x',
        owner: 'nicholas',
        group: 'staff',
        summary: 'Resume, career experience, education, skills, and contact',
        children: aboutChildren,
      },
      'projects': {
        name: 'projects',
        type: 'dir',
        path: '/projects',
        size: 4096,
        updatedAt: '2026-11-21',
        permissions: 'drwxr-xr-x',
        owner: 'nicholas',
        group: 'staff',
        summary: 'Production LLM backends, AWS SageMaker CV services, deterministic vision pipelines, and open-source tools',
        children: projectsChildren,
      },
      'posts': {
        name: 'posts',
        type: 'dir',
        path: '/posts',
        size: 4096,
        updatedAt: '2026-09-01',
        permissions: 'drwxr-xr-x',
        owner: 'nicholas',
        group: 'staff',
        summary: 'Technical articles on GenAI latent interpolation, Big Data, Optics, and MLOps',
        children: postsChildren,
      },
      'config': {
        name: 'config',
        type: 'dir',
        path: '/config',
        size: 4096,
        updatedAt: '2026-09-01',
        permissions: 'drwxr-xr-x',
        owner: 'nicholas',
        group: 'staff',
        summary: 'Shell rc scripts and terminal configuration',
        children: configChildren,
      },
      'bin': {
        name: 'bin',
        type: 'dir',
        path: '/bin',
        size: 4096,
        updatedAt: '2026-09-01',
        permissions: 'drwxr-xr-x',
        owner: 'root',
        group: 'bin',
        summary: 'System command binaries',
        children: binChildren,
      },
    },
  };

  return root;
}

export const VFS = createInitialVFS();

// Path resolution helpers
export function normalizePath(path: string): string {
  if (!path) return '/';
  if (path === '~') return '/';
  if (path.startsWith('~/')) {
    path = '/' + path.slice(2);
  }
  
  const segments = path.split('/').filter(Boolean);
  const stack: string[] = [];

  for (const seg of segments) {
    if (seg === '.') continue;
    if (seg === '..') {
      stack.pop();
    } else {
      stack.push(seg);
    }
  }

  return '/' + stack.join('/');
}

export function resolvePath(cwd: string, target: string): string {
  if (!target || target === '.' || target === './') return cwd;
  if (target.startsWith('/')) {
    return normalizePath(target);
  }
  if (target === '~') {
    return '/';
  }
  if (target.startsWith('~/')) {
    return normalizePath('/' + target.slice(2));
  }
  
  const combined = (cwd === '/' ? '' : cwd) + '/' + target;
  return normalizePath(combined);
}

export function getNodeAtPath(path: string, vfs: VFSNode = VFS): VFSNode | null {
  const cleanPath = normalizePath(path);
  if (cleanPath === '/') return vfs;

  const parts = cleanPath.split('/').filter(Boolean);
  let current: VFSNode = vfs;

  for (const part of parts) {
    if (!current.children || !current.children[part]) {
      return null;
    }
    current = current.children[part];
  }

  return current;
}

export function getAllTags(): string[] {
  const tagsSet = new Set<string>();
  BLOG_POSTS.forEach((p) => p.tags.forEach((t) => tagsSet.add(t.toLowerCase())));
  PROJECTS.forEach((p) => p.tags.forEach((t) => tagsSet.add(t.toLowerCase())));
  return Array.from(tagsSet).sort();
}

export function findPostsAndProjectsByTag(tag: string): { posts: BlogPost[]; projects: typeof PROJECTS } {
  const cleanTag = tag.replace(/^#/, '').toLowerCase();
  const matchedPosts = BLOG_POSTS.filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(cleanTag)
  );
  const matchedProjects = PROJECTS.filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(cleanTag)
  );
  return { posts: matchedPosts, projects: matchedProjects };
}
