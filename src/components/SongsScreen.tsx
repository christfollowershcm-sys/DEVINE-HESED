/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Play, Heart, ChevronRight, Music } from 'lucide-react';
import { Song } from '../types';

const SAMPLE_SONGS: Song[] = [
  {
    id: '3',
    number: 3,
    title: 'Harshimpa Cheyumaya (హర్షింప చేయుమయా)',
    lyrics: `పల్లవి :
విరిగి నలిగిన హృదయము నీకు ఇష్టమయా
గుండె చెదరిన వారిని బాగు చేయుమయ
గాయ పడిన వారిని స్వస్థపరచుమయా
నీవే మాకు దిక్కయ హర్షింప చేయుమయా

అను పల్లవి :
మహాఘనుడా ఉన్నతుడా పరిశుద్ధుడా
అక్షయుడా శాశ్వతుడా శ్రీమంతుడా
ఇహమందు పరమందు ఏకైకదేవుడా
యుగములకు తరములకు స్తోత్రార్హూడా

చరణం 1:
పాపదోషము పోవునట్లు శుద్ధిచేయుమయా
హిమము కంటెను తెల్లగా నన్ను కడుగుమయా
మాపాపమెన్నడు జ్ఞాపకం చేసుకోవయా
నీవలే క్షమియించే వారు ఎవ్వరయా
 
అను పల్లవి :
ప్రేమికుడా స్నేహితుడా నా ప్రియుడా
రక్షకూడా సజీవుడా విమోచకుడా
ఇహమందు పరమందు ఏకైకదేవుడా
యుగములకు తరములకు స్తోత్రార్హూడా 

చరణం 2:
క్రిందపడిన వారిని ఉద్ధరించుమయా
కృంగియున్న వారిని లేవనెత్తుమయా
లేనివి ఉన్నట్టుగా పిలుచు వాడవయా
మృతులను సజీవులనుగా చేయువాడవయా

అను పల్లవి :
రారాజు మారాజు నీవేనయ్య
ఆల్ఫా ఒమేగయు నీవేనయ్య
ఇహమందు పరమందు ఏకైకదేవుడా
యుగములకు తరములకు స్తోత్రార్హూడా 

చరణం 3:
నీవే మాకు తోడుగా ఉన్నావయ్య 
మాకు ఏమి కొదువగా లేనే లేదయ్యా
నిత్యము నీవేమమ్మును నడిపించెదవయ్య
నీతిమంతుల నెన్నటికిని కదలనీయవయా 

అను పల్లవి :
నాతండ్రి పోషకుడా సంరక్షకుడా
కృపామయా దయామయా కరుణాత్ముడా
ఇహమందు పరమందు ఏకైకదేవుడా
యుగములకు తరములకు స్తోత్రార్హూడా 

చరణం 4:
నీవే మమ్మును విడువకుండా ప్రేమించావు
శాపములను దీవెనలుగా మాకు మార్చావు
మాపక్షముండి నీవేమా కార్యము చెసెదవు
కదలక త్రొట్టిల్లక మమ్ము కాచెదవు

అను పల్లవి :
సృష్టికర్తా పాలకుడా యేసు దేవుడా
జీవనధాతా బలవంతుడా తేజోమయుడా 
ఇహమందు పరమందు ఏకైకదేవుడా
యుగములకు తరములకు స్తోత్రార్హూడా

చరణం 5:
అవమానమునకు రెట్టింపుఘనతను మాకు ఇచ్చెదవు
సంతోషమును నిందలకు ప్రతిగా మాకు ఇచ్చెదవు
దేశములో రెట్టింపు స్వాస్థ్యము మాకు ఇచ్చెదవు
నిత్యమైనా ఆనందం మాకు ఇచ్చెదవు

అను పల్లవి :
ఉన్నవాడా అనువాడా సర్వాధికారివి
జయశీలి సాత్వీకుడా-ప్రధానకాపరి
ఇహమందు పరమందు ఏకైకదేవుడా
యుగములకు తరములకు స్తోత్రార్హూడా

అను పల్లవి :
ఆదరించిన దైవమా ప్రేమచూపిన నేస్తమా
మరువలేని బంధమా విడిపోని దైవమా (2)
ఆరాధనా ఆరాధనా నా జీవితం నీకే (4)`,
    youtubeId: 'apNp2jkKPFE'
  },
  {
    id: '4',
    number: 4,
    title: 'Hosanna (హోసన్నా హోసన్నా)',
    lyrics: `పల్లవి:
హోసన్నా – హోసన్నా – హోసన్నా – హోసన్నా
హోసన్నా – హోసన్నా – హోసన్నా – హోసన్నా

చరణం 1:
నీవనిన మాటలే – మధురమయిన మాటలు
నీవిచ్చిన వాగ్దానములే – అమూల్యమైన వాగ్దానములు
యేసయ్యా.. నీకే స్తుతి – యేసయ్యా.. నీకే స్తుతి
|| హోసన్నా ||

చరణం 2:
నీవే నా ప్రాణము – నా జీవాధారము
నీవే నా సర్వము – నా ప్రాణ నాథుడా
యేసయ్యా.. నీకే స్తుతి – యేసయ్యా.. నీకే స్తుతి
|| హోసన్నా ||`,
    youtubeId: 'Fj-y5R700tY'
  },
  {
    id: '5',
    number: 5,
    title: 'Nee Premalo (నీ ప్రేమలో)',
    lyrics: `పల్లవి:
నీ ప్రేమలో నే పరవశించి
నీ సన్నిధిలో నే హర్షించెదను
నీ కృపలో నే నిలకడగా నుండి
నీ సాక్షిగా నే జీవించెదను

చరణం 1:
ఎన్నడి చూడాను ఇటువంటి ప్రేమను
నీ సిలువ ప్రేమ నా హృదయమును మార్చెను
నీ రక్తధారలే నా పాపములను కడిగెను
నీ సాక్షిగా నే నిలచెద లోకంలో`,
    youtubeId: 'Xz7_jY8uI6Y'
  },
  {
    id: '6',
    number: 6,
    title: 'Enni Thallulu Unna (ఎన్ని తల్లులు ఉన్నా)',
    lyrics: `పల్లవి: 
ఎన్ని తల్లులు ఉన్నా ఈ ప్రేమ దొరకదు 
ఎన్ని జన్మలెత్తినా నీ సాటి ఎవ్వరూ లేరు
యేసయ్యా.. నీ కృపలోనే నేను ఉన్నాను 

చరణం 1:
లోకమంతా నన్ను విడనాడినా 
నీవు నన్ను విడువలేదు నా తండ్రి
కమ్మనైన నీ ప్రేమతో నన్ను ఆదరించావు 
యేసయ్యా.. నీకే స్తుతి`,
    youtubeId: '_5m682s8w5E'
  }
];

