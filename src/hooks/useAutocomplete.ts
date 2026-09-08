import { getNodeAtPath, resolvePath, getAllTags } from '../vfs/fileSystem';
import { THEMES } from '../styles/themes';

const COMMANDS = [
  'ls', 'cat', 'cd', 'whoami', 'mail', 'help', 'man', 'grep',
  'theme', 'audio', 'scanlines', 'crt', 'tree', 'neofetch',
  'matrix', 'weather', 'tags', 'fortune', 'history', 'clear', 'cls', 'pwd',
  'dino', 'game', 'runner'
];

export interface AutocompleteResult {
  ghostText: string;
  matchedOptions: string[];
  completedInput?: string;
}

export function getCompletions(input: string, cwd: string): AutocompleteResult {
  if (!input) {
    return { ghostText: '', matchedOptions: [] };
  }

  const parts = input.split(/\s+/);
  const isFirstWord = parts.length === 1 && !input.endsWith(' ');
  const currentWord = isFirstWord ? parts[0] : parts[parts.length - 1];
  const prevCommand = parts[0]?.toLowerCase();

  // 1. First word -> Command completion
  if (isFirstWord) {
    const query = currentWord.toLowerCase();
    const matches = COMMANDS.filter((cmd) => cmd.startsWith(query));
    if (matches.length === 0) {
      return { ghostText: '', matchedOptions: [] };
    }

    const firstMatch = matches[0];
    const ghostSuffix = firstMatch.slice(query.length);

    return {
      ghostText: ghostSuffix,
      matchedOptions: matches,
    };
  }

  // 2. Command argument completions
  const arg = input.endsWith(' ') ? '' : currentWord;

  // 2a. Theme completion
  if (prevCommand === 'theme') {
    const themeNames = Object.keys(THEMES);
    const matches = themeNames.filter((t) => t.startsWith(arg.toLowerCase()));
    if (matches.length > 0) {
      return {
        ghostText: matches[0].slice(arg.length),
        matchedOptions: matches,
      };
    }
  }

  // 2b. Audio / Scanlines completion
  if (prevCommand === 'audio' || prevCommand === 'scanlines' || prevCommand === 'crt') {
    const opts = ['on', 'off'];
    const matches = opts.filter((o) => o.startsWith(arg.toLowerCase()));
    if (matches.length > 0) {
      return {
        ghostText: matches[0].slice(arg.length),
        matchedOptions: matches,
      };
    }
  }

  // 2c. CD completion (Directories + #tags)
  if (prevCommand === 'cd') {
    const tags = getAllTags().map((t) => `#${t}`);
    const currentNode = getNodeAtPath(cwd);
    const dirEntries = currentNode?.children
      ? Object.values(currentNode.children)
          .filter((n) => n.type === 'dir')
          .map((n) => n.name + '/')
      : [];

    const allCdTargets = [...dirEntries, '..', ...tags];
    const matches = allCdTargets.filter((t) =>
      t.toLowerCase().startsWith(arg.toLowerCase())
    );

    if (matches.length > 0) {
      return {
        ghostText: matches[0].slice(arg.length),
        matchedOptions: matches,
      };
    }
  }

  // 2d. Cat / Ls / Tree completion (Files & Directories in path)
  if (prevCommand === 'cat' || prevCommand === 'ls' || prevCommand === 'tree' || prevCommand === 'view') {
    let searchDir = cwd;
    let filePrefix = arg;

    if (arg.includes('/')) {
      const lastSlash = arg.lastIndexOf('/');
      const dirPart = arg.slice(0, lastSlash) || '/';
      searchDir = resolvePath(cwd, dirPart);
      filePrefix = arg.slice(lastSlash + 1);
    }

    const targetNode = getNodeAtPath(searchDir);
    if (targetNode?.children) {
      const entries = Object.values(targetNode.children).map((n) =>
        n.type === 'dir' ? `${n.name}/` : n.name
      );

      const matches = entries.filter((name) =>
        name.toLowerCase().startsWith(filePrefix.toLowerCase())
      );

      if (matches.length > 0) {
        return {
          ghostText: matches[0].slice(filePrefix.length),
          matchedOptions: matches,
        };
      }
    }
  }

  return { ghostText: '', matchedOptions: [] };
}

// Find longest common prefix of a set of strings
export function findLongestCommonPrefix(strings: string[]): string {
  if (!strings.length) return '';
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (!strings[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }
  return prefix;
}
