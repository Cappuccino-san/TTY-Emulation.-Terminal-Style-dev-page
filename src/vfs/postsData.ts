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
The next steps involve adding historical flight paths and predictive landing estimations for major hubs like Logan International Airport (BOS).`
  },
  {
    slug: 'synthetic-data-with-latent-interpolation',
    filename: 'synthetic-data-with-latent-interpolation.md',
    title: 'Engineering Identity-Preserving Synthetic Datasets with Latent Diffusion & IPAdapter',
    date: '2026-08-14',
    readTime: '6 min read',
    tags: ['PyTorch', 'ComfyUI', 'IPAdapter', 'InsightFace', 'Synthetic Data Generation'],
    summary: 'Constructing deterministic age progression manifolds with IPAdapter FaceID, InsightFace embeddings, and custom latent trajectory interpolation.',
    content: `# Engineering Identity-Preserving Synthetic Datasets with Latent Diffusion & IPAdapter

> *"In clinical machine learning, authentic patient diversity is paramount—yet privacy and sample scarcity are eternal bottlenecks. Deterministic synthetic data generation bridges this gap."*

When training computer vision models for longitudinal medical imaging (such as dermatological skin progression and anatomical aging), gathering paired ground-truth images across decades is statistically near-impossible. 

To solve this at scale, we engineered the **A360 Aging Dataset Pipeline**, generating high-fidelity, identity-locked synthetic cohorts across ages 20 through 70.

---

## 1. The Core Challenge: Identity Drift vs. Feature Evolution

