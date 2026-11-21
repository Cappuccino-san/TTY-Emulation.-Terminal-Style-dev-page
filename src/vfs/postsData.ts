export interface BlogPost {
  slug: string;
  filename: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  summary: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'building-ma-flight-tracker',
    filename: 'building-ma-flight-tracker.md',
    title: 'Tracking Massachusetts Airspace: Building a Real-Time Flight Radar',
    date: '2026-09-16',
    readTime: '4 min read',
    tags: ['React', 'System Design', 'API Integration'],
    summary: 'An overview of how I built the MA Flight Tracker, a localized radar system using OpenSky Network data for Massachusetts.',
    content: `# Tracking Massachusetts Airspace: Building a Real-Time Flight Radar

Building a regional flight tracker requires filtering vast amounts of global telemetry data down to localized coordinates. Inspired by the OpenSky Network, I created the **MA Flight Tracker** to focus exclusively on Massachusetts aircraft and airports.

---

## 1. Localized Data Ingestion
Instead of rendering every flight worldwide, the system establishes a geofenced bounding box around Massachusetts. By querying the OpenSky Network API with specific coordinate boundaries, we drastically reduce payload sizes and improve rendering performance.

## 2. Real-Time Mapping & Telemetry
Each aircraft's state vector (containing altitude, velocity, callsign, and heading) is updated in real-time. The UI dynamically interpolates these positions between API polling intervals to create a smooth, radar-like experience.

## 3. Future Enhancements
The next steps involve adding historical flight paths and predictive landing estimations for major hubs like Logan International Airport (BOS).

---

### Links & Resources
- **Inspect Project File**: [projects/ma-flight-tracker.md](projects/ma-flight-tracker.md) (\`cat projects/ma-flight-tracker.md\`)
- **Source Code**: [https://github.com/Cappuccino-san/MAFlightTracker](https://github.com/Cappuccino-san/MAFlightTracker)
`
  },
  {
    slug: 'synthetic-data-with-latent-interpolation',
    filename: 'synthetic-data-with-latent-interpolation.md',
    title: 'A360-ADP: Deterministic Synthetic Facial Aging with Zero Real Patient PHI',
    date: '2026-08-14',
    readTime: '6 min read',
    tags: ['ComfyUI', 'SDXL', 'Diffusers', 'Gemini', 'Synthetic Data Generation', 'HIPAA-Oriented AI Design'],
    summary: 'Pairing Gemini 2.5 Flash age-20/70 anchors with a 61-node ComfyUI SDXL parallel latent-interpolation graph across a 20-subject Fitzpatrick I–VI cohort with zero real patient PHI.',
    content: `# A360-ADP: Deterministic Synthetic Facial Aging with Zero Real Patient PHI

> *"In clinical aesthetics ML, longitudinal facial data across decades is scarce and tightly regulated. Deterministic synthetic cohorts let us evaluate and build vision pipelines with zero real patient PHI."*

**Project Detail**: [projects/a360-aging-dataset-pipeline.md](projects/a360-aging-dataset-pipeline.md)

---

## 1. The Core Challenge: Longitudinal Aging Without Patient PHI

Training and evaluating clinical facial analysis workflows across a 50-year age span (ages 20–70) is nearly impossible with real patient photography due to privacy constraints, lighting drift, and multi-decade collection gaps.

To solve this safely, we engineered **A360-ADP** — a deterministic synthetic facial aging workflow spanning **ages 20–70 in 5-year intervals** with **zero real patient PHI**.

---

## 2. Two-Endpoint Anchors + 61-Node ComfyUI SDXL Latent Interpolation

Rather than prompting a diffusion model independently at each age step (which causes severe facial geometry drift), the pipeline anchors both endpoints and interpolates deterministically in latent space:

1. **Age-20 & Age-70 Anchor Generation**: Paired **Gemini 2.5 Flash** anchor portraits establish consistent identity endpoints for each synthetic subject.
2. **61-Node ComfyUI SDXL Graph (\`epicrealismXL\`)**: Runs a parallel latent-interpolation graph with a **fixed seed** and **low-denoise refinement** to generate smooth, identity-consistent 5-year progressions from 20 to 70.
3. **Fitzpatrick I–VI Demographic Coverage**: Structured around a **20-subject Fitzpatrick I–VI demographic cohort** so downstream clinical vision evaluation spans diverse skin tones and facial structures.

---

## 3. Automated Watchdog & Metadata Pipeline

To keep batch generation reproducible and auditable:
- Built a **Python watchdog** and **Excel metadata & prompt automation pipeline** that tracks subject IDs, Fitzpatrick phototypes, fixed seeds, prompt templates, and generated interval outputs.
- Guarantees reproducible re-runs and clean cohort organization without touching a single real patient photograph.
`
  },
  {
    slug: 'sagemaker-onnx-bg-removal-benchmarks',
    filename: 'sagemaker-onnx-bg-removal-benchmarks.md',
    title: 'Benchmarking ONNX Background Removal & Deploying Live SageMaker U²-Net Endpoints (WARP)',
    date: '2026-07-28',
    readTime: '6 min read',
    tags: ['AWS SageMaker', 'ONNX Runtime', 'U²-Net', 'FastAPI', 'AWS S3', 'CloudWatch', 'Computer Vision'],
    summary: 'How a 784-run ONNX Runtime benchmark across 196 clinical images drove a live AWS SageMaker U²-Net endpoint with Silueta fallback behind an async FastAPI REST API.',
    content: `# Benchmarking ONNX Background Removal & Deploying Live SageMaker U²-Net Endpoints (WARP)

> *"Model selection in production computer vision isn't about leaderboard hype—it's about latency, reliability, and predictable failure recovery on real clinical photography."*

**Project Detail**: [projects/a360-sagemaker-bg-removal.md](projects/a360-sagemaker-bg-removal.md)

---

## 1. Clinical Model & ONNX Runtime Benchmarks

Before provisioning managed GPU/CPU inference infrastructure, we systematically benchmarked segmentation candidates on real clinical photos:

- **Initial Model Comparison (n=27)**: Evaluated **U²-Net**, **Silueta**, and **SAM** on clinical photography — **U²-Net averaged 0.22s vs. SAM at 2.35s** (over 10x faster with clean clinical subject edges).
- **784-Run ONNX Runtime Benchmark**: Expanded testing across **196 clinical images** under **ONNX Runtime**, achieving **416ms average latency for U²-Net** with a **100% success rate**.

---

## 2. Live SageMaker Architecture & Async FastAPI Service

\`\`\`
[ Client / Clinical App ]
           │
           ▼
 [ Async FastAPI REST API ] ──► [ Amazon CloudWatch Metrics ]
      │              │
      │              ▼
      │     [ Amazon S3 (AES-256) + Orphan Cleanup ]
      ▼
 [ Live AWS SageMaker Endpoint ]
      ├── Primary: U²-Net (ONNX)
      └── Fallback: Silueta
\`\`\`

### Production Hardening
- **Fallback Resilience**: Deployed the live SageMaker **U²-Net** endpoint with an automatic **Silueta fallback** path.
- **Encrypted Storage & Hygiene**: Stored processed artifacts in **Amazon S3 with AES-256 encryption** paired with automated **orphan cleanup** routines.
- **Observability & Verification**: Instrumented **CloudWatch** operational metrics and validated deployments with automated smoke tests (**100% endpoint smoke-test pass rate**).
`
  },
  {
    slug: 'deterministic-cv-optics-feature-extraction',
    filename: 'deterministic-cv-optics-feature-extraction.md',
    title: 'Clinical 3D Depth Notebooks: Schema Migration, Depth-to-RGB Alignment & Pure-NumPy Point Clouds',
    date: '2026-06-19',
    readTime: '7 min read',
    tags: ['AWS SageMaker Studio', 'OpenCV', 'SciPy', 'NumPy', 'JupyterLab', '3D Depth'],
    summary: 'Inside 9 SageMaker Unified Studio JupyterLab notebooks automating clinical metadata migration (5→12 sections), bilinear depth-to-RGB alignment, Laplacian QC, .ply export, and Lambertian relighting.',
    content: `# Clinical 3D Depth Notebooks: Schema Migration, Depth-to-RGB Alignment & Pure-NumPy Point Clouds

**Project Detail**: [projects/a360-clinical-imaging-3d-sandbox.md](projects/a360-clinical-imaging-3d-sandbox.md)

---

## 1. Secure Clinical Imaging Sandbox

All R&D depth and RGB datasets live inside an **SSE-KMS / IAM-scoped S3 data lake** (\`a360-imaging-poc-dev\`) accessed from **AWS SageMaker Unified Studio JupyterLab**. Across **9 production-grade notebooks**, we standardized the full pre-processing, quality control, and 3D geometry pipeline.

---

## 2. Automated Metadata Migration & Depth Alignment

1. **Metadata Schema Migration**: Automated conversion from legacy **5 top-level sections** to a normalized **12 top-level sections / 57 leaf fields** schema for consistent downstream indexing.
2. **Depth Conversion & Alignment**: Converted raw \`float32\` depth maps to compact \`uint16\` representations and aligned depth frames to RGB imagery via **SciPy bilinear interpolation**.
3. **Deterministic Image QC**: Implemented **OpenCV Laplacian** blur detection and exposure quality checks to flag degraded captures automatically before 3D reconstruction.

---

## 3. Pure-NumPy 3D Point-Cloud Export & Lambertian Relighting

Rather than pulling in heavy native 3D mesh dependencies for routine geometry checks, we implemented camera-intrinsics projection directly in **NumPy**:

\`\`\`python
import numpy as np

def depth_to_point_cloud(depth_m: np.ndarray, fx: float, fy: float, cx: float, cy: float) -> np.ndarray:
    h, w = depth_m.shape
    u, v = np.meshgrid(np.arange(w), np.arange(h))
    valid = depth_m > 0
    z = depth_m[valid]
    x = (u[valid] - cx) * z / fx
    y = (v[valid] - cy) * z / fy
    return np.stack([x, y, z], axis=-1)
\`\`\`

- Exported calibrated 3D point clouds directly to standard **\`.ply\`** files.
- Computed **depth-to-normals** surface maps to enable **Lambertian relighting** for consistent clinical surface inspection across lighting conditions.
`
  },
  {
    slug: 'hardening-mlops-aws-nist-csf',
    filename: 'hardening-mlops-aws-nist-csf.md',
    title: 'HIPAA-Oriented PHI-Safe AI Design on AWS: KMS, IAM & NIST Alignment',
    date: '2026-05-10',
    readTime: '5 min read',
    tags: ['AWS', 'HIPAA-Oriented AI Design', 'NIST AI RMF', 'NIST CSF', 'OWASP Top 10 for LLMs', 'ISO/IEC 42001'],
    summary: 'Designing PHI-safe AI workflows on AWS with SSE-KMS/IAM-scoped S3 data lakes, S3 AES-256 orphan cleanup, SHA-256 prompt hashing without PII, and NIST AI RMF / CSF alignment.',
    content: `# HIPAA-Oriented PHI-Safe AI Design on AWS: KMS, IAM & NIST Alignment

Deploying LLM and computer vision pipelines in clinical aesthetics requires security controls baked into every data contract, storage bucket, and audit log—aligned to **HIPAA-oriented PHI-safe design**, **NIST AI RMF**, **NIST CSF**, and **OWASP Top 10 for LLMs**.

---

## 1. Scoped IAM & Encrypted S3 Storage

- **SSE-KMS & IAM-Scoped Data Lake**: Scoped our clinical imaging sandbox (\`a360-imaging-poc-dev\`) with least-privilege IAM policies and mandatory **SSE-KMS** encryption conditions.
- **S3 AES-256 & Orphan Cleanup**: Production background-removal artifacts are encrypted at rest with **AES-256** and paired with automated orphan cleanup so transient imagery never lingers unmanaged.

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::a360-imaging-poc-dev/*",
      "Condition": {
        "StringEquals": {
          "s3:x-amz-server-side-encryption": "aws:kms"
        }
      }
    }
  ]
}
\`\`\`

---

## 2. PHI-Safe Prompt Fingerprinting & Zero-PHI Synthetic Data

- **6-Field SHA-256 \`prompt_hash\`**: In **A360 Reach**, LLM rerun and version lineage fingerprints are computed strictly over 6 non-sensitive metadata fields—explicitly **excluding raw consultation transcripts and PII/PHI**.
- **Strict Input Contracts**: Enforced Pydantic v2 \`extra="forbid"\` schemas so unexpected or unvalidated payload fields are rejected before reaching model endpoints.
- **Zero-PHI Synthetic Cohorts**: Built **A360-ADP** purely from synthetic anchors so facial aging R&D never touches real patient photos.

---

## 3. CloudWatch Observability & Governance

- Exported SageMaker endpoint health, latency, and error telemetry to **Amazon CloudWatch** with automated smoke-test verification.
- Aligned engineering SOPs and risk controls with **NIST AI RMF**, **NIST CSF**, **OWASP Top 10 for LLMs**, and **ISO/IEC 42001**.
`
  },
  {
    slug: 'a360-reach-llm-backend-audit-lineage',
    filename: 'a360-reach-llm-backend-audit-lineage.md',
    title: 'A360 Reach: Production LLM Persistence, Audit Lineage & Consultation-to-Email Pipeline',
    date: '2026-08-28',
    readTime: '7 min read',
    tags: ['FastAPI', 'SQLAlchemy 2.0', 'PostgreSQL', 'Alembic', 'Pydantic v2', 'AWS Bedrock', 'Bedrock AgentCore', 'Strands Agents'],
    summary: 'Engineering idempotent LLM persistence, self-referencing rerun lineage, PHI-safe SHA-256 prompt hashing, and a 4-stage Claude 3.5 Sonnet transcript-to-email pipeline with 214 passing tests.',
    content: `# A360 Reach: Production LLM Persistence, Audit Lineage & Consultation-to-Email Pipeline

> *"Shipping an LLM feature is easy. Shipping an auditable, idempotent, PHI-safe LLM backend that survives retries, schema drift, and multi-runtime execution is where real systems engineering begins."*

**Project Detail**: [projects/a360-reach-llm-backend.md](projects/a360-reach-llm-backend.md)

---

## 1. Persistence, Versioning & Rerun Lineage (\`patient_emails\`)

In **A360 Reach**, we engineered the \`patient_emails\` persistence, versioning, and rerun subsystem (DAL + **Alembic** migrations) in **FastAPI**, **SQLAlchemy 2.0**, and **PostgreSQL**:

- **Blocking Idempotent Writes**: Guarded concurrent writes with DB \`CHECK\` constraints, partial unique deduplication indexes, and \`IntegrityError\` rollback handling.
- **Self-Referencing Lineage**: Modeled \`rerun_parent_id\` traversal with \`difflib\` version diffing so every regenerated email draft has an exact parent-child audit trail.
- **PHI-Safe Fingerprinting**: Computed a 6-field **SHA-256 \`prompt_hash\`** explicitly excluding transcripts and PII.
- **Unified Agent Contracts**: Enforced strict **Pydantic v2** models (\`extra="forbid"\`) unifying local **Strands Agents** and **AWS Bedrock AgentCore** execution paths (**214 passing backend tests; 107 newly authored**).

---

## 2. 4-Stage Consultation-to-Email Pipeline (\`A360-Reach-Emails\`)

\`\`\`
[ Consultation Transcript ]
           │
           ▼
 [ 3 Deterministic Rule-Based Extractors ]
   ├── Visit Classification
   ├── Opportunity Detection
   └── Commercial KPI Extraction
           │
           ▼
 [ Pydantic Readiness Gates (Confidence & Completeness) ]
           │
           ▼
 [ AWS Bedrock Claude 3.5 Sonnet ] ◄── [ SHA-256-Hashed Markdown KB ]
           │
           ▼
 [ Versioned patient_emails Record ]
\`\`\`

Separating deterministic rule-based extraction and readiness gates from **AWS Bedrock Claude 3.5 Sonnet** generation ensures that incomplete or low-confidence transcripts are caught before an email is ever drafted.
`
  },
  {
    slug: 'wanderweg-walking-tour-guide',
    filename: 'wanderweg-walking-tour-guide.md',
    title: 'Wanderweg: Building an Offline-First Flutter Walking Tour Guide for Germany',
    date: '2026-10-29',
    readTime: '5 min read',
    tags: ['Flutter', 'Dart', 'SQLite', 'MBTiles', 'Offline-First', 'Mobile'],
    summary: 'Designing a manifest-driven, walking-first Flutter tour guide for Berlin, Dresden, and Leipzig with 1-7 day dynamic city planning and a 7.0 MB Berlin SQLite MBTiles offline pack.',
    content: `# Wanderweg: Building an Offline-First Flutter Walking Tour Guide for Germany

> *"Walking only. No booking. No checkouts. No payments. No affiliate links. Just a great walk."*

**Project Detail**: [projects/wanderweg.md](projects/wanderweg.md) | **GitHub Repository**: [github.com/Cappuccino-san/Wanderweg](https://github.com/Cappuccino-san/Wanderweg)  
**Status**: In Progress (Code- and test-verified prototype; repository link only, no hosted demo link yet)

---

## 1. Overview & Stack
**Wanderweg** is a multi-city walking tour guide built in **Flutter / Dart** for unhurried pedestrian travel across **Berlin, Dresden, and Leipzig**. Rather than cluttering the interface with ticket checkouts or affiliate links, the app focuses strictly on curated walking routes, offline map reliability, and plain-language pedestrian navigation.

## 2. Curated Walks & Cities
- **Berlin (Code- & Test-Verified Prototype)**: Features 3 curated walks — **Mitte Essentials**, **Kreuzberg Flavours & Landwehr Canal**, and **Cold War Borderlines & Eastward River Finish** — linking confirmed anchors (*Brandenburg Gate, Reichstag, Unter den Linden, Checkpoint Charlie, East Side Gallery*). East Side Gallery is structured as an eastward river finish / separate transit segment rather than forced on foot into the central walk.
- **Dresden (Demo Proposal)**: Approved 1-day Baroque Spine (*Frauenkirche → Brühl's Terrace → Zwinger → Semperoper → Residenzschloss*) with an Innere Neustadt extension across the Elbe.
- **Leipzig (Demo Proposal)**: Approved 1-day central spine weaving Bach's musical legacy and the 1989 Peaceful Revolution (*Markt / Altes Rathaus → Nikolaikirche → Mädler Passage → Thomaskirche → Augustusplatz*).
- **Austria (Schema Stub)**: Included in \`city-manifest.json\` as a pure schema stub with zero invented cities or packs to verify multi-country extensibility.

## 3. Country-to-City Planner & Berlin Offline Pack
- **Dynamic 1–7 Day City Planner**: Reads countries and cities from \`city-manifest.json\`, supports city reordering, and lets travellers set **1–7 days per city**, dynamically resizing daily walking plans instead of cramming stops.
- **Berlin Offline Pack**: Bundles a **7.0 MB SQLite MBTiles** archive containing **236 genuine OpenStreetMap pedestrian tiles** for full airplane-mode navigation.
- **Live Walk Mode & Moon Mode UI**: High-contrast dark default theme (\`#101418\` canvas) with a 1-tap Sun/Moon toggle, 1-minute stop cards, off-route recovery, "End early to nearest station" shortcut, and a multi-city Trip Journal.
- **Verification Honesty**: Verified by **37 passing Flutter tests** and **0 static analysis issues**. Content packs are code- and test-verified; food hours, prices, and walking timings have not yet been ground-walked in Germany.

---

### Links & Resources
- **Inspect Project File**: [projects/wanderweg.md](projects/wanderweg.md) (\`cat projects/wanderweg.md\`)
- **Source Code**: [https://github.com/Cappuccino-san/Wanderweg](https://github.com/Cappuccino-san/Wanderweg)
`
  },
  {
    slug: 'divisa-outfit-chatbot',
    filename: 'divisa-outfit-chatbot.md',
    title: 'Divisa: Zero-Dependency JavaScript Outfit Chatbot Across 13 Occasions',
    date: '2026-10-29',
    readTime: '5 min read',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Rule-Based NLP', 'SVG', 'UI Design'],
    summary: 'How Divisa locks a key garment, separates Male and Female presets across a 301-item catalogue, and renders 3-option outfit carousels with SVG Model/Flat-lay toggles for 13 occasions.',
    content: `# Divisa: Zero-Dependency JavaScript Outfit Chatbot Across 13 Occasions

**Project Detail**: [projects/divisa.md](projects/divisa.md) | **GitHub Repository**: [github.com/Cappuccino-san/Divisa](https://github.com/Cappuccino-san/Divisa)  
**Status**: Active / Open Source

---

## 1. Overview & Architecture
**Divisa** (Italian for *uniform*) is an outfit chatbot built in vanilla **JavaScript, HTML5, and CSS3** with zero build step and no external dependencies. You pick **Male** or **Female**, lock the specific piece(s) you want to wear, and receive complete outfits across **13 occasions** (**Night Out** first and default).

\`\`\`
User Input ──► DivisaParser.parseInput(text, gender) [Longest-Match + Colour Barrier]
           ──► DivisaGender.audFits [Male (288) / Female (285) Filter]
           ──► DivisaOutfits.buildOutfit(gender, occasion, locks, variant)
           ──► DivisaModel.modelSVG / flatLayHTML + "Why it works" Notes
\`\`\`

## 2. Catalogue, Parser & Occasion Engine
- **301-Item Catalogue**: Contains 288 Twelve70 vocabulary items (TOP 64, OUTERWEAR 68, BOTTOM 34, FOOTWEAR 122) plus 13 female staple garments. Male presets access 288 items and never receive female-only items; Female presets access 285 items and never receive male-only shoes or trousers.
- **13 Occasions (Night Out First)**: Night Out (first and default), Club, Dinner, Family Gathering, Date Night, Brunch / Day Out, Party, Wedding, Formal, Concert / Gig, Christening, Job Interview, and Work / Smart.
- **Interactive Outfit Cards**: Each occasion card provides a **3-variant carousel**, a **Model / Flat-lay toggle** (switching between an illustrated SVG figure dynamically coloured by the outfit and flat-lay item tiles with shade names and hex codes), and **"Why it works" notes**.
- **Longest-Match Parser & Styling Guards**: Uses a consume-the-words parser with a colour barrier (*"white sambas and a harrington"* parses cleanly as White Sambas + plain Harrington, and *"dress shirt"* never triggers a dress), deterministic sock/hosiery rules, conversational dislike pivoting, and a wedding-white guard that flags white/ivory/cream guest items reserved for the bride.

---

### Links & Resources
- **Inspect Project File**: [projects/divisa.md](projects/divisa.md) (\`cat projects/divisa.md\`)
- **Source Code**: [https://github.com/Cappuccino-san/Divisa](https://github.com/Cappuccino-san/Divisa)
`
  },
  {
    slug: 'latin-translator-rule-based-nlp',
    filename: 'latin-translator-rule-based-nlp.md',
    title: 'Deterministic Latin NLP: Whitaker-Style Morphology, Syntax Parsing & Full Virgil Corpus Browser',
    date: '2026-10-29',
    readTime: '6 min read',
    tags: ['Python', 'FastAPI', 'Pydantic', 'NLP', 'Computational Linguistics', 'Pytest'],
    summary: 'Engineering a rule-based Python/FastAPI Latin NLP analyzer with declensions 1-5, conjugations 1-4, irregular verbs, 4,596 lexicon entries, and 94.0% token recognition across Virgil.',
    content: `# Deterministic Latin NLP: Whitaker-Style Morphology, Syntax Parsing & Full Virgil Corpus Browser

**Project Detail**: [projects/latin-translator.md](projects/latin-translator.md) | **GitHub Repository**: [github.com/Cappuccino-san/latin-translator](https://github.com/Cappuccino-san/latin-translator)  
**Status**: Active / Open Source

---

## 1. Why Deterministic Rule-Based Latin NLP?
Instead of hallucinating fluent paraphrases, this **Python / FastAPI** Latin NLP system implements a testable, auditable grammar pipeline: **Lexer → Whitaker-Style Morphology → Curated Lexicon → Syntactic Parser → Web UI / REST API / Chrome Extension**. It delivers word-by-word literal glosses and grammatical parse explanations — explicitly **not** fluent English machine translation.

## 2. Morphology, Syntax & Virgil Browser
- **Whitaker-Style Morphology**: Handles Latin nouns across **declensions 1–5**, verbs across **conjugations 1–4**, adjectives, and irregular verbs (**esse, ire, fero, volo, possum**), stripping enclitics (\`-que\`, \`-ve\`, \`-ne\`) and normalizing macrons.
- **Syntactic Role & Case Explanations**: Resolves subject-verb agreement (including implied 1st/2nd/3rd person pronouns), direct objects, prepositional governance, accusative of duration (*per multos annos*), accusative-plus-infinitive (*AcI*), vocative address (*Musa*), and ablative constructions (means, separation/agent, place where, time, and ablative absolute).
- **Complete Virgil Corpus Browser**: Serves all 26 books of Virgil (*Aeneid* Books I–XII, *Eclogues* Poems I–X, *Georgics* Books I–IV — **12,915 lines / 83,612 word tokens**) with an interactive Sentence Picker, bilingual reader (\`/virgil/read\`), and credited public-domain translations (Williams 1910, Rhoades 1921). Unknown tokens are transparently marked \`[unknown]\` with \`0.00\` confidence.

## 3. Key Metrics & Benchmark Honesty
- **Lexicon Size**: **4,596** verified entries.
- **Golden Benchmark**: **4,530 / 4,530** attested forms (100.0% F1 in-distribution regression test).
- **Pytest Suite**: **137** passing unit and integration tests.
- **Virgil Token Recognition**: **94.0%** (**78,617 / 83,612** tokens recognized across the full Virgil corpus; 100% on *Aeneid* 1.1–33).
- **Coverage Caveat**: Coverage measures **tokens recognized** by the lexicon and morphology engine, not end-to-end dependency parse accuracy on poetic syntax.

---

### Links & Resources
- **Inspect Project File**: [projects/latin-translator.md](projects/latin-translator.md) (\`cat projects/latin-translator.md\`)
- **Source Code**: [https://github.com/Cappuccino-san/latin-translator](https://github.com/Cappuccino-san/latin-translator)
`
  },
  {
    slug: 'aethelgard-sovereign-cognitive-twin',
    filename: 'aethelgard-sovereign-cognitive-twin.md',
    title: 'Project Aethelgard: Local-First Sovereign Cognitive Twin & Cryptographic Provenance Engine',
    date: '2026-10-28',
    readTime: '6 min read',
    tags: ['Python', 'SQLite', 'KùzuDB', 'FastMCP', 'Cryptography', 'Hybrid Search'],
    summary: 'Preserving verifiable engineering context with a BLAKE3 + Ed25519 SQLite WAL ledger, decoupled FTS5 + sqlite-vec + KùzuDB views, 3-way hybrid RRF search, and FastMCP.',
    content: `# Project Aethelgard: Local-First Sovereign Cognitive Twin & Cryptographic Provenance Engine

> *"Models will come and go. Aethelgard is the part that stays, remembers, and can prove what it remembers."*

**Project Detail**: [projects/aethelgard.md](projects/aethelgard.md) | **GitHub Repository**: [github.com/Cappuccino-san/Aethelgard](https://github.com/Cappuccino-san/Aethelgard)  
**Status**: Active / v1.0.0 (Code repository only — never includes runtime \`ledger.db\`, graph files, signing keys, or secrets)

---

## 1. Overview & Cryptographic Ledger
As foundation models commoditize, your engineering context — decisions made, alternatives rejected, and execution lineage — remains scattered across ephemeral chats and commit logs. **Aethelgard** is a local-first Python provenance engine that records events into an append-only **SQLite WAL ledger** formatted in RFC 8785 Canonical JSON, linked via a **BLAKE3 Merkle hash chain**, and signed with a persistent **Ed25519** key stored outside the repository. Before any event is persisted, a **Privacy Airlock** scrubs high-entropy secrets and credentials.

## 2. Decoupled Views, 3-Way Hybrid RRF & FastMCP
- **Three Disposable Views**: The immutable ledger projects into **SQLite FTS5** (BM25 lexical search), **sqlite-vec** (768d semantic vectors via Ollama \`nomic-embed-text\` with deterministic fallback), and **KùzuDB** (property graph tracking \`Decision\`, \`ExecutionArtifact\`, and \`SUPERSEDES\` edges). All views are disposable and rebuildable via \`twin rebuild-views\`.
- **3-Way Hybrid Reciprocal Rank Fusion (RRF)**: Combines lexical, vector, and graph rankings while penalizing superseded decisions and applying exponential half-life time decay.
- **FastMCP Bridge & Passive Capture**: Exposes 5 canonical MCP tools over \`stdio\` (\`recall_context\`, \`commit_decision\`, \`trace_entity_history\`, \`log_execution_artifact\`, \`verify_provenance\`) plus a non-blocking Git post-commit hook and Watchdog daemon.

## 3. Security Honesty: Tamper-Evident, NOT Tamper-Proof
- **Tamper-Evident**: \`twin verify\` detects silent middle edits or broken hashes/signatures across the Merkle chain. It is **not tamper-proof**: an adversary with access to both the local ledger and the local Ed25519 key could rewrite and re-sign the history, and timestamps are local rather than external trusted time.
- **Strict Artifact Hygiene**: Code link only — runtime \`ledger.db\`, KùzuDB graph files, signing keys, and secrets are never committed or linked.

---

### Links & Resources
- **Inspect Project File**: [projects/aethelgard.md](projects/aethelgard.md) (\`cat projects/aethelgard.md\`)
- **Source Code**: [https://github.com/Cappuccino-san/Aethelgard](https://github.com/Cappuccino-san/Aethelgard)
`
  },
  {
    slug: 'rag-decision-system-architecture',
    filename: 'rag-decision-system-architecture.md',
    title: 'Beyond Chat Answers: Building a Structured RAG Policy & Compliance Decision System',
    date: '2026-10-20',
    readTime: '5 min read',
    tags: ['Python', 'FastAPI', 'Pydantic', 'RAG', 'LangChain', 'Semantic Search'],
    summary: 'Ingesting policy/compliance docs with section-aware chunking and semantic search to return approve/flag/reject decisions with citations and calibrated confidence scores.',
    content: `# Beyond Chat Answers: Building a Structured RAG Policy & Compliance Decision System

> *"A RAG chatbot gives you a paragraph and hopes you're convinced. Systems that act on an answer need a schema, evidence, and a number they can set a threshold on."*

**Project Detail**: [projects/rag-decision-system.md](projects/rag-decision-system.md) | **GitHub Repository**: [github.com/Cappuccino-san/RAG-Decision-System](https://github.com/Cappuccino-san/RAG-Decision-System)  
**Status**: Active / Open Source

---

## 1. Overview & Pipeline Design
Built with **Python, FastAPI, Pydantic, and LangChain**, the **RAG-Powered Decision System** evaluates proposed actions against policy and compliance documents and returns a structured Pydantic \`DecisionResult\` — \`approve\`, \`flag\`, \`reject\`, or \`needs_human_review\` — paired with exact section citations and a confidence score computed directly from retrieval evidence.

\`\`\`json
{
  "decision": "reject",
  "rationale": "Vendors may only receive data after a security review and a signed DPA.",
  "risk_flags": ["vendor_sharing_without_dpa_or_review", "external_data_sharing_needs_verification"],
  "confidence": 0.61,
  "citations": [{"document": "vendor_risk.md", "section": "Before sharing data with a vendor", "score": 0.71}]
}
\`\`\`

## 2. Section-Aware Chunking, Retrieval & Guardrailed Decisions
- **Section-Aware Chunking & Pluggable Embeddings**: Splits policy Markdown by section headers with overlap (\`ingest/chunker.py\`) and supports \`hashing\` (offline deterministic default), \`local\` (\`sentence-transformers\` \`all-MiniLM-L6-v2\`), and \`openai\` embedding modes.
- **Evidence-Computed Confidence**: Calculates confidence from best-match cosine similarity, top-result consistency, and source coverage — never from LLM self-reported confidence.
- **Deterministic Risk Rules + Guardrailed LLM**: Named rules (\`decide/rules.py\`) enforce policy prohibitions and conditions; an optional LangChain decider is guardrailed so it cannot override a prohibition or a low-confidence human-review escalation.
- **Architectural Scope**: Uses synthetic policy documents and an **in-memory vector store** with JSON persistence (\`vectorstore.py\`) to demonstrate testable retrieval and decision evaluation (scoring 9/9 decision accuracy and 8/8 retrieval hit rate in \`eval/evaluate.py\`), rather than claiming to be a managed production vector database.

---

### Links & Resources
- **Inspect Project File**: [projects/rag-decision-system.md](projects/rag-decision-system.md) (\`cat projects/rag-decision-system.md\`)
- **Source Code**: [https://github.com/Cappuccino-san/RAG-Decision-System](https://github.com/Cappuccino-san/RAG-Decision-System)
`
  },
  {
    slug: 'workflow-orchestrator-deterministic-triage',
    filename: 'workflow-orchestrator-deterministic-triage.md',
    title: 'AI Workflow Orchestrator: Deterministic Triage for Tickets, Emails & Log Alerts',
    date: '2026-10-20',
    readTime: '5 min read',
    tags: ['Python', 'FastAPI', 'Pydantic', 'LangChain', 'SQLite', 'System Design'],
    summary: 'Combining a LangChain structured classifier (with rules fallback), deterministic P1-P4 priority rules, confidence gating, and a full SQLite audit trail in Python and FastAPI.',
    content: `# AI Workflow Orchestrator: Deterministic Triage for Tickets, Emails & Log Alerts

> *"Most AI demos stop at 'the model answered.' Real operations teams need: classification → rules → action → audit, with a human gate wherever the model isn't confident enough to act."*

**Project Detail**: [projects/workflow-orchestrator.md](projects/workflow-orchestrator.md) | **GitHub Repository**: [github.com/Cappuccino-san/Workflow-Orchestrator](https://github.com/Cappuccino-san/Workflow-Orchestrator)  
**Status**: Active / Open Source

---

## 1. Overview & 6-Stage Triage Pipeline
Built with **Python, FastAPI, Pydantic, LangChain, and SQLite**, the **AI Workflow Orchestrator** unifies operational triage across incoming **tickets, emails, and log alerts**:
1. **Ingest**: Normalizes raw tickets, emails, and logs into a unified Pydantic \`WorkItem\` schema.
2. **Classify**: Uses a LangChain structured-output LLM classifier (\`CLASSIFIER_MODE=llm\`) or a deterministic rules fallback to extract category, urgency, sentiment, and confidence.
3. **Prioritize**: A deterministic Python rules engine (\`rules/engine.py\`) assigns **P1–P4** priority and target queue (\`security\`, \`platform-oncall\`, \`general-triage\`). The LLM never decides priority — identical inputs always produce identical priorities.
4. **Gate**: Routes items with confidence below threshold to \`[HUMAN REVIEW]\` instead of auto-routing.
5. **Act**: Executes mocked, safe actions (queue routing and acknowledgement drafting).
6. **Audit**: Records every item, classification, rule fired, action, and timestamp in a **SQLite audit log** (\`audit.py\`) for full replayability and inspection via \`/triage\`, \`/triage/batch\`, \`/audit\`, and \`/health\`.

\`\`\`
T-1001  ticket -> security  high      P1  queue=security         rule=high_urgency_security_or_outage  conf=0.88  [auto-routed]
L-2001  log    -> outage    critical  P1  queue=platform-oncall  rule=critical_urgency                 conf=0.88  [auto-routed]
T-1003  ticket -> other     medium    P3  queue=general-triage   rule=default                          conf=0.40  [HUMAN REVIEW]
\`\`\`

---

### Links & Resources
- **Inspect Project File**: [projects/workflow-orchestrator.md](projects/workflow-orchestrator.md) (\`cat projects/workflow-orchestrator.md\`)
- **Source Code**: [https://github.com/Cappuccino-san/Workflow-Orchestrator](https://github.com/Cappuccino-san/Workflow-Orchestrator)
`
  },
  {
    slug: 'iphone-lockscreen-tool-resizer',
    filename: 'iphone-lockscreen-tool-resizer.md',
    title: 'iPhone Lockscreen Tool: Single-File On-Device Wallpaper Resizer & Black-Bar Trimmer',
    date: '2026-10-29',
    readTime: '4 min read',
    tags: ['HTML5', 'JavaScript', 'CSS3', 'Canvas API', 'Image Processing', 'Offline-First'],
    summary: 'Building a self-contained HTML tool that auto-trims screenshot black bars, previews live with clock and % visible across 14 iPhone models, and exports native JPGs or ZIPs on-device.',
    content: `# iPhone Lockscreen Tool: Single-File On-Device Wallpaper Resizer & Black-Bar Trimmer

> *"Resize any image to an exact iPhone lockscreen wallpaper — no cropping guesswork, no black bars, no spaces. Everything runs locally in your browser."*

**Project Detail**: [projects/iphone-lockscreen-tool.md](projects/iphone-lockscreen-tool.md) | **GitHub Repository**: [github.com/Cappuccino-san/iPhone-Lockscreen-Tool](https://github.com/Cappuccino-san/iPhone-Lockscreen-Tool)  
**Status**: Active / Open Source

---

## 1. Overview & Zero-Build Single-File Architecture
**iPhone Lockscreen Tool** (\`iphone-lockscreen-tool.html\`) is a single self-contained HTML file that turns landscape screenshots, anime stills, or photos into pixel-exact iPhone lockscreen wallpapers. All image processing runs 100% locally on-device in the browser using the HTML5 Canvas API — no uploads, no backend server, and no build step.

- **Target Resolutions**: Defaults to **iPhone 14 (1170 × 2532)** with **13 other iPhone models** available.
- **Formats & Exports**: Accepts single or batch JPG, PNG, and WebP files and exports at native device resolution as a **single JPG** or a **batch ZIP archive** (with automatic sequential download fallback).

## 2. Resizing Modes, Auto-Trimming & Live Preview
- **Four Framing Modes**:
  - **Fill**: Edge-to-edge full crop with no spaces.
  - **Balanced (62% Default)**: Scales the image to fill **62%** of screen height by default (adjustable), preserving more horizontal context than Fill with smaller top/bottom fills.
  - **Extend**: Keeps 100% of the image visible and mirrors the scene above and below without blur bands.
  - **Fit**: Keeps 100% of the image visible with a blurred fill above and below.
- **Automatic Black-Bar Trimming**: Detects and strips baked-in letterbox/pillarbox black bars from screenshots before computing the target crop.
- **Interactive Phone Preview**: Displays a live lockscreen preview with the iOS clock overlay, **drag-to-reframe** support (plus arrow-key nudging on desktop), and a real-time **% visible** indicator.
- **On-Device Self-Check Suite**: Includes a built-in **Run tests** runner that verifies native resolution output, black-bar trimming, all 4 modes, JPG generation, safe/unique filenames, and batch export directly on-device.

---

### Links & Resources
- **Inspect Project File**: [projects/iphone-lockscreen-tool.md](projects/iphone-lockscreen-tool.md) (\`cat projects/iphone-lockscreen-tool.md\`)
- **Source Code**: [https://github.com/Cappuccino-san/iPhone-Lockscreen-Tool](https://github.com/Cappuccino-san/iPhone-Lockscreen-Tool)
`
  },
  {
    slug: 'production-agent-patterns-reference-architectures',
    filename: 'production-agent-patterns-reference-architectures.md',
    title: 'Production Agent Patterns: 15 Enterprise Architectures for Agentic AI Engineering',
    date: '2026-11-03',
    readTime: '6 min read',
    tags: ['Python', 'FastAPI', 'LangGraph', 'Pydantic', 'SQLite', 'Docker', 'Agentic AI', 'OpenTelemetry', 'Pytest'],
    summary: 'A deep dive into 15 battle-tested enterprise agentic architectures covering autonomous execution loops, human-in-the-loop gates, inter-agent security proxies, and containerized micro-sandboxes.',
    content: `# Production Agent Patterns: 15 Enterprise Architectures for Agentic AI Engineering

> *"Moving agentic AI from brittle demo scripts to resilient enterprise production requires strict schemas, deterministic validation gates, observable telemetry, and sandboxed execution."*

**Project Detail**: [projects/production-agent-patterns.md](projects/production-agent-patterns.md) | **GitHub Repository**: [github.com/Cappuccino-san/Production-Agent-Patterns](https://github.com/Cappuccino-san/Production-Agent-Patterns)  
**Status**: Active / Open Source

---

## 1. Beyond the Toy ReAct Loop

Most agent tutorials rely on unbounded prompt loops with freeform string outputs and uncontrolled tool access. In enterprise environments, this approach leads to cascading hallucinations, unpredictable cost spikes, and security vulnerabilities.

The **Production Agent Patterns** repository provides 15 standalone, production-ready reference implementations engineered around five foundational pillars:
- **Strict Pydantic v2 Contracts**: Every inter-agent message and tool parameter is typed and validated.
- **Explicit State Machines**: Workflows are modeled as directed graphs with LangGraph, ensuring auditable state transitions.
- **Local-First Persistence**: Execution states and telemetry persist to SQLite WAL (\`journal_mode=WAL\`) with FTS5 lexical indexing.
- **Zero-Trust Security & Sandboxing**: Code execution occurs in isolated, resource-capped containers without network egress.
- **Observability by Design**: Distributed tracing with OpenTelemetry spans every LLM hop, tool call, and human approval gate.

---

## 2. Core Autonomous Architectures

1. **Prompt-to-Code ReAct Agent (\`01-prompt-to-code-react-agent\`)**:
   Implements an autonomous reasoning-action loop with AST parsing gates that validate Python syntax before execution, persisting run traces to SQLite WAL.
2. **Hybrid RAG with SQLite FTS5 (\`02-rag-hybrid-sqlite-fts5-agent\`)**:
   Implements Reciprocal Rank Fusion (RRF) across dense vector embeddings and SQLite FTS5 BM25 lexical search, avoiding heavy external vector infrastructure when local SQLite suffices.
3. **Plan-and-Execute DAG Workflow (\`03-plan-and-execute-workflow-agent\`)**:
   Deconstructs ambiguous objectives into a dependency graph of discrete tasks. When individual steps fail, an execution replanner adjusts the DAG without restarting from scratch.
4. **Self-Reflective Critic (\`04-self-reflective-critic-agent\`)**:
   Dual-agent Actor-Critic pattern where an evaluator agent scores candidate solutions against structured rubrics, with strict convergence thresholds to prevent infinite critique loops.
5. **Human-in-the-Loop Gate (\`05-human-in-the-loop-approval-agent\`)**:
   Tokenized pause-and-resume workflows utilizing LangGraph interrupts, persisting paused state so humans can approve high-risk actions.
6. **Typed Multi-Agent Swarm (\`06-typed-multi-agent-swarm\`)**:
   Specialized Researcher, Coder, and Reviewer agents collaborating via structured Pydantic models rather than loose conversational text.

---

## 3. Governance, Observability & Security

7. **Async Slack HITL Gate (\`07-async-hitl-slack-gate\`)**:
   Dispatches interactive Slack Block Kit cards to on-call channels, allowing approvals or rejections via webhook callbacks that safely resume long-running agent workflows.
8. **Trajectory Eval CI Gate (\`08-trajectory-eval-ci-gate\`)**:
   Replays recorded agent execution trajectories against golden reference DAGs during CI/CD to detect regressions in reasoning paths or tool selection.
9. **OpenTelemetry Tracer (\`09-opentelemetry-agent-tracer\`)**:
   Standardized distributed tracing emitting spans across model calls, prompt assembly, and tool invocations compatible with OpenTelemetry collectors.
10. **Inter-Agent Sanitization Proxy (\`10-inter-agent-sanitization-proxy\`)**:
    Security layer placed between interacting agents to inspect and sanitize data, neutralizing prompt injection attacks and preventing data exfiltration.
11. **Sandboxed Code Executor (\`11-sandboxed-code-executor\`)**:
    Hardened Docker micro-sandbox enforcing CPU/memory quotas, execution timeouts, and complete egress network isolation for generated code.
12. **Cost Kill-Switch Middleware (\`12-cost-kill-switch-middleware\`)**:
    Middleware that tracks token expenditure in real time, automatically terminating runs or degrading to smaller models when threshold limits are reached.

---

## 4. Resilience & Production Operations

13. **API-to-Browser Fallback (\`13-api-to-browser-fallback-agent\`)**:
    Dynamic routing agent that falls back to Playwright headless browser automation whenever primary REST APIs encounter downtime or rate limits.
14. **Shadow Trajectory Comparator (\`14-shadow-trajectory-comparator\`)**:
    Runs prospective agent versions in shadow mode alongside production traffic, diffing token cost, latency, and step accuracy before deployment.
15. **Architecture Teardown Cockpit (\`15-public-architecture-teardown\`)**:
    A visual dashboard comparing topologies, cost benchmarks, and state machine transitions across all 15 architectures.

---

### Links & Resources
- **Inspect Project File**: [projects/production-agent-patterns.md](projects/production-agent-patterns.md) (\`cat projects/production-agent-patterns.md\`)
- **Source Code**: [https://github.com/Cappuccino-san/Production-Agent-Patterns](https://github.com/Cappuccino-san/Production-Agent-Patterns)
`
  },
  {
    slug: 'imageiq-deterministic-cv-and-hf-spaces',
    filename: 'imageiq-deterministic-cv-and-hf-spaces.md',
    title: 'ImageIQ & 6 Hugging Face Gradio Spaces: Deterministic Clinical CV with Locked Eval Baselines',
    date: '2026-11-03',
    readTime: '6 min read',
    tags: ['OpenCV', 'MediaPipe', 'Florence-2', 'Hugging Face', 'Gradio', 'ONNX Runtime', 'pytest', 'moto'],
    summary: 'Building a local-first Python clinical CV suite (anatomy-first body cropper, FaceMesh/BlazeFace fallback, Eval V1 baselines, 212 pytest functions with moto[s3]) plus 6 Hugging Face Gradio Spaces.',
    content: `# ImageIQ & 6 Hugging Face Gradio Spaces: Deterministic Clinical CV with Locked Eval Baselines

> *"Deterministic computer vision is built on explicit failure contracts, locked evaluation baselines, and thorough test suites—not fragile one-off scripts."*

**Project Detail**: [projects/a360-imageiq-hf-spaces.md](projects/a360-imageiq-hf-spaces.md)  
**Status**: Shipped / Production

---

## 1. Local-First Clinical CV Architecture (ImageIQ)

We built **ImageIQ** as a local-first Python computer vision pipeline (\`MediaPipe\`, \`OpenCV\`, \`NumPy\`, \`Pillow\`, \`boto3\`) designed for clinical before/after photography:

- **Anatomy-First Body Crop Engine**: Frames clinical body photography consistently around anatomical landmarks rather than naive bounding boxes.
- **Composite Panel Splitting**: Automatically detects and splits multi-panel before/after collages into clean individual frames.
- **Multi-Scale FaceMesh / BlazeFace Fallback**: Cascades from high-precision FaceMesh landmarks to BlazeFace detection when angles or lighting challenge primary inference.
- **Before/After Pairing & Explicit JSON Failure Contracts**: Returns structured JSON error codes on unprocessable images instead of silent crashes or malformed crops.

---

## 2. Locked Eval V1 Baselines & Storage Abstraction

- **Eval V1 Regression Suite**: Locked evaluation baselines across **16 body** and **9 face** clinical test cases to prevent silent visual regressions across pipeline changes.
- **Config-Only Local / S3 Storage**: Switched seamlessly between local disk and S3 via configuration alone, verified with **212 \`pytest\` functions (214 collected items)** using **\`moto[s3]\`**.

---

## 3. Six Hugging Face Gradio Spaces

To make clinical CV prototypes and benchmarks interactively testable across teams, we shipped **6 Hugging Face Gradio Spaces** backed by **130 additional \`pytest\` tests**:
- **Florence-2** matched before/after auto-cropper
- **MediaPipe** 1:1 batch ZIP cropper
- **Stable Diffusion x4** clinical upscaler
- **ONNX Runtime** background-remover benchmark suite

---

### Links & Resources
- **Inspect Project File**: [projects/a360-imageiq-hf-spaces.md](projects/a360-imageiq-hf-spaces.md) (\`cat projects/a360-imageiq-hf-spaces.md\`)
`
  },

  {
    slug: 'building-tty-emulation-terminal-blog',
    filename: 'building-tty-emulation-terminal-blog.md',
    title: 'Simulating Cathode Ray Tubes: Building a High-Fidelity Retro Terminal Portfolio in React 19',
    date: '2026-11-02',
    readTime: '6 min read',
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Web Audio API', 'CRT Simulation'],
    summary: 'Engineering a hardware-accurate retro terminal portfolio with 8-second rolling raster electron sweeps, procedural Web Audio keypress synthesis, virtual Unix filesystem, and color-mix phosphor bloom.',
    content: `# Simulating Cathode Ray Tubes: Building a High-Fidelity Retro Terminal Portfolio in React 19

> *"Most developer portfolios are static grids of cards. TTY Emulation recreates the tactile, analog experience of early computing hardware — complete with phosphor bloom, vacuum tube collapses, and procedural acoustic feedback."*

**Project Detail**: [projects/tty-emulation.md](projects/tty-emulation.md) | **GitHub Repository**: [github.com/Cappuccino-san/TTY-Emulation.-Terminal-Style-dev-page](https://github.com/Cappuccino-san/TTY-Emulation.-Terminal-Style-dev-page)  
**Status**: Active / Production

---

## 1. The Physics of Vintage Displays
Cathode ray tubes weren't just low-resolution monitors; they were analog vacuum tubes with complex electron physics. Replicating that authentically in modern web standards required five distinct layers:
- **Rolling Raster Sweeps**: An 8-second continuous linear gradient sweep simulating the vertical refresh cycle of electron guns.
- **Stepped Phosphor Flicker**: An irregular CSS \`@keyframes\` animation simulating voltage fluctuations in 1980s power supplies.
- **Phosphor Bloom via \`color-mix()\`**: Modern CSS color mixing dynamically calculating inner glow, text shadow, and border highlights based on the active phosphor chemistry (P1 Green, P3 Amber, etc.).
- **Vignette Curvature & Inset Chassis**: Physical screen bezels with spherical radial gradients and hardware PWR LED indicators.
- **Coil Degauss Physics (\`degauss\`)**: Simulating the high-amplitude magnetic oscillation used to neutralize color purity defects on CRT apertures.

---

## 2. Procedural Web Audio Keypress Synthesizer
Rather than loading hundreds of kilobytes of static MP3/WAV click audio files, all sound effects in TTY Emulation are synthesized dynamically using the browser's native Web Audio API:
- **Keypresses**: White noise bursts shaped with an exponential volume decay envelope (\`0.02s\`).
- **Return / Enter**: Low-frequency sine wave thump (\`120Hz\`) layered with a mechanical impact tick.
- **Degauss Hum**: A decaying \`60Hz\` powerline hum mixed with harmonic overtones that sweeps to zero over 1.2 seconds.
- **Power Down (\`exit\`)**: Frequency sweep collapsing toward zero with an exponential pitch descent.

---

## 3. The In-Memory Virtual File System (VFS)
The website is structured as a hierarchical Unix filesystem:
- \`/about/\`: Resumes, skills matrix (\`skills.json\`), contact details, and career history.
- \`/projects/\`: Technical breakdowns of all engineering systems.
- \`/posts/\`: Long-form architectural write-ups and essays.
- Built-in command interpreter supporting \`ls\`, \`cat\`, \`cd\`, \`pwd\`, \`tree\`, \`grep\`, \`neofetch\`, \`mail\`, and \`tools\`.

---

### Links & Resources
- **Inspect Project File**: [projects/tty-emulation.md](projects/tty-emulation.md) (\`cat projects/tty-emulation.md\`)
- **Source Code**: [https://github.com/Cappuccino-san/TTY-Emulation.-Terminal-Style-dev-page](https://github.com/Cappuccino-san/TTY-Emulation.-Terminal-Style-dev-page)
`
  },
  {
    slug: 'zero-dependency-web-architecture',
    filename: 'zero-dependency-web-architecture.md',
    title: 'Back to Basics: Clean, Zero-Dependency Web Architecture & Semantic HTML',
    date: '2025-06-26',
    readTime: '3 min read',
    tags: ['HTML5', 'CSS3', 'Web Standards', 'Zero-Build'],
    summary: 'A reflection on clean zero-dependency web architecture, semantic markup, and the foundational simplicity of building without framework bloat.',
    content: `# Back to Basics: Clean, Zero-Dependency Web Architecture & Semantic HTML

> *"Frameworks come and go, but semantic HTML and clean CSS remain the eternal foundation of the web."*

**Project Detail**: [projects/basic-website.md](projects/basic-website.md) | **GitHub Repository**: [github.com/Cappuccino-san/basic-website](https://github.com/Cappuccino-san/basic-website)  
**Status**: Open Source

---

## 1. The Value of Minimal Web Architecture
In an era where a simple "Hello World" project can pull in hundreds of megabytes of \`node_modules\`, returning to zero-dependency web architecture provides crucial perspective on performance, accessibility, and longevity.

The **basic-website** repository establishes:
- **Instant Execution**: Runs natively in any browser from local filesystem or lightweight HTTP server without build tools.
- **Semantic HTML5**: Native elements (\`<main>\`, \`<article>\`, \`<header>\`, \`<section>\`) providing built-in screen reader support without complex ARIA gymnastics.
- **Responsive CSS Layouts**: Flexible grid and flexbox patterns adapted to mobile, tablet, and desktop viewports.

---

### Links & Resources
- **Inspect Project File**: [projects/basic-website.md](projects/basic-website.md) (\`cat projects/basic-website.md\`)
- **Source Code**: [https://github.com/Cappuccino-san/basic-website](https://github.com/Cappuccino-san/basic-website)
`
  }
];
