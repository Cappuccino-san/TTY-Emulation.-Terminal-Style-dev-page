import React, { useState } from 'react';
import type { ThemeConfig } from '../types/terminal';
import { Check, Copy, ArrowLeft, Tag, Clock, Calendar, Mail } from 'lucide-react';

interface MarkdownViewerProps {
  title: string;
  filename: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  content: string;
  path?: string;
  themeConfig: ThemeConfig;
  onCommandClick?: (cmd: string) => void;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  title,
  filename,
  date,
  readTime,
  tags,
  content,
  path,
  themeConfig,
  onCommandClick,
}) => {
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  const copyCodeToClipboard = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  // Basic terminal markdown parser
  const renderFormattedMarkdown = (rawMarkdown: string) => {
    const lines = rawMarkdown.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let currentCodeLines: string[] = [];
    let codeBlockCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code Block start/end
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // Finish code block
          const blockIdx = codeBlockCount++;
          const codeString = currentCodeLines.join('\n');
          const lang = codeLanguage || 'text';

          elements.push(
            <div
              key={`code-${i}`}
              className="my-3 border rounded-sm overflow-hidden text-xs md:text-sm"
              style={{
                borderColor: themeConfig.border,
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
              }}
            >
              <div
                className="px-3 py-1 flex justify-between items-center border-b select-none text-xs"
                style={{
                  borderColor: themeConfig.border,
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  color: themeConfig.dimText,
                }}
              >
                <span className="font-semibold uppercase tracking-wider">
                  [{lang}]
                </span>
                <button
                  onClick={() => copyCodeToClipboard(codeString, blockIdx)}
                  className="flex items-center gap-1 hover:opacity-100 transition-opacity cursor-pointer text-xs"
                  style={{ color: themeConfig.accent }}
                  title="Copy code snippet"
                >
                  {copiedCodeIdx === blockIdx ? (
                    <>
                      <Check size={12} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 overflow-x-auto leading-relaxed font-mono">
                <code>
                  {currentCodeLines.map((cLine, cIdx) => (
                    <div key={cIdx} className="flex">
                      <span
                        className="w-7 select-none text-right pr-3 opacity-30 text-xs"
                        style={{ color: themeConfig.dimText }}
                      >
                        {cIdx + 1}
                      </span>
                      <span className="flex-1 whitespace-pre" style={{ color: themeConfig.brightText }}>
                        {cLine}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          );

          inCodeBlock = false;
          codeLanguage = '';
          currentCodeLines = [];
        } else {
          inCodeBlock = true;
          codeLanguage = line.trim().slice(3);
          currentCodeLines = [];
        }
        continue;
      }

      if (inCodeBlock) {
        currentCodeLines.push(line);
        continue;
      }

      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <div key={`h1-${i}`} className="mt-4 mb-3">
            <h1
              className="text-lg md:text-xl font-bold tracking-tight pb-1 border-b"
              style={{
                color: themeConfig.brightText,
                borderColor: themeConfig.border,
                textShadow: themeConfig.glow,
              }}
            >
              {line.slice(2)}
            </h1>
          </div>
        );
        continue;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <div key={`h2-${i}`} className="mt-4 mb-2">
            <h2
              className="text-base md:text-lg font-bold flex items-center gap-2"
              style={{ color: themeConfig.brightText }}
            >
              <span style={{ color: themeConfig.accent }}>##</span> {line.slice(3)}
            </h2>
          </div>
        );
        continue;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <div key={`h3-${i}`} className="mt-3 mb-1">
            <h3
              className="text-sm md:text-base font-semibold"
              style={{ color: themeConfig.accentAlt }}
            >
              ### {line.slice(4)}
            </h3>
          </div>
        );
        continue;
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        elements.push(
          <div
            key={`bq-${i}`}
            className="my-2 pl-3 border-l-2 italic text-xs md:text-sm py-1"
            style={{
              borderColor: themeConfig.accent,
              color: themeConfig.brightText,
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            {line.slice(2)}
          </div>
        );
        continue;
      }

      // Unordered list
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemText = line.trim().slice(2);
        elements.push(
          <div key={`li-${i}`} className="flex items-start gap-2 my-1 text-xs md:text-sm">
            <span style={{ color: themeConfig.accent }}>•</span>
            <span style={{ color: themeConfig.text }}>{formatInlineTokens(itemText)}</span>
          </div>
        );
        continue;
      }

      // Horizontal separator
      if (line.trim() === '---' || line.trim() === '===') {
        elements.push(
          <div
            key={`hr-${i}`}
            className="my-3 border-b border-dashed"
            style={{ borderColor: themeConfig.border }}
          />
        );
        continue;
      }

      // Empty line
      if (!line.trim()) {
        elements.push(<div key={`empty-${i}`} className="h-2" />);
        continue;
      }

      // Regular Paragraph
      elements.push(
        <p key={`p-${i}`} className="my-1.5 text-xs md:text-sm leading-relaxed" style={{ color: themeConfig.text }}>
          {formatInlineTokens(line)}
        </p>
      );
    }

    return elements;
  };

  // Helper to parse `inline code`, **bold**, and links [text](url)
  const formatInlineTokens = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Inline Code: `code`
      const codeMatch = remaining.match(/^(.*?)`([^`]+)`(.*)$/);
      if (codeMatch) {
        if (codeMatch[1]) parts.push(codeMatch[1]);
        parts.push(
          <code
            key={`code-${key++}`}
            className="px-1.5 py-0.5 rounded-xs text-xs font-mono border"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderColor: themeConfig.border,
              color: themeConfig.brightText,
            }}
          >
            {codeMatch[2]}
          </code>
        );
        remaining = codeMatch[3];
        continue;
      }

      // Bold: **text**
      const boldMatch = remaining.match(/^(.*?)\*\*([^*]+)\*\*(.*)$/);
      if (boldMatch) {
        if (boldMatch[1]) parts.push(boldMatch[1]);
        parts.push(
          <strong key={`bold-${key++}`} style={{ color: themeConfig.brightText }}>
            {boldMatch[2]}
          </strong>
        );
        remaining = boldMatch[3];
        continue;
      }

      // Link: [label](url)
      const linkMatch = remaining.match(/^(.*?)\[([^\]]+)\]\(([^)]+)\)(.*)$/);
      if (linkMatch) {
        if (linkMatch[1]) parts.push(linkMatch[1]);
        const href = linkMatch[3];
        const label = linkMatch[2];
        parts.push(
          <a
            key={`link-${key++}`}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="underline cursor-pointer hover:opacity-100"
            style={{ color: themeConfig.accentAlt }}
            onClick={(e) => {
              if (href.startsWith('mailto:')) {
                e.preventDefault();
                onCommandClick?.('mail');
              }
            }}
          >
            {label}
          </a>
        );
        remaining = linkMatch[4];
        continue;
      }

      parts.push(remaining);
      break;
    }

    return parts;
  };

  return (
    <div className="my-3 font-mono border-l-2 pl-3 md:pl-4" style={{ borderColor: themeConfig.border }}>
      {/* File Header Metadata */}
      <div
        className="p-2.5 mb-3 border rounded-xs text-xs flex flex-wrap items-center justify-between gap-3 select-none"
        style={{
          borderColor: themeConfig.border,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="font-bold" style={{ color: themeConfig.brightText }}>
            📄 {filename} {title && title !== filename ? `(${title})` : ''}
          </span>
          {path && (
            <span className="opacity-50 text-xs hidden sm:inline" style={{ color: themeConfig.dimText }}>
              [{path}]
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs">
          {date && (
            <span className="flex items-center gap-1" style={{ color: themeConfig.dimText }}>
              <Calendar size={12} /> {date}
            </span>
          )}
          {readTime && (
            <span className="flex items-center gap-1" style={{ color: themeConfig.accent }}>
              <Clock size={12} /> {readTime}
            </span>
          )}
        </div>
      </div>

      {/* Tags Bar */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs">
          <span className="flex items-center gap-1 mr-1" style={{ color: themeConfig.dimText }}>
            <Tag size={12} /> Tags:
          </span>
          {tags.map((tag, tIdx) => (
            <button
              key={tIdx}
              onClick={() => onCommandClick?.(`cd #${tag}`)}
              className="px-1.5 py-0.5 border text-xs cursor-pointer hover:underline transition-all"
              style={{
                borderColor: themeConfig.border,
                color: themeConfig.accent,
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
              title={`Filter articles tagged #${tag}`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Rendered Body */}
      <div className="markdown-body">{renderFormattedMarkdown(content)}</div>

      {/* Footer Quick Actions */}
      <div
        className="mt-5 pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs select-none"
        style={{ borderColor: themeConfig.border }}
      >
        <button
          onClick={() => onCommandClick?.('ls -l posts')}
          className="flex items-center gap-1 px-2.5 py-1 border cursor-pointer hover:bg-white/5 transition-colors"
          style={{ borderColor: themeConfig.border, color: themeConfig.brightText }}
        >
          <ArrowLeft size={12} /> Back to Posts (ls posts)
        </button>

        <button
          onClick={() => onCommandClick?.('mail')}
          className="flex items-center gap-1 px-2.5 py-1 border cursor-pointer hover:bg-white/5 transition-colors"
          style={{ borderColor: themeConfig.border, color: themeConfig.accent }}
        >
          <Mail size={12} /> Reply to Author (mail)
        </button>
      </div>
    </div>
  );
};
