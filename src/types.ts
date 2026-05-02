/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BibleVerse {
  book: string;
  bookAbbr: string;
  chapter: number;
  verse: number;
  textTelugu: string;
  textEnglish: string;
}

export interface Song {
  id: string;
  number?: number;
  title: string;
  lyrics: string;
  youtubeId: string;
  category?: string;
}

export interface Devotion {
  id: string;
  date: string;
  title: string;
  text: string;
  verseTelugu: string;
  verseEnglish: string;
  imageUrl?: string;
}

export interface UserPreferences {
  favorites: {
    songs: string[];
    verses: string[]; // comma separated format like "John:3:16"
  };
  settings: {
    fontSize: number;
    theme: 'light' | 'dark';
    colorTheme: string;
  };
}

export type AppSection = 'home' | 'bible' | 'songs' | 'ai' | 'favorites' | 'settings';
