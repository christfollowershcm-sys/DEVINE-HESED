/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  Music, 
  MessageSquare, 
  Heart, 
  Settings as SettingsIcon,
  Search,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppSection } from './types';
import HomeScreen from './components/HomeScreen';
import BibleScreen from './components/BibleScreen';
import SongsScreen from './components/SongsScreen';
import AIScreen from './components/AIScreen';
import FavoritesScreen from './components/FavoritesScreen';
import SettingsScreen from './components/SettingsScreen';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, signInAnonymously, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'divine_hesed_favorites';

export default function App() {
  const [activeSection, setActiveSection] = useState<AppSection>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [colorTheme, setColorTheme] = useState('default');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<{songs: string[], verses: string[]}>({songs: [], verses: []});

  // Load from local storage initially
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFavorites(parsed);
      } catch (e) {
        console.error("Error parsing local favorites", e);
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        setAuthError(null);
        // Load preferences from firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', authUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.settings) {
              setIsDarkMode(data.settings.theme === 'dark');
              setFontSize(data.settings.fontSize || 16);
              setColorTheme(data.settings.colorTheme || 'default');
            }
            if (data.favorites) {
              // Merge local favorites with cloud favorites
              const merged = {
                songs: [...new Set([...favorites.songs, ...(data.favorites.songs || [])])],
                verses: [...new Set([...favorites.verses, ...(data.favorites.verses || [])])]
              };
              setFavorites(merged);
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
            }
          } else {
            // Initialize user doc with current local favorites
            await setDoc(doc(db, 'users', authUser.uid), {
              favorites: favorites,
              settings: { theme: isDarkMode ? 'dark' : 'light', fontSize: fontSize, colorTheme: colorTheme }
            });
          }
        } catch (err) {
          console.error("Firestore error:", err);
        }
      } else {
        setUser(null);
        // Try anonymous but swallow 403 error specifically for the UI
        signInAnonymously(auth).catch((error) => {
          if (error.code === 'auth/admin-restricted-operation') {
            setAuthError("Remote sync is limited. Sign in with Google to enable backups.");
          }
        });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = async (type: 'songs' | 'verses', id: string) => {
    const newFavorites = { ...favorites };
    if (newFavorites[type].includes(id)) {
      newFavorites[type] = newFavorites[type].filter(item => item !== id);
    } else {
      newFavorites[type] = [...newFavorites[type], id];
    }
    setFavorites(newFavorites);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));
    
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), { favorites: newFavorites }, { merge: true });
      } catch (err) {
        console.error("Cloud save failed:", err);
      }
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google Sign-in failed:", err);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('data-color-theme', colorTheme);

    // Save settings to cloud if user is logged in
    if (user) {
      const saveSettings = async () => {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            settings: {
              theme: isDarkMode ? 'dark' : 'light',
              fontSize: fontSize,
              colorTheme: colorTheme
            }
          }, { merge: true });
        } catch (err) {
          console.error("Cloud settings save failed:", err);
        }
      };
      saveSettings();
    }
  }, [isDarkMode, colorTheme, fontSize, user]);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'bible', icon: BookOpen, label: 'Bible' },
    { id: 'songs', icon: Music, label: 'Songs' },
    { id: 'ai', icon: MessageSquare, label: 'Assistant' },
    { id: 'favorites', icon: Heart, label: 'Saved' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg-main text-brand-dark">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-primary rounded-2xl mb-6 shadow-xl flex items-center justify-center text-white text-3xl font-bold">D</div>
          <p className="text-xl font-serif italic">Divine Hesed</p>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-muted mt-2">Loading Sanctuary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-bg text-text transition-colors duration-300`} style={{ fontSize: `${fontSize}px` }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-border-subtle dark:border-gray-800 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">D</div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-brand-dark dark:text-gray-100 leading-none">DIVINE HESED</h1>
            <p className="text-[9px] uppercase tracking-widest text-brand-muted font-bold mt-1">Scripture-Centered Living</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-border-subtle"
          >
            {isDarkMode ? <Sun size={18} className="text-brand-muted" /> : <Moon size={18} className="text-brand-muted" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24 max-w-2xl mx-auto min-h-[calc(100vh-140px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            {activeSection === 'home' && <HomeScreen setActiveSection={setActiveSection} />}
            {activeSection === 'bible' && <BibleScreen fontSize={fontSize} favorites={favorites.verses} toggleFavorite={(id) => toggleFavorite('verses', id)} />}
            {activeSection === 'songs' && <SongsScreen favorites={favorites.songs} toggleFavorite={(id) => toggleFavorite('songs', id)} />}
            {activeSection === 'ai' && <AIScreen />}
            {activeSection === 'favorites' && <FavoritesScreen favorites={favorites} setActiveSection={setActiveSection} />}
            {activeSection === 'settings' && (
              <SettingsScreen 
                fontSize={fontSize} 
                setFontSize={setFontSize} 
                isDarkMode={isDarkMode} 
                setIsDarkMode={setIsDarkMode} 
                colorTheme={colorTheme}
                setColorTheme={setColorTheme}
                user={user}
                loginWithGoogle={loginWithGoogle}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-bg-nav dark:bg-gray-900 border-t border-border-subtle dark:border-gray-800 safe-area-pb shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
        <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as AppSection)}
              className={`flex flex-col items-center justify-center pt-2 pb-1 px-1 flex-1 transition-all relative ${
                activeSection === item.id 
                  ? 'text-primary' 
                  : 'text-brand-muted hover:text-brand-dark dark:hover:text-gray-300'
              }`}
            >
              {activeSection === item.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute top-0 w-8 h-1 bg-primary rounded-b-full"
                />
              )}
              <item.icon size={20} strokeWidth={activeSection === item.id ? 2.5 : 2} />
              <span className={`text-[9px] mt-1 font-bold uppercase tracking-wider ${activeSection === item.id ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
