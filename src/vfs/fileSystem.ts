import type { VFSNode } from '../types/terminal';
import { BLOG_POSTS, type BlogPost } from './postsData';
import { PROJECTS } from './projectsData';

export type { VFSNode };

export const ABOUT_CONTENT = `# Nicholas Napoli

**Role**: AI/ML Workflow Engineer & Systems Architect  
**Location**: Winthrop, MA (Boston Area)  
**Phone**: (857) 205-3266  
**Email**: [njnapoli99@gmail.com](mailto:njnapoli99@gmail.com)  
**LinkedIn**: [linkedin.com/in/nicholas-napoli476](https://linkedin.com/in/nicholas-napoli476)  
**GitHub**: [github.com/Cappuccino-san](https://github.com/Cappuccino-san)  

---

## Professional Summary
AI/ML Workflow Engineer specializing in **Machine Learning**, **ML Model Deployment**, **Training Pipeline Development**, and **Data Engineering** with a deep foundation in **Large-Scale Systems**, **System Design**, and secure cloud architecture on **AWS**.

Proven expertise building production-grade computer vision pipelines in tandem with modern Artificial Intelligence Tools, and deterministic **SageMaker** workflows adhering to **NIST CSF** and strict Engineering Standards. Experienced across the full Software Application Development lifecycle, combining full-stack UI engineering (**React, TypeScript, HTML, CSS**) with containerized machine learning models in Agile team environments.

---

## Core Technical Focus
- **AI/ML & Vision**: PyTorch, OpenCV, MediaPipe, AWS Bedrock, InsightFace, IPAdapter FaceID, ComfyUI, Latent Space Interpolation, Synthetic Data Generation, 3D LiDAR Point Clouds, Optics & Interocular Measurement.
- **Big Data & Cloud**: AWS (SageMaker, S3, KMS, IAM, Glue, Bedrock, ECR, CloudWatch, Cognito), Databricks, Apache Spark (PySpark), Docker, GitHub Actions CI/CD, Supabase.
- **Full-Stack & Systems**: Python, TypeScript, React 19, FastAPI, PostgreSQL, REST APIs, Linux, .NET, C++, Rust, Bash, Marshmallow.
- **Security & Standards**: NIST CSF (Cybersecurity Framework), IAM least-privilege, KMS encryption at rest, OWASP Testing, MBSE, JIRA, Confluence.

---

## Quick Shell Shortcuts
- Run \`resume\` or \`cat about/resume.txt\` to view full CV.
- Run \`skills\` or \`cat about/skills.json\` for the skills matrix.
- Run \`ls -l projects\` or \`ls -l posts\` to browse engineering work.
- Run \`mail\` to transmit a direct message.
`;

