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
    slug: 'building-a-toy-jit-in-rust',
    filename: 'building-a-toy-jit-in-rust.md',
    title: 'Writing a JIT Compiler from Scratch in 400 Lines of Rust',
    date: '2026-08-14',
    readTime: '6 min read',
    tags: ['rust', 'compilers', 'assembly', 'systems'],
    summary: 'Allocating executable memory with mmap, emitting raw x86_64 machine code, and executing dynamic functions safely.',
    content: `# Writing a JIT Compiler from Scratch in 400 Lines of Rust

> *"Any problem in computer science can be solved by another layer of indirection, except of course for the problem of too many layers of indirection."* — David Wheeler

Compilers often feel like arcane black magic reserved for dragons and standard committee elders. But at its core, a **Just-In-Time (JIT) compiler** is remarkably straightforward:

1. Allocate a page of system memory.
2. Mark that page as **Read + Write** (\`PROT_READ | PROT_WRITE\`).
3. Emit raw machine bytecode into the buffer.
4. Flip the page permissions to **Read + Execute** (\`PROT_READ | PROT_EXEC\`) using \`mprotect\`.
5. Transmute the memory pointer into a Rust function pointer (\`extern "C" fn\`) and call it.

\`\`\`rust
use libc::{mmap, mprotect, MAP_ANON, MAP_PRIVATE, PROT_EXEC, PROT_READ, PROT_WRITE};
use std::mem;

pub struct ExecutableBuffer {
    ptr: *mut u8,
    size: usize,
}

impl ExecutableBuffer {
    pub fn new(code: &[u8]) -> Self {
        let size = code.len().max(4096);
        unsafe {
            let ptr = mmap(
                std::ptr::null_mut(),
                size,
                PROT_READ | PROT_WRITE,
                MAP_PRIVATE | MAP_ANON,
                -1,
                0,
            ) as *mut u8;

            std::ptr::copy_nonoverlapping(code.as_ptr(), ptr, code.len());

            // Make executable
            mprotect(ptr as *mut libc::c_void, size, PROT_READ | PROT_EXEC);

            ExecutableBuffer { ptr, size }
        }
    }

    pub fn execute(&self) -> i32 {
        unsafe {
            let func: extern "C" fn() -> i32 = mem::transmute(self.ptr);
            func()
        }
    }
}
\`\`\`

## Emitting x86_64 Bytecode

Let's emit a function that takes two 64-bit integers in \`rdi\` and \`rsi\`, computes \`(a * a) + (b * b)\`, and returns \`rax\`:

\`\`\`assembly
; x86_64 calling convention (System V AMD64 ABI)
; rdi = first arg (a)
; rsi = second arg (b)
imul rdi, rdi   ; rdi = a * a   (48 0f af ff)
imul rsi, rsi   ; rsi = b * b   (48 0f af f6)
lea  rax, [rdi + rsi] ; rax = (a*a) + (b*b) (48 8d 04 37)
ret             ; return        (c3)
\`\`\`

In binary hex array:
\`\`\`rust
let machine_code: [u8; 12] = [
    0x48, 0x0f, 0xaf, 0xff, // imul rdi, rdi
    0x48, 0x0f, 0xaf, 0xf6, // imul rsi, rsi
    0x48, 0x8d, 0x04, 0x37, // lea  rax, [rdi + rsi]
    0xc3                    // ret
];
\`\`\`

## Benchmarking vs Interpreters

When running a 100,000,000 iteration loop over our AST:
- **Tree-walk Interpreter**: 4,210 ms
- **Bytecode VM (Stack-based)**: 680 ms
- **Our 400-line JIT**: **14.2 ms** (300x faster than interpreter!)

The beauty of modern hardware is that you don't always need LLVM's 4-million-line codebase to gain 90% of native execution velocity.
`
  },
  {
    slug: 'why-i-left-the-cloud',
    filename: 'why-i-left-the-cloud.md',
    title: 'Why We Replaced Our 47 Microservices with a $40/mo Bare Metal Box and SQLite',
    date: '2026-07-28',
    readTime: '8 min read',
    tags: ['architecture', 'sqlite', 'devops', 'philosophy'],
    summary: 'How collapsing our distributed infrastructure into a single Linux server with SQLite in WAL mode cut latency from 180ms to 1.8ms.',
    content: `# Why We Replaced Our 47 Microservices with a $40/mo Bare Metal Box and SQLite

In 2022, our architecture diagram looked like a cosmic map of constellation clusters:
- 47 Dockerized microservices
- 3 managed Kubernetes clusters on AWS (EKS)
- DynamoDB, Aurora PostgreSQL, Redis Elasticache, RabbitMQ
- Monthly AWS Bill: **\$6,840.00**
- Median API Latency: **182 ms**
- Developer Onboarding Time: **3 weeks**

In late 2025, we pulled the plug. We replaced the entire stack with:
- **1 Dedicated AMD Ryzen 9 7950X box** (64GB ECC DDR5, NVMe RAID-1, 1Gbps unmetered)
- Cost: **\$44.00/month**
- Database: **SQLite** with Write-Ahead Logging (\`WAL\`) & \`mmap_size = 30GB\`
- Median API Latency: **1.4 ms** (p99: 4.1 ms)

\`\`\`
Before:
User -> CloudFront -> ALB -> Kong Gateway -> Auth Service -> gRPC ->
  Orders Service -> Kafka -> Inventory Service -> Aurora DB (Network hop 12x)

Now:
User -> Nginx (TLS) -> Monolithic Go/Rust binary -> SQLite (In-process memory)
\`\`\`

## The Magic of SQLite WAL Mode

SQLite is often wrongly dismissed as a "toy database for mobile apps". In reality, SQLite in WAL mode with memory mapping is faster than almost any network-bound client-server database:

\`\`\`sql
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA cache_size = -1000000; -- 1GB RAM cache
PRAGMA mmap_size = 30000000000; -- 30GB Memory Mapped I/O
PRAGMA temp_store = MEMORY;
PRAGMA busy_timeout = 5000;
\`\`\`

With these pragmas:
- Reads never block writes.
- Writes never block reads.
- Single-threaded write throughput: **45,000 transactions/sec**.
- Read throughput across 32 CPU cores: **380,000 queries/sec**.

## Lessons Learned

1. **Network calls are the #1 killer of latency.** Replacing localhost memory reads with JSON serialization across AWS VPCs is 1000x slower.
2. **Backups are trivial.** With Litestream or SQLite vacuum-into, continuous replication to S3 costs \$0.80/month.
3. **Peace of mind.** No more waking up at 3 AM because a Kafka partition rebalanced or a Kubernetes ingress controller ran out of file descriptors.
`
  },
  {
    slug: 'the-lost-art-of-terminal-uis',
    filename: 'the-lost-art-of-terminal-uis.md',
    title: 'The Lost Art of Terminal UIs: ANSI Escapes, PTYs, and 1.06s Refresh Cycles',
    date: '2026-06-19',
    readTime: '5 min read',
    tags: ['retro', 'tui', 'unix', 'terminal'],
    summary: 'Exploring why the 80x24 character grid remains the pinnacle of developer ergonomic productivity.',
    content: `# The Lost Art of Terminal UIs: ANSI Escapes, PTYs, and 1.06s Refresh Cycles

In 1978, Digital Equipment Corporation released the **VT100**. It introduced ANSI escape sequences (\`ESC [ ...\`) and established the foundation of interactive computing that still powers our modern terminals today.

## Why 1.06 Seconds?

On vintage phosphor cathode-ray tubes (like the VT220 and IBM 3270), the blinking cursor was timed not arbitrarily, but synchronized with the CRT electron gun frame division:

\`\`\`
1.06s cycle:
[ ■■■■■■■■■■ ON (530ms) ] -> [           OFF (530ms) ]
\`\`\`

This rhythm matched the human eye's involuntary saccadic cadence, minimizing eye fatigue during 12-hour programming stints in green phosphor glow.

## Raw Mode vs Cooked Mode

When you launch a terminal, the operating system's TTY line discipline sits between your keyboard and the process in **cooked (canonical) mode**: it buffers characters until you press Return.

To build interactive TUIs (like \`vim\`, \`htop\`, or this very blog), we must drop into **raw mode**:

\`\`\`c
#include <termios.h>
#include <unistd.h>

void enableRawMode() {
    struct termios raw;
    tcgetattr(STDIN_FILENO, &raw);
    
    // Disable ECHO, Canonical mode, Extended input, Signals
    raw.c_lflag &= ~(ECHO | ICANON | IEXTEN | ISIG);
    
    // Disable software flow control (Ctrl+S, Ctrl+Q)
    raw.c_iflag &= ~(IXON | ICRNL);
    
    // Disable output post-processing
    raw.c_oflag &= ~(OPOST);
    
    tcsetattr(STDIN_FILENO, TCSAFLUSH, &raw);
}
\`\`\`

## Why CLI-First Interfaces Outlive Frameworks

React 16, 17, 18, 19... Vue 2, 3... Angular 1 through 18.
Meanwhile, \`curl | grep | awk\` written in 1977 still runs unmodified with zero breaking changes.

There is deep poetry in software that treats characters as first-class citizens.
`
  },
  {
    slug: 'zero-alloc-parser',
    filename: 'zero-alloc-parser.md',
    title: 'Zero-Allocation JSON Streaming in WebAssembly and SIMD',
    date: '2026-05-02',
    readTime: '7 min read',
    tags: ['wasm', 'performance', 'simd', 'systems'],
    summary: 'Parsing gigabytes of JSON streams with 128-bit vector instructions without placing a single heap allocation.',
    content: `# Zero-Allocation JSON Streaming in WebAssembly and SIMD

When processing JSON payloads in high-throughput pipelines, traditional parsers spend up to **70% of their CPU cycles** simply allocating small string buffers and hash map buckets.

Using SIMD (Single Instruction, Multiple Data) vector intrinsics, we can scan 16 or 32 bytes of ASCII characters simultaneously in a single CPU clock cycle.

\`\`\`rust
#[cfg(target_arch = "x86_64")]
use std::arch::x86_64::*;

#[inline(always)]
pub unsafe fn find_structural_chars_128(chunk: &[u8; 16]) -> u32 {
    let v = _mm_loadu_si128(chunk.as_ptr() as *const __m128i);
    
    let quote = _mm_set1_epi8(b'"' as i8);
    let colon = _mm_set1_epi8(b':' as i8);
    let comma = _mm_set1_epi8(b',' as i8);
    let open_brace = _mm_set1_epi8(b'{' as i8);
    let close_brace = _mm_set1_epi8(b'}' as i8);

    let eq_quote = _mm_cmpeq_epi8(v, quote);
    let eq_colon = _mm_cmpeq_epi8(v, colon);
    let eq_comma = _mm_cmpeq_epi8(v, comma);
    let eq_brace = _mm_or_si128(_mm_cmpeq_epi8(v, open_brace), _mm_cmpeq_epi8(v, close_brace));

    let mask = _mm_or_si128(_mm_or_si128(eq_quote, eq_colon), _mm_or_si128(eq_comma, eq_brace));
    _mm_movemask_epi8(mask) as u32
}
\`\`\`

## Vectorized Bitmask Traversal

Once we extract the 16-bit bitmask of structural delimiters, we can use the \`_tzcnt_u32\` (trailing zero count / CTZ) CPU instruction to jump straight to the delimiter index without branching:

\`\`\`rust
let mut mask = find_structural_chars_128(&chunk);
while mask != 0 {
    let index = mask.trailing_zeros() as usize;
    // Process delimiter at (chunk_offset + index)
    mask &= mask - 1; // Clear lowest set bit
}
\`\`\`

## Results
- Node.js \`JSON.parse\`: 280 MB/s
- Rust \`serde_json\`: 620 MB/s
- **Vectorized Zero-Alloc Wasm**: **3,450 MB/s**

Zero heap churn. Zero GC pauses. Pure throughput.
`
  },
  {
    slug: 'crafting-minimal-tools',
    filename: 'crafting-minimal-tools.md',
    title: 'The Unix Philosophy in 2026: Do One Thing Well and Output Text',
    date: '2026-03-11',
    readTime: '4 min read',
    tags: ['unix', 'philosophy', 'cli', 'tools'],
    summary: 'Why composable CLI utilities with stdout pipes remain the most resilient software architecture ever conceived.',
    content: `# The Unix Philosophy in 2026: Do One Thing Well and Output Text

In 1978, Doug McIlroy articulated the Unix Philosophy:

> 1. Write programs that do one thing and do it well.
> 2. Write programs to work together.
> 3. Write programs to handle text streams, because that is a universal interface.

Almost 50 years later, we find ourselves surrounded by 500MB desktop apps built with Electron, multi-gigabyte container clusters, and proprietary locked-in SaaS APIs.

Yet, when you need to extract 50,000 email addresses from a 20GB server log, what do you reach for?

\`\`\`bash
grep -E -o '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' /var/log/server.log \
  | sort -u \
  | wc -l
\`\`\`

Total runtime: 1.2 seconds. Total memory used: 4 MB.

## Why Plain Text Streams Win

1. **Universal Protocol**: Every language, OS, and hardware architecture understands ASCII / UTF-8 text.
2. **Inspectability**: You can stick \`tee /tmp/debug.log\` into any pipeline and inspect intermediate data in real time.
3. **Zero Impedance Mismatch**: No schema migrations, no protobuf recompilation, no ORM layer.
4. **Infinite Composability**: A tool written in 1985 (\`sed\`) can pipe directly into a tool written in 2026 (\`ripgrep\` or an LLM CLI agent).

Keep your tools small. Keep your data in text. Let the pipes do the heavy lifting.
`
  }
];
