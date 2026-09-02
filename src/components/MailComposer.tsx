import React, { useState } from 'react';
import type { ThemeConfig } from '../types/terminal';
import { Mail, Send, CheckCircle2, XCircle, ExternalLink, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessSound } from '../audio/soundEffects';

interface MailComposerProps {
  toAddress?: string;
  themeConfig: ThemeConfig;
  onCancel: () => void;
  onDone?: () => void;
}

export const MailComposer: React.FC<MailComposerProps> = ({
  toAddress = 'njnapoli99@gmail.com',
  themeConfig,
  onCancel,
  onDone,
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'sent'>('idle');
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);

  const handleSend = () => {
    if (!message.trim() || !senderEmail.trim()) {
      return;
    }

    setStatus('transmitting');
    setTransmissionLogs([]);

    const steps = [
      'Resolving MX record for njnapoli99@gmail.com...',
      'Connecting to outbound SMTP gateway (TLS 1.3)... OK',
      `EHLO recruiter-terminal... 250-gateway.internal Hello`,
      `MAIL FROM:<${senderEmail}>... 250 2.1.0 Sender OK`,
      `RCPT TO:<${toAddress}>... 250 2.1.5 Recipient OK`,
      'DATA... 354 Start mail input; end with <CRLF>.<CRLF>',
      `Transmitting ${message.length} bytes of encrypted payload to Nicholas Napoli...`,
      '250 2.0.0 OK: message queued successfully',
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setTransmissionLogs((prev) => [...prev, step]);

        if (idx === steps.length - 1) {
          setTimeout(() => {
            setStatus('sent');
            playSuccessSound();
            try {
              confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.8 },
                colors: [themeConfig.brightText, themeConfig.accent, themeConfig.accentAlt],
              });
            } catch (e) {
              // Ignore
            }
          }, 400);
        }
      }, (idx + 1) * 280);
    });
  };

  const mailtoUrl = `mailto:${toAddress}?subject=${encodeURIComponent(
    subject || 'Engineering Opportunity / Inquiry for Nicholas Napoli'
  )}&body=${encodeURIComponent(
    `From: ${senderName} <${senderEmail}>\n\n${message}`
  )}`;

  return (
    <div
      className="my-3 font-mono border rounded-sm p-4 text-xs md:text-sm animate-in fade-in duration-200"
      style={{
        borderColor: themeConfig.border,
        backgroundColor: 'rgba(5, 12, 8, 0.9)',
        boxShadow: `0 0 15px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Header */}
      <div
        className="pb-2 border-b flex items-center justify-between font-bold"
        style={{ borderColor: themeConfig.border, color: themeConfig.brightText }}
      >
        <div className="flex items-center gap-2">
          <Mail size={16} style={{ color: themeConfig.accent }} />
          <span>MAIL COMPOSER // INTERACTIVE PROTOCOL (RFC 5321)</span>
        </div>
        <span className="text-xs opacity-60">Status: {status.toUpperCase()}</span>
      </div>

      {status === 'idle' && (
        <div className="mt-3 space-y-3">
          {/* TO Field */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-24 font-semibold select-none" style={{ color: themeConfig.brightText }}>
              To:
            </label>
            <input
              type="text"
              readOnly
              value={toAddress}
              className="flex-1 px-2.5 py-1 border bg-black/40 font-mono outline-none opacity-80"
              style={{ borderColor: themeConfig.border, color: themeConfig.accent }}
            />
          </div>

          {/* SENDER NAME */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-24 font-semibold select-none" style={{ color: themeConfig.brightText }}>
              Your Name:
            </label>
            <input
              type="text"
              placeholder="e.g. Ada Lovelace"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="flex-1 px-2.5 py-1 border bg-black/40 font-mono outline-none focus:border-current transition-colors"
              style={{ borderColor: themeConfig.border, color: themeConfig.text }}
            />
          </div>

          {/* SENDER EMAIL */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-24 font-semibold select-none" style={{ color: themeConfig.brightText }}>
              Your Email:
            </label>
            <input
              type="email"
              placeholder="e.g. ada@example.com"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="flex-1 px-2.5 py-1 border bg-black/40 font-mono outline-none focus:border-current transition-colors"
              style={{ borderColor: themeConfig.border, color: themeConfig.text }}
            />
          </div>

          {/* SUBJECT */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-24 font-semibold select-none" style={{ color: themeConfig.brightText }}>
              Subject:
            </label>
            <input
              type="text"
              placeholder="e.g. Question about JIT compiler & systems architecture"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 px-2.5 py-1 border bg-black/40 font-mono outline-none focus:border-current transition-colors"
              style={{ borderColor: themeConfig.border, color: themeConfig.text }}
            />
          </div>

          {/* MESSAGE BODY */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold select-none" style={{ color: themeConfig.brightText }}>
              Message Body:
            </label>
            <textarea
              rows={5}
              placeholder="Type your transmission here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2.5 border bg-black/40 font-mono outline-none focus:border-current leading-relaxed resize-y"
              style={{ borderColor: themeConfig.border, color: themeConfig.brightText }}
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              <button
                onClick={handleSend}
                className="flex items-center gap-1.5 px-3 py-1.5 border font-semibold cursor-pointer hover:bg-white/10 transition-all shadow-sm"
                style={{
                  borderColor: themeConfig.accent,
                  color: themeConfig.brightText,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                <Send size={14} /> Send Message (TTY Direct)
              </button>

              <a
                href={mailtoUrl}
                className="flex items-center gap-1.5 px-3 py-1.5 border opacity-75 hover:opacity-100 transition-opacity"
                style={{ borderColor: themeConfig.border, color: themeConfig.dimText }}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={14} /> Open in Email Client
              </a>
            </div>

            <button
              onClick={onCancel}
              className="flex items-center gap-1 px-3 py-1.5 border opacity-60 hover:opacity-100 cursor-pointer"
              style={{ borderColor: themeConfig.border, color: themeConfig.dimText }}
            >
              <XCircle size={14} /> Cancel (Esc)
            </button>
          </div>
        </div>
      )}

      {/* Transmitting Telemetry Stream */}
      {status === 'transmitting' && (
        <div className="mt-3 space-y-1.5 font-mono text-xs">
          <div className="flex items-center gap-2 font-bold mb-2 animate-pulse" style={{ color: themeConfig.accent }}>
            <Sparkles size={14} /> Transmitting packet through SMTP gateway...
          </div>
          {transmissionLogs.map((log, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="opacity-40">&gt;&gt;</span>
              <span style={{ color: idx === transmissionLogs.length - 1 ? themeConfig.brightText : themeConfig.text }}>
                {log}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Sent Confirmation */}
      {status === 'sent' && (
        <div className="mt-4 p-4 border text-center space-y-3" style={{ borderColor: themeConfig.border, backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <CheckCircle2 size={32} className="mx-auto" style={{ color: themeConfig.accent }} />
          <div className="font-bold text-base" style={{ color: themeConfig.brightText }}>
            Transmission Successful!
          </div>
          <div className="text-xs max-w-md mx-auto" style={{ color: themeConfig.text }}>
            Your message has been delivered to Nick Napoli's inbox queue. Thank you for connecting!
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={onDone || onCancel}
              className="px-4 py-1.5 border font-semibold cursor-pointer hover:bg-white/10"
              style={{ borderColor: themeConfig.border, color: themeConfig.brightText }}
            >
              Return to Terminal Prompt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
