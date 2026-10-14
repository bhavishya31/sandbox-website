"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  MapPin, 
  Heart, 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Navigation, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  PhoneCall,
  CalendarPlus,
  Shirt,
  QrCode,
  Flame,
  Music,
  PartyPopper
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MEHENDI_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const HALDI_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

/* CELEBRATORY FLOATING PETALS / CONFETTI */
const PETAL_PRESETS = [
  { left: "5%", size: 14, duration: 11, delay: 0, color: "#f43f5e" },
  { left: "15%", size: 18, duration: 14, delay: 2, color: "#f59e0b" },
  { left: "28%", size: 12, duration: 10, delay: 4, color: "#fb7185" },
  { left: "42%", size: 16, duration: 13, delay: 1, color: "#fcd34d" },
  { left: "58%", size: 13, duration: 12, delay: 3, color: "#f43f5e" },
  { left: "72%", size: 17, duration: 15, delay: 2.5, color: "#fbbf24" },
  { left: "85%", size: 14, duration: 11, delay: 0.8, color: "#f43f5e" },
  { left: "93%", size: 12, duration: 13, delay: 5, color: "#f59e0b" },
];

const FloatingPetals = () => (
  <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
    {PETAL_PRESETS.map((p, idx) => (
      <motion.div
        key={idx}
        className="absolute top-[-20px] rounded-full opacity-65"
        style={{
          left: p.left,
          width: p.size,
          height: p.size * 1.35,
          backgroundColor: p.color,
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.06))",
        }}
        animate={{
          y: ["0vh", "105vh"],
          x: [0, (idx % 2 === 0 ? 28 : -28), 0],
          rotate: [0, 180, 360],
          opacity: [0, 0.75, 0.75, 0],
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          delay: p.delay,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

/* AUSPICIOUS LORD GANESHA LOGO */
const LordGaneshaLogo = ({ className = "w-14 h-14" }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" stroke="#D97706" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
    <circle cx="40" cy="40" r="35" stroke="#F59E0B" strokeWidth="0.8" opacity="0.4" />
    {/* Auspicious Mukut / Crown */}
    <path d="M34 18 L40 8 L46 18 L43 23 L37 23 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
    <circle cx="40" cy="14" r="2" fill="#DC2626" />
    {/* Divine Mastak & Tilak */}
    <path d="M28 24 C33 21 47 21 52 24 C55 31 52 35 48 37 C45 35 35 35 32 37 C28 35 25 31 28 24 Z" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.2" />
    <path d="M40 21 L40 31" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
    <path d="M36 24 Q40 28 44 24" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="40" cy="30" r="1.5" fill="#F59E0B" />
    {/* Ears */}
    <path d="M28 25 C20 23 15 32 20 40 C24 43 27 40 28 36" fill="#FDE68A" stroke="#B45309" strokeWidth="1.2" />
    <path d="M52 25 C60 23 65 32 60 40 C56 43 53 40 52 36" fill="#FDE68A" stroke="#B45309" strokeWidth="1.2" />
    {/* Trunk / Vakra-tunda */}
    <path d="M37 36 C37 44 38 52 44 54 C48 55 51 52 50 49 C49 46 45 47 44 49" stroke="#B45309" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Single Tusk */}
    <path d="M34 38 L30 40 L34 41 Z" fill="#FFFFFF" stroke="#B45309" strokeWidth="0.8" />
    {/* Modak */}
    <ellipse cx="52" cy="48" rx="4" ry="4" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
  </svg>
);

/* ROYAL BRIDE & GROOM EMBLEM LOGO */
const BrideGroomLogo = ({ className = "w-24 h-24" }) => (
  <motion.div 
    className={`relative inline-block ${className}`}
    animate={{ y: [0, -3, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="40" r="38" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 3" />
      {/* Groom (Left): Safa / Turban & Sherwani */}
      <motion.g 
        transform="translate(17, 14)"
        animate={{ rotate: [0, 1.2, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M12 18 C12 10 18 6 24 6 C30 6 34 11 32 18 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
        <path d="M14 14 C18 10 26 10 31 15" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
        <path d="M22 6 L22 1 L24 4 Z" fill="#F59E0B" />
        <circle cx="22" cy="6" r="1.5" fill="#FEF08A" />
        <path d="M12 16 C8 20 8 28 10 32" stroke="#DC2626" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx="23" cy="22" r="5" fill="#FDE68A" />
        <path d="M14 38 C14 29 18 28 23 28 C28 28 32 29 32 38 Z" fill="#78350F" stroke="#92400E" strokeWidth="1" />
        <path d="M23 28 L23 38" stroke="#F59E0B" strokeWidth="1" />
        <path d="M18 31 Q23 37 28 31" stroke="#FEF3C7" strokeWidth="1.5" strokeDasharray="1.5 1.5" fill="none" />
      </motion.g>
      {/* Bride (Right): Chunri, Maang Tikka & Lehanga */}
      <motion.g 
        transform="translate(47, 14)"
        animate={{ rotate: [0, -1.2, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M10 38 C9 24 14 8 26 8 C38 8 43 24 42 38 Z" fill="#B91C1C" stroke="#991B1B" strokeWidth="1" />
        <path d="M14 38 C14 20 18 12 26 12 C34 12 38 20 38 38" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
        <circle cx="26" cy="22" r="5" fill="#FDE68A" />
        <path d="M26 14 L26 19" stroke="#F59E0B" strokeWidth="1" />
        <circle cx="26" cy="19" r="1" fill="#DC2626" />
        <path d="M18 38 C18 30 22 28 26 28 C30 28 34 30 34 38 Z" fill="#991B1B" />
        <path d="M21 30 Q26 35 31 30" stroke="#FBBF24" strokeWidth="1.5" fill="none" />
      </motion.g>
      {/* Auspicious Garland / Varmala with Glow Animation */}
      <motion.path 
        d="M37 46 Q50 56 63 46" 
        stroke="#10B981" 
        strokeWidth="2.5" 
        fill="none" 
        strokeLinecap="round" 
        animate={{ strokeWidth: [2.5, 3.2, 2.5] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      <circle cx="43" cy="49" r="2" fill="#EF4444" />
      <circle cx="50" cy="51" r="2.5" fill="#F59E0B" />
      <circle cx="57" cy="49" r="2" fill="#EF4444" />
    </svg>
  </motion.div>
);

/* FESTIVE BAND BAAJA STICKER EMBLEM (ANIMATED WITH BEAT BOUNCE & INTERACTIVE TAP) */
const BandBaajaSticker = ({ className = "w-16 h-16", showLabel = false, onBeatClick }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.15, rotate: 6 }}
      whileTap={{ scale: 0.92, rotate: -6 }}
      onClick={onBeatClick}
      className={`relative inline-flex flex-col items-center select-none cursor-pointer group ${className}`}
      title="Tap for festive wedding dhol beat!"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 0.98, 1.04, 1],
          rotate: [0, -2, 2, -1, 0]
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-full h-full"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Decorative Golden Sunburst / Rosette Backdrop */}
          <circle cx="50" cy="50" r="45" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="40" fill="#FEF3C7" opacity="0.65" />
          <circle cx="50" cy="50" r="36" stroke="#DC2626" strokeWidth="1" opacity="0.35" />
          
          {/* Shehnai (Angled Woodwind) */}
          <g transform="rotate(-30 50 50)">
            <path d="M50 16 L48 66 L42 76 L58 76 L52 66 L50 16 Z" fill="#D97706" stroke="#92400E" strokeWidth="1" />
            <ellipse cx="50" cy="76" rx="8" ry="3" fill="#DC2626" />
            <circle cx="50" cy="30" r="1.5" fill="#FEF3C7" />
            <circle cx="50" cy="40" r="1.5" fill="#FEF3C7" />
            <circle cx="50" cy="50" r="1.5" fill="#FEF3C7" />
            <circle cx="50" cy="60" r="1.5" fill="#FEF3C7" />
          </g>
          
          {/* Royal Trumpet / Brass Tutari Horn */}
          <g transform="rotate(25 50 50)">
            <path d="M30 75 Q28 40 50 25 Q68 12 75 20 Q70 30 55 35 Q40 40 42 75 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.2" />
            <ellipse cx="74" cy="18" rx="6" ry="4" transform="rotate(-30 74 18)" fill="#DC2626" stroke="#991B1B" strokeWidth="0.8" />
          </g>
          
          {/* Festive Dholak / Drum in Center */}
          <g transform="translate(0, 4)">
            <ellipse cx="50" cy="52" rx="18" ry="12" fill="#831828" stroke="#F59E0B" strokeWidth="1.5" />
            <ellipse cx="32" cy="52" rx="4" ry="10" fill="#FEF3C7" stroke="#78350F" strokeWidth="1.2" />
            <ellipse cx="68" cy="52" rx="4" ry="10" fill="#FEF3C7" stroke="#78350F" strokeWidth="1.2" />
            <path d="M36 44 L64 58 M36 60 L64 46" stroke="#FEF08A" strokeWidth="1" />
            <circle cx="50" cy="52" r="3" fill="#F59E0B" />
          </g>
          
          {/* Auspicious Musical Notes & Sparkles */}
          <path d="M22 28 Q24 22 29 24 L29 34 M25 34 A2 2 0 1 1 23 32" stroke="#DC2626" strokeWidth="1.5" fill="#DC2626" />
          <path d="M72 68 Q74 62 79 64 L79 74 M75 74 A2 2 0 1 1 73 72" stroke="#D97706" strokeWidth="1.5" fill="#D97706" />
          <circle cx="78" cy="38" r="1.8" fill="#DC2626" />
          <circle cx="20" cy="56" r="1.8" fill="#F59E0B" />
          <circle cx="48" cy="12" r="2" fill="#E11D48" />
        </svg>
      </motion.div>
      {showLabel && (
        <span className="mt-1 bg-gradient-to-r from-[#831828] to-[#991B1B] text-amber-200 text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-amber-300 shadow-sm whitespace-nowrap group-hover:scale-105 transition-transform">
          🎺 Band Baaja 🥁
        </span>
      )}
    </motion.div>
  );
};

/* ROYAL RAJASTHANI MOTIF ARTWORK (Elephant, Camel, Horse) */
const RoyalElephant = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 80" className={className} fill="currentColor">
    <path d="M78 48 C78 38 72 30 60 28 C56 22 47 18 36 18 C24 18 16 26 14 36 C10 37 6 42 6 47 C6 53 10 57 15 57 C15 67 19 72 23 72 C27 72 28 66 28 58 C32 58 36 58 40 58 C40 66 42 72 46 72 C50 72 52 66 52 58 C56 58 60 58 64 57 C64 66 66 72 70 72 C74 72 76 66 76 56 C82 56 86 52 86 46 C86 38 80 32 76 32 C74 32 74 36 76 40 C77 42 76 46 73 47 C70 48 68 45 68 41 C68 34 71 27 65 24 C59 21 54 24 51 28 C55 31 58 36 58 42 C58 50 51 56 43 56 C37 56 32 52 32 46 C32 38 38 31 46 29 C44 26 40 25 36 25 C28 25 22 30 20 37 C24 37 27 40 27 44 C27 48 24 51 20 51 C19 51 18 50 17 49 C17 56 20 63 24 64 L24 55 C24 53 26 51 28 51 C30 51 32 53 32 55 L32 64 C36 64 40 64 44 64 L44 55 C44 53 46 51 48 51 C50 51 52 53 52 55 L52 64 C56 64 60 63 63 61 L63 54 C63 52 65 50 67 50 C69 50 71 52 71 54 L71 60 C74 58 76 54 77 50 Z" />
    {/* Decorative Royal Howdah & Ambari */}
    <path d="M34 16 L44 16 L42 8 L36 8 Z" fill="#D97706" />
    <circle cx="39" cy="6" r="2.5" fill="#DC2626" />
    <path d="M28 26 C28 26 36 34 46 26 L48 38 C38 43 32 37 28 38 Z" fill="#F59E0B" opacity="0.9" />
  </svg>
);

const RoyalCamel = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 90" className={className} fill="currentColor">
    <path d="M82 14 C78 12 73 14 70 18 L64 28 C61 34 57 37 52 35 C48 33 46 27 43 27 C39 27 36 32 33 36 C30 40 24 43 18 43 C12 43 7 48 7 54 C7 60 11 65 17 65 C19 72 21 82 24 82 C27 82 28 75 29 67 C34 67 40 67 45 67 C46 74 48 82 51 82 C54 82 55 74 56 66 C61 65 67 63 71 59 C74 65 76 77 79 77 C82 77 83 70 83 61 C85 57 87 52 87 47 C87 38 83 33 80 30 L84 20 C86 16 85 14 82 14 Z" />
    {/* Royal Saddle Harness */}
    <path d="M36 38 C39 34 47 34 50 38 L48 48 C43 45 39 46 36 48 Z" fill="#DC2626" />
    <circle cx="76" cy="18" r="2" fill="#FEF08A" />
  </svg>
);

const RoyalHorse = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 90" className={className} fill="currentColor">
    <path d="M78 12 C74 12 70 15 67 20 L58 35 C52 37 46 35 41 33 C33 30 25 35 20 42 C16 48 14 55 12 63 C10 70 6 75 6 78 C9 78 14 74 17 68 C19 75 22 84 26 84 C29 84 31 77 32 68 C38 68 44 68 50 67 C51 74 53 84 57 84 C60 84 62 76 63 67 C68 66 73 63 77 58 C79 66 82 78 86 78 C89 78 90 70 89 60 C92 53 93 45 92 37 C91 29 85 22 82 18 L84 14 C85 12 82 12 78 12 Z" />
    {/* Royal Plume / Kalgi */}
    <path d="M76 8 C78 4 82 4 82 7 C82 10 78 11 76 8 Z" fill="#DC2626" />
    <path d="M48 38 C54 44 64 42 67 37 L69 47 C63 50 54 50 47 45 Z" fill="#F59E0B" />
  </svg>
);

/* ROYAL RAJASTHANI PEACOCK FEATHER MOTIF (MOR PANKH) */
const MorPankhMotif = ({ className = "w-10 h-14" }) => (
  <motion.div
    className={`inline-block select-none ${className}`}
    animate={{ rotate: [-3, 3, -3] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg viewBox="0 0 60 90" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Quill Stem */}
      <path d="M 30 85 Q 31 50 30 10" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
      {/* Outer Feather Vanes (Emerald Green) */}
      <path d="M 30 45 C 10 40 8 18 30 10 C 52 18 50 40 30 45 Z" fill="#047857" opacity="0.85" />
      {/* Middle Turquoise Ring */}
      <ellipse cx="30" cy="26" rx="14" ry="12" fill="#0284C7" />
      {/* Inner Sapphire Blue Eye */}
      <ellipse cx="30" cy="27" rx="9" ry="8" fill="#1E3A8A" />
      {/* Golden Core Glow */}
      <ellipse cx="30" cy="28" rx="4.5" ry="4" fill="#F59E0B" />
      {/* Delicate radiating barb lines */}
      <path d="M 18 38 L 10 44 M 42 38 L 50 44 M 16 28 L 6 30 M 44 28 L 54 30 M 20 18 L 12 16 M 40 18 L 48 16" stroke="#10B981" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    </svg>
  </motion.div>
);

/* SHAHI SAWARI / ROYAL CARAVAN ANIMATED PROCESSION DIVIDER */
const RoyalCaravanDivider = () => (
  <div className="w-full overflow-hidden py-3 bg-gradient-to-r from-amber-100/35 via-amber-200/50 to-amber-100/35 border-y border-amber-300/40 relative">
    <motion.div 
      className="flex whitespace-nowrap items-center gap-12 text-amber-800/65 select-none"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      style={{ width: "fit-content" }}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center gap-12 shrink-0" aria-hidden={copy === 1}>
          <div className="flex items-center gap-2.5">
            <RoyalElephant className="w-9 h-9" />
            <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-amber-900/70">शाही सवारी</span>
          </div>
          <RoyalCamel className="w-8 h-8" />
          <RoyalHorse className="w-8 h-8" />
          <MorPankhMotif className="w-6 h-9" />
          <RoyalElephant className="w-9 h-9" />
          <RoyalCamel className="w-8 h-8" />
          <div className="flex items-center gap-2.5">
            <RoyalHorse className="w-8 h-8" />
            <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-amber-900/70">पधारो म्हारे देस</span>
          </div>
          <MorPankhMotif className="w-6 h-9" />
        </div>
      ))}
    </motion.div>
  </div>
);

/* ORNAMENTAL CORNER BORDER COMPONENT */
const RoyalCorner = ({ position = "top-left" }) => {
  const styles = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2 rotate-90",
    "bottom-left": "bottom-2 left-2 -rotate-90",
    "bottom-right": "bottom-2 right-2 rotate-180"
  };
  return (
    <div className={`absolute ${styles[position]} pointer-events-none w-7 h-7 text-amber-500/50`}>
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 38 L2 14 C2 7.37 7.37 2 14 2 L38 2" />
        <path d="M8 38 L8 16 C8 11.58 11.58 8 16 8 L38 8" strokeDasharray="2 3" />
        <circle cx="16" cy="16" r="3" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </div>
  );
};

/* CEREMONY LOGO ICONS */
const GaneshPujaIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
    <path d="M32 8 C32 8 26 17 26 22 C26 25.3 28.7 28 32 28 C35.3 28 38 25.3 38 22 C38 17 32 8 32 8Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
    <path d="M32 14 C32 14 29 19 29 22 C29 23.7 30.3 25 32 25 C33.7 25 35 23.7 35 22 C35 19 32 14 32 14Z" fill="#FDE68A" />
    <ellipse cx="32" cy="33" rx="10" ry="2" stroke="#B45309" strokeWidth="1.5" fill="#FDE68A" />
    <path d="M22 33 Q14 43 20 52 C23 56 41 56 44 52 Q50 43 42 33 Z" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.8" />
    <circle cx="32" cy="42" r="2.5" fill="#DC2626" />
    <path d="M25 54 L39 54" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 32 C21 27 16 27 15 29 C17 33 22 33 24 32 Z" fill="#10B981" />
    <path d="M40 32 C43 27 48 27 49 29 C47 33 42 33 40 32 Z" fill="#10B981" />
  </svg>
);

const MehendiIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
    <circle cx="32" cy="32" r="26" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" />
    <circle cx="32" cy="32" r="20" stroke="#10B981" strokeWidth="1.2" />
    <circle cx="32" cy="32" r="6" fill="#047857" />
    {MEHENDI_ANGLES.map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 32 32)`}>
        <path d="M32 14 C29 18 29 23 32 26 C35 23 35 18 32 14 Z" fill="#A7F3D0" stroke="#059669" strokeWidth="1.2" />
        <circle cx="32" cy="10" r="1.5" fill="#047857" />
      </g>
    ))}
  </svg>
);

const HaldiIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
    {HALDI_ANGLES.map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 32 26)`}>
        <path d="M32 8 Q34 14 32 18 Q30 14 32 8 Z" fill="#F59E0B" />
      </g>
    ))}
    <circle cx="32" cy="26" r="9" fill="#FCD34D" stroke="#D97706" strokeWidth="1.5" />
    <path d="M12 40 C12 40 16 54 32 54 C48 54 52 40 52 40 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
    <ellipse cx="32" cy="40" rx="20" ry="4" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
    <circle cx="26" cy="40" r="2.5" fill="#EF4444" />
    <circle cx="32" cy="41" r="3" fill="#FBBF24" />
    <circle cx="38" cy="40" r="2.5" fill="#EF4444" />
    <path d="M24 54 L40 54" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SangeetIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
    <circle cx="27" cy="20" r="9" stroke="#EC4899" strokeWidth="2" />
    <circle cx="37" cy="20" r="9" stroke="#8B5CF6" strokeWidth="2" />
    <path d="M37 11 L35 8 L39 8 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
    <path d="M18 39 C18 35 21 33 22 33 L42 33 C43 33 46 35 46 39 L46 49 C46 54 43 56 42 56 L22 56 C21 56 18 54 18 49 Z" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.5" />
    <ellipse cx="20" cy="44" rx="2" ry="6" fill="#BE185D" />
    <ellipse cx="44" cy="44" rx="2" ry="6" fill="#BE185D" />
    <path d="M20 38 L44 50 M20 50 L44 38 M20 44 L44 44" stroke="#9D174D" strokeWidth="1" />
  </svg>
);

