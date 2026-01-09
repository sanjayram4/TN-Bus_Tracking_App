
import React, { useState } from 'react';
import { BusFront, Clock, ChevronRight, Users, Zap, MapPin, Gauge, Droplets, Share2, Check, Route, ChevronDown } from 'lucide-react';
import { Bus, Language } from '../types';

interface BusCardProps {
  bus: Bus;
  onTrack: (bus: Bus) => void;
  lang?: Language;
}

const BusCard: React.FC<BusCardProps> = ({ bus, onTrack, lang = 'ta' }) => {
  const isTa = lang === 'ta';
  const [copied, setCopied] = useState(false);
  const [showStops, setShowStops] = useState(false);

  const statusColor = {
    'On Time': 'text-[#CCFF00]',
    'Delayed': 'text-red-500',
    'Approaching': 'text-[#00E5FF] animate-pulse'
  }[bus.status];

  const occupancyLabel = {
    'Low': isTa ? 'காலியாக உள்ளது' : '32% Cap.',
    'Medium': isTa ? 'மிதமான கூட்டம்' : '65% Cap.',
    'High': isTa ? 'அதிக கூட்டம்' : '92% Cap.'
  }[bus.occupancy];

  const trackText = isTa ? 'நேரலை கண்காணிப்பு' : 'Live Tracking';
  const shareText = isTa ? 'பகிர்' : 'Share';
  const routeText = isTa ? 'பயண வழித்தடம்' : 'Route Details';
  const timeToGoText = isTa ? 'செல்ல வேண்டிய நேரம்' : 'Time to go';
  const arrivalText = isTa ? 'வருகை நேரம்' : 'Arrival Time';
  const copiedText = isTa ? 'விவரங்கள் பகிரப்பட்டது!' : 'Details Copied!';

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Construct rich share content
    const shareTitle = `TNPT 24/7 | Bus ${bus.number}`;
    const shareContent = `🚌 TNPT Live Update:
Bus No: ${bus.number} (${bus.type})
Route: ${bus.origin} ➔ ${bus.destination}
Status: ${bus.status}
Arrival Time: ${bus.arrivalTime}
Time to Go: ${bus.remainingTime}

Track live at: ${window.location.href}`;

    const shareData = {
      title: shareTitle,
      text: shareContent,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.debug('Share cancelled or failed:', err);
      }
    } else {
      try {
        const fallbackText = `${shareContent}`;
        await navigator.clipboard.writeText(fallbackText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div 
      className="glass rounded-[2.5rem] p-8 mb-6 flex flex-col gap-6 group relative overflow-hidden transition-all duration-300 border border-white/5 hover:border-[#CCFF00]/40 shadow-xl hover:shadow-[#CCFF00]/5"
    >
      {/* Toast Notification */}
      {copied && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-[#CCFF00] text-black px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(204,255,0,0.4)] animate-in slide-in-from-top-4 fade-in duration-300 flex items-center gap-2">
          <Check size={14} strokeWidth={4} />
          {copiedText}
        </div>
      )}

      <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-[#CCFF00]/10 transition-colors duration-500"></div>
      
      {/* Header Info */}
      <div className="flex items-center justify-between relative z-10" onClick={() => onTrack(bus)}>
        <div className="flex items-center gap-5 cursor-pointer">
          <div className={`w-16 h-16 rounded-2xl bg-[#CCFF00] flex items-center justify-center text-black shadow-[0_0_20px_rgba(204,255,0,0.4)] group-hover:shadow-[0_0_30px_rgba(204,255,0,0.6)] transition-all duration-300 ${bus.status === 'Approaching' ? 'animate-pulse' : ''}`}>
            <BusFront size={28} strokeWidth={3} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-3xl tracking-tight leading-none group-hover:text-[#CCFF00] transition-colors">{bus.number}</h3>
              <span className="bg-white/5 px-3 py-1 rounded-lg text-[10px] font-bold text-white/40 border border-white/10">{bus.type}</span>
            </div>
            <div className={`flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-widest mt-2 ${statusColor}`}>
              <Zap size={12} strokeWidth={3} />
              {bus.status}
            </div>
          </div>
        </div>
        <div className="text-right flex flex-col gap-3">
          <div className="flex flex-col items-end">
             <p className="text-2xl font-bold leading-none text-[#CCFF00]">{bus.remainingTime}</p>
             <p className="text-[7px] font-black text-[#CCFF00]/60 uppercase tracking-widest mt-1">{timeToGoText}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm font-bold leading-none text-white/80">{bus.arrivalTime}</p>
            <p className="text-[7px] font-bold text-white/30 uppercase tracking-widest mt-1">{arrivalText}</p>
          </div>
        </div>
      </div>

      {/* Origin/Destination & Main Stats */}
      <div className="flex flex-col gap-4 py-6 border-y border-white/5 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-[#CCFF00]" />
            <p className="text-lg font-medium tracking-tight text-white/80">
              {bus.origin} <span className="text-white/20 mx-2">→</span> {bus.destination}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-white/40" />
            <span className="text-[11px] font-bold text-white/60">{occupancyLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge size={14} className="text-white/40" />
            <span className="text-[11px] font-bold text-white/60">42 km/h</span>
          </div>
          <button 
            onClick={() => setShowStops(!showStops)}
            className="ml-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00E5FF] hover:opacity-80 transition-opacity"
          >
            <Route size={14} />
            {routeText}
            <ChevronDown size={14} className={`transition-transform duration-300 ${showStops ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Major Stops List */}
        {showStops && (
          <div className="mt-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl animate-in slide-in-from-top-2 duration-300">
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
              {bus.majorStops.map((stop, idx) => (
                <div key={stop} className="flex flex-col items-center flex-shrink-0 gap-2">
                   <div className="flex items-center gap-4">
                     <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-[#CCFF00]' : 'bg-white/20'} border-2 border-black`}></div>
                     {idx < bus.majorStops.length - 1 && <div className="w-8 h-0.5 bg-white/5"></div>}
                   </div>
                   <span className="text-[10px] font-bold text-white/40 whitespace-nowrap">{stop}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-2 relative z-10">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onTrack(bus);
          }}
          className="flex-1 py-4 bg-[#CCFF00] text-black rounded-2xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(204,255,0,0.2)] active:scale-95"
        >
          <Zap size={18} strokeWidth={3} />
          {trackText}
        </button>
        
        <button 
          onClick={handleShare}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border group active:scale-90 shadow-lg ${
            copied 
            ? 'bg-[#CCFF00]/20 border-[#CCFF00] text-[#CCFF00] shadow-[#CCFF00]/20' 
            : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
          }`}
          aria-label={shareText}
        >
          {copied ? (
            <Check size={20} strokeWidth={3} className="animate-in zoom-in-50 duration-200" />
          ) : (
            <Share2 size={20} className="group-hover:text-[#CCFF00] transition-colors duration-300" />
          )}
        </button>
      </div>
    </div>
  );
};

export default BusCard;
