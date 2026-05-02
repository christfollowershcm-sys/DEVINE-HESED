/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

// Full Bible Metadata
const BIBLE_METADATA = [
  // Old Testament
  { id: 'GEN', telugu: 'ఆదికాండము', english: 'Genesis', chapters: 50, category: 'OT' },
  { id: 'EXO', telugu: 'నిర్గమకాండము', english: 'Exodus', chapters: 40, category: 'OT' },
  { id: 'LEV', telugu: 'లేవీయకాండము', english: 'Leviticus', chapters: 27, category: 'OT' },
  { id: 'NUM', telugu: 'సంఖ్యాకాండము', english: 'Numbers', chapters: 36, category: 'OT' },
  { id: 'DEU', telugu: 'ద్వితీయోపదేశకాండము', english: 'Deuteronomy', chapters: 34, category: 'OT' },
  { id: 'JOS', telugu: 'యెహోషువ', english: 'Joshua', chapters: 24, category: 'OT' },
  { id: 'JDG', telugu: 'న్యాయాధిపతులు', english: 'Judges', chapters: 21, category: 'OT' },
  { id: 'RUT', telugu: 'రూతు', english: 'Ruth', chapters: 4, category: 'OT' },
  { id: '1SA', telugu: '1 సమూయేలు', english: '1 Samuel', chapters: 31, category: 'OT' },
  { id: '2SA', telugu: '2 సమూయేలు', english: '2 Samuel', chapters: 24, category: 'OT' },
  { id: '1KI', telugu: '1 రాజులు', english: '1 Kings', chapters: 22, category: 'OT' },
  { id: '2KI', telugu: '2 రాజులు', english: '2 Kings', chapters: 25, category: 'OT' },
  { id: '1CH', telugu: '1 దినవృత్తాంతములు', english: '1 Chronicles', chapters: 29, category: 'OT' },
  { id: '2CH', telugu: '2 దినవృత్తాంతములు', english: '2 Chronicles', chapters: 36, category: 'OT' },
  { id: 'EZR', telugu: 'ఎజ్రా', english: 'Ezra', chapters: 10, category: 'OT' },
  { id: 'NEH', telugu: 'నెహెమ్యా', english: 'Nehemiah', chapters: 13, category: 'OT' },
  { id: 'EST', telugu: 'ఎస్తేరు', english: 'Esther', chapters: 10, category: 'OT' },
  { id: 'JOB', telugu: 'యోబు', english: 'Job', chapters: 42, category: 'OT' },
  { id: 'PSA', telugu: 'కీర్తనలు', english: 'Psalms', chapters: 150, category: 'OT' },
  { id: 'PRO', telugu: 'సామెతలు', english: 'Proverbs', chapters: 31, category: 'OT' },
  { id: 'ECC', telugu: 'ప్రసంగి', english: 'Ecclesiastes', chapters: 12, category: 'OT' },
  { id: 'SNG', telugu: 'పరమగీతము', english: 'Song of Solomon', chapters: 8, category: 'OT' },
  { id: 'ISA', telugu: 'యెషయా', english: 'Isaiah', chapters: 66, category: 'OT' },
  { id: 'JER', telugu: 'యిర్మీయా', english: 'Jeremiah', chapters: 52, category: 'OT' },
  { id: 'LAM', telugu: 'విలాపవాక్యములు', english: 'Lamentations', chapters: 5, category: 'OT' },
  { id: 'EZK', telugu: 'యెహెజ్కేలు', english: 'Ezekiel', chapters: 48, category: 'OT' },
  { id: 'DAN', telugu: 'దానియేలు', english: 'Daniel', chapters: 12, category: 'OT' },
  { id: 'HOS', telugu: 'హోషేయ', english: 'Hosea', chapters: 14, category: 'OT' },
  { id: 'JOL', telugu: 'యోవేలు', english: 'Joel', chapters: 3, category: 'OT' },
  { id: 'AMO', telugu: 'ఆమోసు', english: 'Amos', chapters: 9, category: 'OT' },
  { id: 'OBA', telugu: 'ఓబద్యా', english: 'Obadiah', chapters: 1, category: 'OT' },
  { id: 'JON', telugu: 'యోనా', english: 'Jonah', chapters: 4, category: 'OT' },
  { id: 'MIC', telugu: 'మీకా', english: 'Micah', chapters: 7, category: 'OT' },
  { id: 'NAM', telugu: 'నహూము', english: 'Nahum', chapters: 3, category: 'OT' },
  { id: 'HAB', telugu: 'హబక్కూకు', english: 'Habakkuk', chapters: 3, category: 'OT' },
  { id: 'ZEP', telugu: 'జెఫన్యా', english: 'Zephaniah', chapters: 3, category: 'OT' },
  { id: 'HAG', telugu: 'హగ్గయి', english: 'Haggai', chapters: 2, category: 'OT' },
  { id: 'ZEC', telugu: 'జెకర్యా', english: 'Zechariah', chapters: 14, category: 'OT' },
  { id: 'MAL', telugu: 'మలాకీ', english: 'Malachi', chapters: 4, category: 'OT' },

  // New Testament
  { id: 'MAT', telugu: 'మత్తయి', english: 'Matthew', chapters: 28, category: 'NT' },
  { id: 'MRK', telugu: 'మార్కు', english: 'Mark', chapters: 16, category: 'NT' },
  { id: 'LUK', telugu: 'లూకా', english: 'Luke', chapters: 24, category: 'NT' },
  { id: 'JHN', telugu: 'యోహాను', english: 'John', chapters: 21, category: 'NT' },
  { id: 'ACT', telugu: 'అపొస్తలుల కార్యములు', english: 'Acts', chapters: 28, category: 'NT' },
  { id: 'ROM', telugu: 'రోమీయులకు', english: 'Romans', chapters: 16, category: 'NT' },
  { id: '1CO', telugu: '1 కొరింథీయులకు', english: '1 Corinthians', chapters: 16, category: 'NT' },
  { id: '2CO', telugu: '2 కొరింథీయులకు', english: '2 Corinthians', chapters: 13, category: 'NT' },
  { id: 'GAL', telugu: 'గలతీయులకు', english: 'Galatians', chapters: 6, category: 'NT' },
  { id: 'EPH', telugu: 'ఎఫెసీయులకు', english: 'Ephesians', chapters: 6, category: 'NT' },
  { id: 'PHP', telugu: 'ఫిలిప్పీయులకు', english: 'Philippians', chapters: 4, category: 'NT' },
  { id: 'COL', telugu: 'కొలొస్సయులకు', english: 'Colossians', chapters: 4, category: 'NT' },
  { id: '1TH', telugu: '1 థెస్సలొనీకయులకు', english: '1 Thessalonians', chapters: 5, category: 'NT' },
  { id: '2TH', telugu: '2 థెస్సలొనీకయులకు', english: '2 Thessalonians', chapters: 3, category: 'NT' },
  { id: '1TI', telugu: '1 తిమోతికి', english: '1 Timothy', chapters: 6, category: 'NT' },
  { id: '2TI', telugu: '2 తిమోతికి', english: '2 Timothy', chapters: 4, category: 'NT' },
  { id: 'TIT', telugu: 'తీతుకు', english: 'Titus', chapters: 3, category: 'NT' },
  { id: 'PHM', telugu: 'ఫిలేమోనుకు', english: 'Philemon', chapters: 1, category: 'NT' },
  { id: 'HEB', telugu: 'హెబ్రీయులకు', english: 'Hebrews', chapters: 13, category: 'NT' },
  { id: 'JAS', telugu: 'యాకోబు', english: 'James', chapters: 5, category: 'NT' },
  { id: '1PE', telugu: '1 పేతురు', english: '1 Peter', chapters: 5, category: 'NT' },
  { id: '2PE', telugu: '2 పేతురు', english: '2 Peter', chapters: 3, category: 'NT' },
  { id: '1JN', telugu: '1 యోహాను', english: '1 John', chapters: 5, category: 'NT' },
  { id: '2JN', telugu: '2 యోహాను', english: '2 John', chapters: 1, category: 'NT' },
  { id: '3JN', telugu: '3 యోహాను', english: '3 John', chapters: 1, category: 'NT' },
  { id: 'JUD', telugu: 'యూదా', english: 'Jude', chapters: 1, category: 'NT' },
  { id: 'REV', telugu: 'ప్రకటన గ్రంథము', english: 'Revelation', chapters: 22, category: 'NT' },
];