/* CHAAK CEREMONY ICON (Traditional Decorated Terracotta Kalash & Matka) */
const ChaakIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
    <ellipse cx="32" cy="52" rx="12" ry="3" fill="#7C2D12" opacity="0.25" />
    <path d="M24 51 L40 51" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
    {/* Terracotta Earthen Clay Body */}
    <path d="M22 28 C16 33 16 46 24 50 C28 52 36 52 40 50 C48 46 48 33 42 28 Z" fill="#C2410C" stroke="#7C2D12" strokeWidth="1.6" />
    {/* Pot Neck & Golden Rim */}
    <path d="M25 28 C25 25 27 23 32 23 C37 23 39 25 39 28 Z" fill="#EA580C" stroke="#9A3412" strokeWidth="1.2" />
    <ellipse cx="32" cy="23" rx="8" ry="2.5" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
    {/* Auspicious Coconut (Nariyal) */}
    <path d="M32 12 C28 16 28 22 32 23 C36 22 36 16 32 12 Z" fill="#78350F" stroke="#451A03" strokeWidth="1.2" />
    {/* Mango Leaves (Aam Patte) */}
    <path d="M26 23 C20 20 20 16 22 13 C25 16 27 19 28 22 Z" fill="#059669" stroke="#047857" strokeWidth="1" />
    <path d="M38 23 C44 20 44 16 42 13 C39 16 37 19 36 22 Z" fill="#059669" stroke="#047857" strokeWidth="1" />
    {/* Festive Kumkum & Gold Bands */}
    <path d="M19 36 Q32 41 45 36" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
    <path d="M21 42 Q32 47 43 42" stroke="#FEF3C7" strokeWidth="1.5" strokeDasharray="2 2" />
    {/* Auspicious Tilak Accents */}
    <circle cx="32" cy="35" r="2.8" fill="#DC2626" />
    <circle cx="26" cy="35" r="1.6" fill="#FDE047" />
    <circle cx="38" cy="35" r="1.6" fill="#FDE047" />
    <circle cx="32" cy="44" r="2.2" fill="#FEF08A" />
  </svg>
);