interface SongsScreenProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export default function SongsScreen({ favorites, toggleFavorite }: SongsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const filteredSongs = SAMPLE_SONGS.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.lyrics.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedSong) {
    const isFav = favorites.includes(selectedSong.id);
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <button onClick={() => setSelectedSong(null)} className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.2em] mb-4 hover:translate-x-[-4px] transition-transform">
          <ChevronRight className="rotate-180" size={16} strokeWidth={3} /> Back to Hymnal
        </button>

        <div className="rounded-2xl overflow-hidden aspect-video bg-black shadow-2xl border border-border-subtle">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${selectedSong.youtubeId}`}
            title={selectedSong.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex justify-between items-center glass-card p-6">
          <div>
            <h2 className="text-2xl font-serif text-brand-dark dark:text-gray-100">{selectedSong.title}</h2>
            <p className="text-[10px] font-black text-brand-muted uppercase tracking-widest mt-1">Hymn Number {selectedSong.number}</p>
          </div>
          <button 
            onClick={() => toggleFavorite(selectedSong.id)}
            className={`p-4 rounded-xl transition-all shadow-lg ${
              isFav ? 'bg-primary text-white' : 'glass-3d text-primary'
            }`}
          >
            <Heart size={20} fill={isFav ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="glass-card p-8 shadow-sm">
          <p className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] mb-6 border-b border-border-subtle pb-2 w-fit">Lyrics Manuscript</p>
          <pre className="whitespace-pre-wrap font-sans text-xl leading-relaxed bible-text italic text-brand-dark text-center">
            {selectedSong.lyrics}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-primary transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search hymnal by title or lyrics..." 
          className="w-full pl-12 pr-4 py-4 glass-card rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 shadow-sm text-sm font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredSongs.map((song) => (
          <button
            key={song.id}
            onClick={() => setSelectedSong(song)}
            className="flex items-center gap-5 p-5 glass-card hover:border-primary/40 hover:shadow-md text-left transition-all group"
          >
            <div className="w-14 h-14 bg-bg-nav/50 dark:bg-gray-700 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform border border-border-subtle shadow-sm">
              <Music size={22} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-brand-dark dark:text-gray-100 text-lg leading-tight">{song.title}</h4>
              <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mt-1">Hymn {song.number}</p>
            </div>
            <div className="p-2 glass-3d rounded-lg text-brand-muted group-hover:text-primary group-hover:border-primary transition-colors">
              <ChevronRight size={18} />
            </div>
          </button>
        ))}
      </div>

      {filteredSongs.length === 0 && (
        <div className="text-center py-12 px-6">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music className="text-gray-300" size={32} />
          </div>
          <h3 className="text-lg font-bold">No songs found</h3>
          <p className="text-gray-500 text-sm">Try searching with a different title or keyword.</p>
        </div>
      )}
    </div>
  );
}
