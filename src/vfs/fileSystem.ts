import type { VFSNode } from '../types/terminal';
import { BLOG_POSTS, type BlogPost } from './postsData';
import { PROJECTS } from './projectsData';

export type { VFSNode };

export const ABOUT_CONTENT = `# Nick Napoli (aka @antigravity)

**Role**: Staff Systems Engineer & Retrocomputing Enthusiast  
**Location**: Brooklyn, NY / Cyberspace  
**GPG Fingerprint**: \`7F9A 4B22 10C8 E381 99A2 55D1 042F BF10\`  

---

## Bio
I build low-latency systems, kernel tools, compilers, and pixel-precise terminal interfaces.
Passionate about zero-overhead abstractions, mechanical keyboards, CRT phosphor screens,
and writing software that respects user attention and battery life.

## Core Tech Stack
- **Systems & Languages**: Rust, C99, Zig, Go, TypeScript, x86_64 / ARM64 Assembly
- **Architecture**: Linux Kernel Internals, eBPF, Distributed Storage, SQLite, WebAssembly, WebGL
- **Protocols & Standards**: POSIX, ANSI VT100/VT220, TCP/IP, WebSockets, gRPC

## Online Coordinates
- **GitHub**: [github.com/nicknapoli](https://github.com/nicknapoli)
- **Twitter/X**: [@nicknapoli_dev](https://twitter.com)
- **Email**: [visitor@devbox.internal](mailto:nick@example.com) (or type \`mail\`)
- **Keybase**: [keybase.io/nicknapoli](https://keybase.io)
`;

export const RESUME_TEXT = `================================================================================
                    NICK NAPOLI - CURRICULUM VITAE
================================================================================
EXPERIENCE:

[2023 - PRESENT] STAFF SYSTEMS ENGINEER // CORE INFRASTRUCTURE
  * Architected single-node high-concurrency database engine handling 400k QPS.
  * Replaced distributed cloud microservices with monolithic low-latency engine,
    reducing monthly compute costs by 94% and p99 latency to 1.8ms.
  * Built eBPF observability agent deployed across 1,000+ Linux bare-metal nodes.

[2020 - 2023] SENIOR COMPILER & TOOLING ENGINEER // DEVELOPER PLATFORM
  * Designed WebAssembly JIT runtime optimizing startup compilation by 4.2x.
  * Authored open-source GPU-accelerated terminal emulator (1.4k+ GitHub stars).
  * Maintained custom Rust memory allocators and zero-allocation parser libraries.

[2017 - 2020] SYSTEMS DEVELOPER // HIGH-FREQUENCY NETWORK TOOLS
  * Developed kernel bypass network drivers with DPDK and packet sniffers.
  * Implemented sub-microsecond binary serialization protocols.

EDUCATION:
  * B.S. in Computer Science & Mathematics
================================================================================`;

export const SKILLS_JSON = `{
  "engineer": "Nick Napoli",
  "level": "Staff / Principal",
  "languages": {
    "expert": ["Rust", "C", "Go", "TypeScript", "SQL"],
    "proficient": ["Zig", "Assembly (x86_64, ARM)", "Python", "Bash/Zsh"],
    "learning": ["Erlang/OTP", "Ocaml"]
  },
  "systems": {
    "os": ["Linux (Debian, Arch, Alpine)", "FreeBSD", "Darwin"],
    "kernel": ["eBPF", "XDP", "io_uring", "cgroups v2", "namespaces"],
    "databases": ["SQLite (WAL)", "PostgreSQL", "RocksDB", "Redis"],
    "rendering": ["WebGL2", "OpenGL 3.3+", "Metal", "Canvas2D"]
  },
  "interests": [
    "CRT Monitors & Scanline physics",
    "Mechanical Keyboards (Buckling Spring, Topre)",
    "Small-web & Composable Unix Tools",
    "Zero-allocation streaming algorithms"
  ]
}`;