Standard text-to-image diffusion models (\`Stable Diffusion\`, \`Flux\`) drift significantly when prompted with aging modifiers (e.g., *"a 65 year old version of person X"*). The model alters facial bone topology, eye geometry, and cranial contours, breaking identity invariance.

To enforce strict structural identity retention:
1. **InsightFace ArcFace Embeddings**: Extract 512-dimensional normalized facial feature vectors from baseline ground truth images.
2. **IPAdapter FaceID Conditioning**: Inject the extracted identity tensor directly into the cross-attention layers of the UNet / Transformer backbone.
3. **Calibrated Latent Space Interpolation**: Apply linear and geodesic vector projections along an empirical aging manifold.

\`\`\`python
import torch
import torch.nn.functional as F

class AgingLatentInterpolator:
    def __init__(self, age_basis_path: str):
        # Pre-computed principal component direction for biological aging in latent space
        self.age_direction = torch.load(age_basis_path)

    def interpolate(self, base_latent: torch.Tensor, current_age: int, target_age: int, alpha: float = 1.0) -> torch.Tensor:
        delta_years = target_age - current_age
        progression_factor = (delta_years / 50.0) * alpha
        
        # Orthogonal projection to avoid identity distortion
        shifted_latent = base_latent + (progression_factor * self.age_direction.to(base_latent.device))
        return shifted_latent
\`\`\`

---

## 2. ComfyUI Headless Execution & Deterministic Fallbacks

To ensure reproducibility across batch pipelines:
- Configured headless execution nodes inside containerized **AWS SageMaker / ECR** worker pools.
- Established **deterministic fallback logic** via AWS Bedrock (Stability AI API) when local GPU clusters experience peak queue contention.
- Integrated automated landmark verification gates to discard generated frames exhibiting >1.5% interocular distortion.

## 3. Results & Impact
- Generated **10,000+ paired synthetic clinical image sets** across 5 distinct age buckets (20s, 30s, 40s, 50s, 60s+).
- Downstream diagnostic segmentation models achieved **94.8% generalization accuracy** without requiring access to protected patient health information (PHI).
`
  },
  {
    slug: 'scaling-pyspark-aws-glue-multimodal',
    filename: 'scaling-pyspark-aws-glue-multimodal.md',
    title: 'Architecting Distributed Big Data Pipelines for Multimodal Healthcare Records',
    date: '2026-07-28',
    readTime: '8 min read',
    tags: ['Apache Spark (PySpark)', 'AWS Glue', 'S3', 'Large-Scale Systems'],
    summary: 'How distributed PySpark transforms on AWS Glue cut multimodal ETL runtime by 68% across 10,000+ clinical records.',
    content: `# Architecting Distributed Big Data Pipelines for Multimodal Healthcare Records

Modern clinical AI systems do not just consume text or tabular numbers—they ingest high-resolution RGB imagery, 3D LiDAR point clouds, longitudinal patient records, and EXIF camera optical metadata simultaneously.

Processing this volume on single-node Python workers quickly runs into memory saturation and unpredictable runtimes. Here is how we designed a high-throughput, distributed pipeline using **PySpark** and **AWS Glue**.

---

## Architecture Blueprint

\`\`\`
[ Raw Ingestion S3 Bucket ]
             │
             ▼
   [ AWS Glue Catalog ]
             │
             ▼
   [ AWS EMR / Glue Spark Cluster ] ── (PySpark Distributed Transformations)
       ├── Optical Metadata & EXIF Validation
       ├── PyTorch UDF for Quality Scoring
       └── Interocular Normalization
             │
             ▼
[ S3 Data Lake (Parquet + Partitioned) ] ──► [ SageMaker ML Training ]
\`\`\`

---

## 1. Custom PySpark User-Defined Functions (UDFs) with PyTorch

To perform batch computer vision checks across millions of partitions without Python serialization bottlenecks:

\`\`\`python
from pyspark.sql.functions import udf, col
from pyspark.sql.types import FloatType
import io
from PIL import Image

@udf(returnType=FloatType())
def calculate_sharpness_udf(image_bytes: bytes) -> float:
    if not image_bytes:
        return 0.0
    image = Image.open(io.BytesIO(image_bytes)).convert("L")
    import cv2
    import numpy as np
    img_np = np.array(image)
    return float(cv2.Laplacian(img_np, cv2.CV_64F).var())

# Distributed transformation on 10,000+ record batches
def filter_and_transform_clinical_dataset(spark_df):
    return (
        spark_df
        .withColumn("sharpness_score", calculate_sharpness_udf(col("raw_image_bytes")))
        .filter(col("sharpness_score") >= 120.0)
        .withColumn("is_optically_valid", col("interocular_dist") > 50.0)
    )
\`\`\`

---

## 2. Partition Strategy & Cost Efficiency
- **Partition Pruning**: Segmented datasets by \`cohort_decade\` and \`acquisition_device\`, allowing downstream training jobs to read only 12% of the dataset per model iteration.
- **Parquet Compaction**: Automated small-file compaction and partition tuning reduced I/O overhead on S3 by 4.8x.
- **Outcome**: Total batch runtimes plummeted from **4 hours 15 minutes** down to **1 hour 18 minutes**, saving substantial AWS compute costs.
`
  },
  {
    slug: 'deterministic-cv-optics-feature-extraction',
    filename: 'deterministic-cv-optics-feature-extraction.md',
    title: 'Deterministic Optics: Combining MediaPipe, OpenCV, and 3D LiDAR Point Clouds',
    date: '2026-06-19',
    readTime: '7 min read',
    tags: ['OpenCV', 'MediaPipe', 'Open3D'],
    summary: 'Sub-millimeter anatomical feature extraction, facial landmark alignment, and optical distortion calibration.',
    content: `# Deterministic Optics: Combining MediaPipe, OpenCV, and 3D LiDAR Point Clouds

In aesthetic medicine and clinical facial analysis, deep learning estimates alone are insufficient. When measuring facial asymmetry, volumetric changes, or aging markers, measurements must be **physically calibrated and millimeter-accurate**.

Here is our methodology for pairing **MediaPipe 468-point facial meshes**, **OpenCV optical calibration**, and **3D LiDAR point cloud fusion**.

---

## 1. Intrinsic Camera Calibration & Distortion Correction

Raw smartphone or clinical camera lenses introduce barrel distortion. Before computing any Euclidean distance:

\`\`\`python
import cv2
import numpy as np

def undistort_clinical_frame(frame: np.ndarray, camera_matrix: np.ndarray, dist_coeffs: np.ndarray) -> np.ndarray:
    h, w = frame.shape[:2]
    new_camera_matrix, roi = cv2.getOptimalNewCameraMatrix(
        camera_matrix, dist_coeffs, (w, h), 1, (w, h)
    )
    undistorted = cv2.undistort(frame, camera_matrix, dist_coeffs, None, new_camera_matrix)
    x, y, w_roi, h_roi = roi
    return undistorted[y:y+h_roi, x:x+w_roi]
\`\`\`

---

## 2. MediaPipe Landmark Alignment & Interocular Distance (IOD)

Using the pupils as a physiological anchor:
- Extract landmark \`#33\` (outer left eye corner), \`#133\` (inner left eye corner), \`#362\` (inner right eye corner), and \`#263\` (outer right eye corner).
- Compute the 3D optical center vector and normalize scale against known patient IOD.

\`\`\`python
import mediapipe as mp

mp_face_mesh = mp.solutions.face_mesh

def extract_iod_and_pose(image_rgb: np.ndarray):
    with mp_face_mesh.FaceMesh(
        static_image_mode=True,
        max_num_faces=1,
        refine_landmarks=True,
        min_detection_confidence=0.7
    ) as face_mesh:
        results = face_mesh.process(image_rgb)
        if not results.multi_face_landmarks:
            return None
        
        landmarks = results.multi_face_landmarks[0].landmark
        # Convert normalized coordinates to millimeter 3D vectors
        left_pupil = np.array([landmarks[468].x, landmarks[468].y, landmarks[468].z])
        right_pupil = np.array([landmarks[473].x, landmarks[473].y, landmarks[473].z])
        
        iod_euclidean = np.linalg.norm(left_pupil - right_pupil)
        return {"iod_metric": float(iod_euclidean), "landmarks_total": len(landmarks)}
\`\`\`

---

## 3. Merging with 3D LiDAR Depth Meshes
By raycasting 2D landmark coordinates against the aligned 3D LiDAR point cloud, we reconstruct real millimeter depth profiles of nasolabial folds, periorbital volume, and cheek elevation.
`
  },
  {
    slug: 'hardening-mlops-aws-nist-csf',
    filename: 'hardening-mlops-aws-nist-csf.md',
    title: 'Hardening Production GenAI & SageMaker Workflows for NIST CSF Compliance',
    date: '2026-05-10',
    readTime: '5 min read',
    tags: ['AWS', 'SageMaker', 'NIST CSF', 'ISO/IEC 42001', 'CI/CD (GitHub Actions)'],
    summary: 'Implementing least-privilege IAM, KMS encryption keys, CloudWatch drift telemetry, and automated CI/CD security scanning.',
    content: `# Hardening Production GenAI & SageMaker Workflows for NIST CSF Compliance

Deploying machine learning models in healthcare environments requires strict alignment with cybersecurity frameworks, specifically the **NIST Cybersecurity Framework (CSF)** and HIPAA security rules.

Here are the key security controls we baked into our production AWS MLOps lifecycle.

---

## 1. Identity & Access Management (IAM) Least-Privilege

- **Zero Wildcard Permissions**: No \`s3:*\` or \`sagemaker:*\` policies in production roles.
- **Resource-Constrained Policies**: SageMaker training instances are locked to specific S3 prefix ARNs with mandatory KMS encryption context checks.

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::clinical-ml-artifacts-prod/models/*",
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

## 2. Automated OWASP & Vulnerability Scanning in GitHub Actions
Every pull request building Docker images for Amazon ECR triggers:
- **Trivy Container Scanning**: Scans base Linux container layers for CVEs.
- **Bandit & SonarQube**: Static code analysis preventing insecure deserialization (\`pickle.load\`), hardcoded secrets, and SQL injection.

## 3. Real-Time Model Drift & Observability
- Exported inference latency, input token count, and statistical drift metrics directly into **Amazon CloudWatch**.
- Configured automated alarms that invoke SNS alerts if Kolmogorov-Smirnov test statistics exceed baseline drift thresholds for >3 consecutive hours.
`
  },
  {
    slug: 'compound-ai-workflows-langgraph-bedrock',
    filename: 'compound-ai-workflows-langgraph-bedrock.md',
    title: 'Building Stateful Compound AI Workflows with LangGraph, AWS Bedrock & pgvector',
    date: '2026-08-28',
    readTime: '6 min read',
    tags: ['LangGraph', 'AWS Bedrock', 'pgvector', 'vLLM', 'NIST AI RMF', 'Guardrails AI'],
    summary: 'Designing stateful agentic workflows with deterministic fallback routing, tool calling, self-correction loops, and Guardrails AI sanitization.',
    content: `# Building Stateful Compound AI Workflows with LangGraph, AWS Bedrock & pgvector

> *"Single-turn prompt engineering has hit a ceiling. Production systems demand Compound AI Architectures—stateful graphs of modular models, vector indices, and deterministic tool-calling guardrails."*

In high-stakes clinical and enterprise workflows, relying on a solitary LLM call leads to non-deterministic failure modes. To achieve deterministic reliability, we architected **Compound AI Workflows** leveraging **LangGraph**, **AWS Bedrock**, **vLLM**, and **pgvector**.

---

## 1. State Graph Architecture & Self-Correction Loops

By structuring inference as a cyclic directed state graph in LangGraph:
- **Node 1 (Intent Classifier & PII Sanitizer)**: Validate input constraints and scrub sensitive patterns with **Guardrails AI**.
- **Node 2 (Hybrid Vector Retrieval)**: Query **pgvector** with dense HNSW embeddings and sparse BM25 indices to fetch verified clinical context.
- **Node 3 (LLM Generation)**: Execute structured tool calls on AWS Bedrock (Claude 3.5 Sonnet / Llama 3.3).
- **Node 4 (Hallucination Evaluator)**: If the output fails structural JSON schema validation or exceeds confidence bounds, route back to Node 3 with targeted feedback.

\`\`\`python
from langgraph.graph import StateGraph, END
from typing import TypedDict, List
import pgvector

class AgentState(TypedDict):
    query: str
    context: List[str]
    generated_report: str
    retry_count: int
    is_valid: bool

workflow = StateGraph(AgentState)
workflow.add_node("sanitize_and_retrieve", retrieve_clinical_context)
workflow.add_node("generate_with_bedrock", generate_clinical_synthesis)
workflow.add_node("verify_guardrails", evaluate_output_guardrails)

workflow.set_entry_point("sanitize_and_retrieve")
workflow.add_edge("sanitize_and_retrieve", "generate_with_bedrock")
workflow.add_edge("generate_with_bedrock", "verify_guardrails")

workflow.add_conditional_edges(
    "verify_guardrails",
    lambda state: "end" if state["is_valid"] or state["retry_count"] >= 3 else "retry",
    {
        "end": END,
        "retry": "generate_with_bedrock"
    }
)
\`\`\`

---

## 2. Low-Latency vLLM Runtimes & Prompt Caching
For repetitive feature classification queries:
- Deployed quantized open-weight models (**vLLM** with PagedAttention and FP8 quantization).
- Reduced end-to-end P95 latency from **1,400ms down to 185ms** while saving over 70% in API inference costs.
- Enforced strict compliance with **NIST AI RMF** risk management principles throughout the deployment lifecycle.
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
  }
];