export const RESUME_TEXT = `================================================================================
                    NICHOLAS NAPOLI - CURRICULUM VITAE
  Winthrop, MA | (857) 205-3266 | njnapoli99@gmail.com | linkedin.com/in/nicholas-napoli476
================================================================================

PROFESSIONAL SUMMARY:
AI/ML Workflow Engineer specializing in Machine Learning, ML Model Deployment,
Training Pipeline Development, and Data Engineering with a deep foundation in
Large-Scale Systems, System Design, and secure cloud architecture on AWS.
Proven expertise building production-grade computer vision pipelines in tandem
with modern Artificial Intelligence Tools, and deterministic SageMaker workflows
adhering to NIST CSF and strict Engineering Standards. Experienced across the
full Software Application Development lifecycle, combining full-stack UI
engineering (React, HTML, CSS) with containerized machine learning models in
Agile team environments.

--------------------------------------------------------------------------------
TECHNICAL SKILLS:
--------------------------------------------------------------------------------
• Languages & Core: Python, SQL, TypeScript, JavaScript, HTML, CSS, Node.js,
  Bash, Linux, Java, C++, C#, Rust, MATLAB/Simulink, Perl, Data Structures &
  Algorithms, Statistics.
• AI/ML & Data Science: Machine Learning, ML Model Deployment, Training Pipeline
  Development, Autonomous Systems, PyTorch, OpenCV, MediaPipe, AWS Bedrock,
  InsightFace, IPAdapter, ComfyUI, Machine Learning Engineering, NumPy, Pandas,
  Matplotlib, Data Visualization, Data Science, Synthetic Data Generation, Optics.
• Big Data & Cloud: AWS (SageMaker, S3, KMS, IAM, Glue, Bedrock, ECR, CloudWatch,
  Cognito), Databricks, Spark (PySpark), Big Data Technologies, Docker, Version
  Control (Git), CI/CD (GitHub Actions), System Design, Software Architecture,
  Large-Scale Systems, Supabase.
• Software Engineering & Systems: Agile Software Development, FastAPI, React,
  HTML, CSS, .NET, PostgreSQL, REST APIs, Software Debugging, Software Test
  Engineering, Production Software Source Code, Model-Based Systems Engineering
  (MBSE), Requirements Management (JIRA, Confluence, JAMA), NIST CSF, OWASP.

--------------------------------------------------------------------------------
PROFESSIONAL EXPERIENCE:
--------------------------------------------------------------------------------
Aesthetic360 | AI/ML Workflow Engineer - Boston, MA        Nov 2025 - Present
• Led software application development, machine learning, and training pipeline
  development for end-to-end GenAI image transformation pipelines using AWS
  Bedrock, Stability AI, NumPy, and Pandas, establishing deterministic fallback
  logic to streamline clinical workflows.
• Engineered the A360 Aging Dataset Pipeline using ComfyUI, latent interpolation,
  and IPAdapter FaceID, applying advanced data structures and algorithms to
  generate high-fidelity, identity-preserving synthetic clinical data across age
  cohorts (20-70).
• Architected distributed data engineering pipelines leveraging Big Data
  Technologies including Spark (PySpark), Databricks, and AWS Glue to process,
  clean, and transform 10,000+ multimodal clinical records and images in
  large-scale systems.
• Built deterministic image validation, optics-aligned feature extraction using
  PyTorch, OpenCV, and MediaPipe for facial landmark detection, interocular
  distance measurement, and 3D LiDAR point cloud processing.
• Created interactive data visualization dashboards via Matplotlib and
  CloudWatch to evaluate statistical model drift, monitor data integrity, and
  protect production software source code.
• Containerized ML workloads on Linux using Docker and Amazon ECR; managed
  Version Control (Git) and automated CI/CD pipelines via GitHub Actions for
  seamless ML model deployment and zero-downtime execution in an Agile lifecycle
  (JIRA, Confluence).
• Hardened AWS infrastructure with IAM least-privilege policies, KMS encryption,
  and S3 controls aligned to NIST Cybersecurity Framework and aerospace-grade
  engineering standards.
• Conducted rigorous software debugging and software test engineering across
  full-stack UI and API layers (FastAPI, React, HTML, CSS, PostgreSQL,
  Marshmallow), resolving OAuth2/Cognito authentication and CORS issues.

BOC International | Operations & Data Coordinator - Boston, MA  Sep 2021 - Dec 2023
• Managed enterprise data science and data engineering workflows to audit Excel
  spreadsheets, high-volume transit data pipelines, debug data feeds, and verify
  financial settlements with strict statistical precision.

Rx Photo | Project Liaison / QA & Integration - Boston, MA       Aug 2018 - Aug 2019
• Executed software test engineering, automated defect isolation, and
  requirements management (JIRA, Confluence) on computer vision & optics software
  using OpenCV, MATLAB, and Linux, accelerating engineering patch cycles.
• Supported executive engineering initiatives and model-based systems
  engineering alignments, conducting CI/CD configuration and OWASP vulnerability
  assessments across production software source code.
• Partnered with prospective healthcare & clinical clients to capture technical
  specifications and drive product adoption.

--------------------------------------------------------------------------------
EDUCATION & CERTIFICATIONS:
--------------------------------------------------------------------------------
• M.S., Security Studies | University of Massachusetts Lowell (Jan 2024 - Sep 2025)
  GPA: 3.90
• B.S., Business Administration | High Point University (Aug 2017 - May 2021)
  Cum Laude, Honors Scholar, GPA: 3.50
• AWS Certified AI Practitioner (AIF-C01) | Issued 2026
================================================================================`;

