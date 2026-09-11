import type { VFSNode } from '../types/terminal';
import { BLOG_POSTS, type BlogPost } from './postsData';
import { PROJECTS } from './projectsData';

export type { VFSNode };

export const ABOUT_CONTENT = `# Nicholas Napoli

**Role**: AI/ML Workflow & Systems Engineer  
**Location**: Winthrop, MA  
**Phone**: (857) 205-3266  
**Email**: [njnapoli99@gmail.com](mailto:njnapoli99@gmail.com)  
**LinkedIn**: [linkedin.com/in/nicholas-napoli476](https://linkedin.com/in/nicholas-napoli476)  
**GitHub**: [github.com/cappuccino-san](https://github.com/cappuccino-san)  
**Website**: [https://napnet.click/](https://napnet.click/)  

---

## Professional Summary
AI/ML Workflow & Systems Engineer specializing in Machine Learning, ML Model Deployment, Training Pipeline Development, and Data Engineering with a deep foundation in Large-Scale Systems, System Design, and secure cloud architecture on AWS. Proven expertise building Compound AI workflows (AWS Bedrock, LangGraph), hybrid vector retrieval (pgvector), and low-latency inference runtimes (vLLM, TensorRT-LLM) alongside distributed Big Data lakehouses (Databricks, PySpark, Delta Lake). Combines advanced computer vision (PyTorch, SAM 2, OpenCV) with an M.S. in Security Studies to execute deterministic workflows adhering to NIST AI RMF, NIST CSF, and strict engineering standards.

---

## Technical Skills
- **Languages**: Python, SQL, TypeScript, JavaScript, HTML, CSS, Node.js, Bash, Linux, Java, C++, C#, Rust, MATLAB/Simulink, Perl, Data Structures & Algorithms, Statistics
- **AI/ML/Vision**: PyTorch, AWS Bedrock, LangGraph, LlamaIndex, vLLM, TensorRT-LLM, PEFT (LoRA, QLoRA), pgvector, Qdrant, MLflow, Weights & Biases, OpenCV, Segment Anything 2 (SAM 2), MediaPipe, InsightFace, IPAdapter, ComfyUI, Synthetic Data Generation, Open3D, PyTorch3D, Meta Llama, Qwen, DeepSeek, Mistral, Claude, OpenAI, Amazon Nova/Titan, Google Gemini
- **Big Data, MLOps & Cloud**: AWS (SageMaker, S3, KMS, IAM, Glue, Bedrock, ECR, EKS, CloudWatch, Cognito), Jupyter Notebook, Databricks, Apache Spark (PySpark), Delta Lake, Apache Airflow, Docker, Terraform / AWS CDK, CI/CD (GitHub Actions), System Design, Large-Scale Systems
- **Software Engineering, Security & Ops**: Agile Software Development, FastAPI, React, PostgreSQL, REST APIs, NIST AI RMF, NIST CSF, ISO/IEC 42001, OWASP Top 10 for LLMs, AI Red Teaming, Guardrails AI, Presidio (PHI/PII Sanitization), MBSE, JIRA, Confluence, SOP Development, Operational Reporting & Reconciliation

---

## Education & Certifications
- **M.S., Security Studies Conc. Cybersecurity** | UMass Lowell (GPA: 3.90) | Jan 2024 - Sep 2025
- **B.S., International Business Conc. Italy** | High Point University (Cum Laude, GPA: 3.50) | Aug 2017 - May 2021
- **AWS Certified AI Practitioner (AIF-C01)** | Amazon Web Services | Issued Mar 2026

---

## Quick Shell Shortcuts
- Run \`resume\` or \`cat about/resume.txt\` to view full CV.
- Run \`skills\` or \`cat about/skills.json\` for the full JSON skills matrix.
- Run \`experience\` or \`education\` to inspect specific career milestones.
- Run \`ls -l projects\` or \`ls -l posts\` to browse engineering work.
- Run \`mail\` to transmit a direct message.
`;

