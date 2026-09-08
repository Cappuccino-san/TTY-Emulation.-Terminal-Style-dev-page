export interface ManPage {
  command: string;
  section: number;
  synopsis: string;
  description: string;
  commandsList?: { cmd: string; desc: string; example?: string }[];
  options?: { flag: string; desc: string }[];
  examples?: string[];
  keybindings?: { key: string; action: string }[];
  seeAlso?: string[];
}

export const MAIN_HELP_MAN: ManPage = {
  command: 'NAPOLI-TTY',
  section: 1,
  synopsis: 'napoli-sh [--theme THEME] [--audio] [--scanlines] [COMMAND] [ARGS...]',
  description: `Nicholas Napoli TTY is an interactive developer portfolio and terminal shell environment.
Built by Nicholas Napoli (AI/ML Workflow & Systems Engineer, Winthrop, MA).
All career milestones, technical skills, production AI/ML systems, and deep-dive engineering articles are exposed as an interactive virtual POSIX hierarchy.`,
  commandsList: [
    { cmd: 'resume / cv', desc: 'Display complete Curriculum Vitae (Work Experience, Education, Skills, Certifications).', example: 'resume' },
    { cmd: 'skills', desc: 'Display the complete Technical Skills Matrix (AI/ML, PyTorch, Big Data, Cloud, Systems).', example: 'skills' },
    { cmd: 'experience', desc: 'Display professional engineering work history and achievements.', example: 'experience' },
    { cmd: 'education', desc: 'Display academic credentials (UMass Lowell M.S. 3.90 GPA, High Point B.S. Cum Laude, AWS Certified AI Practitioner).', example: 'education' },
    { cmd: 'projects', desc: 'Browse flagship production machine learning pipelines and full-stack systems.', example: 'projects' },
    { cmd: 'posts', desc: 'List technical engineering write-ups and pipeline architectural blueprints.', example: 'posts' },
    { cmd: 'whoami', desc: 'Display author identity, professional summary, contact info, and coordinates.', example: 'whoami' },
    { cmd: 'mail', desc: 'Launch interactive message composer to contact Nicholas Napoli directly (njnapoli99@gmail.com).', example: 'mail' },
    { cmd: 'ls [-l|-a] [dir]', desc: 'List files, posts, projects, and directories in current or target path.', example: 'ls -l projects' },
    { cmd: 'cat <file>', desc: 'Read and render markdown files, resumes, or config files with syntax highlighting.', example: 'cat about/resume.md' },
    { cmd: 'cd [dir|#tag]', desc: 'Change working directory or filter items by tag (e.g. cd #pytorch, cd #pyspark).', example: 'cd #pytorch' },
    { cmd: 'grep <query>', desc: 'Search across all projects, resumes, and technical documentation.', example: 'grep bedrock' },
    { cmd: 'neofetch', desc: 'Display AI/ML system telemetry, ASCII logo, credentials, and hardware specs.', example: 'neofetch' },
    { cmd: 'theme [name]', desc: 'Switch phosphor CRT color palette (green, amber, matrix, dracula, synthwave, nord, cyberpunk).', example: 'theme amber' },
    { cmd: 'audio [on|off]', desc: 'Toggle procedural mechanical keypress acoustic feedback.', example: 'audio on' },
    { cmd: 'scanlines [on|off]', desc: 'Toggle vintage CRT scanline raster and phosphor curvature overlay.', example: 'scanlines on' },
    { cmd: 'tree [dir]', desc: 'Render visual ASCII hierarchy of virtual file system.', example: 'tree' },
    { cmd: 'weather [city]', desc: 'Fetch ANSI terminal weather forecast report.', example: 'weather Boston' },
    { cmd: 'fortune / cowsay', desc: 'Display a random computing adage in an ASCII speech bubble.', example: 'fortune' },
    { cmd: 'degauss', desc: 'Trigger magnetic coil degaussing screen wobble and buzz.', example: 'degauss' },
    { cmd: 'matrix', desc: 'Engage digital rain screensaver mode (press any key to exit).', example: 'matrix' },
    { cmd: 'history', desc: 'Display chronological command history list.', example: 'history' },
    { cmd: 'clear / cls', desc: 'Clear the terminal scrollback buffer.', example: 'clear' },
  ],
  keybindings: [
    { key: 'Tab', action: 'Autocomplete current command, file path, or #tag with ghost text completion.' },
    { key: 'Tab Tab', action: 'Show multi-column grid of all matching completion possibilities.' },
    { key: 'Up / Down', action: 'Traverse previous and next command history entries.' },
    { key: 'Ctrl + L', action: 'Clear terminal screen.' },
    { key: 'Ctrl + C', action: 'Cancel current command line input or abort interactive prompt.' },
    { key: 'Click File', action: 'Clicking any file link in ls or grep output automatically runs cat on it.' },
  ],
  seeAlso: ['resume(1)', 'skills(1)', 'projects(1)', 'posts(1)', 'whoami(1)', 'mail(1)', 'neofetch(1)', 'fortune(1)'],
};

