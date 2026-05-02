/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { formatDate, formatTime } from '../lib/utils';
import { Calendar, ChevronRight, BookOpen, Music, MessageSquare, Heart } from 'lucide-react';
import { AppSection } from '../types';

interface HomeScreenProps {
  setActiveSection: (section: AppSection) => void;
}

export default function HomeScreen({ setActiveSection }: HomeScreenProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const dailyVerse = {
    telugu: "నీవు వెళ్లు ప్రతి స్థలమున నీ దేవుడైన యెహోవా నీకు తోడైయుండును.",
    english: "The Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9 / యెహోషువ 1:9"
  };

  return (
    <div className="space-y-8">
      {/* Date/Time Section */}
      <div className="flex justify-between items-end border-b border-border-subtle pb-4">
        <div>
          <h2 className="text-3xl font-bold text-brand-dark dark:text-gray-100">{formatTime(now)}</h2>
          <p className="text-brand-muted flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mt-1">
            <Calendar size={12} className="text-primary" />
            {formatDate(now)}
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[10px] uppercase tracking-[0.2em] text-brand-muted font-black">Jerusalem Time</p>
        </div>
      </div>

      {/* Daily Verse Card */}
      <div className="glass-card p-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
        <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-1 rounded-md uppercase tracking-widest mb-4 inline-block">Daily Verse</span>
        <p className="text-2xl font-serif italic mb-6 leading-relaxed text-brand-dark dark:text-gray-100">
          "{dailyVerse.telugu}"
        </p>
        <p className="text-brand-muted mb-6 leading-relaxed font-medium italic">
          "{dailyVerse.english}"
        </p>
        <div className="flex items-center justify-end gap-2">
          <div className="h-px bg-border-subtle flex-1" />
          <p className="text-xs font-bold text-primary uppercase tracking-wider">
            {dailyVerse.reference}
          </p>
        </div>
      </div>

      {/* Daily Devotion Preview */}
      <div className="flex flex-col md:flex-row glass-card overflow-hidden hover:shadow-md transition-shadow">
        <div className="md:w-1/3">
          <img 
            src="https://picsum.photos/seed/devotion/800/800" 
            alt="Devotion" 
            className="w-full h-full object-cover min-h-[160px]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="md:w-2/3 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
             <span className="text-[9px] font-black bg-brand-dark text-white px-2 py-1 rounded uppercase tracking-wider">Faith & Vision</span>
             <span className="text-[9px] font-bold text-brand-muted uppercase tracking-widest">May 3, 2026</span>
          </div>
          <h3 className="text-2xl font-serif text-brand-dark dark:text-gray-100 mb-3">Resting in His Grace</h3>
          <p className="text-sm text-brand-muted line-clamp-2 mb-6 leading-relaxed">
            In a world that demands constant movement, Divine Hesed invites you to pause. True rest isn't the absence of work, but the presence of God.
          </p>
          <button className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group bg-primary/5 hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition-all w-fit self-end">
            Read Devotion <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { id: 'bible', label: 'Bible', icon: BookOpen, color: 'bg-blue-50 text-blue-600 border-blue-100' },
          { id: 'songs', label: 'Songs', icon: Music, color: 'bg-red-50 text-red-600 border-red-100' },
          { id: 'ai', label: 'Assistant', icon: MessageSquare, color: 'bg-primary/5 text-primary border-primary/10' },
          { id: 'favorites', label: 'Favorites', icon: Heart, color: 'bg-pink-50 text-pink-600 border-pink-100' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveSection(item.id as AppSection)}
            className="flex flex-col items-center justify-center p-6 glass-card hover:border-primary transition-all group hover:-translate-y-1 shadow-sm"
          >
            <div className={`w-12 h-12 ${item.color} border rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <item.icon size={22} />
            </div>
            <span className="font-bold text-xs uppercase tracking-widest text-brand-dark dark:text-gray-200">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