export const RESUME_TEXT = `================================================================================
                                NICHOLAS NAPOLI
  Winthrop, MA | (857) 205-3266 | njnapoli99@gmail.com | linkedin.com/in/nicholas-napoli476 | github.com/cappuccino-san | https://napnet.click/
================================================================================

PROFESSIONAL SUMMARY
AI/ML Workflow & Systems Engineer specializing in Machine Learning, ML Model
Deployment, Training Pipeline Development, and Data Engineering with a deep
foundation in Large-Scale Systems, System Design, and secure cloud architecture
on AWS. Proven expertise building Compound AI workflows (AWS Bedrock, LangGraph),
hybrid vector retrieval (pgvector), and low-latency inference runtimes (vLLM,
TensorRT-LLM) alongside distributed Big Data lakehouses (Databricks, PySpark,
Delta Lake). Combines advanced computer vision (PyTorch, SAM 2, OpenCV) with an
M.S. in Security Studies to execute deterministic workflows adhering to NIST
AI RMF, NIST CSF, and strict engineering standards.

--------------------------------------------------------------------------------
TECHNICAL SKILLS
--------------------------------------------------------------------------------
• Languages: Python, SQL, TypeScript,
  JavaScript, HTML, CSS, Node.js, Bash, Linux, Java, C++, C#, Rust,
  MATLAB/Simulink, Perl, Data Structures & Algorithms, Statistics
• AI/ML/Vision: PyTorch, AWS Bedrock, LangGraph, LlamaIndex, vLLM,
  TensorRT-LLM, PEFT (LoRA, QLoRA), pgvector, Qdrant, MLflow, Weights & Biases,
  OpenCV, Segment Anything 2 (SAM 2), MediaPipe, InsightFace, IPAdapter, ComfyUI,
  Synthetic Data Generation, Open3D, PyTorch3D, Meta Llama, Qwen, DeepSeek, Mistral, Claude, OpenAI, Amazon Nova/Titan, Google Gemini
• Big Data, MLOps & Cloud: AWS (SageMaker, S3, KMS, IAM, Glue, Bedrock, ECR,
  EKS, CloudWatch, Cognito), Jupyter Notebook, Databricks, Apache Spark
  (PySpark), Delta Lake, Apache Airflow, Docker, Terraform / AWS CDK,
  CI/CD (GitHub Actions), System Design, Large-Scale Systems
• Software Engineering, Security & Ops: Agile Software Development, FastAPI,
  React, PostgreSQL, REST APIs, NIST AI RMF, NIST CSF, ISO/IEC 42001,
  OWASP Top 10 for LLMs, AI Red Teaming, Guardrails AI, Presidio (PHI/PII
  Sanitization), MBSE, JIRA, Confluence, SOP Development, Operational Reporting
  & Reconciliation

--------------------------------------------------------------------------------
PROFESSIONAL EXPERIENCE
--------------------------------------------------------------------------------
Aesthetic360 – AI/ML Workflow Engineer | Boston, MA | Nov 2025 – Present
• Led software application development and training pipelines for end-to-end
  GenAI workflows using AWS Bedrock, LangGraph, and Stability AI, establishing
  deterministic fallback logic, tool calling, and self-correction loops.
• Implemented high-throughput, low-latency model inference using vLLM and
  quantized open-weight architectures, integrating pgvector hybrid semantic
  search and prompt caching for clinical workflows.
• Engineered the A360 synthetic aging pipeline via ComfyUI, IPAdapter FaceID,
  and parameter-efficient fine-tuning (LoRA/QLoRA), utilizing advanced
  algorithms to generate identity-preserving clinical data across age cohorts
  (20–70).
• Architected distributed lakehouse data pipelines leveraging Big Data
  technologies (PySpark, Databricks, Delta Lake, AWS Glue) to process, clean,
  and transform 10,000+ multimodal patient records with strict ACID
  transactional guarantees.
• Standardized model lifecycle tracking via MLflow; automated DAG task
  scheduling and retraining pipelines using Apache Airflow and GitHub Actions
  CI/CD for continuous, zero-downtime deployment.
• Built deterministic vision validation and optics-aligned feature extraction
  pipelines using PyTorch, OpenCV, SAM 2, and MediaPipe for landmark boundary
  tracking and 3D LiDAR point cloud registration (Open3D).
• Hardened AWS cloud infrastructure with IAM least-privilege policies, KMS
  envelope encryption, and S3 controls aligned to NIST AI RMF, NIST CSF, and
  aerospace-grade engineering standards.
• Conducted AI red teaming and security auditing adhering to OWASP Top 10 for
  LLMs; implemented Guardrails AI and Presidio for automated PHI/PII
  sanitization across full-stack FastAPI and React applications.

BOC International – Sales Relationship Coordinator | Boston, MA | Sep 2021 – Dec 2023
• Directed enterprise operational data engineering workflows to audit high-volume
  transit feeds, resolve data discrepancies, and verify port financial
  settlements with strict statistical precision.
• Owned daily, weekly, and monthly transit KPI reporting across enterprise client
  portfolios, ensuring SLA adherence and automated data delivery for logistics
  operations.
• Conducted lane feasibility and trade route research across foreign and
  domestic logistics partners, synthesizing market intelligence to guide
  strategic routing and business expansion.
• Standardized account tracking systems, operational SOPs, and inbound port
  container payment settlements, serving as primary escalation point for client
  inquiry resolution.

Rx Photo – Project Liaison / QA & Integration | Boston, MA | Aug 2018 – Aug 2019
• Executed software test engineering, automated defect isolation, and
  requirements management (JIRA, Confluence) on computer vision & optics
  software using OpenCV, MATLAB, and Linux, accelerating engineering patch
  cycles.
• Supported executive engineering initiatives and model-based systems
  engineering alignments, conducting CI/CD configuration and OWASP vulnerability
  assessments across production software source code.
• Interfaced directly with enterprise clients via phone to validate credit card
  processing workflows, troubleshoot integration blockers, and train end users
  on core software functionality.

--------------------------------------------------------------------------------
EDUCATION & CERTIFICATIONS
--------------------------------------------------------------------------------
• M.S., Security Studies Conc. Cybersecurity | UMass Lowell (GPA: 3.90) | Jan 2024 - Sep 2025
• B.S., International Business Conc. Italy | High Point University (Cum Laude, GPA: 3.50) | Aug 2017 - May 2021
• AWS Certified AI Practitioner (AIF-C01) | Amazon Web Services | Issued Mar 2026
================================================================================`;

