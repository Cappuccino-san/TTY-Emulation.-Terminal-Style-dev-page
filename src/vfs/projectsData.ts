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
    tags: ['React', 'System Design', 'API Integration'],
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
    tags: ['ComfyUI', 'IPAdapter', 'PEFT (LoRA, QLoRA)', 'PyTorch', 'Synthetic Data Generation'],
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
    tags: ['Apache Spark (PySpark)', 'AWS Glue', 'S3', 'Large-Scale Systems'],
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
    tags: ['PyTorch', 'AWS Bedrock', 'LangGraph', 'Step Functions', 'vLLM', 'pgvector', 'OpenCV', 'Segment Anything 2 (SAM 2)', 'MediaPipe', 'Open3D', 'Jupyter Notebook', 'SageMaker'],
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
    tags: ['AWS', 'KMS', 'IAM', 'S3', 'NIST AI RMF', 'NIST CSF', 'OWASP Top 10 for LLMs', 'Guardrails AI', 'FastAPI', 'React'],
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
    tags: ['Operational Reporting & Reconciliation', 'Statistics', 'SOP Development'],
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
    tags: ['OpenCV', 'Linux', 'JIRA', 'Confluence', 'CI/CD (GitHub Actions)'],
    repo: 'https://github.com/cappuccino-san/cv-qa-integration',
    summary: 'Software test engineering on computer vision & optics software using OpenCV, MATLAB, and Linux, paired with direct client integration.',
    description: `# Computer Vision Test Engineering & Client Integration\n\n**Role**: Project Liaison / QA & Integration | Rx Photo\n**Stack**: OpenCV, MATLAB, Linux, JIRA, Confluence, CI/CD, OWASP, Client Workflow Troubleshooting\n\n---\n\n## Systems & Technical Implementation\n- **Software Test Engineering & Defect Isolation**: Executed software test engineering, automated defect isolation, and requirements management (JIRA, Confluence) on computer vision & optics software using OpenCV, MATLAB, and Linux, accelerating engineering patch cycles.\n- **CI/CD & OWASP Vulnerability Assessments**: Supported executive engineering initiatives and model-based systems engineering alignments through Cross-Functional Collaboration, conducting CI/CD configuration and OWASP vulnerability assessments across production software source code.\n- **Enterprise Client Workflow Troubleshooting**: Interfaced directly with enterprise clients via phone to validate credit card processing workflows, troubleshoot integration blockers, and train end users on core software functionality.`
  },
  {
    slug: 'wanderweg',
    filename: 'wanderweg.md',
    name: 'Wanderweg — Multi-City Walking Tour Guide',
    status: 'PROTOTYPE',
    stars: 0,
    tags: ['Flutter', 'Dart', 'SQLite', 'MBTiles', 'Offline-First', 'Mobile'],
    repo: 'https://github.com/Cappuccino-san/Wanderweg',
    summary: 'Walking-first virtual tour guide app for Berlin, Dresden, and Leipzig with a manifest-driven country-to-city planner (1-7 days per city) and Berlin offline pack.',
    description: `# Wanderweg — Multi-City Walking Tour Guide\n\n**Role**: Full Stack Mobile & Systems Engineer\n**Stack**: Flutter, Dart, SQLite, MBTiles (OpenStreetMap), Offline-First Architecture\n**Status**: In Progress (Code- and test-verified prototype; repo link only, no hosted demo link yet)\n**GitHub**: [github.com/Cappuccino-san/Wanderweg](https://github.com/Cappuccino-san/Wanderweg)\n**Related Article**: [posts/wanderweg-walking-tour-guide.md](posts/wanderweg-walking-tour-guide.md)\n\n---\n\n## Overview\nWanderweg is a walking-first virtual tour guide application built with Flutter for unhurried, multi-city travel in Germany (**Berlin, Dresden, Leipzig**). Designed strictly for walking — no booking, no checkouts, no payments, and no affiliate links.\n\n## What It Does\n- **Berlin Walking Routes**: Includes 3 curated walks — **Mitte Essentials**, **Kreuzberg Flavours & Landwehr Canal**, and **Cold War Borderlines & Eastward River Finish** — covering confirmed anchors (*Brandenburg Gate, Reichstag, Unter den Linden, Checkpoint Charlie, East Side Gallery*, with East Side Gallery handled as an eastward river finish / separate transit segment rather than forced on foot into the central walk).\n- **Dresden & Leipzig Routes**: Approved 1-day Baroque Spine for Dresden (*Frauenkirche → Brühl's Terrace → Zwinger → Semperoper → Residenzschloss* with Innere Neustadt extension) and 1-day central spine for Leipzig (*Markt / Altes Rathaus → Nikolaikirche → Mädler Passage → Thomaskirche → Augustusplatz*), marked as demo proposals until ground-walked.\n- **Country-to-City Trip Planner**: Dynamically loads countries from \`city-manifest.json\` with zero hardcoding (including an Austria schema stub), lets travellers reorder cities, and adjusts stay length from **1–7 days per city** by dynamically resizing daily plans instead of cramming.\n- **Berlin Offline Pack**: Bundles a 7.0 MB SQLite MBTiles pack (236 OpenStreetMap pedestrian tiles) for full airplane-mode offline map navigation.\n- **Live Walk Mode & Moon Mode UI**: High-contrast dark default theme (\`#101418\` canvas) with 1-tap Sun/Moon toggle, plain-language pedestrian directions, 1-minute stop cards, off-route recovery, and a multi-city Trip Journal.\n\n## Key Facts & Verification\n- **Cities Covered**: Berlin (3 walks), Dresden, Leipzig, plus Austria schema stub.\n- **Trip Planner**: Country-to-city manifest planner with 1–7 days per city.\n- **Offline Map Pack**: 7.0 MB Berlin SQLite MBTiles (236 OpenStreetMap tiles).\n- **Test Suite**: 37 unit and widget tests passing (\`flutter test\`), 0 static analysis issues (\`flutter analyze\`).\n- **Status**: In progress — repository link only, no hosted demo link yet. Content packs are code- and test-verified; food hours, prices, and walking timings have not yet been ground-walked in Germany.`
  },
  {
    slug: 'divisa',
    filename: 'divisa.md',
    name: 'Divisa — Outfit Chatbot',
    status: 'ACTIVE',
    stars: 0,
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Rule-Based NLP', 'SVG', 'UI Design'],
    repo: 'https://github.com/Cappuccino-san/Divisa',
    summary: 'JavaScript outfit chatbot: lock a key item, pick Male or Female, and get complete outfits across 13 occasions (Night Out first) from a 301-item catalogue.',
    description: `# Divisa — Outfit Chatbot\n\n**Role**: Frontend & Rule-Based Systems Engineer\n**Stack**: Vanilla JavaScript (ES5/ES6), HTML5, CSS3, Custom SVG Rendering (Zero Build Step)\n**Status**: Active / Open Source\n**GitHub**: [github.com/Cappuccino-san/Divisa](https://github.com/Cappuccino-san/Divisa)\n**Related Article**: [posts/divisa-outfit-chatbot.md](posts/divisa-outfit-chatbot.md)\n\n---\n\n## Overview\n**Divisa** (Italian for *uniform*) is a zero-dependency JavaScript outfit chatbot that builds complete, styled looks around the specific piece(s) you want to wear. Lock a key item, choose **Male** or **Female**, and receive complete outfits tailored to **13 occasions** (**Night Out** first and default).\n\n## What It Does\n- **Lock Key Items & Gender Presets**: Lock one or multiple garments (e.g., *"black shirt and black shoes"* or *"white sambas and a harrington"*). The locked item stays fixed across every generated outfit while bottoms, layers, footwear, socks, and accessories adapt to each occasion. Male and Female presets enforce strict garment classification (\`js/gender.js\`).\n- **13 Occasions (Night Out First)**: Generates 3 distinct outfit variants per occasion across **Night Out** (first and default), Club, Dinner, Family Gathering, Date Night, Brunch / Day Out, Party, Wedding, Formal, Concert / Gig, Christening, Job Interview, and Work / Smart.\n- **301-Item Catalogue**: Comprises 288 Twelve70 items (TOP 64, OUTERWEAR 68, BOTTOM 34, FOOTWEAR 122) plus 13 female staple garments (Male library shows 288 items; Female library shows 285 items).\n- **Interactive Outfit Cards**: Features a 3-option **carousel** per occasion, a **Model / Flat-lay toggle** switching between a dynamically colour-filled SVG model figure and flat-lay item tiles (with category, shade name, and hex), and **"Why it works" notes**.\n- **Longest-Match Parser & Domain Rules**: Implements a consume-the-words parser with a colour barrier so colours never bleed across items, context-aware sock/hosiery rules, dislike pivoting, and a wedding-white guard that flags white/ivory/cream guest items reserved for the bride.\n\n## Key Facts & Verification\n- **Catalogue Size**: 301 total items (288 Twelve70 vocabulary items + 13 female staples).\n- **Occasions**: 13 occasions (Night Out first), 3 carousel variants per occasion per gender.\n- **Views**: Illustrated SVG Model view and Flat-lay tile view toggle, plus "Why it works" styling notes.\n- **Architecture**: Pure HTML/CSS/JS with no build step, no server, and no external dependencies — verified via \`node --check\` and headless Node VM execution.\n- **Status**: Active — source code available on [GitHub](https://github.com/Cappuccino-san/Divisa).`
  },
  {
    slug: 'latin-translator',
    filename: 'latin-translator.md',
    name: 'Latin NLP — Rule-Based Morphology, Parser & Virgil Browser',
    status: 'ACTIVE',
    stars: 0,
    tags: ['Python', 'FastAPI', 'Pydantic', 'NLP', 'Computational Linguistics', 'Pytest'],
    repo: 'https://github.com/Cappuccino-san/latin-translator',
    summary: 'Python/FastAPI rule-based Latin NLP with Whitaker-style morphology, syntactic parsing, and full Virgil corpus browser (94.0% token recognition across 83,612 tokens).',
    description: `# Latin NLP — Rule-Based Morphology, Parser & Virgil Browser\n\n**Role**: NLP & Backend Systems Engineer\n**Stack**: Python, FastAPI, Pydantic, Pytest, Vanilla JS Web UI, Chrome Extension (Manifest V3)\n**Status**: Active / Open Source\n**GitHub**: [github.com/Cappuccino-san/latin-translator](https://github.com/Cappuccino-san/latin-translator)\n**Related Article**: [posts/latin-translator-rule-based-nlp.md](posts/latin-translator-rule-based-nlp.md)\n\n---\n\n## Overview\nA deterministic, rule-based Latin Natural Language Processing pipeline, FastAPI web application, complete Virgil corpus browser, and Chrome extension that provides testable morphological analysis, syntactic parsing, word-by-word glosses, and plain-English parse explanations — **not** simulated or fluent machine translation.\n\n## What It Does\n- **Whitaker-Style Morphology**: Analyzes Latin nouns across **declensions 1–5**, verbs across **conjugations 1–4**, adjectives, and irregular paradigms (**esse, ire, fero, volo, possum**), including macron normalization and enclitic splitting (\`-que\`, \`-ve\`, \`-ne\`).\n- **Syntactic Parser & "Case Explained" Column**: Identifies finite verbs, nominative subjects (with number/person agreement and implied pronouns), direct objects, prepositional phrases, accusative of duration (*per multos annos*), accusative-plus-infinitive (*AcI*) indirect statements, vocative direct address, and ablative constructions (means, separation/agent, place where, time, and ablative absolute).\n- **Full Virgil Corpus Browser & Bilingual Reader**: Interactive browser for the complete Perseus texts of Virgil's *Aeneid* (Books I–XII, 9,897 lines), *Eclogues* (Poems I–X, 830 lines), and *Georgics* (Books I–IV, 2,188 lines) totaling **12,915 lines and 83,612 word tokens**, paired with credited public-domain verse translations (Williams 1910, Rhoades 1921).\n- **Sequential Word-by-Word Gloss (No Hallucination)**: Outputs word-by-word literal dictionary glosses and syntactic role explanations as a reading aid, explicitly **not** a fluent English translation. Unrecognized words are reported honestly as \`[unknown]\` with \`0.00\` confidence.\n\n## Key Facts & Benchmark Caveats\n- **Curated Lexicon**: **4,596** verified entries.\n- **Golden Benchmark**: **4,530 / 4,530** attested forms (100.0% in-distribution regression baseline).\n- **Automated Test Suite**: **137** passed \`pytest\` unit and integration tests.\n- **Virgil Token Recognition**: **94.0%** (**78,617 / 83,612** running tokens recognized across all 26 books: *Aeneid* 94.5%, *Georgics* 92.7%, *Eclogues* 92.3%, and 100% on *Aeneid* 1.1–33).\n- **Scope Note**: Coverage measures **tokens recognized** by the lexicon and morphology engine, not end-to-end syntactic parse accuracy on complex poetic word order.\n- **Status**: Active — full source code and evaluation harness on [GitHub](https://github.com/Cappuccino-san/latin-translator).`
  },
  {
    slug: 'aethelgard',
    filename: 'aethelgard.md',
    name: 'Aethelgard — Local-First Sovereign Cognitive Twin',
    status: 'ACTIVE',
    stars: 0,
    tags: ['Python', 'SQLite', 'KùzuDB', 'FastMCP', 'Cryptography', 'Hybrid Search'],
    repo: 'https://github.com/Cappuccino-san/Aethelgard',
    summary: 'Python local-first Sovereign Cognitive Twin with cryptographic provenance (BLAKE3 + Ed25519), FTS5 + sqlite-vec + KùzuDB 3-way hybrid RRF search, and FastMCP bridge.',
    description: `# Aethelgard — Local-First Sovereign Cognitive Twin\n\n**Role**: Systems & Cryptographic Provenance Architect\n**Stack**: Python, SQLite WAL (FTS5, sqlite-vec), KùzuDB, BLAKE3, Ed25519, Ollama, FastMCP\n**Status**: Active / v1.0.0\n**GitHub**: [github.com/Cappuccino-san/Aethelgard](https://github.com/Cappuccino-san/Aethelgard)\n**Related Article**: [posts/aethelgard-sovereign-cognitive-twin.md](posts/aethelgard-sovereign-cognitive-twin.md)\n\n---\n\n## Overview\n**Project Aethelgard** is a local-first **Sovereign Cognitive Twin & Cryptographic Provenance Engine** written in Python. While foundation models commoditize, engineering context — architectural decisions, rejected alternatives, execution artifacts, and lineage — remains fragmented. Aethelgard preserves a single local, verifiable record that any autonomous agent or IDE can query via MCP.\n\n## What It Does\n- **Cryptographic Provenance Ledger**: Stores decisions, notes, git commits, and file events in an append-only SQLite WAL ledger serialized with RFC 8785 Canonical JSON, chained via a **BLAKE3 Merkle hash chain**, and signed with a persistent host-level **Ed25519** key stored outside Git and the ledger.\n- **Privacy Airlock**: Scrubs high-entropy secrets, API keys, and credentials before any payload is hashed or persisted.\n- **Decoupled Disposable Views**: Indexes the immutable ledger three ways — lexical search via **SQLite FTS5 (BM25)**, 768-dimensional semantic search via **sqlite-vec** (using Ollama \`nomic-embed-text\` with deterministic fallback), and episodic lineage via **KùzuDB** property graphs (\`SUPERSEDES\` edges). Views can be dropped and rebuilt anytime via \`twin rebuild-views\`.\n- **3-Way Hybrid RRF Search**: Combines BM25, vector cosine similarity, and graph topology via **Reciprocal Rank Fusion (RRF)**, penalizing superseded decisions and applying half-life exponential time decay.\n- **FastMCP Bridge & Passive Capture**: Exposes 5 canonical MCP tools over \`stdio\` (\`recall_context\`, \`commit_decision\`, \`trace_entity_history\`, \`log_execution_artifact\`, \`verify_provenance\`) alongside a non-blocking Git post-commit hook and debounced Watchdog filesystem daemon.\n\n## Key Facts & Security Honesty\n- **Tamper-Evident, NOT Tamper-Proof**: Aethelgard detects unauthorized middle edits or hash/signature mismatches via \`twin verify\`, but an attacker with local access to both the ledger and the host signing key could rewrite and re-sign the chain, and timestamps are local rather than trusted third-party time.\n- **Code-Only Repository**: Never links or includes runtime \`ledger.db\` files, KùzuDB graph files, Ed25519 signing keys, or secrets.\n- **Test Suite**: 41 unit and integration tests passing.\n- **Status**: Active — source code available on [GitHub](https://github.com/Cappuccino-san/Aethelgard).`
  },
  {
    slug: 'rag-decision-system',
    filename: 'rag-decision-system.md',
    name: 'RAG-Powered Policy & Compliance Decision System',
    status: 'ACTIVE',
    stars: 0,
    tags: ['Python', 'FastAPI', 'Pydantic', 'RAG', 'LangChain', 'Semantic Search'],
    repo: 'https://github.com/Cappuccino-san/RAG-Decision-System',
    summary: 'Python/FastAPI/Pydantic RAG decision system that ingests policy/compliance docs, runs semantic search, and returns approve/flag/reject with citations and confidence.',
    description: `# RAG-Powered Policy & Compliance Decision System\n\n**Role**: AI/ML Systems Engineer\n**Stack**: Python, FastAPI, Pydantic, LangChain, Sentence-Transformers / OpenAI Embeddings, Pytest, Docker\n**Status**: Active / Open Source\n**GitHub**: [github.com/Cappuccino-san/RAG-Decision-System](https://github.com/Cappuccino-san/RAG-Decision-System)\n**Related Article**: [posts/rag-decision-system-architecture.md](posts/rag-decision-system-architecture.md)\n\n---\n\n## Overview\nInstead of returning an unstructured chat paragraph, this **RAG-Powered Decision System** ingests policy and compliance documents, retrieves relevant clauses via semantic search, and outputs a schema-validated decision (**approve**, **flag**, **reject**, or **needs_human_review**) complete with exact policy citations and a retrieval-computed confidence score.\n\n## What It Does\n- **Section-Aware Document Ingestion**: Splits Markdown policy and compliance documents into deterministic, section-aware overlapping chunks (\`ingest/chunker.py\`) so citations preserve exact document and section headers.\n- **Pluggable Embedding Modes & In-Memory Vector Store**: Supports three embedding backends behind a unified interface — \`hashing\` (deterministic offline default for zero-setup CI/tests), \`local\` (\`sentence-transformers\` \`all-MiniLM-L6-v2\`), and \`openai\` — backed by a lightweight **in-memory vector store** with JSON persistence (\`vectorstore.py\`).\n- **Evidence-Based Confidence Scoring**: Computes confidence directly from retrieval metrics (best-match cosine similarity strength, top-result consistency, and source coverage) rather than asking an LLM to self-report certainty.\n- **Deterministic Risk Rules + Guardrailed LLM Decider**: Evaluates requests against named, testable risk-flag rules (\`decide/rules.py\`). An optional LangChain structured-output decider is available, strictly guardrailed so it cannot override a policy prohibition or bypass a low-confidence escalation.\n- **FastAPI Service & Separate Evaluation**: Exposes \`/decide\`, \`/search\`, \`/reindex\`, and \`/health\` endpoints, and includes an evaluation harness (\`eval/evaluate.py\`) that scores retrieval hit rate (8/8) and decision accuracy (9/9) independently.\n\n## Key Facts & Architectural Honesty\n- **Synthetic Policy Docs & In-Memory Store**: Uses synthetic example policy documents, section-aware chunking, and an in-memory vector store with JSON persistence to demonstrate testable RAG decision patterns — it is **not** presented as a managed production vector database.\n- **Outputs**: Pydantic \`DecisionResult\` containing \`decision\`, \`rationale\`, \`risk_flags\`, \`confidence\`, and \`citations\`.\n- **Status**: Active — source code available on [GitHub](https://github.com/Cappuccino-san/RAG-Decision-System).`
  },
  {
    slug: 'workflow-orchestrator',
    filename: 'workflow-orchestrator.md',
    name: 'AI Workflow Orchestrator — Deterministic Triage & Audit Engine',
    status: 'ACTIVE',
    stars: 0,
    tags: ['Python', 'FastAPI', 'Pydantic', 'LangChain', 'SQLite', 'System Design'],
    repo: 'https://github.com/Cappuccino-san/Workflow-Orchestrator',
    summary: 'Python/FastAPI/Pydantic deterministic workflow orchestrator providing unified triage for tickets, emails, and logs with LangChain/rules classification and SQLite audit trail.',
    description: `# AI Workflow Orchestrator — Deterministic Triage & Audit Engine\n\n**Role**: AI Workflow & Backend Engineer\n**Stack**: Python, FastAPI, Pydantic, LangChain (Structured Outputs), SQLite, Pytest, Docker\n**Status**: Active / Open Source\n**GitHub**: [github.com/Cappuccino-san/Workflow-Orchestrator](https://github.com/Cappuccino-san/Workflow-Orchestrator)\n**Related Article**: [posts/workflow-orchestrator-deterministic-triage.md](posts/workflow-orchestrator-deterministic-triage.md)\n\n---\n\n## Overview\nReal operations teams need more than an LLM text completion: they need **classification → deterministic rules → confidence gate → action → audit**. The **AI Workflow Orchestrator** provides unified triage across **tickets, emails, and log alerts**, ensuring that priority assignment and queue routing remain 100% deterministic and auditable.\n\n## What It Does\n- **Unified Schema Ingestion**: Normalizes heterogeneous incoming tickets, emails, and log alerts into a strict Pydantic \`WorkItem\` contract (\`schemas.py\`, \`ingest.py\`).\n- **LangChain Classifier with Deterministic Rules Fallback**: Classifies each item by category, urgency, sentiment, and confidence using either a LangChain structured-output LLM classifier (\`CLASSIFIER_MODE=llm\`) or an offline deterministic rules fallback.\n- **Deterministic Priority & Routing Engine**: A plain-Python rules engine (\`rules/engine.py\`) assigns priority (**P1–P4**), selects the owning team queue (e.g., \`security\`, \`platform-oncall\`, \`general-triage\`), and records the exact rule fired. The LLM never decides priority — the same classification always yields the same priority.\n- **Confidence Gate & Mocked Safe Actions**: Items falling below the confidence threshold are routed to a \`[HUMAN REVIEW]\` queue instead of auto-executing. Approved items trigger mocked, side-effect-safe actions (queue routing and acknowledgement drafting).\n- **Full SQLite Audit Trail & FastAPI Endpoints**: Every triage run persists the item, classification, rule fired, actions taken, and timestamp in SQLite (\`audit.py\`) so any decision can be replayed and explained. Exposed via CLI and FastAPI (\`/triage\`, \`/triage/batch\`, \`/audit\`, \`/health\`).\n\n## Key Facts & Scope Notes\n- **Pipeline Stages**: Ingest → Classify (LangChain or rules fallback) → Prioritize (deterministic P1–P4 rules) → Confidence Gate → Act (mocked) → SQLite Audit.\n- **Safe by Design**: Actions are intentionally mocked and sample data is synthetic, demonstrating production triage orchestration without triggering external emails or live tickets.\n- **Status**: Active — source code available on [GitHub](https://github.com/Cappuccino-san/Workflow-Orchestrator).`
  }
];