/* CARNIVAL DANCE CELEBRATION ICON */
const CarnivalIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
    <circle cx="32" cy="32" r="24" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M18 46 L46 18" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
    <path d="M46 46 L18 18" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <circle cx="18" cy="18" r="3" fill="#F59E0B" />
    <circle cx="46" cy="18" r="3" fill="#DC2626" />
    <circle cx="18" cy="46" r="3" fill="#DC2626" />
    <circle cx="46" cy="46" r="3" fill="#F59E0B" />
    <circle cx="32" cy="32" r="5" fill="#EF4444" stroke="#FEF3C7" strokeWidth="1.5" />
    <circle cx="32" cy="14" r="2" fill="#F59E0B" />
    <circle cx="32" cy="50" r="2" fill="#F59E0B" />
    <circle cx="14" cy="32" r="2" fill="#DC2626" />
    <circle cx="50" cy="32" r="2" fill="#DC2626" />
  </svg>
);

/* BARAAT & DHOL PROCESSION ICON (ANIMATED PERSON DANCING ON DHOLAK) */
const BaraatIcon = ({ onBeatClick }) => (
  <div className="w-16 h-16 flex items-center justify-center">
    <DancerOnDholak className="w-14 h-16" onBeatClick={onBeatClick} />
  </div>
);

const WeddingMuhurthamIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
    <path d="M14 24 C22 16 42 16 50 24 L52 28 L12 28 Z" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
    <circle cx="32" cy="14" r="2.5" fill="#F59E0B" />
    <rect x="16" y="28" width="3" height="24" rx="1.5" fill="#DC2626" />
    <rect x="45" y="28" width="3" height="24" rx="1.5" fill="#DC2626" />
    <path d="M19 32 Q32 39 45 32" stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="2 3" />
    <path d="M24 48 L40 48 L37 54 L27 54 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
    <path d="M32 37 C32 37 28 42 28 45 C28 47.2 29.8 48 32 48 C34.2 48 36 47.2 36 45 C36 42 32 37 32 37 Z" fill="#EF4444" />
    <path d="M32 40 C32 40 30 43 30 44 C30 45.1 30.9 46 32 46 C33.1 46 34 45.1 34 44 C34 43 32 40 32 40 Z" fill="#FBBF24" />
  </svg>
);

