'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Loader2, MessageCircle } from 'lucide-react';
import { api } from '@/services/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestions = [
  'What are your membership plans?',
  'Do you offer personal training?',
  'What are your gym timings?',
  'Where are you located?',
  'How can I book a free trial?',
  'Do you have steam room facilities?',
  'Can beginners join?',
  'What transformation programs do you offer?',
];

const CTA_KEYWORDS: Record<string, { label: string; action: string; href?: string }[]> = {
  membership: [{ label: '📋 View Membership Plans', action: 'scroll', href: '#plans' }],
  pricing: [{ label: '📋 View Membership Plans', action: 'scroll', href: '#plans' }],
  plans: [{ label: '📋 View Membership Plans', action: 'scroll', href: '#plans' }],
  trial: [{ label: '🎯 Book Free Trial', action: 'scroll', href: '#trial' }],
  join: [{ label: '🎯 Book Free Trial', action: 'scroll', href: '#trial' }],
  enrollment: [{ label: '🎯 Book Free Trial', action: 'scroll', href: '#trial' }],
  location: [{ label: '📍 Open Google Maps', action: 'maps' }],
  directions: [{ label: '📍 Open Google Maps', action: 'maps' }],
  address: [{ label: '📍 Open Google Maps', action: 'maps' }],
  trainer: [{ label: '👨‍🏫 Meet Our Trainers', action: 'scroll', href: '#trainers' }],
  coach: [{ label: '👨‍🏫 Meet Our Trainers', action: 'scroll', href: '#trainers' }],
  'personal training': [{ label: '👨‍🏫 Meet Our Trainers', action: 'scroll', href: '#trainers' }],
  steam: [{ label: '🔥 Tour Our Facilities', action: 'scroll', href: '#home' }],
  beginner: [{ label: '🎯 Book Free Trial', action: 'scroll', href: '#trial' }],
};

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getCTAs(content: string) {
  const lower = content.toLowerCase();
  const ctas: { label: string; action: string; href?: string }[] = [];
  const found = new Set<string>();
  const seenLabels = new Set<string>();
  for (const [keyword, actions] of Object.entries(CTA_KEYWORDS)) {
    if (lower.includes(keyword) && !found.has(keyword)) {
      found.add(keyword);
      for (const action of actions) {
        const key = `${action.label}::${action.action}::${action.href || ''}`;
        if (!seenLabels.has(key)) {
          seenLabels.add(key);
          ctas.push(action);
        }
      }
    }
  }
  return ctas.slice(0, 2);
}

function ChatHeader() {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-gradient-to-r from-primary/10 to-transparent">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#050505]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground">AI Coach</p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <p className="text-xs text-green-400">Online</p>
        </div>
      </div>
    </div>
  );
}

function formatMessage(text: string | null) {
  return (text || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
}

interface ChatPanelProps {
  embedded?: boolean;
  onClose?: () => void;
}

export function ChatPanel({ embedded, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Welcome to Glorious Fitness! I'm your AI Coach. Ask me anything about memberships, fitness plans, trainers, timings, or free trials. I'm here to help! 💪",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!embedded) inputRef.current?.focus();
  }, [embedded]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;

    const userMessage: Message = { role: 'user', content, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      console.log('[Chat] === DEBUG ===');
      console.log('[Chat] NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
      console.log('[Chat] Resolved API base URL:', apiBaseUrl);
      console.log('[Chat] Full endpoint:', `${apiBaseUrl}/api/chat`);
      console.log('[Chat] Request payload:', JSON.stringify({ message: content }));

      const res = await api.post('/api/chat', { message: content });

      console.log('[Chat] Response status:', res.status);
      console.log('[Chat] Response headers:', JSON.stringify(res.headers));
      console.log('[Chat] Response body:', JSON.stringify(res.data));

      if (!res.data || typeof res.data !== 'object') {
        console.error('[Chat] Invalid response format - not an object:', JSON.stringify(res.data));
        throw new Error('Invalid response format from server');
      }

      if (!res.data.response) {
        console.error('[Chat] Missing response field in body:', JSON.stringify(res.data));
        const errMsg = res.data.message || res.data.error || 'No response from assistant';
        throw new Error(errMsg);
      }

      const reply: Message = { role: 'assistant', content: res.data.response, timestamp: new Date() };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error('[Chat] Failed:', errorMsg);
      if (err instanceof Error && err.stack) {
        console.error('[Chat] Stack:', err.stack);
      }
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${errorMsg}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const lastAssistantMsg = messages.filter((m) => m.role === 'assistant').pop();
  const ctas = lastAssistantMsg?.content ? getCTAs(lastAssistantMsg.content) : [];

  return (
    <div className="flex flex-col h-full">
      {embedded && (
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-primary/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#050505]" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">AI Coach</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background/30">
        {messages.map((msg, i) => {
          const ctasForMsg = msg.role === 'assistant' && i === messages.length - 1 && !loading ? ctas : [];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
            {msg.role === 'user' ? (
              <div className="max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed bg-primary text-primary-foreground rounded-br-md">
                {msg.content}
              </div>
            ) : (
              <div
                className="max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed glass rounded-bl-md border border-white/5"
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
              />
            )}
              <span className="text-[10px] text-muted-foreground/50 mt-1 px-1">
                {formatTime(msg.timestamp)}
              </span>

              {ctasForMsg.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 mt-2"
                >
                  {ctasForMsg.map((cta) => (
                    <button
                      key={`${cta.label}::${cta.action}::${cta.href || ''}`}
                      onClick={() => {
                        if (cta.action === 'maps') {
                          window.open('https://maps.google.com/?q=Glorious+Fitness+Ghatkopar+East+Mumbai', '_blank');
                        } else if (cta.href) {
                          const el = document.querySelector(cta.href);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="glass-strong rounded-full px-4 py-2 text-xs font-medium text-foreground hover:text-primary hover:border-primary/30 transition-all whitespace-nowrap"
                    >
                      {cta.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="glass rounded-2xl rounded-bl-md px-4 py-3 border border-white/5">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              </div>
            </div>
          </motion.div>
        )}

        {messages.length === 1 && !embedded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-2"
          >
            <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
              <MessageCircle className="h-3 w-3" />
              Ask me about:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.slice(0, 6).map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs glass rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {messages.length === 1 && embedded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-2"
          >
            <p className="text-xs text-muted-foreground mb-3">
              Try asking:
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left text-xs rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-white/5 border border-white/10 hover:border-primary/30 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-white/10 bg-background/50">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about plans, timings..."
            className="flex-1 h-11 px-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 text-white animate-spin" />
            ) : (
              <Send className="h-4 w-4 text-white" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        onClick={() => setOpen(!open)}
        className="relative group"
      >
        <motion.div
          animate={{ boxShadow: ['0 0 20px rgba(255,59,59,0.3)', '0 0 40px rgba(255,59,59,0.5)', '0 0 20px rgba(255,59,59,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-transparent blur-sm" />
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }}>
                <X className="h-6 w-6 text-white relative z-10" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }}>
                <Bot className="h-6 w-6 text-white relative z-10" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-48 sm:bottom-44 right-4 sm:right-8 z-40 w-[380px] max-w-[calc(100vw-32px)] h-[650px] max-h-[calc(100vh-208px)] bg-[#111111]/90 backdrop-blur-2xl border border-white/10 overflow-hidden flex flex-col shadow-[0_0_40px_rgba(255,0,0,0.2)] max-sm:w-[calc(100vw-32px)] max-sm:h-[calc(100vh-208px)]"
            style={{ borderRadius: '24px' }}
          >
            <ChatHeader />
            <ChatPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