export const RESUME_MD = `# Nicholas Napoli — Curriculum Vitae

**Winthrop, MA** | **(857) 205-3266** | **njnapoli99@gmail.com** | [LinkedIn](https://linkedin.com/in/nicholas-napoli476)

---

## 💼 Professional Experience

### **Aesthetic360** — AI/ML Workflow Engineer *(Boston, MA | Nov 2025 – Present)*
- **GenAI Image Transformation Pipelines**: Led end-to-end development using AWS Bedrock, Stability AI, NumPy, and Pandas with deterministic fallback logic.
- **A360 Aging Dataset Pipeline**: Built identity-preserving latent space interpolation with ComfyUI and IPAdapter FaceID across age cohorts (20–70).
- **Multimodal Big Data ETL**: Scaled PySpark, Databricks, and AWS Glue pipelines transforming 10,000+ multimodal clinical records and images.
- **Optics & Computer Vision**: Extracted sub-millimeter anatomical landmarks, interocular distances, and 3D LiDAR point clouds with PyTorch, OpenCV, and MediaPipe.
- **Model Drift & Observability**: Visualized statistical distribution drift via CloudWatch & Matplotlib.
- **Containerized MLOps**: Automated multi-stage Docker builds on Linux pushed to Amazon ECR via GitHub Actions CI/CD.
- **NIST CSF Security Hardening**: Enforced KMS customer-managed key encryption and IAM least-privilege policies.
- **Full-Stack UI & APIs**: Developed robust FastAPI, React, PostgreSQL, and AWS Cognito OAuth2 integrations.

### **BOC International** — Operations & Data Coordinator *(Boston, MA | Sep 2021 – Dec 2023)*
- Orchestrated enterprise data science pipelines, audited transit data feeds, and reconciled financial settlements.

### **Rx Photo** — Project Liaison / QA & Integration *(Boston, MA | Aug 2018 – Aug 2019)*
- Automated defect isolation on computer vision & optical software using OpenCV, MATLAB, and Linux.
- Performed CI/CD configuration and OWASP vulnerability assessments across production source code.

---

## 🎓 Education & Certifications
- **M.S., Security Studies** — University of Massachusetts Lowell *(Jan 2024 – Sep 2025)* — **GPA: 3.90**
- **B.S., Business Administration** — High Point University *(Aug 2017 – May 2021)* — **Cum Laude, Honors Scholar, GPA: 3.50**
- **AWS Certified AI Practitioner (AIF-C01)** — *Issued 2026*
`;

export const SKILLS_JSON = `{
  "name": "Nicholas Napoli",
  "title": "AI/ML Workflow Engineer",
  "location": "Winthrop, MA",
  "certifications": [
    "AWS Certified AI Practitioner (AIF-C01)"
  ],
  "technical_skills": {
    "languages_and_core": [
      "Python", "SQL", "TypeScript", "JavaScript", "HTML", "CSS",
      "Node.js", "Bash", "Linux", "Java", "C++", "C#", "Rust",
      "MATLAB/Simulink", "Perl", "Data Structures & Algorithms", "Statistics"
    ],
    "ai_ml_and_data_science": [
      "Machine Learning", "ML Model Deployment", "Training Pipeline Development",
      "Autonomous Systems", "PyTorch", "OpenCV", "MediaPipe", "AWS Bedrock",
      "InsightFace", "IPAdapter FaceID", "ComfyUI", "NumPy", "Pandas",
      "Matplotlib", "Data Visualization", "Synthetic Data Generation", "Optics"
    ],
    "big_data_and_cloud": [
      "AWS (SageMaker, S3, KMS, IAM, Glue, Bedrock, ECR, CloudWatch, Cognito)",
      "Databricks", "Apache Spark (PySpark)", "Big Data Technologies",
      "Docker", "Git", "CI/CD (GitHub Actions)", "System Design",
      "Software Architecture", "Large-Scale Systems", "Supabase"
    ],
    "software_engineering_and_systems": [
      "Agile Software Development", "FastAPI", "React", "HTML/CSS",
      ".NET", "PostgreSQL", "REST APIs", "Software Debugging",
      "Software Test Engineering", "Production Software Source Code",
      "Model-Based Systems Engineering (MBSE)", "Requirements (JIRA, Confluence, JAMA)",
      "NIST CSF", "OWASP Testing"
    ]
  }
}`;