export const RESUME_MD = `# Nicholas Napoli

**Winthrop, MA** | **(857) 205-3266** | **[njnapoli99@gmail.com](mailto:njnapoli99@gmail.com)** | [linkedin.com/in/nicholas-napoli476](https://linkedin.com/in/nicholas-napoli476) | [github.com/cappuccino-san](https://github.com/cappuccino-san) | [https://napnet.click/](https://napnet.click/)

---

## PROFESSIONAL SUMMARY
AI/ML Workflow & Systems Engineer specializing in Machine Learning, ML Model Deployment, Training Pipeline Development, and Data Engineering with a deep foundation in Large-Scale Systems, System Design, and secure cloud architecture on AWS. Proven expertise building Compound AI workflows (AWS Bedrock, LangGraph), hybrid vector retrieval (pgvector), and low-latency inference runtimes (vLLM, TensorRT-LLM) alongside distributed Big Data lakehouses (Databricks, PySpark, Delta Lake). Combines advanced computer vision (PyTorch, SAM 2, OpenCV) with an M.S. in Security Studies to execute deterministic workflows adhering to NIST AI RMF, NIST CSF, and strict engineering standards.

---

## TECHNICAL SKILLS
- **Languages**: Python, SQL, TypeScript, JavaScript, HTML, CSS, Node.js, Bash, Linux, Java, C++, C#, Rust, MATLAB/Simulink, Perl, Data Structures & Algorithms, Statistics
- **AI/ML/Vision**: PyTorch, AWS Bedrock, LangGraph, LlamaIndex, vLLM, TensorRT-LLM, PEFT (LoRA, QLoRA), pgvector, Qdrant, MLflow, Weights & Biases, OpenCV, Segment Anything 2 (SAM 2), MediaPipe, InsightFace, IPAdapter, ComfyUI, Synthetic Data Generation, Open3D, PyTorch3D, Meta Llama, Qwen, DeepSeek, Mistral, Claude, OpenAI, Amazon Nova/Titan, Google Gemini
- **Big Data, MLOps & Cloud**: AWS (SageMaker, S3, KMS, IAM, Glue, Bedrock, ECR, EKS, CloudWatch, Cognito), Jupyter Notebook, Databricks, Apache Spark (PySpark), Delta Lake, Apache Airflow, Docker, Terraform / AWS CDK, CI/CD (GitHub Actions), System Design, Large-Scale Systems
- **Software Engineering, Security & Ops**: Agile Software Development, FastAPI, React, PostgreSQL, REST APIs, NIST AI RMF, NIST CSF, ISO/IEC 42001, OWASP Top 10 for LLMs, AI Red Teaming, Guardrails AI, Presidio (PHI/PII Sanitization), MBSE, JIRA, Confluence, SOP Development, Operational Reporting & Reconciliation

---

## PROFESSIONAL EXPERIENCE

### Aesthetic360 – AI/ML Workflow Engineer | Boston, MA | Nov 2025 – Present
- Led software application development and training pipelines for end-to-end GenAI workflows using AWS Bedrock, LangGraph, and Stability AI, establishing deterministic fallback logic, tool calling, and self-correction loops.
- Implemented high-throughput, low-latency model inference using vLLM and quantized open-weight architectures, integrating pgvector hybrid semantic search and prompt caching for clinical workflows.
- Engineered the A360 synthetic aging pipeline via ComfyUI, IPAdapter FaceID, and parameter-efficient fine-tuning (LoRA/QLoRA), utilizing advanced algorithms to generate identity-preserving clinical data across age cohorts (20–70).
- Architected distributed lakehouse data pipelines leveraging Big Data technologies (PySpark, Databricks, Delta Lake, AWS Glue) to process, clean, and transform 10,000+ multimodal patient records with strict ACID transactional guarantees.
- Standardized model lifecycle tracking via MLflow; automated DAG task scheduling and retraining pipelines using Apache Airflow and GitHub Actions CI/CD for continuous, zero-downtime deployment.
- Built deterministic vision validation and optics-aligned feature extraction pipelines using PyTorch, OpenCV, SAM 2, and MediaPipe for landmark boundary tracking and 3D LiDAR point cloud registration (Open3D).
- Hardened AWS cloud infrastructure with IAM least-privilege policies, KMS envelope encryption, and S3 controls aligned to NIST AI RMF, NIST CSF, and aerospace-grade engineering standards.
- Conducted AI red teaming and security auditing adhering to OWASP Top 10 for LLMs; implemented Guardrails AI and Presidio for automated PHI/PII sanitization across full-stack FastAPI and React applications.

### BOC International – Sales Relationship Coordinator | Boston, MA | Sep 2021 – Dec 2023
- Directed enterprise operational data engineering workflows to audit high-volume transit feeds, resolve data discrepancies, and verify port financial settlements with strict statistical precision.
- Owned daily, weekly, and monthly transit KPI reporting across enterprise client portfolios, ensuring SLA adherence and automated data delivery for logistics operations.
- Conducted lane feasibility and trade route research across foreign and domestic logistics partners, synthesizing market intelligence to guide strategic routing and business expansion.
- Standardized account tracking systems, operational SOPs, and inbound port container payment settlements, serving as primary escalation point for client inquiry resolution.

### Rx Photo – Project Liaison / QA & Integration | Boston, MA | Aug 2018 – Aug 2019
- Executed software test engineering, automated defect isolation, and requirements management (JIRA, Confluence) on computer vision & optics software using OpenCV, MATLAB, and Linux, accelerating engineering patch cycles.
- Supported executive engineering initiatives and MBSE alignments, conducting CI/CD configuration and OWASP vulnerability assessments across production software source code.
- Interfaced directly with enterprise clients via phone to validate credit card processing workflows, troubleshoot integration blockers, and train end users on core software functionality.

---

## EDUCATION & CERTIFICATIONS
- **M.S., Security Studies Conc. Cybersecurity** | UMass Lowell (GPA: 3.90) | Jan 2024 - Sep 2025
- **B.S., International Business Conc. Italy** | High Point University (Cum Laude, GPA: 3.50) | Aug 2017 - May 2021
- **AWS Certified AI Practitioner (AIF-C01)** | Amazon Web Services | Issued Mar 2026
`;