export const MAN_PAGES: Record<string, ManPage> = {
  help: MAIN_HELP_MAN,
  man: MAIN_HELP_MAN,
  fortune: {
    command: 'FORTUNE',
    section: 1,
    synopsis: 'fortune | cowsay',
    description: 'Outputs a random computing quote, aphorism, or systems design adage formatted inside an ASCII speech bubble.',
    examples: ['fortune', 'cowsay'],
  },
  resume: {
    command: 'RESUME',
    section: 1,
    synopsis: 'resume [txt|md]',
    description: 'Displays the complete Curriculum Vitae for Nicholas Napoli, including AI/ML engineering experience at Aesthetic360, operations data engineering at BOC International, and QA engineering at Rx Photo.',
    examples: ['resume', 'resume txt'],
  },
  skills: {
    command: 'SKILLS',
    section: 1,
    synopsis: 'skills',
    description: 'Displays Nicholas Napoli\'s Technical Skills Matrix categorized into Languages & Core, AI/ML & Data Science, Big Data & Cloud, and Software Engineering & Security.',
    examples: ['skills'],
  },
  projects: {
    command: 'PROJECTS',
    section: 1,
    synopsis: 'projects',
    description: 'Lists all production engineering projects, including the A360 Aging Dataset & Latent Interpolation Pipeline, Multimodal Big Data ETL Engine, Optics-Aligned Computer Vision Extractor, and MLOps Drift Sentinel.',
    examples: ['projects', 'ls -l projects', 'cat projects/a360-aging-dataset-pipeline.md'],
  },
  ls: {
    command: 'LS',
    section: 1,
    synopsis: 'ls [-l] [-a] [-h] [FILE | DIR]',
    description: 'List information about files (the current directory by default). Displays permissions, owner, byte size, publish date, tags, and clickable shortcuts.',
    options: [
      { flag: '-l', desc: 'Use long listing format, showing permissions, owner, date, and description.' },
      { flag: '-a', desc: 'Do not ignore entries starting with .' },
      { flag: '-h', desc: 'Human-readable file sizes (e.g., 4.2K).' },
    ],
    examples: ['ls', 'ls -l', 'ls projects', 'ls posts', 'ls about'],
  },
  cat: {
    command: 'CAT',
    section: 1,
    synopsis: 'cat FILE...',
    description: 'Concatenate and display the contents of files with rich Markdown rendering, syntax highlighted code fences, tables, and tag badges.',
    examples: ['cat about/resume.md', 'cat projects/a360-aging-dataset-pipeline.md', 'cat about/skills.json'],
  },
  cd: {
    command: 'CD',
    section: 1,
    synopsis: 'cd [DIRECTORY | #TAG | ..]',
    description: 'Change the current working directory or filter all posts and projects by technical tag (e.g. cd #pytorch or cd #pyspark).',
    examples: ['cd projects', 'cd posts', 'cd ..', 'cd #pytorch', 'cd #aws'],
  },
  whoami: {
    command: 'WHOAMI',
    section: 1,
    synopsis: 'whoami',
    description: 'Print Nicholas Napoli\'s professional summary, engineering specializations, contact email, phone, location, and social coordinates.',
    examples: ['whoami'],
  },
  mail: {
    command: 'MAIL',
    section: 1,
    synopsis: 'mail [RECIPIENT]',
    description: 'Interactive CLI mail composer to transmit messages or job inquiries directly to Nicholas Napoli (njnapoli99@gmail.com).',
    examples: ['mail', 'mail njnapoli99@gmail.com'],
  },
  grep: {
    command: 'GREP',
    section: 1,
    synopsis: 'grep PATTERN [PATH]',
    description: 'Search for regular expressions or plain strings across all projects, technical essays, resume sections, and documentation.',
    examples: ['grep pytorch', 'grep bedrock', 'grep sagemaker', 'grep databricks'],
  },
};
