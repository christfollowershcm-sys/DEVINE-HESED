/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Moon, Sun, Type, Download, Trash2, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface SettingsScreenProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  colorTheme: string;
  setColorTheme: (theme: string) => void;
  user: any;
  loginWithGoogle: () => Promise<void>;
}

export default function SettingsScreen({ fontSize, setFontSize, isDarkMode, setIsDarkMode, colorTheme, setColorTheme, user, loginWithGoogle }: SettingsScreenProps) {
  const isAnonymous = user?.isAnonymous;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <h2 className="text-3xl font-serif text-brand-dark dark:text-gray-100 italic">Settings</h2>

      {/* Account Section */}
      <section className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-6 shadow-sm overflow-hidden relative">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border border-primary/20 overflow-hidden">
               {user?.photoURL ? <img src={user.photoURL} alt="Profile" /> : <div className="text-xl font-bold text-primary">{user?.displayName?.[0] || 'A'}</div>}
            </div>
            <div>
              <p className="font-bold text-brand-dark dark:text-gray-100">{user?.displayName || (isAnonymous ? 'Guest User' : 'Sanctuary Explorer')}</p>
              <p className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">{isAnonymous ? 'Unverified Access' : (user?.email || 'Cloud Sync Enabled')}</p>
            </div>
          </div>
          {isAnonymous && (
            <button 
              onClick={loginWithGoogle}
              className="px-4 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-md hover:bg-brand-dark transition-all"
            >
              Link Google
            </button>
          )}
        </div>
      </section>

      <div className="space-y-6">
        {/* Glassy Color Themes */}
        <section className="bg-white dark:bg-gray-800 border border-border-subtle dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <h3 className="text-[10px] font-black text-brand-muted uppercase mb-6 tracking-[0.2em] flex items-center gap-2 border-b border-border-subtle pb-2 w-fit">
            3D Glassy Themes
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
            {[
              { id: 'default', label: 'Gold', color: '#7C6A46' },
              { id: 'ocean', label: 'Ocean', color: '#2C5282' },
              { id: 'eden', label: 'Eden', color: '#276749' },
              { id: 'royal', label: 'Royal', color: '#553C9A' },
              { id: 'rose', label: 'Rose', color: '#9B2C2C' },
              { id: 'faithful', label: 'Teal', color: '#285E61' },
              { id: 'midnight', label: 'Midnight', color: '#2D3748' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setColorTheme(t.id)}
                className="flex flex-col items-center gap-2 group"
              >
                <div 
                  className={`w-10 h-10 rounded-xl glass-3d flex items-center justify-center transition-all duration-300 relative ${
                    colorTheme === t.id ? 'scale-110 ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900 border-none' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: `${t.color}20`, borderColor: t.color }}
                >
                  <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: t.color }} />
                  {colorTheme === t.id && (
                    <motion.div 
                      layoutId="themeSelected"
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-[10px] shadow-lg"
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
                <span className={`text-[8px] font-black uppercase tracking-widest ${colorTheme === t.id ? 'text-primary' : 'text-brand-muted'}`}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Appearance */}
        <section className="bg-white dark:bg-gray-800 border border-border-subtle dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <h3 className="text-[10px] font-black text-brand-muted uppercase mb-6 tracking-[0.2em] flex items-center gap-2 border-b border-border-subtle pb-2 w-fit">
            Appearance & Visuals
          </h3>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-bg-nav dark:bg-gray-700 rounded-xl border border-border-subtle">
                  {isDarkMode ? <Moon size={20} className="text-primary" /> : <Sun size={20} className="text-primary" />}
                </div>
                <div>
                  <p className="font-bold text-brand-dark dark:text-gray-100">Interface Theme</p>
                  <p className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">Light / Dark Toggle</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-14 h-7 rounded-full transition-all relative ${isDarkMode ? 'bg-primary shadow-inner' : 'bg-border-subtle'}`}
              >
                <motion.div 
                  animate={{ x: isDarkMode ? 28 : 4 }}
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-bg-nav dark:bg-gray-700 rounded-xl border border-border-subtle">
                    <Type size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark dark:text-gray-100">Reading Comfort</p>
                    <p className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">Font Size: {fontSize}px</p>
                  </div>
                </div>
              </div>
              <div className="px-2">
                <input 
                  type="range" 
                  min="12" 
                  max="24" 
                  value={fontSize} 
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-bg-nav dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-primary border border-border-subtle"
                />
                <div className="flex justify-between text-[9px] text-brand-muted font-black uppercase tracking-widest mt-2 px-1">
                  <span>Concise</span>
                  <span>Standard</span>
                  <span>Magnified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data & Offline */}
        <section className="bg-white dark:bg-gray-800 border border-border-subtle dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <h3 className="text-[10px] font-black text-brand-muted uppercase mb-6 tracking-[0.2em] border-b border-border-subtle pb-2 w-fit">Data & Ministry</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between text-left group p-3 -m-3 hover:bg-bg-nav rounded-2xl transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-bg-nav dark:bg-gray-700 rounded-xl border border-border-subtle">
                  <Download size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-bold text-brand-dark dark:text-gray-100">Offline Bible Data</p>
                  <p className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">BSI Telugu Version 1.2</p>
                </div>
              </div>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded font-black tracking-widest border border-primary/20">READY</span>
            </button>
            
            <button 
              className="w-full flex items-center gap-4 text-left group p-3 -m-3 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-2xl transition-colors mt-2"
              onClick={() => {
                if (confirm('Are you sure you want to clear your favorites?')) {
                  // logic here
                }
              }}
            >
              <div className="p-2.5 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 border border-red-100">
                <Trash2 size={20} />
              </div>
              <div>
                <p className="font-bold text-red-600">Clear All Favorites</p>
                <p className="text-[10px] text-red-400 uppercase font-bold tracking-widest">Permanent Action</p>
              </div>
            </button>
          </div>
        </section>

        {/* About */}
        <section className="bg-bg-nav dark:bg-gray-800 border border-border-subtle dark:border-gray-700 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white dark:bg-gray-700 rounded-2xl border border-border-subtle shadow-sm">
              <Info size={24} className="text-primary" />
            </div>
            <div>
              <p className="font-serif text-xl text-brand-dark dark:text-gray-100">Divine Hesed</p>
              <p className="text-[10px] text-brand-muted font-black uppercase tracking-[0.2em]">Version 1.0.0 Global</p>
            </div>
          </div>
          <p className="text-xs text-brand-dark font-serif italic border-l-2 border-primary pl-4 leading-relaxed bg-white/50 p-4 rounded-r-xl">
            "Thy word is a lamp unto my feet, and a light unto my path." <br/>
            <span className="text-[10px] font-bold text-primary not-italic">Psalm 119:105</span>
          </p>
        </section>
      </div>

      <button 
        onClick={() => signOut(auth)}
        className="w-full py-6 text-brand-muted font-black uppercase tracking-[0.3em] hover:text-red-500 transition-colors text-xs"
      >
        Sign Out Session
      </button>
    </div>
  );
}