export const SKILLS_JSON = `{
  "name": "Nicholas Napoli",
  "title": "AI/ML Workflow & Systems Engineer",
  "location": "Winthrop, MA",
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
      "Python", "SQL", "TypeScript", "JavaScript", "HTML", "CSS",
      "Node.js", "Bash", "Linux", "Java", "C++", "C#", "Rust",
      "MATLAB/Simulink", "Perl", "Data Structures & Algorithms", "Statistics"
    ],
    "ai_ml_and_genai": [
      "PyTorch", "AWS Bedrock", "LangGraph", "LlamaIndex", "vLLM", "TensorRT-LLM",
      "PEFT (LoRA, QLoRA)", "pgvector", "Qdrant", "MLflow", "Weights & Biases",
      "OpenCV", "Segment Anything 2 (SAM 2)", "MediaPipe", "InsightFace",
      "IPAdapter", "ComfyUI", "Synthetic Data Generation", "Open3D", "PyTorch3D",
      "Meta Llama", "Qwen", "DeepSeek", "Mistral", "Claude", "OpenAI", "Amazon Nova/Titan", "Google Gemini"
    ],
    "big_data_mlops_and_cloud": [
      "AWS (SageMaker, S3, KMS, IAM, Glue, Bedrock, ECR, EKS, CloudWatch, Cognito)",
      "Jupyter Notebook", "Databricks", "Apache Spark (PySpark)", "Delta Lake",
      "Apache Airflow", "Docker", "Terraform / AWS CDK", "CI/CD (GitHub Actions)",
      "System Design", "Large-Scale Systems"
    ],
    "software_engineering_security_and_ops": [
      "Agile Software Development", "FastAPI", "React", "PostgreSQL",
      "REST APIs", "NIST AI RMF", "NIST CSF", "ISO/IEC 42001",
      "OWASP Top 10 for LLMs", "AI Red Teaming", "Guardrails AI",
      "Presidio (PHI/PII Sanitization)", "MBSE",
      "JIRA", "Confluence", "SOP Development", "Operational Reporting & Reconciliation"
    ]
  }
}`;

