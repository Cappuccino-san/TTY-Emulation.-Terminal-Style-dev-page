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
  command: 'ANTIGRAVITY-TTY',
  section: 1,
  synopsis: 'agy-sh [--theme THEME] [--audio] [--scanlines] [COMMAND] [ARGS...]',
  description: `Antigravity TTY is an authentic terminal developer blog and interactive shell environment.
The entire portfolio, technical essays, and software projects are exposed as a virtual POSIX-compliant hierarchy.
Visitors can navigate using standard shell commands, read markdown essays, inspect live telemetry, or contact the author.`,
  commandsList: [
    { cmd: 'ls [-l|-a] [dir]', desc: 'List files, posts, projects, and directories in current or target path.', example: 'ls -l posts' },
    { cmd: 'cat <file>', desc: 'Read and render markdown blog posts, resumes, or config files with syntax highlighting.', example: 'cat posts/why-i-left-the-cloud.md' },
    { cmd: 'cd [dir|#tag]', desc: 'Change working directory or filter blog posts and projects by tag.', example: 'cd #rust  or  cd projects' },
    { cmd: 'whoami', desc: 'Display author identity, credentials, GPG key, bio, and social coordinates.', example: 'whoami' },
    { cmd: 'mail [addr]', desc: 'Launch interactive multi-step contact wizard to transmit a message.', example: 'mail  or  mail nick@example.com' },
    { cmd: 'grep <query> [path]', desc: 'Perform fast substring search across all articles and project documentation.', example: 'grep sqlite' },
    { cmd: 'theme [name]', desc: 'Switch color phosphor palette (green, amber, matrix, dracula, synthwave, nord, cyberpunk).', example: 'theme amber' },
    { cmd: 'audio [on|off]', desc: 'Toggle procedural mechanical keypress sound synthesizer.', example: 'audio on' },
    { cmd: 'scanlines [on|off]', desc: 'Toggle vintage CRT scanline raster and phosphor curvature overlay.', example: 'scanlines on' },
    { cmd: 'tree [dir]', desc: 'Render visual ASCII hierarchy of virtual file system.', example: 'tree' },
    { cmd: 'neofetch', desc: 'Display system telemetry, ASCII logo, shell info, and ANSI color blocks.', example: 'neofetch' },
    { cmd: 'matrix', desc: 'Engage digital rain screensaver mode (press any key or click to dismiss).', example: 'matrix' },
    { cmd: 'weather [city]', desc: 'Fetch ANSI terminal weather forecast report.', example: 'weather Brooklyn' },
    { cmd: 'fortune', desc: 'Display a witty retro computing aphorism with cowsay formatting.', example: 'fortune' },
    { cmd: 'pwd', desc: 'Print working directory path.', example: 'pwd' },
    { cmd: 'history', desc: 'Display chronological command history list.', example: 'history' },
    { cmd: 'clear / cls', desc: 'Clear the terminal scrollback buffer.', example: 'clear' },
    { cmd: 'help / man [cmd]', desc: 'Display this interactive manual pager.', example: 'man cat' },
  ],
  keybindings: [
    { key: 'Tab', action: 'Autocomplete current command, file path, or #tag with ghost text completion.' },
    { key: 'Tab Tab', action: 'Show multi-column grid of all matching completion possibilities.' },
    { key: 'Up / Down', action: 'Traverse previous and next command history entries.' },
    { key: 'Ctrl + L', action: 'Clear terminal screen.' },
    { key: 'Ctrl + C', action: 'Cancel current command line input or abort interactive prompt.' },
    { key: 'Click File', action: 'Clicking any file link in ls or grep output automatically runs cat on it.' },
  ],
  seeAlso: ['cat(1)', 'ls(1)', 'cd(1)', 'whoami(1)', 'mail(1)', 'grep(1)', 'neofetch(1)'],
};

export const MAN_PAGES: Record<string, ManPage> = {
  help: MAIN_HELP_MAN,
  man: MAIN_HELP_MAN,
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
    examples: ['ls', 'ls -l', 'ls posts', 'ls projects'],
  },
  cat: {
    command: 'CAT',
    section: 1,
    synopsis: 'cat FILE...',
    description: 'Concatenate and display the contents of files. In this terminal blog, cat renders Markdown with syntax highlighting, styled blockquotes, code fences, and reading time estimates.',
    examples: ['cat posts/building-a-toy-jit-in-rust.md', 'cat about/whoami.md', 'cat config/profile.rc'],
  },
  cd: {
    command: 'CD',
    section: 1,
    synopsis: 'cd [DIRECTORY | #TAG | ..]',
    description: 'Change the current working directory. You can also pass a tag name (e.g., cd #rust or cd rust) to filter and list all matching posts and projects across the blog.',
    examples: ['cd posts', 'cd projects', 'cd ..', 'cd #systems', 'cd ~'],
  },
  whoami: {
    command: 'WHOAMI',
    section: 1,
    synopsis: 'whoami',
    description: 'Print effective developer profile, credentials, GPG key, bio, technical skill ratings, and contact links.',
    examples: ['whoami'],
  },
  mail: {
    command: 'MAIL',
    section: 1,
    synopsis: 'mail [RECIPIENT]',
    description: 'Interactive CLI mail composer. Allows drafting a message to Nick Napoli with real-time field validation, preview, and delivery simulation.',
    examples: ['mail', 'mail nick@example.com'],
  },
  grep: {
    command: 'GREP',
    section: 1,
    synopsis: 'grep PATTERN [PATH]',
    description: 'Search for regular expressions or plain strings across all markdown essays, project documentation, and notes.',
    examples: ['grep sqlite', 'grep rust posts', 'grep memory'],
  },
};
