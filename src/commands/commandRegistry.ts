import type { CommandContext, CommandResult, ThemeId } from '../types/terminal';
import { THEMES } from '../styles/themes';
import {
  getNodeAtPath,
  resolvePath,
  getAllTags,
  findPostsAndProjectsByTag,
  type VFSNode,
} from '../vfs/fileSystem';
import { BLOG_POSTS } from '../vfs/postsData';
import { PROJECTS } from '../vfs/projectsData';
import { MAN_PAGES, MAIN_HELP_MAN } from './manPages';

// Helper to format byte sizes
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Generate ASCII tree
export function buildAsciiTree(node: VFSNode, prefix: string = ''): string[] {
  const lines: string[] = [];
  if (!node.children) return lines;

  const entries: [string, VFSNode][] = Object.entries(node.children);
  entries.forEach(([name, child], idx) => {
    const isLast = idx === entries.length - 1;
    const marker = isLast ? '└── ' : '├── ';
    const isDir = child.type === 'dir';
    const tagInfo = child.tags ? ` [${child.tags.join(', ')}]` : '';
    lines.push(`${prefix}${marker}${name}${isDir ? '/' : ''}${tagInfo}`);

    if (isDir && child.children) {
      const childPrefix = prefix + (isLast ? '    ' : '│   ');
      lines.push(...buildAsciiTree(child, childPrefix));
    }
  });

  return lines;
}

const FORTUNES = [
  "There are only two hard things in Computer Science: cache invalidation and naming things. -- Phil Karlton",
  "Any sufficiently advanced technology is indistinguishable from magic. -- Arthur C. Clarke",
  "Walking on water and developing software from a specification are easy if both are frozen. -- Edward V. Berard",
  "Simplicity is prerequisite for reliability. -- Edsger W. Dijkstra",
  "Measuring programming progress by lines of code is like measuring aircraft building progress by weight. -- Bill Gates",
  "Premature optimization is the root of all evil. -- Donald Knuth",
  "The function of good software is to make the complex appear to be simple. -- Grady Booch",
  "Talk is cheap. Show me the code. -- Linus Torvalds"
];