export const EXPERIENCE_MD = `# Professional Experience — Nicholas Napoli

## Aesthetic360 – AI/ML Workflow Engineer | Boston, MA | Nov 2025 – Present
- Led software application development and training pipelines for end-to-end GenAI workflows using AWS Bedrock, LangGraph, and Stability AI, establishing deterministic fallback logic, tool calling, and self-correction loops.
- Implemented high-throughput, low-latency model inference using vLLM and quantized open-weight architectures, integrating pgvector hybrid semantic search and prompt caching for clinical workflows.
- Engineered the A360 synthetic aging pipeline via ComfyUI, IPAdapter FaceID, and parameter-efficient fine-tuning (LoRA/QLoRA), utilizing advanced algorithms to generate identity-preserving clinical data across age cohorts (20–70).
- Architected distributed lakehouse data pipelines leveraging Big Data technologies (PySpark, Databricks, Delta Lake, AWS Glue) to process, clean, and transform 10,000+ multimodal patient records with strict ACID transactional guarantees.
- Standardized model lifecycle tracking via MLflow; automated DAG task scheduling and retraining pipelines using Apache Airflow and GitHub Actions CI/CD for continuous, zero-downtime deployment.
- Built deterministic vision validation and optics-aligned feature extraction pipelines using PyTorch, OpenCV, SAM 2, and MediaPipe for landmark boundary tracking and 3D LiDAR point cloud registration (Open3D).
- Hardened AWS cloud infrastructure with IAM least-privilege policies, KMS envelope encryption, and S3 controls aligned to NIST AI RMF, NIST CSF, and aerospace-grade engineering standards.
- Conducted AI red teaming and security auditing adhering to OWASP Top 10 for LLMs; implemented Guardrails AI and Presidio for automated PHI/PII sanitization across full-stack FastAPI and React applications.

---

## BOC International – Sales Relationship Coordinator | Boston, MA | Sep 2021 – Dec 2023
- Directed enterprise operational data engineering workflows to audit high-volume transit feeds, resolve data discrepancies, and verify port financial settlements with strict statistical precision.
- Owned daily, weekly, and monthly transit KPI reporting across enterprise client portfolios, ensuring SLA adherence and automated data delivery for logistics operations.
- Conducted lane feasibility and trade route research across foreign and domestic logistics partners, synthesizing market intelligence to guide strategic routing and business expansion.
- Standardized account tracking systems, operational SOPs, and inbound port container payment settlements, serving as primary escalation point for client inquiry resolution.

---

## Rx Photo – Project Liaison / QA & Integration | Boston, MA | Aug 2018 – Aug 2019
- Executed software test engineering, automated defect isolation, and requirements management (JIRA, Confluence) on computer vision & optics software using OpenCV, MATLAB, and Linux, accelerating engineering patch cycles.
- Supported executive engineering initiatives and MBSE alignments, conducting CI/CD configuration and OWASP vulnerability assessments across production software source code.
- Interfaced directly with enterprise clients via phone to validate credit card processing workflows, troubleshoot integration blockers, and train end users on core software functionality.
`;

