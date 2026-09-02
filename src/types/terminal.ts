export type ThemeId = 'green' | 'amber' | 'matrix' | 'dracula' | 'synthwave' | 'nord' | 'cyberpunk';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  bg: string;
  text: string;
  dimText: string;
  brightText: string;
  promptUser: string;
  promptHost: string;
  promptPath: string;
  promptSymbol: string;
  accent: string;
  accentAlt: string;
  border: string;
  glow: string;
  cursor: string;
  scanlineIntensity: number;
}

export interface VFSNode {
  name: string;
  type: 'file' | 'dir';
  path: string;
  size: number;
  updatedAt: string;
  permissions: string;
  owner: string;
  group: string;
  tags?: string[];
  title?: string;
  summary?: string;
  content?: string;
  readTime?: string;
  children?: Record<string, VFSNode>;
}

export type OutputType =
  | 'command'
  | 'text'
  | 'markdown'
  | 'error'
  | 'success'
  | 'warning'
  | 'table'
  | 'man'
  | 'neofetch'
  | 'tree'
  | 'grep'
  | 'mail-composer'
  | 'matrix'
  | 'weather'
  | 'system';

export interface HistoryEntry {
  id: string;
  timestamp: string;
  command?: string;
  path: string;
  type: OutputType;
  content: any;
  rawText?: string;
}

export interface MailDraft {
  to: string;
  from: string;
  subject: string;
  body: string;
  step: 'to' | 'from' | 'subject' | 'body' | 'confirm' | 'sent';
}

export interface CommandContext {
  cwd: string;
  theme: ThemeId;
  soundEnabled: boolean;
  scanlinesEnabled: boolean;
  crtCurvatureEnabled: boolean;
  history: string[];
  setCwd: (path: string) => void;
  setTheme: (theme: ThemeId) => void;
  setSoundEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  setScanlinesEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  setCrtCurvatureEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  clearHistory: () => void;
  executeCommand: (cmd: string) => void;
  setMailMode: (draft: MailDraft | null) => void;
  setManPage: (page: string | null) => void;
  setMatrixMode: (active: boolean) => void;
  powerOff: () => void;
  triggerDegauss: () => void;
}

export interface CommandResult {
  type: OutputType;
  content: any;
  newCwd?: string;
}