/* PERSON DANCING ON DHOLAK (FOLK BARAAT & SANGEET ANIMATION) */
const DancerOnDholak = ({ className = "w-28 h-32", onBeatClick }) => (
  <motion.div
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.94 }}
    onClick={onBeatClick}
    className={`relative inline-flex items-center justify-center select-none cursor-pointer group ${className}`}
    title="Tap to watch the Baraati dance on Dholak beats!"
  >
    <svg viewBox="0 0 140 160" className="w-full h-full drop-shadow-md overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sound Beat Waves Radiating From Drum Sides */}
      <motion.g
        animate={{
          opacity: [0.35, 1, 0.35],
          scale: [0.92, 1.14, 0.92]
        }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "70px 123px" }}
      >
        {/* Left Waves */}
        <path d="M 20 108 A 18 18 0 0 0 20 138" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <path d="M 12 102 A 26 26 0 0 0 12 144" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
        {/* Right Waves */}
        <path d="M 120 108 A 18 18 0 0 1 120 138" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <path d="M 128 102 A 26 26 0 0 1 128 144" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
      </motion.g>

      {/* Floating Musical Notes & Sparkles */}
      <motion.g
        animate={{
          y: [0, -7, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Musical Note 1 */}
        <path d="M 22 42 Q 27 36 33 39 L 33 50 M 27 50 A 3 3 0 1 1 24 47" stroke="#DC2626" strokeWidth="1.6" fill="#DC2626" />
        {/* Musical Note 2 */}
        <path d="M 114 48 Q 119 42 125 45 L 125 56 M 119 56 A 3 3 0 1 1 116 53" stroke="#F59E0B" strokeWidth="1.6" fill="#F59E0B" />
        <circle cx="26" cy="72" r="1.8" fill="#F59E0B" />
        <circle cx="114" cy="74" r="1.8" fill="#DC2626" />
      </motion.g>

      {/* CEREMONIAL DHOLAK (Pulsing underneath the dancer) */}
      <motion.g
        animate={{
          scaleY: [1, 0.94, 1.04, 0.96, 1],
          scaleX: [1, 1.03, 0.98, 1.02, 1]
        }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "70px 123px" }}
      >
        {/* Shadow */}
        <ellipse cx="70" cy="148" rx="42" ry="7" fill="#000000" opacity="0.12" />

        {/* Barrel Body */}
        <path d="M 28 106 Q 70 96 112 106 L 112 140 Q 70 150 28 140 Z" fill="#831828" stroke="#58111A" strokeWidth="1.5" />

        {/* Left Drumhead Rim & Center Shahi Patch */}
        <ellipse cx="28" cy="123" rx="7" ry="17" fill="#FEF3C7" stroke="#92400E" strokeWidth="1.5" />
        <ellipse cx="28" cy="123" rx="3.5" ry="9" fill="#78350F" />

        {/* Right Drumhead Rim & Center Shahi Patch */}
        <ellipse cx="112" cy="123" rx="7" ry="17" fill="#FEF3C7" stroke="#92400E" strokeWidth="1.5" />
        <ellipse cx="112" cy="123" rx="3.5" ry="9" fill="#78350F" />

        {/* Diagonal Tension Ropes / W-laces */}
        <path d="M 32 107 L 52 143 L 72 101 L 92 143 L 110 107 M 32 139 L 52 101 L 72 143 L 92 101 L 110 139" stroke="#FEF08A" strokeWidth="1.4" strokeLinecap="round" />

        {/* Center Golden Ring Band & Brooch */}
        <ellipse cx="70" cy="123" rx="3.5" ry="22" fill="none" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="70" cy="123" r="3" fill="#DC2626" stroke="#FEF08A" strokeWidth="0.8" />
      </motion.g>

      {/* PERSON DANCING ON TOP OF THE DHOLAK */}
      <motion.g
        animate={{
          y: [0, -11, 2, -7, 0],
          rotate: [-4, 4, -2, 4, -4]
        }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "70px 105px" }}
      >
        {/* Dancer Legs & Dancing Steps */}
        {/* Left Leg: Planted rhythmically on dholak top */}
        <path d="M 64 78 L 58 90 L 55 104" stroke="#D97706" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="55" cy="103" r="3" fill="#78350F" />
        {/* Ghungroo anklet bells */}
        <circle cx="55" cy="99" r="1.5" fill="#FBBF24" />
        <circle cx="58" cy="99" r="1.5" fill="#FBBF24" />

        {/* Right Leg: Joyously raised in a high-step dance kick */}
        <path d="M 76 78 L 90 76 L 93 92" stroke="#D97706" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="93" cy="92" r="3" fill="#78350F" />
        {/* Ghungroo anklet bells */}
        <circle cx="93" cy="88" r="1.5" fill="#FBBF24" />
        <circle cx="90" cy="88" r="1.5" fill="#FBBF24" />

        {/* Royal Saffron & Gold Dhoti / Churidar Fabric */}
        <path d="M 60 72 C 55 84 54 94 58 97 C 62 100 68 85 70 78 C 72 85 78 100 84 92 C 88 86 82 80 80 72 Z" fill="#F59E0B" opacity="0.95" />

        {/* Flowing Festive Waist Sash / Kamarbandh Flapping in Dance */}
        <motion.path
          d="M 60 73 Q 44 80 38 92 Q 47 86 64 77 Z"
          fill="#DC2626"
          stroke="#B91C1C"
          strokeWidth="0.8"
          animate={{ rotate: [-8, 6, -8] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "62px 74px" }}
        />

        {/* Torso & Embellished Kurta Vest */}
        <path d="M 60 52 L 80 52 L 78 74 L 62 74 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
        {/* Golden Buttons / Placket */}
        <line x1="70" y1="52" x2="70" y2="74" stroke="#FBBF24" strokeWidth="1.5" />
        <circle cx="70" cy="58" r="1.2" fill="#FEF08A" />
        <circle cx="70" cy="64" r="1.2" fill="#FEF08A" />
        <circle cx="70" cy="70" r="1.2" fill="#FEF08A" />

        {/* Dancer Raised Left Arm: Celebration Bhangra Gesture */}
        <path d="M 60 55 Q 42 45 34 30" stroke="#F59E0B" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="34" cy="29" r="3.5" fill="#FDE68A" />
        <circle cx="33" cy="27" r="1.5" fill="#DC2626" />

        {/* Dancer Raised Right Arm: Brandishing a Festive Dance Stick */}
        <path d="M 80 55 Q 98 45 106 30" stroke="#F59E0B" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="106" cy="29" r="3.5" fill="#FDE68A" />
        {/* Decorative Danka / Chhari Stick */}
        <line x1="99" y1="36" x2="114" y2="18" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="114" cy="18" r="2.2" fill="#FBBF24" />

        {/* Head, Joyous Smile & Royal Tilak */}
        <ellipse cx="70" cy="42" rx="7.5" ry="9" fill="#FDE68A" stroke="#B45309" strokeWidth="0.8" />
        <line x1="70" y1="36" x2="70" y2="41" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 67 46 Q 70 49 73 46" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* Traditional Royal Mustache */}
        <path d="M 66 45 Q 68 44 70 45 Q 72 44 74 45" stroke="#451A03" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Royal Safa / Turban with Sarpech & Kalgi Brooch */}
        <path d="M 60 38 Q 70 24 80 38 Q 83 31 70 23 Q 57 31 60 38 Z" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1" />
        <path d="M 63 32 Q 70 27 77 32" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
        {/* Kalgi Feather & Gem */}
        <path d="M 69 24 Q 70 12 75 14 Q 72 21 70 26" fill="#10B981" stroke="#047857" strokeWidth="0.8" />
        <circle cx="70" cy="24" r="2.2" fill="#FBBF24" stroke="#DC2626" strokeWidth="0.8" />
      </motion.g>
    </svg>
  </motion.div>
);