export const EDUCATION_MD = `# Education & Certifications — Nicholas Napoli

- **M.S., Security Studies Conc. Cybersecurity** | UMass Lowell (GPA: 3.90) | Jan 2024 - Sep 2025
- **B.S., International Business Conc. Italy** | High Point University (Cum Laude, GPA: 3.50) | Aug 2017 - May 2021
- **AWS Certified AI Practitioner (AIF-C01)** | Amazon Web Services | Issued Mar 2026
`;

export const CONTACT_MD = `# Contact Coordinates — Nicholas Napoli

- **Name**: Nicholas Napoli
- **Title**: AI/ML Workflow & Systems Engineer
- **Location**: Winthrop, MA
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
   NICHOLAS NAPOLI // AI/ML WORKFLOW & SYSTEMS ENGINEER // DEVBOX TTY
  ======================================================================
   * Type 'resume' or 'cat about/resume.txt' to view full CV.
   * Type 'ls projects' to view AI/ML, PySpark & Computer Vision systems.
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
      updatedAt: '2026-08-01',
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
      updatedAt: '2026-09-01',
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
      updatedAt: '2026-09-01',
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
      updatedAt: '2026-09-01',
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
      updatedAt: '2026-09-01',
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
      updatedAt: '2026-09-01',
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
      updatedAt: '2026-09-01',
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
      updatedAt: '2026-09-01',
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
      updatedAt: '2026-09-01',
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
      updatedAt: '2026-09-01',
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
    'dino', 'game'
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
        updatedAt: '2026-09-01',
        permissions: 'drwxr-xr-x',
        owner: 'nicholas',
        group: 'staff',
        summary: 'AI/ML pipelines, computer vision models, PySpark ETL engines, and cloud systems',
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
