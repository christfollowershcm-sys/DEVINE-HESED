/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Zap, Book, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { askBibleAssistant } from '../lib/gemini';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: 'Welcome to **Divine Hesed AI Assistant**. How can I help you study scripture today? I can provide verses, explanations, and even conduct a **Deep Study** on any topic.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<'normal' | 'deep'>('normal');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await askBibleAssistant(input, mode);
    
    const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response || "" };
    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-210px)] -mx-6 -mt-6 bg-bg-ai px-6 pt-6">
      {/* Search Header and Mode Switch */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-brand-dark rounded-full flex items-center justify-center">
             <Zap size={16} className="text-white" />
           </div>
           <h3 className="font-black text-brand-dark uppercase text-[10px] tracking-[0.2em]">Divine Insight</h3>
        </div>
        <div className="flex glass-card p-1 shadow-sm">
          <button 
            onClick={() => setMode('normal')}
            className={`px-4 py-1.5 text-[10px] font-black rounded uppercase tracking-widest transition-all ${
              mode === 'normal' ? 'bg-primary text-white shadow-md' : 'text-brand-muted hover:text-brand-dark'
            }`}
          >
            Normal
          </button>
          <button 
            onClick={() => setMode('deep')}
            className={`px-4 py-1.5 text-[10px] font-black rounded uppercase tracking-widest transition-all ${
              mode === 'deep' ? 'bg-primary text-white shadow-md' : 'text-brand-muted hover:text-brand-dark'
            }`}
          >
            Deep Study
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-6 px-1 custom-scrollbar pb-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-5 glass-card ${
              m.role === 'user' 
                ? 'bg-border-subtle text-brand-dark rounded-tr-none' 
                : 'rounded-tl-none'
            }`}>
              {m.role === 'assistant' && (
                <p className="text-[9px] font-black text-primary mb-2 uppercase tracking-widest">Scripture Insight</p>
              )}
              <div className="markdown-body text-sm leading-relaxed">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-border-subtle p-5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="py-6 border-t border-border-subtle bg-bg-ai">
        <form onSubmit={handleSubmit} className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'deep' ? "Exegesis topic..." : "Ask a biblical question..."}
            className="w-full pl-6 pr-14 py-4 glass-card rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-sm transition-all text-sm font-medium"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center disabled:opacity-30 shadow-md transform hover:scale-105 active:scale-95 transition-all"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-[9px] text-brand-muted text-center mt-3 font-bold uppercase tracking-widest">Powered by Scripture-First Logic</p>
      </div>
    </div>
  );
}