const SAMPLE_VERSES = [
  { book: 'GEN', chapter: 1, verse: 1, telugu: 'ఆదియందు దేవుడు భూమ్యాకాశములను సృజించెను.', english: 'In the beginning God created the heavens and the earth.' },
  { book: 'GEN', chapter: 1, verse: 2, telugu: 'భూమి నిరాకారముగాను శూన్యముగాను ఉండెను; చీకటి అగాధ జలముపైన ఉండెను; దేవుని ఆత్మ జలములను కదలించెను.', english: 'The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters.' },
  { book: 'GEN', chapter: 1, verse: 3, telugu: 'దేవుడు—వెలుగు కలుగును గాక అని పలుకగా వెలుగు కలిగెను.', english: 'Then God said, "Let there be light"; and there was light.' },
];

interface BibleScreenProps {
  fontSize: number;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export default function BibleScreen({ fontSize, favorites, toggleFavorite }: BibleScreenProps) {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'books' | 'chapters' | 'verses'>('books');

  const filteredBooks = BIBLE_METADATA.filter(b => 
    b.english.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.telugu.includes(searchQuery)
  );

  const handleBookSelect = (bookId: string) => {
    setSelectedBook(bookId);
    setView('chapters');
  };

  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter);
    setView('verses');
  };

  const goBack = () => {
    if (view === 'verses') setView('chapters');
    else if (view === 'chapters') setView('books');
  };

  return (
    <div className="space-y-4 h-full">
      {/* Search Header */}
      <div className="flex items-center gap-3 mb-8">
        {view !== 'books' && (
          <button onClick={goBack} className="p-2.5 -ml-2 glass-card shadow-sm hover:bg-bg-nav transition-colors">
            <ChevronLeft size={20} className="text-brand-dark" />
          </button>
        )}
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search scripture..." 
            className="w-full pl-11 pr-4 py-3.5 glass-card rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/5 shadow-sm text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {view === 'books' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] px-1">Old Testament</h3>
            <div className="grid grid-cols-1 gap-2.5">
              {filteredBooks.filter(b => b.category === 'OT').map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleBookSelect(book.id)}
                  className="flex items-center justify-between p-4 glass-card hover:border-primary/40 hover:shadow-md transition-all text-left"
                >
                  <div>
                    <p className="font-bold text-base text-brand-dark dark:text-gray-100">{book.telugu}</p>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider mt-0.5">{book.english}</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-[10px] font-bold text-brand-muted glass-3d px-2 py-1 rounded">{book.chapters} CH</span>
                     <ChevronRight size={14} className="text-border-subtle" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
             <h3 className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] px-1">New Testament</h3>
             <div className="grid grid-cols-1 gap-2.5">
               {filteredBooks.filter(b => b.category === 'NT').map((book) => (
                 <button
                   key={book.id}
                   onClick={() => handleBookSelect(book.id)}
                   className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-border-subtle dark:border-gray-700 rounded-xl hover:border-primary/40 hover:shadow-md transition-all text-left"
                 >
                   <div>
                     <p className="font-bold text-base text-brand-dark dark:text-gray-100">{book.telugu}</p>
                     <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider mt-0.5">{book.english}</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-brand-muted bg-bg-nav px-2 py-1 rounded">{book.chapters} CH</span>
                      <ChevronRight size={14} className="text-border-subtle" />
                   </div>
                 </button>
               ))}
             </div>
          </div>
        </div>
      )}

      {view === 'chapters' && selectedBook && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex flex-col">
            <h2 className="text-3xl font-serif text-brand-dark dark:text-gray-100">{BIBLE_METADATA.find(b => b.id === selectedBook)?.telugu}</h2>
            <p className="text-xs font-bold text-brand-muted uppercase tracking-widest mt-1">
              Select Chapter • {BIBLE_METADATA.find(b => b.id === selectedBook)?.english}
            </p>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
            {Array.from({ length: BIBLE_METADATA.find(b => b.id === selectedBook)?.chapters || 0 }).map((_, i) => (
              <button
                key={i}
                onClick={() => handleChapterSelect(i + 1)}
                className="aspect-square flex items-center justify-center glass-card hover:bg-primary hover:text-white hover:border-primary transition-all font-bold text-base shadow-sm"
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {view === 'verses' && selectedBook && selectedChapter && (
        <div className="space-y-6 pb-20 animate-in fade-in duration-300">
          <div className="flex items-center justify-between sticky top-[76px] bg-bg/80 backdrop-blur-md py-4 z-30 border-b border-border-subtle -mx-6 px-6 mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-brand-dark">{BIBLE_METADATA.find(b => b.id === selectedBook)?.telugu} {selectedChapter}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => toggleFavorite(`${selectedBook}:${selectedChapter}:ALL`)}
                className="p-2.5 rounded-lg glass-3d text-brand-muted hover:text-red-500 transition-colors"
                title="Bookmark Chapter"
              >
                <Heart size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-10">
            {SAMPLE_VERSES.map((v) => {
              const vId = `${v.book}:${v.chapter}:${v.verse}`;
              const isFav = favorites.includes(vId);
              return (
                <div key={v.verse} className="group relative">
                  <div className="flex items-start gap-6">
                    <div className="flex flex-col items-center gap-2 mt-1">
                      <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-1 rounded uppercase tracking-tighter">
                        V{v.verse}
                      </span>
                    </div>
                    <div className="space-y-4 flex-1">
                      <p className="bible-text text-2xl leading-relaxed text-brand-dark dark:text-gray-100">
                        {v.telugu}
                      </p>
                      <p className="text-brand-muted italic font-medium text-sm leading-relaxed border-l-2 border-border-subtle pl-4 ml-1">
                        {v.english}
                      </p>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(vId)}
                      className={cn(
                        "p-2 rounded-full transition-all group-hover:opacity-100",
                        isFav ? "opacity-100 text-red-500" : "opacity-0 text-brand-muted hover:text-red-400"
                      )}
                    >
                      <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