export const EXPERIENCE_MD = `# Professional Experience — Nicholas Napoli

## 1. Aesthetic360 (Boston, MA)
**Title**: AI/ML Workflow Engineer  
**Timeline**: Nov 2025 – Present  
**Tech**: PyTorch, AWS Bedrock, Stability AI, ComfyUI, IPAdapter, PySpark, Databricks, AWS Glue, OpenCV, MediaPipe, Docker, SageMaker, FastAPI, React, PostgreSQL

- **GenAI Workflow Development**: Engineered end-to-end clinical image transformation pipelines with deterministic fallback routing between AWS Bedrock and local inference servers.
- **A360 Aging Dataset Pipeline**: Created high-fidelity synthetic longitudinal data across age cohorts (20–70) with IPAdapter FaceID and latent interpolation.
- **Distributed Big Data**: Transformed 10,000+ multimodal patient records and medical imaging files utilizing PySpark and Databricks.
- **Optical Landmark Detection**: Built sub-millimeter feature extraction using OpenCV, MediaPipe, and 3D LiDAR point clouds.
- **Observability & MLOps**: Monitored statistical model drift using CloudWatch and Matplotlib; automated GitHub Actions CI/CD to Amazon ECR.
- **Security & Full-Stack**: Enforced NIST CSF controls, AWS KMS encryption, and built secure React + FastAPI + AWS Cognito apps.

---

## 2. BOC International (Boston, MA)
**Title**: Operations & Data Coordinator  
**Timeline**: Sep 2021 – Dec 2023  
- Managed data science workflows, high-volume transit data auditing, and statistical verification.

---

## 3. Rx Photo (Boston, MA)
**Title**: Project Liaison / QA & Integration  
**Timeline**: Aug 2018 – Aug 2019  
**Tech**: OpenCV, MATLAB, Linux, JIRA, Confluence, CI/CD, OWASP  
- Automated computer vision defect testing, accelerated patch cycles, and conducted OWASP vulnerability assessments.
`;

export const EDUCATION_MD = `# Education & Credentials — Nicholas Napoli

## 🎓 Master of Science (M.S.) — Security Studies
- **Institution**: University of Massachusetts Lowell
- **Timeline**: Jan 2024 – Sep 2025
- **GPA**: **3.90**
- **Specialization**: Cybersecurity Systems, Threat Modeling, NIST Standards, Secure Architecture

## 🎓 Bachelor of Science (B.S.) — Business Administration
- **Institution**: High Point University
- **Timeline**: Aug 2017 – May 2021
- **Honors**: **Cum Laude**, **Honors Scholar**
- **GPA**: **3.50**

## 📜 Professional Certifications
- **AWS Certified AI Practitioner (AIF-C01)** — *Issued 2026*
`;

export const CONTACT_MD = `# Contact Coordinates — Nicholas Napoli

- **Name**: Nicholas Napoli
- **Email**: [njnapoli99@gmail.com](mailto:njnapoli99@gmail.com)
- **Phone**: [(857) 205-3266](tel:+18572053266)
- **Location**: Winthrop, MA (Greater Boston Area)
- **LinkedIn**: [linkedin.com/in/nicholas-napoli476](https://linkedin.com/in/nicholas-napoli476)
- **GitHub**: [github.com/Cappuccino-san](https://github.com/Cappuccino-san)

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
   * Type 'ls projects' to view AI/ML, PySpark & Computer Vision systems.
   * Type 'ls posts' to read technical deep-dives and pipeline blueprints.
   * Type 'skills' for the comprehensive technical skills matrix.
   * Type 'whoami' to view author bio, background, and contact details.
   * Type 'mail' to launch the interactive message composer.
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
    'fortune', 'cowsay', 'date', 'echo', 'sudo', 'exit'
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