export const PROFILE_RC = `# ~/.profile.rc - Shell Configuration
export USER="visitor"
export HOST="devbox"
export SHELL="/bin/agy-sh"
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
`;

export const MOTD_TEXT = `
  ======================================================================
   WELCOME TO DEVBOX TTY // AGY-OS 2.0 (x86_64-antigravity-linux-gnu)
  ======================================================================
   * Type 'ls' to explore blog posts and projects.
   * Type 'cat <file>' or click any file to read the markdown contents.
   * Type 'cd <topic>' or 'cd <#tag>' to filter by category.
   * Type 'whoami' to view the author profile and bio.
   * Type 'mail' to launch the interactive contact composer.
   * Type 'help' for the full man-page commands reference.
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
      owner: 'nick',
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
      owner: 'nick',
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
      owner: 'nick',
      group: 'staff',
      title: 'About Nick Napoli',
      content: ABOUT_CONTENT,
    },
    'resume.txt': {
      name: 'resume.txt',
      type: 'file',
      path: '/about/resume.txt',
      size: RESUME_TEXT.length,
      updatedAt: '2026-08-20',
      permissions: '-rw-r--r--',
      owner: 'nick',
      group: 'staff',
      title: 'Curriculum Vitae',
      content: RESUME_TEXT,
    },
    'skills.json': {
      name: 'skills.json',
      type: 'file',
      path: '/about/skills.json',
      size: SKILLS_JSON.length,
      updatedAt: '2026-08-20',
      permissions: '-rw-r--r--',
      owner: 'nick',
      group: 'staff',
      title: 'Technical Skills Matrix',
      content: SKILLS_JSON,
    },
  };

  const configChildren: Record<string, VFSNode> = {
    'profile.rc': {
      name: 'profile.rc',
      type: 'file',
      path: '/config/profile.rc',
      size: PROFILE_RC.length,
      updatedAt: '2026-08-01',
      permissions: '-rw-r--r--',
      owner: 'nick',
      group: 'staff',
      title: 'Shell Environment Profile',
      content: PROFILE_RC,
    },
    'motd.txt': {
      name: 'motd.txt',
      type: 'file',
      path: '/config/motd.txt',
      size: MOTD_TEXT.length,
      updatedAt: '2026-08-01',
      permissions: '-rw-r--r--',
      owner: 'nick',
      group: 'staff',
      title: 'Message of the Day',
      content: MOTD_TEXT,
    },
  };

  const binCommands = [
    'help', 'man', 'cat', 'ls', 'cd', 'pwd', 'whoami', 'mail',
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
      updatedAt: '2026-08-01',
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
      'posts': {
        name: 'posts',
        type: 'dir',
        path: '/posts',
        size: 4096,
        updatedAt: '2026-09-01',
        permissions: 'drwxr-xr-x',
        owner: 'nick',
        group: 'staff',
        summary: 'Technical articles on systems, Rust, compilers, and minimalism',
        children: postsChildren,
      },
      'projects': {
        name: 'projects',
        type: 'dir',
        path: '/projects',
        size: 4096,
        updatedAt: '2026-09-01',
        permissions: 'drwxr-xr-x',
        owner: 'nick',
        group: 'staff',
        summary: 'Open source tools, emulators, VMs, and experimental compilers',
        children: projectsChildren,
      },
      'about': {
        name: 'about',
        type: 'dir',
        path: '/about',
        size: 4096,
        updatedAt: '2026-09-01',
        permissions: 'drwxr-xr-x',
        owner: 'nick',
        group: 'staff',
        summary: 'Author background, credentials, resume, and skill metrics',
        children: aboutChildren,
      },
      'config': {
        name: 'config',
        type: 'dir',
        path: '/config',
        size: 4096,
        updatedAt: '2026-09-01',
        permissions: 'drwxr-xr-x',
        owner: 'nick',
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
