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
    slug: 'glyph-terminal',
    filename: 'glyph-terminal.md',
    name: 'glyph-terminal',
    status: 'ACTIVE',
    stars: 1420,
    tags: ['rust', 'webgl', 'tui', 'gpu'],
    repo: 'https://github.com/nicknapoli/glyph-terminal',
    demo: 'https://glyph.dev',
    summary: 'GPU-accelerated terminal emulator rendered directly via WebGL2 and Rust WebAssembly.',
    description: `# Glyph Terminal Emulator

A blazing-fast, 120 FPS hardware-accelerated terminal emulator built for the web.

## Highlights
- **WebGL2 Glyph Atlas**: Caches rendered rasterized glyphs into GPU texture pages for 0ms font rendering latency.
- **Full VT100/VT220/xterm Parser**: Supports 24-bit truecolor, bracketed paste, OSC 8 hyperlinks, SGR attributes, and mouse tracking.
- **Shader Pipeline**: Authentic CRT scanline shaders, chromatic aberration, phosphor bloom, and screen curvature.
- **Memory Footprint**: Under 12MB total heap usage under full 100,000-line scrollback buffer.

\`\`\`bash
# Run locally via Cargo
cargo install glyph-terminal
glyph --theme phosphor-green --scanlines
\`\`\`
`
  },
  {
    slug: 'neural-vm',
    filename: 'neural-vm.md',
    name: 'neural-vm',
    status: 'SHIPPED',
    stars: 890,
    tags: ['c', 'compilers', 'vm', 'systems'],
    repo: 'https://github.com/nicknapoli/neural-vm',
    summary: 'Register-based bytecode virtual machine with deterministic hot-reloading.',
    description: `# NeuralVM: Register-Based Bytecode Engine

A compact, 64-register bytecode interpreter designed for embedded scripting and deterministic simulation.

## Key Architecture
- **Computed GOTO Dispatch**: Utilizes GCC/Clang indirect threaded code labels for single-cycle opcode jumps.
- **Copy-on-Write Memory Sandboxing**: Every fiber executes inside an isolated 4MB virtual memory page with zero syscall leakage.
- **Instant State Snapshotting**: Save and restore full execution state in under 80 microseconds.
`
  },
  {
    slug: 'packet-sniffer',
    filename: 'packet-sniffer.md',
    name: 'packet-sniffer',
    status: 'OPEN SOURCE',
    stars: 640,
    tags: ['rust', 'ebpf', 'networking', 'linux'],
    repo: 'https://github.com/nicknapoli/packet-sniffer',
    summary: 'Kernel-space eBPF network packet analyzer with real-time TUI dashboard.',
    description: `# PacketSniffer (eBPF)

High-performance Linux kernel-space packet monitor that inspects TCP/UDP streams at line rate without context switching to userspace.

## Features
- eBPF XDP hook at the network driver layer.
- Zero-copy ring buffer event streaming.
- Terminal dashboard featuring live bandwidth sparklines and geo-IP lookup.
`
  },
  {
    slug: 'zero-alloc-json',
    filename: 'zero-alloc-json.md',
    name: 'zero-alloc-json',
    status: 'SHIPPED',
    stars: 1850,
    tags: ['rust', 'simd', 'wasm', 'performance'],
    repo: 'https://github.com/nicknapoli/zero-alloc-json',
    summary: 'AVX2/NEON accelerated JSON parser for streaming multi-gigabyte files.',
    description: `# zero-alloc-json

A vector-accelerated JSON parser that extracts keys and values without allocating strings or AST nodes on the heap.

## Benchmarks
| Parser | Throughput | Allocations |
|---|---|---|
| serde_json | 620 MB/s | 14,200 / MB |
| simdjson-rs | 2,800 MB/s | 0 / MB |
| **zero-alloc-json** | **3,450 MB/s** | **0 / MB** |
`
  }
];