const CELEBRATIONS = [
  {
    date: "November 26, 2026",
    dayLabel: "Invitation",
    dayKey: "invitation",
    events: [
      {
        id: "ganesh-puja",
        time: "7:00 AM",
        title: "Ganesh Nimantran",
        tagline: "Auspicious Beginnings",
        attire: "Traditional Yellow / Pavitra Ethnic",
        desc: "Seeking the divine blessings of Lord Ganesha to mark the auspicious beginning of our wedding festivities.",
        logo: <GaneshPujaIcon />,
        badgeColor: "bg-amber-500/10 text-amber-800 border-amber-300",
        ringColor: "ring-amber-200/80 bg-amber-50/70",
        calDates: "20261126T013000Z/20261126T033000Z"
      }    
    ] 
  },
     {
    date: "December 2, 2026",
    dayLabel: "Day 01",
    dayKey: "day1",
    events: [
      {
        id: "mehendi",
        time: "10:00 AM",
        title: "Mehendi Ceremony",
        tagline: "Henna, Folk & Celebrations",
        attire: "Floral Vibes & Shades of Green",
        desc: "An afternoon rich with intricate henna designs, soulful folk melodies, sweets, and joyous celebration.",
        logo: <MehendiIcon />,
        badgeColor: "bg-emerald-500/10 text-emerald-800 border-emerald-300",
        ringColor: "ring-emerald-200/80 bg-emerald-50/70",
        calDates: "20261202T043000Z/20261202T070000Z"
      },
      {
        id: "chaak",
        time: "11:00 AM",
        title: "Chaak Ceremony",
        tagline: "Rooted in rituals, wrapped in love.",
        attire: "Vibrant ethnic wear",
        desc: "A celebration of tradition, family, and new beginnings. Join us for the Chaak Ceremony as we seek blessings and commence the wedding festivities with joy and love.",
        logo: <ChaakIcon />,
        badgeColor: "bg-orange-500/10 text-orange-900 border-orange-300",
        ringColor: "ring-orange-200/80 bg-orange-50/70",
        calDates: "20261202T053000Z/20261202T083000Z"
      },         
    ] 
  },
  {
    date: "December 3, 2026",
    dayLabel: "Day 02",
    dayKey: "day2",
    events: [
      {
        id: "haldi",
        time: "11:00 AM",
        title: "Haldi Rasam",
        tagline: "Marigold Showers & Turmeric",
        attire: "Shades of Pink",
        desc: "A lively ritual of auspicious turmeric paste, flower petal showers, laughter, and blessings.",
        logo: <HaldiIcon />,
        badgeColor: "bg-yellow-500/15 text-yellow-900 border-yellow-300",
        ringColor: "ring-yellow-200/80 bg-yellow-50/70",
        calDates: "20261203T110000Z/20261203T133000Z"
      },
      {
        id: "sangeet",
        time: "05:00 PM onwards",
        title: "Ring Ceremony & Sangeet Night",
        tagline: "Beats, Rings & Revelry",
        attire: "Dark Shades or Shimmer",
        desc: "An electrifying night celebrating the exchange of rings, choreographed dances, musical beats, and a dinner feast.",
        logo: <SangeetIcon />,
        badgeColor: "bg-rose-500/10 text-rose-800 border-rose-300",
        ringColor: "ring-rose-200/80 bg-rose-50/70",
        calDates: "20261203T140000Z/20261203T180000Z"
      }
    ]
  },
  {
    date: "December 4, 2026",
    dayLabel: "Day 03",
    dayKey: "day3",
    events: [
      {
        id: "carnival",
        time: "10:00 AM",
        title: "Carnival Dance",
        tagline: "Where Love Meets the Carnival Spirit",
        attire: "Rajasthani Outfit",
        desc: "Step Into the Carnival of Love, where Every Beat Tells a Love Story.",
        logo: <CarnivalIcon />,
        badgeColor: "bg-orange-500/10 text-orange-900 border-orange-300",
        ringColor: "ring-orange-200/80 bg-orange-50/70",
        calDates: "20261204T043000Z/20261204T073000Z"
      },      
      {
        id: "baraat-swagat",
        time: "06:00 PM",
        title: "Baraat Swagat & Dhol Tasha",
        tagline: "Beats, Brass & Grand Welcome",
        attire: "Royal Elegance / Bandhgala & Vibrant Safa",
        desc: "Joyous arrival of the groom and celebratory Baraat procession with live Punjabi dhol beats, nagada, brass brass band, and warm Milni welcome by the bride's family.",
        logo: <BaraatIcon />,
        badgeColor: "bg-orange-500/10 text-orange-900 border-orange-300",
        ringColor: "ring-orange-200/80 bg-orange-50/70",
        calDates: "20261204T123000Z/20261204T133000Z"
      },
      {
        id: "wedding",
        time: "09:00 PM onwards",
        title: "The Wedding Muhurtham (Baraat & Phere)",
        tagline: "The Sacred Seven Vows",
        attire: "Royal Elegance / Bandhgala & Vibrant Safa",
        desc: "The arrival of the Baraat, exchange of Varmala, and the sacred Seven Vows around the holy fire, followed by a royal feast.",
        logo: <WeddingMuhurthamIcon />,
        badgeColor: "bg-red-500/10 text-red-900 border-red-300",
        ringColor: "ring-red-200/80 bg-red-50/70",
        calDates: "20261204T133000Z/20261204T193000Z"
      }
    ]
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function WeddingInvite() {
  const weddingDate = new Date('2026-12-03T10:00:00Z').getTime();
  const [isMounted, setIsMounted] = useState(false);
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [showPetals, setShowPetals] = useState(true);
  const [dholBeatPulse, setDholBeatPulse] = useState(false);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '',
    status: 'attending', 
    guests: '1', 
    attendingEvents: ['all'],
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const audioRef = useRef(null);
  const [activeDayFilter, setActiveDayFilter] = useState('all');
  const defaultFallbackImage = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=80";
  const [heroImageSrc, setHeroImageSrc] = useState('/IMG-20260925-WA0003~2.jpg');

  const handleImageFallback = () => {
    if (heroImageSrc !== defaultFallbackImage) {
      setHeroImageSrc(defaultFallbackImage);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    audioRef.current = new Audio('/paulyudin-wedding-piano-162472.mp3'); 
    audioRef.current.loop = true;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;
      if (difference < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      if (audioRef.current) audioRef.current.pause();
    };
  }, [weddingDate]);

  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio playback blocked initially:", err));
    }
  };

  const triggerDholBurst = () => {
    setDholBeatPulse(true);
    setTimeout(() => setDholBeatPulse(false), 900);
    setShowPetals(true);
  };

  const handleRSVP = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 600);
      return;
    }
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    const shareData = {
      title: "Bhavna & Devansh Wedding Invitation",
      text: "We invite you to celebrate the wedding of Bhavna & Devansh in Jaipur on 3-4 December 2026!",
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard?.writeText(shareData.url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Bhavna & Devansh Wedding Celebrations")}&dates=20261203T043000Z/20261204T183000Z&details=${encodeURIComponent("Join us in celebrating the wedding festivities of Bhavna and Devansh at Aura Banquet Hall, Jaipur!")}&location=${encodeURIComponent("Aura Banquet Hall, Giriraj Nagar, Dholai, Jaipur, Rajasthan 302020")}`;
  const venueMapsUrl = "https://maps.google.com/?q=Aura+Banquet+Hall+Giriraj+Nagar+Dholai+Jaipur";
  const venueQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(venueMapsUrl)}`;

  return (
    <div 
      className="min-h-screen bg-[#FAF6EE] text-[#2C2523] font-serif antialiased overflow-x-hidden relative selection:bg-[#831828]/15 selection:text-[#831828]"
      style={{
        backgroundImage: `
          radial-gradient(circle at top right, rgba(217, 119, 6, 0.05), transparent 45%),
          radial-gradient(circle at bottom left, rgba(180, 83, 9, 0.05), transparent 45%),
          url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C59B27' fill-opacity='0.04' fill-rule='evenodd'%3E%3Cpath d='M40 0 C45 15 65 15 70 0 C80 20 60 40 40 40 C20 40 0 20 10 0 C15 15 35 15 40 0 Z'/%3E%3Cpath d='M40 80 C45 65 65 65 70 80 C80 60 60 40 40 40 C20 40 0 60 10 80 C15 65 35 65 40 80 Z'/%3E%3Ccircle cx='40' cy='40' r='4'/%3E%3Ccircle cx='40' cy='40' r='8' stroke='%23D97706' stroke-opacity='0.05' fill='none'/%3E%3Ccircle cx='0' cy='40' r='3'/%3E%3Ccircle cx='80' cy='40' r='3'/%3E%3C/g%3E%3C/svg%3E")
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* CELEBRATORY FALLING ROSE PETALS / MARIGOLDS */}
      {isMounted && showPetals && <FloatingPetals />}

      {/* CEREMONIAL ARCHED GATE FRAME WITH MULTI-LAYERED LINES */}
      <div className="fixed inset-2 sm:inset-3 pointer-events-none z-30">
        {/* Outer Gate Frame Line */}
        <div className="absolute inset-0 border-2 border-amber-600/35 rounded-2xl" />
        {/* Inner Gate Frame Line */}
        <div className="absolute inset-1.5 sm:inset-2 border border-amber-500/25 rounded-xl" />
        
        {/* Gate Toran Arch Header Emblem */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="h-[2px] w-12 sm:w-28 bg-gradient-to-r from-transparent via-amber-500/60 to-amber-600" />
          <div className="px-3 py-0.5 bg-[#FAF6EE] border border-amber-500/50 rounded-full shadow-xs text-amber-800 text-[10px] tracking-widest uppercase font-serif">
            ✦ शुभ विवाह ✦
          </div>
          <div className="h-[2px] w-12 sm:w-28 bg-gradient-to-l from-transparent via-amber-500/60 to-amber-600" />
        </div>
        
        {/* Gate Bottom Arch Accent */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <span className="w-1.5 h-1.5 rotate-45 bg-amber-600/60 mx-2" />
          <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-l from-transparent via-amber-500/50 to-transparent" />
        </div>
      </div>

      {/* INTERACTIVE ROYAL ENVELOPE / GREETING CARD MODAL */}
      {!isInvitationOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/80 backdrop-blur-md transition-all duration-700">
          <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#fffdf9] rounded-3xl p-6 sm:p-8 md:p-12 text-center border-4 border-amber-300/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
            <RoyalCorner position="top-left" />
            <RoyalCorner position="top-right" />
            <RoyalCorner position="bottom-left" />
            <RoyalCorner position="bottom-right" />

            {/* Floating Band Baaja Sticker on Modal Corner */}
            <div className="absolute -top-2 -right-2 md:top-2 md:right-2 rotate-12 z-20 hover:rotate-0 transition-transform">
              <BandBaajaSticker 
                className="w-16 h-16 md:w-20 md:h-20" 
                showLabel={true} 
                onBeatClick={triggerDholBurst} 
              />
            </div>

            {/* Floating Heritage Watermark Icons in Card */}
            <div className="absolute top-4 left-6 opacity-15 text-amber-800 pointer-events-none">
              <RoyalElephant className="w-12 h-12" />
            </div>
            <div className="absolute top-4 right-6 opacity-15 text-amber-800 pointer-events-none">
              <RoyalHorse className="w-12 h-12" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex justify-center pt-2">
                <LordGaneshaLogo className="w-14 h-14 mx-auto drop-shadow-sm" />
              </div>
              <span className="text-xs font-sans tracking-[0.35em] text-[#831828] uppercase font-bold block">
                ॥ श्री गणेशाय नमः ॥
              </span>

              <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

              <p className="text-xs tracking-[0.3em] font-sans text-stone-500 uppercase">
                Royal Wedding Invitation
              </p>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-stone-900 tracking-wide">
                Bhavna <span className="text-[#831828] font-serif">&amp;</span> Devansh
              </h2>

              <p className="text-xs md:text-sm text-stone-600 italic font-serif">
                Cordially invite you to grace the auspicious celebrations of their holy union in Jaipur.
              </p>

              {/* Wax Seal Button to Enter */}
              <div className="pt-6 pb-2">
                <button
                  onClick={handleOpenInvitation}
                  className="group relative inline-flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#58111A] via-[#831828] to-amber-600 shadow-2xl flex items-center justify-center border-2 border-amber-300 text-amber-100 ring-4 ring-amber-300/40">
                    <Heart className="w-8 h-8 fill-white/90 animate-pulse text-white" />
                  </div>
                  <span className="mt-3 text-xs font-sans tracking-[0.25em] text-[#831828] uppercase font-semibold group-hover:text-amber-700">
                    Khamma Ghani • Open Invitation ❦
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE DHOL BEAT PULSE BANNER OVERLAY */}
      {dholBeatPulse && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-red-600 via-amber-600 to-rose-600 text-white px-6 py-2 rounded-full shadow-2xl border-2 border-amber-300 flex items-center gap-3 animate-bounce">
            <div className="w-8 h-9 -my-2 shrink-0">
              <DancerOnDholak className="w-8 h-9" />
            </div>
            <PartyPopper size={20} className="text-yellow-300 animate-spin" />
            <span className="font-serif font-bold tracking-widest text-sm uppercase">
              🥁 Dhol Tasha Beats Playing! Dhik-Tana-Nana! 🎺
            </span>
          </div>
        </div>
      )}


      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end gap-2 sm:gap-3">
        <button
          onClick={() => setShowPetals(!showPetals)}
          className="flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md text-gray-700 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-lg border border-amber-200 hover:bg-stone-50 transition-all text-[11px] sm:text-xs font-sans tracking-wider uppercase"
          title="Toggle Blossom Petals Shower"
        >
          <Sparkles size={15} className="text-amber-500 animate-spin" />
          <span>{showPetals ? "Petals On" : "Petals Off"}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md text-gray-700 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-lg border border-amber-200 hover:bg-stone-50 transition-all text-[11px] sm:text-xs font-sans tracking-wider uppercase"
          title="Share Invitation"
        >
          <Share2 size={15} className="text-[#831828]" />
          <span>{copiedShare ? "Link Copied!" : "Share"}</span>
        </button>

        <button 
          onClick={toggleMusic}
          className="flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md text-gray-700 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-lg border border-stone-200 hover:bg-stone-50 transition-all text-[11px] sm:text-xs font-sans tracking-wider uppercase"
        >
          {isPlaying ? (
            <>
              <Volume2 size={16} className="text-[#831828] animate-pulse" />
              <span>Mute Music</span>
            </>
          ) : (
            <>
              <VolumeX size={16} className="text-gray-500" />
              <span>Play Music</span>
            </>
          )}
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden">
        {/* BACKGROUND IMAGE & OVERLAYS */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={heroImageSrc} 
            alt="Bhavna & Devansh" 
            className="w-full h-full object-cover object-center filter brightness-[0.88] scale-105 transition-transform duration-1000"
            onError={handleImageFallback}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6EE]/85 via-[#FAF6EE]/60 to-[#FAF6EE]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,249,235,0.7)_0%,transparent_80%)] pointer-events-none" />

          {/* Royal Heritage Watermarks in Hero */}
          <div className="absolute bottom-6 left-6 opacity-20 text-amber-800 pointer-events-none hidden md:block">
            <RoyalElephant className="w-28 h-28" />
          </div>
          <div className="absolute bottom-6 right-6 opacity-20 text-amber-800 pointer-events-none hidden md:block">
            <RoyalCamel className="w-28 h-28" />
          </div>
          <div className="absolute top-1/2 left-8 -translate-y-1/2 opacity-15 text-amber-800 pointer-events-none hidden lg:block">
            <RoyalHorse className="w-24 h-24" />
          </div>
        </div>
        
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-6 max-w-3xl z-10">
          <div className="flex justify-center">
            <LordGaneshaLogo className="w-16 h-16 md:w-20 md:h-20 mx-auto drop-shadow-md hover:scale-105 transition-transform" />
          </div>
          <span className="text-xs md:text-sm font-sans tracking-[0.35em] text-[#831828] uppercase block font-bold">
            ॥ श्री गणेशाय नमः ॥
          </span>

          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

          <span className="text-sm uppercase tracking-[0.3em] text-stone-600 block font-sans font-medium">
            Together With Their Families
          </span>

          <div className="relative py-3">
            {/* Ornate top flourish */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent via-amber-400 to-amber-500" />
              <span className="text-amber-600 text-xs md:text-sm">✦ ❦ ✦</span>
              <span className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent via-amber-400 to-amber-500" />
            </div>

            <h1 className="text-3xl sm:text-6xl md:text-8xl font-serif font-light tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.16em] uppercase leading-tight select-none drop-shadow-sm flex flex-wrap items-center justify-center">
              <span className="bg-gradient-to-b from-[#6b1420] via-[#831828] to-[#991b1b] bg-clip-text text-transparent font-medium drop-shadow-[0_2px_12px_rgba(255,255,255,0.7)]">
                Bhavna
              </span>
              <span className="relative inline-flex items-center justify-center mx-2 sm:mx-4 md:mx-6 my-1 sm:my-0 align-middle">
                <span className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full border border-amber-300/80 bg-gradient-to-tr from-[#FFFBEB] via-white to-[#FEF3C7] shadow-md flex items-center justify-center ring-2 ring-amber-400/30">
                  <span className="text-[#831828] font-serif italic text-lg sm:text-2xl md:text-3xl font-normal leading-none -mt-0.5">&amp;</span>
                </span>
              </span>
              <span className="bg-gradient-to-b from-[#6b1420] via-[#831828] to-[#991b1b] bg-clip-text text-transparent font-medium drop-shadow-[0_2px_12px_rgba(255,255,255,0.7)]">
                Devansh
              </span>
            </h1>

            {/* Ornate bottom underline */}
            <div className="w-32 md:w-48 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/80 to-transparent mx-auto mt-4" />
          </div>

          <p className="text-base md:text-xl text-gray-600 font-light italic max-w-xl mx-auto">
            Invite you to celebrate their union, love, and beginnings of forever
          </p>

          <div className="pt-2">
            <span className="inline-block border-y border-stone-300 py-2 px-6 text-xl md:text-2xl text-gray-700 tracking-wider font-light">
              3 – 4 December 2026
            </span>
            <p className="text-sm font-sans tracking-widest text-amber-800 uppercase mt-2 font-semibold">Pink City • Jaipur, Rajasthan</p>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs font-sans tracking-wider uppercase">
            <a 
              href={googleCalendarUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-full hover:bg-stone-800 transition-colors shadow-sm"
            >
              <CalendarPlus size={14} /> Add to Calendar
            </a>
            <a 
              href="#rsvp" 
              className="inline-flex items-center gap-2 bg-[#831828] text-white px-6 py-3 rounded-full hover:bg-[#6c1421] transition-colors shadow-sm border border-amber-300/40"
            >
              <Heart size={14} className="fill-white" /> RSVP Now
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-8 animate-bounce text-gray-400">
          <a href="#countdown" aria-label="Scroll Down">
            <ChevronDown size={28} />
          </a>
        </div>
      </section>

      {/* SHAHI SAWARI / ROYAL CARAVAN PROCESSION DIVIDER */}
      <RoyalCaravanDivider />

      {/* COUNTDOWN TIMER */}
      <section id="countdown" className="py-14 sm:py-20 bg-[#FDFBF7]/85 backdrop-blur-sm border-y border-amber-200/60">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 md:gap-5 mb-3">
            <BandBaajaSticker className="w-9 h-9 md:w-11 md:h-11 -rotate-12" onBeatClick={triggerDholBurst} />
            <RoyalCamel className="w-7 h-7 text-amber-600/60" />
            <RoyalElephant className="w-8 h-8 text-rose-500/70" />
            <RoyalHorse className="w-7 h-7 text-amber-600/60" />
            <BandBaajaSticker className="w-9 h-9 md:w-11 md:h-11 rotate-12" onBeatClick={triggerDholBurst} />
          </div>
          <Sparkles className="mx-auto text-rose-400 mb-3" size={24} />
          <h2 className="text-2xl md:text-3xl font-light tracking-widest text-gray-800 uppercase mb-2">Counting Down To Forever</h2>
          <p className="text-stone-500 text-sm font-sans mb-10">Every second brings us closer to celebrating with you</p>
          
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 max-w-lg mx-auto">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="bg-[#FFFDF9] rounded-2xl p-2.5 sm:p-4 md:p-6 border border-amber-200/60 shadow-sm relative overflow-hidden">
                <span className="block text-2xl sm:text-3xl md:text-5xl font-light text-[#831828] font-mono tracking-tight">{isMounted ? String(value).padStart(2, '0') : "00"}</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 block mt-1">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* OUR STORY & BRIDE-GROOM ANIMATION SECTION */}
      <section className="py-24 max-w-3xl mx-auto px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-6">
          <div className="flex flex-col items-center justify-center mb-2">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <MorPankhMotif className="w-7 h-10 sm:w-9 sm:h-12 -rotate-12" />
              <BrideGroomLogo className="w-28 h-28 md:w-36 md:h-36 mx-auto drop-shadow-md" />
              <MorPankhMotif className="w-7 h-10 sm:w-9 sm:h-12 rotate-12 scale-x-[-1]" />
            </div>
            <span className="text-[11px] font-sans text-amber-700 tracking-widest uppercase mt-2 font-semibold">
              ❦ Bride Bhavna &amp; Groom Devansh ❦
            </span>
          </div>
          <span className="text-xs font-sans tracking-[0.25em] text-[#831828] uppercase block font-semibold">Our Journey</span>
          <h2 className="text-3xl md:text-4xl font-light text-gray-800">Two Souls, One Beautiful Beginning</h2>
          <div className="w-16 h-[1px] bg-rose-300 mx-auto"></div>
          <p className="text-stone-600 font-sans text-sm md:text-base leading-relaxed">
            From mutual smiles and unending late-night conversations to realizing that every tomorrow is sweeter together. 
            Surrounded by the warmth of our beloved family and dearest friends, we are thrilled to step into our forever 
            and begin this blessed new chapter.
          </p>
        </motion.div>
      </section>

      {/* THE CELEBRATIONS TIMELINE */}
      <section className="py-24 bg-[#F5EEDB]/75 backdrop-blur-sm border-t border-amber-200/70">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-sans tracking-[0.3em] text-[#831828] uppercase block font-semibold mb-2">Itinerary &amp; Events</span>
            <div className="flex items-center justify-center gap-3">
              <BandBaajaSticker className="w-11 h-11 -rotate-6 hidden sm:inline-flex" onBeatClick={triggerDholBurst} />
              <h2 className="text-3xl md:text-5xl font-light tracking-widest text-gray-800 uppercase">The Celebrations</h2>
              <BandBaajaSticker className="w-11 h-11 rotate-6 hidden sm:inline-flex" onBeatClick={triggerDholBurst} />
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="h-[1px] w-12 bg-rose-300"></span>
              <span className="text-rose-400 text-xs">❦</span>
              <span className="h-[1px] w-12 bg-rose-300"></span>
            </div>
            <p className="text-stone-500 text-xs md:text-sm font-sans mt-3 max-w-lg mx-auto">
              Join us through every ritual, dance, and prayer as we unite in love and tradition.
            </p>

            {/* DAY SELECTOR TABS */}
            <div className="flex flex-wrap justify-center items-center gap-2 mt-8 px-2">
              {[
                { key: 'all', label: 'All Celebrations' },
                { key: 'invitation', label: 'Invitation' },
                { key: 'day1', label: 'Day 01 • Dec 2' },
                { key: 'day2', label: 'Day 02 • Dec 3' },
                { key: 'day3', label: 'Day 03 • Dec 4' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveDayFilter(tab.key)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-sans tracking-wider uppercase transition-all duration-200 ${
                    activeDayFilter === tab.key
                      ? 'bg-[#831828] text-white shadow-md shadow-amber-900/20'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-16">
            {CELEBRATIONS
              .filter((day) => activeDayFilter === 'all' || activeDayFilter === day.dayKey)
              .map((day, dIdx) => (
                <div key={dIdx} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] bg-gradient-to-r from-transparent to-rose-200 flex-1"></div>
                    <div className="text-center px-6 py-2 bg-[#FFFDF9] rounded-full border border-amber-200 shadow-sm">
                      <span className="text-[11px] font-sans tracking-widest uppercase text-rose-600 font-semibold block">{day.dayLabel}</span>
                      <h3 className="text-lg md:text-xl font-light text-gray-800 tracking-wider">{day.date}</h3>
                    </div>
                    <div className="h-[1px] bg-gradient-to-l from-transparent to-rose-200 flex-1"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {day.events.map((evt, eIdx) => {
                      const eventCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                        `Bhavna & Devansh: ${evt.title}`
                      )}&dates=${evt.calDates}&details=${encodeURIComponent(
                        evt.desc
                      )}&location=${encodeURIComponent("Aura Banquet Hall, Giriraj Nagar, Dholai, Jaipur")}`;

                      return (
                        <motion.div 
                          key={eIdx}
                          initial="hidden" 
                          whileInView="visible" 
                          viewport={{ once: true, margin: "-50px" }} 
                          variants={fadeInUp}
                          className="bg-[#FFFDF9] rounded-3xl p-5 sm:p-7 md:p-8 border border-amber-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden flex flex-col justify-between group hover:border-amber-400/80"
                        >
                          <RoyalCorner position="top-left" />
                          <RoyalCorner position="top-right" />
                          
                          {/* TOP LOGO EMBLEM */}
                          <div className="flex flex-col items-center text-center">
                            <div className={`w-20 h-20 rounded-full p-2.5 flex items-center justify-center ring-4 ${evt.ringColor} shadow-inner mb-4 transition-transform duration-300 group-hover:scale-105`}>
                              {evt.logo}
                            </div>

                            <span className={`text-[10px] font-sans font-semibold uppercase tracking-widest px-3 py-1 rounded-full border ${evt.badgeColor} mb-2`}>
                              {evt.tagline}
                            </span>

                            <h4 className="text-xl md:text-2xl font-light text-gray-900 tracking-wide mb-2 mt-1">{evt.title}</h4>

                            <div className="inline-flex items-center gap-1.5 text-stone-600 text-xs font-sans font-medium bg-stone-50 border border-stone-200 px-3 py-1 rounded-full mb-4">
                              <Clock size={13} className="text-rose-500" />
                              <span>{evt.time}</span>
                            </div>

                            <p className="text-gray-600 font-sans text-xs md:text-sm leading-relaxed mb-6 max-w-sm">
                              {evt.desc}
                            </p>
                          </div>

                          {/* ATTIRE & ADD TO CALENDAR FOOTER */}
                          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
                            <div className="flex items-center gap-1.5 text-stone-600 text-center sm:text-left">
                              <Shirt size={14} className="text-rose-400 shrink-0" />
                              <span><strong className="text-stone-800">Attire:</strong> <em className="italic">{evt.attire}</em></span>
                            </div>
                            <a
                              href={eventCalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#831828] hover:text-[#58111A] bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full transition-colors shrink-0 border border-amber-200"
                            >
                              <CalendarPlus size={13} />
                              <span>Calendar</span>
                            </a>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* THE VENUE MAP */}
      <section className="py-24 bg-[#FDFBF7]/80 backdrop-blur-sm border-t border-amber-200/60">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-3xl mx-auto px-6 text-center">
          <MapPin className="mx-auto text-rose-400 mb-4" size={32} />
          <h2 className="text-2xl md:text-3xl font-light tracking-widest text-gray-800 uppercase mb-3">The Venue</h2>
          <p className="text-xl text-gray-800 font-medium">Aura Banquet Hall</p>
          <p className="text-sm text-gray-500 font-sans mt-1 max-w-md mx-auto">
            Aura Banquet, Giriraj Nagar, Dholai, Jaipur, Rajasthan 302020
          </p>

          <div className="mt-6 flex justify-center">
            <a 
              href={venueMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 px-5 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase transition-colors"
            >
              <Navigation size={14} className="text-rose-500" /> Get Directions
            </a>
          </div>

          {/* QR CODE CARD */}
          <div className="mt-8 mx-auto max-w-xs bg-[#FFFDF9]/95 rounded-2xl p-5 border border-amber-200/80 shadow-sm relative group hover:shadow-md transition-shadow">
            <RoyalCorner position="top-left" />
            <RoyalCorner position="top-right" />
            <RoyalCorner position="bottom-left" />
            <RoyalCorner position="bottom-right" />
            
            {/* Band Baaja Sticker on QR card */}
            <div className="absolute -top-4 -right-4 rotate-12 z-20 pointer-events-none">
              <BandBaajaSticker className="w-12 h-12" showLabel={false} onBeatClick={triggerDholBurst} />
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-sans tracking-wider uppercase text-[#831828] font-semibold mb-3">
              <QrCode size={16} />
              <span>Scan for Venue Location</span>
            </div>

            <div className="bg-[#FAF6EE] p-3 rounded-xl border border-stone-200/80 inline-block shadow-inner">
              <img 
                src={venueQrCodeUrl} 
                alt="Scan QR code for Google Maps venue location" 
                className="w-40 h-40 object-contain mx-auto rounded-lg"
                loading="lazy"
              />
            </div>

            <p className="text-[11px] text-stone-500 font-sans mt-3">
              Scan with your phone camera to open directly in Google Maps for live navigation.
            </p>
          </div>
        </motion.div>
      </section>

      {/* STAY & GUEST ASSISTANCE */}
      <section className="py-16 bg-[#F5ECDC]/85 backdrop-blur-sm border-t border-amber-200/60">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Need Help or Directions?</h3>
          <p className="text-stone-500 font-sans text-xs md:text-sm mb-6">
            For travel assistance, accommodations, or special arrangements, feel free to reach out to our wedding coordinators.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-sans">
            <a 
              href="https://wa.me/qr/Z63M2WXI7AGOG1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-stone-300 bg-white px-5 py-2.5 rounded-full hover:bg-stone-50 transition-colors text-stone-700"
            >
              <PhoneCall size={14} className="text-green-600" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* RSVP FORM */}
      <section id="rsvp" className="py-24 max-w-2xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-[#FFFDF9]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-12 shadow-md border border-amber-200/80 text-center">
          <Heart className="mx-auto text-rose-300 mb-4 fill-rose-100" size={28} />
          <h2 className="text-2xl md:text-3xl font-light tracking-widest text-gray-800 uppercase mb-2">Will You Attend?</h2>
          <p className="text-sm text-gray-500 font-sans mb-8">Kindly RSVP so we can prepare for your arrival</p>

          {submitted ? (
            <div className="py-12 px-6 bg-[#4a0e17] text-amber-100 rounded-2xl border-2 border-amber-400/50 flex flex-col items-center shadow-lg relative overflow-hidden">
              <RoyalCorner position="top-left" />
              <RoyalCorner position="top-right" />
              <RoyalCorner position="bottom-left" />
              <RoyalCorner position="bottom-right" />
              <CheckCircle2 size={46} className="text-amber-300 mb-3" />
              <p className="text-2xl md:text-3xl text-amber-100 font-serif italic">Khamma Ghani &amp; Thank You!</p>
              <p className="text-amber-200/90 text-sm font-sans mt-2 max-w-md text-center leading-relaxed">
                Your response has been warmly noted. We eagerly look forward to welcoming you to the Pink City to celebrate with us!
              </p>
            </div>
          ) : (
            <form onSubmit={handleRSVP} className="space-y-6 text-left font-sans text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1.5 text-xs uppercase tracking-wider">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 focus:bg-white transition-colors"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1.5 text-xs uppercase tracking-wider">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 focus:bg-white transition-colors"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-xs uppercase tracking-wider">Will you join our celebrations? *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`py-3 px-4 rounded-xl border text-center font-medium transition-all ${
                      formData.status === 'attending' 
                        ? 'bg-[#831828] text-white border-[#831828] shadow-sm' 
                        : 'bg-stone-50 border-stone-200 text-gray-700 hover:bg-stone-100'
                    }`}
                    onClick={() => setFormData({ ...formData, status: 'attending' })}
                  >
                    Joyfully Attend
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 rounded-xl border text-center font-medium transition-all ${
                      formData.status === 'declining' 
                        ? 'bg-stone-700 text-white border-stone-700 shadow-sm' 
                        : 'bg-stone-50 border-stone-200 text-gray-700 hover:bg-stone-100'
                    }`}
                    onClick={() => setFormData({ ...formData, status: 'declining' })}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {formData.status === 'attending' && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-xs uppercase tracking-wider">Number of Guests</label>
                    <select
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 focus:bg-white"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-xs uppercase tracking-wider">Events You'll Attend</label>
                    <select
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 focus:bg-white"
                      onChange={(e) => setFormData({ ...formData, attendingEvents: [e.target.value] })}
                    >
                      <option value="all">Attending All Celebrations (Dec 3 &amp; Dec 4)</option>
                      <option value="dec3">December 3rd Only (Sangeet, Haldi &amp; Mehendi)</option>
                      <option value="dec4">December 4th Only (Wedding Muhurtham)</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-1.5 text-xs uppercase tracking-wider">Warm Wishes &amp; Blessings</label>
                <textarea
                  rows="3"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 focus:bg-white resize-none"
                  placeholder="Leave a message for Bhavna & Devansh..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#831828] hover:bg-[#6c1421] text-amber-50 font-medium py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 border border-amber-400/30"
              >
                {isSubmitting ? "Sending..." : "Send RSVP"}
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* CLOSING / THANK YOU & BLESSINGS SECTION (ROYAL JAIPUR MAROON THEME) */}
      <section className="py-20 bg-[#4a0e17] text-amber-100 text-center relative overflow-hidden border-t-4 border-amber-400/60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
          <div className="flex items-center justify-center gap-3 md:gap-4 text-amber-300/80 mb-2">
            <BandBaajaSticker className="w-10 h-10 md:w-12 md:h-12 -rotate-12" onBeatClick={triggerDholBurst} />
            <RoyalCamel className="w-8 h-8" />
            <RoyalElephant className="w-9 h-9" />
            <RoyalHorse className="w-8 h-8" />
            <BandBaajaSticker className="w-10 h-10 md:w-12 md:h-12 rotate-12" onBeatClick={triggerDholBurst} />
          </div>
          <span className="text-xs font-sans tracking-[0.3em] text-amber-300 uppercase font-semibold block">
            • Two Hearts • Seven Vows • Forever Bound
          </span>
          <h2 className="text-3xl md:text-5xl font-light font-serif text-amber-50 tracking-wider">
            Thank You
          </h2>
          <p className="text-sm md:text-base text-amber-200/90 font-serif italic max-w-lg mx-auto leading-relaxed">
            &ldquo;In the circle of love, two lives intertwine and two souls become one.&rdquo;
            <br />
            Your presence, warm prayers, and heartfelt blessings make our wedding celebrations complete and truly unforgettable.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-amber-400/40" />
            <Heart size={16} className="fill-amber-400 text-amber-400" />
            <span className="h-[1px] w-12 bg-amber-400/40" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-[#36080e] text-center text-xs text-amber-200/60 font-sans tracking-widest uppercase border-t border-amber-400/20">
        <p className="mb-2">❤️ DEVKIBHAVNA ❤️</p>
        <p className="text-[11px] text-amber-300/70 tracking-normal font-serif italic normal-case">
          3 – 4 December 2026 • Aura Banquet Hall, Jaipur, Rajasthan
        </p>
      </footer>
    </div>
  );
}