export function executeTerminalCommand(
  rawInput: string,
  context: CommandContext
): CommandResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { type: 'text', content: '' };
  }

  // Tokenize arguments handling quotes
  const args: string[] = [];
  const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
  let match;
  while ((match = regex.exec(trimmed)) !== null) {
    args.push(match[1] || match[2] || match[0]);
  }

  const cmd = (args[0] || '').toLowerCase();
  const cmdArgs = args.slice(1);

  // 1. HELP / MAN
  if (cmd === 'help' || cmd === 'man') {
    const target = cmdArgs[0]?.toLowerCase();
    if (target && MAN_PAGES[target]) {
      return { type: 'man', content: MAN_PAGES[target] };
    }
    return { type: 'man', content: MAIN_HELP_MAN };
  }

  // 2. LS
  if (cmd === 'ls' || cmd === 'll' || cmd === 'la' || cmd === 'dir') {
    const isLong = cmd === 'll' || cmdArgs.includes('-l') || cmdArgs.includes('-la') || cmdArgs.includes('-al');
    const showAll = cmd === 'la' || cmdArgs.includes('-a') || cmdArgs.includes('-la') || cmdArgs.includes('-al');
    
    // Find target path
    const pathArg = cmdArgs.find((a) => !a.startsWith('-')) || context.cwd;
    const resolvedPath = resolvePath(context.cwd, pathArg);
    const targetNode = getNodeAtPath(resolvedPath);

    if (!targetNode) {
      return {
        type: 'error',
        content: `ls: cannot access '${pathArg}': No such file or directory`,
      };
    }

    if (targetNode.type === 'file') {
      return {
        type: 'table',
        content: {
          path: resolvedPath,
          isLong,
          items: [targetNode],
        },
      };
    }

    // Directory
    const entries = Object.values(targetNode.children || {}).filter(
      (n) => showAll || !n.name.startsWith('.')
    );

    return {
      type: 'table',
      content: {
        path: resolvedPath,
        isLong,
        items: entries,
      },
    };
  }

  // 3. CAT
  if (cmd === 'cat' || cmd === 'view' || cmd === 'open' || cmd === 'read') {
    if (cmdArgs.length === 0) {
      return { type: 'error', content: 'cat: missing file operand. Example: cat posts/why-i-left-the-cloud.md' };
    }

    const targetFile = cmdArgs[0];
    const resolvedPath = resolvePath(context.cwd, targetFile);
    const node = getNodeAtPath(resolvedPath);

    if (!node) {
      // Try searching by slug
      const slugMatch = BLOG_POSTS.find((p) => p.slug === targetFile || p.filename === targetFile);
      if (slugMatch) {
        return {
          type: 'markdown',
          content: {
            title: slugMatch.title,
            filename: slugMatch.filename,
            date: slugMatch.date,
            readTime: slugMatch.readTime,
            tags: slugMatch.tags,
            content: slugMatch.content,
            path: `/posts/${slugMatch.filename}`,
          },
        };
      }
      return { type: 'error', content: `cat: ${targetFile}: No such file or directory` };
    }

    if (node.type === 'dir') {
      return { type: 'error', content: `cat: ${targetFile}: Is a directory. Use 'ls' or 'cd'` };
    }

    return {
      type: 'markdown',
      content: {
        title: node.title || node.name,
        filename: node.name,
        date: node.updatedAt,
        readTime: node.readTime,
        tags: node.tags,
        content: node.content || '',
        path: node.path,
      },
    };
  }

  // 4. CD
  if (cmd === 'cd') {
    const target = cmdArgs[0];
    if (!target || target === '~') {
      return { type: 'text', content: '', newCwd: '/' };
    }

    // Check if user specified a tag with # or cd #rust
    if (target.startsWith('#') || (!target.includes('/') && getAllTags().includes(target.toLowerCase()))) {
      const tag = target.replace(/^#/, '');
      const { posts, projects } = findPostsAndProjectsByTag(tag);

      if (posts.length === 0 && projects.length === 0) {
        return { type: 'warning', content: `No posts or projects found matching tag '#${tag}'. Type 'tags' to see all tags.` };
      }

      return {
        type: 'grep',
        content: {
          query: `#${tag}`,
          results: [
            ...posts.map((p) => ({
              type: 'post',
              title: p.title,
              path: `/posts/${p.filename}`,
              snippet: p.summary,
              tags: p.tags,
            })),
            ...projects.map((pr) => ({
              type: 'project',
              title: pr.name,
              path: `/projects/${pr.filename}`,
              snippet: pr.summary,
              tags: pr.tags,
            })),
          ],
        },
      };
    }

    const resolved = resolvePath(context.cwd, target);
    const node = getNodeAtPath(resolved);

    if (!node) {
      return { type: 'error', content: `cd: no such file or directory: ${target}` };
    }
    if (node.type !== 'dir') {
      return { type: 'error', content: `cd: not a directory: ${target}` };
    }

    return {
      type: 'text',
      content: '',
      newCwd: resolved,
    };
  }

  // 5. PWD
  if (cmd === 'pwd') {
    return { type: 'text', content: context.cwd };
  }

  // 6. WHOAMI / ABOUT
  if (cmd === 'whoami' || cmd === 'about' || cmd === 'bio' || cmd === 'author') {
    const aboutNode = getNodeAtPath('/about/whoami.md');
    return {
      type: 'markdown',
      content: {
        title: 'Nick Napoli — Whoami',
        filename: 'whoami.md',
        date: '2026-09-01',
        content: aboutNode?.content || '',
        path: '/about/whoami.md',
      },
    };
  }

  // 7. MAIL
  if (cmd === 'mail' || cmd === 'contact' || cmd === 'email') {
    const toAddr = cmdArgs[0] || 'nick@example.com';
    context.setMailMode({
      to: toAddr,
      from: '',
      subject: '',
      body: '',
      step: 'from',
    });
    return {
      type: 'mail-composer',
      content: {
        to: toAddr,
        initial: true,
      },
    };
  }

  // 8. GREP / SEARCH
  if (cmd === 'grep' || cmd === 'search' || cmd === 'find') {
    if (cmdArgs.length === 0) {
      return { type: 'error', content: 'grep: search pattern required. Example: grep sqlite' };
    }

    const pattern = cmdArgs[0].toLowerCase();
    const results: Array<{
      type: 'post' | 'project' | 'file';
      title: string;
      path: string;
      snippet: string;
      tags?: string[];
      matchLine?: string;
    }> = [];

    // Search in blog posts
    BLOG_POSTS.forEach((post) => {
      const matchInTitle = post.title.toLowerCase().includes(pattern);
      const matchInSummary = post.summary.toLowerCase().includes(pattern);
      const matchInTags = post.tags.some((t) => t.toLowerCase().includes(pattern));
      const lines = post.content.split('\n');
      const matchLine = lines.find((l) => l.toLowerCase().includes(pattern));

      if (matchInTitle || matchInSummary || matchInTags || matchLine) {
        results.push({
          type: 'post',
          title: post.title,
          path: `/posts/${post.filename}`,
          snippet: post.summary,
          tags: post.tags,
          matchLine: matchLine?.trim(),
        });
      }
    });

    // Search in projects
    PROJECTS.forEach((proj) => {
      const matchInTitle = proj.name.toLowerCase().includes(pattern);
      const matchInSummary = proj.summary.toLowerCase().includes(pattern);
      const matchInTags = proj.tags.some((t) => t.toLowerCase().includes(pattern));
      const lines = proj.description.split('\n');
      const matchLine = lines.find((l) => l.toLowerCase().includes(pattern));

      if (matchInTitle || matchInSummary || matchInTags || matchLine) {
        results.push({
          type: 'project',
          title: proj.name,
          path: `/projects/${proj.filename}`,
          snippet: proj.summary,
          tags: proj.tags,
          matchLine: matchLine?.trim(),
        });
      }
    });

    if (results.length === 0) {
      return { type: 'text', content: `grep: pattern '${pattern}' not found in any files.` };
    }

    return {
      type: 'grep',
      content: {
        query: pattern,
        results,
      },
    };
  }

  // 9. THEME
  if (cmd === 'theme' || cmd === 'color' || cmd === 'colorscheme') {
    const targetTheme = cmdArgs[0]?.toLowerCase() as ThemeId | undefined;
    const availableThemes = Object.keys(THEMES).join(', ');

    if (!targetTheme) {
      return {
        type: 'text',
        content: `Current theme: ${context.theme}\nAvailable themes: ${availableThemes}\nUsage: theme <name>`,
      };
    }

    if (THEMES[targetTheme]) {
      context.setTheme(targetTheme);
      return {
        type: 'success',
        content: `Switched color palette to '${THEMES[targetTheme].name}' [${THEMES[targetTheme].description}]`,
      };
    }

    return {
      type: 'error',
      content: `Unknown theme '${targetTheme}'. Available options: ${availableThemes}`,
    };
  }

  // 10. AUDIO / SOUND
  if (cmd === 'audio' || cmd === 'sound') {
    const arg = cmdArgs[0]?.toLowerCase();
    if (arg === 'on' || arg === '1' || arg === 'enable') {
      context.setSoundEnabled(true);
      return { type: 'success', content: 'Mechanical keyboard sound effects [ENABLED]. Clack away!' };
    }
    if (arg === 'off' || arg === '0' || arg === 'disable') {
      context.setSoundEnabled(false);
      return { type: 'text', content: 'Audio sound effects [DISABLED].' };
    }
    
    // Toggle
    context.setSoundEnabled((prev) => !prev);
    return {
      type: 'text',
      content: `Audio sound effects toggled. (Usage: audio on|off)`,
    };
  }

  // 11. SCANLINES / CRT
  if (cmd === 'scanlines' || cmd === 'crt') {
    const arg = cmdArgs[0]?.toLowerCase();
    if (arg === 'on' || arg === '1' || arg === 'enable') {
      context.setScanlinesEnabled(true);
      context.setCrtCurvatureEnabled(true);
      return { type: 'success', content: 'CRT scanline filter & phosphor screen curvature [ENABLED].' };
    }
    if (arg === 'off' || arg === '0' || arg === 'disable') {
      context.setScanlinesEnabled(false);
      context.setCrtCurvatureEnabled(false);
      return { type: 'text', content: 'CRT scanline filter [DISABLED]. Clean modern rendering engaged.' };
    }

    context.setScanlinesEnabled((prev) => !prev);
    return {
      type: 'text',
      content: `CRT scanlines toggled. (Usage: scanlines on|off)`,
    };
  }

  // 12. TREE
  if (cmd === 'tree') {
    const pathArg = cmdArgs[0] || context.cwd;
    const resolved = resolvePath(context.cwd, pathArg);
    const node = getNodeAtPath(resolved);

    if (!node) {
      return { type: 'error', content: `tree: '${pathArg}': No such directory` };
    }

    const lines = [`${resolved === '/' ? '/' : resolved}`];
    lines.push(...buildAsciiTree(node));
    return {
      type: 'tree',
      content: lines.join('\n'),
    };
  }

  // 13. NEOFETCH / FETCH / SYSINFO
  if (cmd === 'neofetch' || cmd === 'fetch' || cmd === 'sysinfo') {
    return {
      type: 'neofetch',
      content: {},
    };
  }

  // 14. MATRIX
  if (cmd === 'matrix' || cmd === 'screensaver' || cmd === 'rain') {
    context.setMatrixMode(true);
    return {
      type: 'matrix',
      content: 'Entering Matrix digital rain simulation. Press any key or click to return.',
    };
  }

  // 15. WEATHER
  if (cmd === 'weather' || cmd === 'wttr') {
    const city = cmdArgs.join(' ') || 'Brooklyn, NY';
    return {
      type: 'weather',
      content: {
        city,
        temp: '68°F (20°C)',
        condition: 'Clear Night / Phosphor Skies',
        humidity: '42%',
        wind: '6 mph NW',
        pressure: '1016 hPa',
        ascii: `
     \\   /     Clear Phosphor Skies
      .-.      Temp: 68°F (20°C)
   ― (   ) ―   Humidity: 42%
      \`-'      Wind: 6 mph NW
     /   \\     Visibility: Infinite
        `,
      },
    };
  }

  // 16. FORTUNE / COWSAY
  if (cmd === 'fortune' || cmd === 'cowsay') {
    const randomQuote = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    const cow = `
  < ${randomQuote} >
   -------------------------------------------------
          \\   ^__^
           \\  (oo)\\_______
              (__)\\       )\\/\\
                  ||----w |
                  ||     ||
    `;
    return {
      type: 'text',
      content: cow,
    };
  }

  // 17. TAGS
  if (cmd === 'tags' || cmd === 'topics' || cmd === 'categories') {
    const allTags = getAllTags();
    const tagLines = allTags.map((tag) => {
      const { posts, projects } = findPostsAndProjectsByTag(tag);
      const total = posts.length + projects.length;
      return `  #${tag.padEnd(16)} (${total} ${total === 1 ? 'item' : 'items'}) -> cd #${tag}`;
    });

    return {
      type: 'text',
      content: `ALL TOPICS & TAGS:\n${tagLines.join('\n')}\n\nTip: Type 'cd #<tag>' or 'grep <tag>' to browse items.`,
    };
  }

  // 18. HISTORY
  if (cmd === 'history') {
    const historyList = context.history
      .map((h, i) => `  ${String(i + 1).padStart(4, ' ')}  ${h}`)
      .join('\n');
    return {
      type: 'text',
      content: historyList || 'No previous commands in history.',
    };
  }

  // 19. CLEAR / CLS
  if (cmd === 'clear' || cmd === 'cls') {
    context.clearHistory();
    return { type: 'text', content: '' };
  }

  // 20. DATE / UPTIME
  if (cmd === 'date' || cmd === 'uptime') {
    const now = new Date();
    return {
      type: 'text',
      content: `${now.toUTCString()} (up 418 days, 14 hours, 2 users, load average: 0.04, 0.02, 0.01)`,
    };
  }

  // 21. ECHO
  if (cmd === 'echo') {
    return { type: 'text', content: cmdArgs.join(' ') };
  }

  // 22. SUDO
  if (cmd === 'sudo') {
    return {
      type: 'error',
      content: `[sudo] password for visitor: \nvisitor is not in the sudoers file. This incident will be reported to /dev/null.`,
    };
  }

  // 23. DEGAUSS
  if (cmd === 'degauss') {
    context.triggerDegauss();
    return {
      type: 'success',
      content: 'Degaussing cathode ray tube coils... *magnetic jitter wobble engaged*',
    };
  }

  // 24. EXIT / QUIT / POWEROFF / LOGOUT
  if (cmd === 'exit' || cmd === 'quit' || cmd === 'poweroff' || cmd === 'logout') {
    context.powerOff();
    return {
      type: 'system',
      content: 'Powering down cathode ray tube... [Press any key or click to power on]',
    };
  }

  // Unknown command fallback with smart suggestions
  const allKnownCmds = [
    'ls', 'cat', 'cd', 'whoami', 'mail', 'help', 'man', 'grep',
    'theme', 'audio', 'scanlines', 'crt', 'tree', 'neofetch',
    'matrix', 'weather', 'tags', 'fortune', 'history', 'clear', 'pwd',
  ];
  
  const closest = allKnownCmds.find(
    (k) => k.startsWith(cmd) || (cmd.length > 2 && k.includes(cmd))
  );

  let errorMsg = `zsh: command not found: ${cmd}`;
  if (closest) {
    errorMsg += `\nDid you mean: '${closest}'? (Type 'help' for commands list)`;
  } else {
    errorMsg += `\nType 'help' or 'man' to see available commands.`;
  }

  return {
    type: 'error',
    content: errorMsg,
  };
}
