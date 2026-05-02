/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, BookOpen, Music, Trash2, ChevronRight } from 'lucide-react';
import { AppSection } from '../types';

interface FavoritesScreenProps {
  favorites: { songs: string[], verses: string[] };
  setActiveSection: (section: AppSection) => void;
}

export default function FavoritesScreen({ favorites, setActiveSection }: FavoritesScreenProps) {
  const hasFavorites = favorites.songs.length > 0 || favorites.verses.length > 0;

  if (!hasFavorites) {
    return (
      <div className="text-center py-20 px-6">
        <div className="w-20 h-20 bg-pink-50 dark:bg-pink-900/10 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart size={40} />
        </div>
        <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
        <p className="text-gray-500 max-w-xs mx-auto mb-8">
          Start saving your favorite Bible verses and Christian songs to access them quickly here.
        </p>
        <button 
          onClick={() => setActiveSection('home')}
          className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg"
        >
          Explore Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 italic text-primary">Your Favorites</h2>

      {favorites.verses.length > 0 && (
        <section>
          <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3 flex items-center gap-2">
            <BookOpen size={14} /> Saved Verses
          </h3>
          <div className="space-y-3">
            {favorites.verses.map(vId => (
              <div key={vId} className="glass-card p-4 shadow-sm group">
                <p className="text-sm font-serif italic mb-1 text-brand-dark dark:text-gray-200">"{vId.split(':').join(' ')}"</p>
                <div className="flex justify-between items-center mt-2">
                   <button onClick={() => setActiveSection('bible')} className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">Go to page</button>
                   <Heart size={14} className="text-primary" fill="currentColor" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {favorites.songs.length > 0 && (
        <section>
          <h3 className="text-xs uppercase tracking-widest text-brand-muted font-bold mb-3 flex items-center gap-2">
            <Music size={14} /> Saved Songs
          </h3>
          <div className="space-y-3">
            {favorites.songs.map(sId => (
              <div key={sId} className="glass-card p-4 flex items-center gap-4 group">
                <div className="w-10 h-10 glass-3d text-primary rounded-lg flex items-center justify-center">
                  <Music size={18} />
                </div>
                <div className="flex-1">
                   <p className="font-bold text-sm text-brand-dark dark:text-gray-200">Hymn {sId}</p>
                </div>
                <button onClick={() => setActiveSection('songs')} className="text-brand-muted hover:text-primary transition-colors"><ChevronRight size={16} /></button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
