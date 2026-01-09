
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, LayoutGrid, BusFront, PhoneCall, ChevronRight, Map as MapIcon, 
  Clock, ShieldAlert, Navigation as NavIcon, MessageSquare, CloudSun, 
  HelpCircle, Calculator, Palmtree, LifeBuoy, CheckCircle2, ArrowUpDown, 
  MapPin, Building2, Lightbulb, RefreshCw, X, ArrowLeft, Send, 
  MapPin as MapPinIcon, Info, Gauge, Zap, Activity, Radio, Users, 
  Satellite, Signal, Cpu, Share2, ChevronDown, Layers, MapPinned, 
  Thermometer, Wind, Droplets as Water, Check, ShieldCheck, Lock,
  Navigation2, IndianRupee
} from 'lucide-react';
import L from 'leaflet';
import Navigation from './components/Navigation';
import BusCard from './components/BusCard';
import { View, SearchState, Bus, District, Language } from './types';
import { MOCK_BUSES, TAMIL_NADU_DISTRICTS } from './constants';
import { getSmartTravelAdvice } from './services/geminiService';

const CITY_COORDS: Record<string, { lat: number, lng: number }> = {
  'Chennai': { lat: 13.0827, lng: 80.2707 },
  'Madurai': { lat: 9.9252, lng: 78.1198 },
  'Coimbatore': { lat: 11.0168, lng: 76.9558 },
  'Trichy': { lat: 10.7905, lng: 78.7047 },
  'Salem': { lat: 11.6643, lng: 78.1460 },
  'Erode': { lat: 11.3410, lng: 77.7172 },
  'Tirunelveli': { lat: 8.7139, lng: 77.7567 },
  'Vellore': { lat: 12.9165, lng: 79.1325 },
  'Thanjavur': { lat: 10.7870, lng: 79.1378 },
  'Tuticorin': { lat: 8.7642, lng: 78.1348 }
};

const TRANSLATIONS = {
  ta: {
    appName: "TNPT 24/7",
    tagline: "தமிழ்நாடு அரசு போக்குவரத்து",
    planTrip: "பயணத் திட்டம்",
    departure: "கிளம்பும் இடம்",
    destination: "செல்லும் இடம்",
    showBuses: "தேடு",
    districts: "மாவட்டங்கள்",
    sos: "அவசரம்",
    nearby: "அருகிலுள்ளவை",
    aiAssistant: "AI உதவி",
    tools: "கருவிகள்",
    trackBus: "கண்காணிப்பு",
    status: "நிலை",
    speed: "வேகம்",
    fuel: "எரிபொருள்",
    occupancy: "கூட்டம்",
    results: "முடிவுகள்",
    scanning: "தேடுகிறது...",
    syncing: "தரவு ஒத்திசைக்கப்படுகிறது...",
    timeToGo: "செல்ல வேண்டிய நேரம்",
    estimatedFare: "தோராயமான கட்டணம்",
    fare: "கட்டண கால்குலேட்டர்",
    weather: "வானிலை",
    tourism: "சுற்றுலா",
    lostFound: "புகார்",
    reportSent: "அனுப்பப்பட்டது!",
    back: "பின்னால்",
    activatingSOS: "அவசர உதவி...",
    distance: "தூரம்",
    places: "இடங்கள்",
    name: "பெயர்",
    item: "விவரம்",
    submit: "அனுப்பு",
    searchDistrict: "மாவட்டம் தேடு...",
    searchTaluk: "தாலுகா தேடு...",
    searchStand: "நிலையம் தேடு...",
    terminal: "டெர்மினல்",
    taluks: "தாலுகாக்கள்",
    stands: "நிலையம்",
    totalTaluks: "மொத்த தாலுகாக்கள்",
    activeStands: "செயலில் உள்ள நிலையங்கள்",
    shareApp: "செயலியைப் பகிர்",
    setupTitle: "கணினி துவக்கம்",
    setupDesc: "நேரலை கண்காணிப்பை அணுக உங்கள் கூகிள் கிளவுட் கணக்கை இணைக்கவும்.",
    setupBtn: "கணினியை இணைக்கவும்",
    billingInfo: "பில்லிங் விவரங்கள்",
    calculate: "கணக்கிடு",
    perKm: "/கிமீ",
    baseFare: "அடிப்படை கட்டணம்"
  },
  en: {
    appName: "TNPT 24/7",
    tagline: "Tamil Nadu Public Transport",
    planTrip: "Quick Routing",
    departure: "Origin",
    destination: "Target",
    showBuses: "Find",
    districts: "Districts",
    sos: "Emergency",
    nearby: "Nearby",
    aiAssistant: "Core AI",
    tools: "System",
    trackBus: "Tracking",
    status: "Status",
    speed: "Velocity",
    fuel: "Energy",
    occupancy: "Load",
    results: "Active Fleets",
    scanning: "Syncing...",
    syncing: "Syncing Data...",
    timeToGo: "Time to go",
    estimatedFare: "Est. Fare",
    fare: "Fare Calculator",
    weather: "Atmospherics",
    tourism: "Sector Guide",
    lostFound: "Recovery",
    reportSent: "Entry Logged",
    back: "Return",
    activatingSOS: "Transmitting SOS...",
    distance: "Distance",
    places: "Points of Interest",
    name: "User ID",
    item: "Object",
    submit: "Sync",
    searchDistrict: "Search Districts...",
    searchTaluk: "Search Taluks...",
    searchStand: "Search Terminals...",
    terminal: "Terminal",
    taluks: "Taluks",
    stands: "Terminals",
    totalTaluks: "Total Taluks",
    activeStands: "Active Terminals",
    shareApp: "Share System",
    setupTitle: "System Initialization",
    setupDesc: "Connect your project credentials to access live fleet telemetry.",
    setupBtn: "Initialize Link",
    billingInfo: "Billing Docs",
    calculate: "Calculate",
    perKm: "/km",
    baseFare: "Base Fare"
  }
};

const TNPTLogo: React.FC<{ className?: string; light?: boolean }> = ({ className = "w-64", light = false }) => (
  <div className={`flex flex-col items-center gap-2 ${className}`}>
    {/* Header text from the image */}
    <div className={`text-[14px] font-semibold tracking-tight ${light ? 'text-white/80' : 'text-[#1A365D] dark:text-white/80'}`}>
      Tamil Nadu public transport
    </div>
    
    {/* Stylized Bus Graphic from the image */}
    <svg viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-lg">
      {/* Bus Body Shadow */}
      <path d="M40 85L200 85L220 92H20L40 85Z" fill="black" fillOpacity="0.2" />
      
      {/* Main Bus Body (Top Half - Dark Blue) */}
      <path d="M25 45C25 42 28 40 32 40H208C212 40 215 42 215 45V65H25V45Z" fill="#1A365D" />
      
      {/* Lower Bus Body (Bottom Half - White/Silver) */}
      <path d="M25 65H215V75C215 78 212 80 208 80H32C28 80 25 78 25 75V65Z" fill="#E2E8F0" />
      
      {/* Windows */}
      <rect x="35" y="45" width="35" height="15" rx="2" fill="#94A3B8" fillOpacity="0.5" />
      <rect x="75" y="45" width="30" height="15" rx="2" fill="#94A3B8" fillOpacity="0.5" />
      <rect x="110" y="45" width="30" height="15" rx="2" fill="#94A3B8" fillOpacity="0.5" />
      <rect x="145" y="45" width="30" height="15" rx="2" fill="#94A3B8" fillOpacity="0.5" />
      <rect x="180" y="45" width="25" height="15" rx="2" fill="#94A3B8" fillOpacity="0.5" />
      
      {/* Wheels */}
      <circle cx="65" cy="80" r="10" fill="#0A0A0B" stroke="#1A365D" strokeWidth="3" />
      <circle cx="65" cy="80" r="4" fill="#E2E8F0" />
      <circle cx="175" cy="80" r="10" fill="#0A0A0B" stroke="#1A365D" strokeWidth="3" />
      <circle cx="175" cy="80" r="4" fill="#E2E8F0" />
      <circle cx="185" cy="80" r="10" fill="#0A0A0B" stroke="#1A365D" strokeWidth="3" />
      <circle cx="185" cy="80" r="4" fill="#E2E8F0" />
    </svg>

    {/* TNPT Bottom Text from the image */}
    <div className={`text-5xl font-black italic tracking-tighter ${light ? 'text-white' : 'text-[#1A365D] dark:text-[#CCFF00]'}`} style={{ transform: 'skewX(-15deg)' }}>
      TNPT
    </div>
  </div>
);

const RealTimeMap: React.FC<{ bus: Bus }> = ({ bus }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [coords, setCoords] = useState(bus.coordinates);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoords(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0002,
        lng: prev.lng + (Math.random() - 0.5) * 0.0002,
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
        touchZoom: true,
        scrollWheelZoom: false
      }).setView([coords.lat, coords.lng], 15);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(mapRef.current);
    } else {
      mapRef.current.panTo([coords.lat, coords.lng], { animate: true, duration: 1.5 });
    }
    
    const busIcon = L.divIcon({
      className: 'custom-icon',
      html: `
        <div class="relative">
          <div class="absolute -inset-8 bg-[#CCFF00]/15 rounded-full animate-ping"></div>
          <div class="bg-[#CCFF00] text-black border-4 border-[#0A0A0B] rounded-2xl w-14 h-14 flex items-center justify-center shadow-[0_0_35px_rgba(204,255,0,0.6)] relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v11"/><path d="M8 12h8"/><circle cx="12" cy="12" r="10"/></svg>
          </div>
        </div>
      `,
      iconSize: [56, 56],
      iconAnchor: [28, 28]
    });

    if (markerRef.current) {
      markerRef.current.setLatLng([coords.lat, coords.lng]);
    } else {
      markerRef.current = L.marker([coords.lat, coords.lng], { icon: busIcon }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [coords]);

  return <div ref={mapContainerRef} className="w-full h-full bg-[#0A0A0B]" />;
};

const App: React.FC = () => {
  const [isKeySelected, setIsKeySelected] = useState(true);
  const [currentView, setView] = useState<View>('Home');
  const [lang, setLang] = useState<Language>('en');
  const [search, setSearch] = useState<SearchState>({ from: '', to: '' });
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  
  const [activeDistrict, setActiveDistrict] = useState<District | null>(null);

  // Fare related state
  const [fareFrom, setFareFrom] = useState('');
  const [fareTo, setFareTo] = useState('');
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);

  const t = TRANSLATIONS[lang as keyof typeof TRANSLATIONS];

  useEffect(() => {
    // Robust mobile initialization
    const initTimer = setTimeout(() => {
      checkApiKey();
    }, 500);
    return () => clearTimeout(initTimer);
  }, []);

  const checkApiKey = async () => {
    try {
      if ((window as any).aistudio) {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        setIsKeySelected(hasKey);
      }
    } catch (err) {
      console.warn("AIStudio bridge error:", err);
      setIsKeySelected(true);
    }
  };

  const handleOpenSelectKey = async () => {
    try {
      if ((window as any).aistudio) {
        await (window as any).aistudio.openSelectKey();
        setIsKeySelected(true); 
      }
    } catch (err) {
      setIsKeySelected(true);
    }
  };

  const calculateHaversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleCalculateFare = () => {
    const fromCoord = CITY_COORDS[fareFrom];
    const toCoord = CITY_COORDS[fareTo];

    if (fromCoord && toCoord) {
      const dist = calculateHaversine(fromCoord.lat, fromCoord.lng, toCoord.lat, toCoord.lng);
      setCalculatedDistance(parseFloat(dist.toFixed(2)));
      const fare = 10 + (dist * 1.5);
      setEstimatedFare(Math.ceil(fare));
    }
  };

  const handleTrackBus = (bus: Bus) => {
    setSelectedBus(bus);
    setView('Tracking');
  };

  const findBuses = async () => {
    setLoading(true);
    setView('Search');
    try {
      const adviceText = await getSmartTravelAdvice(search.from, search.to, lang);
      setAdvice(adviceText || '');
    } catch (err: any) {
      if (err?.message?.includes("Requested entity was not found")) {
        setIsKeySelected(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderSetupScreen = () => (
    <div className="fixed inset-0 bg-[#0A0A0B] z-[500] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="mb-12 relative">
        <div className="absolute -inset-10 bg-[#CCFF00]/5 rounded-full animate-pulse"></div>
        <TNPTLogo light className="w-64" />
      </div>
      
      <div className="glass p-8 rounded-[2.5rem] border-[#CCFF00]/10 max-w-sm w-full space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#CCFF00]/10 rounded-2xl flex items-center justify-center text-[#CCFF00]">
            <Lock size={32} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-2">{t.setupTitle}</h2>
          <p className="text-xs font-medium text-white/40 leading-relaxed px-4">{t.setupDesc}</p>
        </div>
        
        <button 
          onClick={handleOpenSelectKey}
          className="w-full bg-[#CCFF00] text-black py-5 rounded-2xl font-black italic uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all"
        >
          {t.setupBtn}
        </button>

        <a 
          href="https://ai.google.dev/gemini-api/docs/billing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00E5FF] hover:opacity-80 transition-opacity"
        >
          <span className="flex items-center gap-1"><Info size={14} /> {t.billingInfo}</span>
        </a>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="px-6 pt-10 pb-52 animate-in fade-in zoom-in-95 duration-500 overflow-y-auto h-screen no-scrollbar fade-slide-up">
      <header className="mb-12 flex flex-col items-center text-center">
        <div className="flex justify-between w-full items-center mb-6">
           <div className="w-12"></div>
           <TNPTLogo className="w-64" />
           <button 
             onClick={() => setLang(lang === 'ta' ? 'en' : 'ta')}
             className="bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-lg font-bold text-[8px] tracking-widest uppercase hover:bg-[#CCFF00] hover:text-black transition-all"
           >
             {lang === 'ta' ? 'EN' : 'TA'}
           </button>
        </div>
        <p className="text-[10px] font-black text-[#CCFF00] uppercase tracking-[0.4em] animate-pulse">24/7 LIVE TERMINAL</p>
      </header>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="glass rounded-[1.5rem] p-5 flex flex-col justify-between border-white/10 relative overflow-hidden bg-white/[0.01] hover:border-[#00E5FF]/20 transition-all cursor-pointer" onClick={() => setView('Tracking')}>
           <div className="flex justify-between items-start mb-2">
             <Radio size={18} className="text-[#00E5FF] animate-pulse" />
             <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">Live Uplink</span>
           </div>
           <div>
             <p className="text-xl font-black italic text-white leading-none uppercase">GPS ACTIVE</p>
             <p className="text-[7px] font-bold text-white/40 uppercase mt-1">Satellite Lock: 14</p>
           </div>
           <div className="absolute bottom-0 left-0 h-1 bg-[#00E5FF]/20 w-full">
             <div className="h-full bg-[#00E5FF] w-[88%]"></div>
           </div>
        </div>
        <div className="glass rounded-[1.5rem] p-5 flex flex-col justify-between border-white/10 relative overflow-hidden bg-white/[0.01] hover:border-[#CCFF00]/20 transition-all cursor-pointer" onClick={() => setView('DistrictExplorer')}>
           <div className="flex justify-between items-start mb-2">
             <Activity size={18} className="text-[#CCFF00]" />
             <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">Fleet Status</span>
           </div>
           <div>
             <p className="text-xl font-black italic text-white leading-none uppercase">2,842 UNITS</p>
             <p className="text-[7px] font-bold text-white/40 uppercase mt-1">Operating Sector-7</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-10 px-1">
        {[
          { id: 'Search', icon: NavIcon, label: t.trackBus, color: 'bg-[#CCFF00]', tColor: 'text-black' },
          { id: 'MoreTools', icon: Search, label: t.showBuses, color: 'bg-white/5', tColor: 'text-[#CCFF00]' },
          { id: 'DistrictExplorer', icon: LayoutGrid, label: t.districts, color: 'bg-white/5', tColor: 'text-white' },
          { id: 'Fare', icon: Calculator, label: t.fare, color: 'bg-white/5', tColor: 'text-orange-400' },
          { id: 'Tourism', icon: Palmtree, label: t.places, color: 'bg-white/5', tColor: 'text-[#00E5FF]' },
          { id: 'LostFound', icon: LifeBuoy, label: t.lostFound, color: 'bg-white/5', tColor: 'text-red-400' },
          { id: 'SOS', icon: ShieldAlert, label: t.sos, color: 'bg-red-600', tColor: 'text-white' },
          { id: 'Weather', icon: CloudSun, label: t.weather, color: 'bg-white/5', tColor: 'text-yellow-400' },
          { id: 'AIAssistant', icon: MessageSquare, label: t.aiAssistant, color: 'bg-white/5', tColor: 'text-purple-400' }
        ].map((app, idx) => (
          <div key={idx} onClick={() => setView(app.id as View)} className="flex flex-col items-center gap-3 group cursor-pointer active:scale-90 transition-all">
            <div className={`w-20 h-20 ${app.color} rounded-[1.75rem] flex items-center justify-center border border-white/5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <app.icon className={`${app.tColor}`} size={30} strokeWidth={3} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/50 text-center leading-tight group-hover:text-white transition-colors">{app.label}</span>
          </div>
        ))}
      </div>

      <div className="glass rounded-[2rem] p-8 mb-8 border-white/10 shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all rotate-12">
            <BusFront size={120} />
         </div>
         <h2 className="text-xl font-black italic mb-6 flex items-center gap-3 relative z-10 text-white">
          <Zap className="text-[#CCFF00]" size={24} />
          Terminal Access
        </h2>
        <div className="space-y-4 relative z-10">
          <input 
              type="text" 
              placeholder={t.departure}
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl font-bold text-sm placeholder:text-white/10 outline-none focus:border-[#CCFF00]/40 transition-all text-white"
              value={search.from}
              onChange={(e) => setSearch({...search, from: e.target.value})}
            />
            <input 
              type="text" 
              placeholder={t.destination}
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl font-bold text-sm placeholder:text-white/10 outline-none focus:border-[#CCFF00]/40 transition-all text-white"
              value={search.to}
              onChange={(e) => setSearch({...search, to: e.target.value})}
            />
            <button 
              onClick={findBuses}
              className="w-full bg-[#CCFF00] text-black p-5 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all mt-2 italic shadow-lg"
            >
              INITIALIZE SCAN
            </button>
        </div>
      </div>
    </div>
  );

  const renderFare = () => (
    <div className="px-6 pt-10 pb-52 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto h-screen no-scrollbar fade-slide-up">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('Home')} className="w-12 h-12 glass rounded-xl flex items-center justify-center border-white/10 text-white">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter text-white">{t.fare}</h2>
          <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1">Route-Based Estimation</p>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-8 mb-8 border-white/10 space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <MapPinIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-[#CCFF00]" size={18} />
            <select 
              value={fareFrom}
              onChange={(e) => setFareFrom(e.target.value)}
              className="w-full bg-white/10 border border-white/10 p-5 pl-14 rounded-2xl font-bold text-sm text-white appearance-none outline-none focus:border-[#CCFF00]/40"
            >
              <option value="" className="bg-[#0A0A0B]">{t.departure}</option>
              {Object.keys(CITY_COORDS).map(city => (
                <option key={city} value={city} className="bg-[#0A0A0B]">{city}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-center -my-3 relative z-10">
            <div className="w-10 h-10 bg-[#CCFF00] rounded-full flex items-center justify-center text-black border-4 border-[#0A0A0B] shadow-lg">
              <ArrowUpDown size={16} strokeWidth={3} />
            </div>
          </div>

          <div className="relative">
            <Navigation2 className="absolute left-5 top-1/2 -translate-y-1/2 text-[#00E5FF]" size={18} />
            <select 
              value={fareTo}
              onChange={(e) => setFareTo(e.target.value)}
              className="w-full bg-white/10 border border-white/10 p-5 pl-14 rounded-2xl font-bold text-sm text-white appearance-none outline-none focus:border-[#00E5FF]/40"
            >
              <option value="" className="bg-[#0A0A0B]">{t.destination}</option>
              {Object.keys(CITY_COORDS).map(city => (
                <option key={city} value={city} className="bg-[#0A0A0B]">{city}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          onClick={handleCalculateFare}
          disabled={!fareFrom || !fareTo}
          className="w-full py-5 bg-[#CCFF00] text-black rounded-2xl font-black italic uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all disabled:opacity-20"
        >
          {t.calculate}
        </button>
      </div>

      {calculatedDistance !== null && (
        <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
          <div className="glass rounded-[2rem] p-10 border-[#CCFF00]/20 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12 group-hover:opacity-10 transition-opacity">
              <Calculator size={120} />
            </div>
            
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">{t.distance}</p>
            <div className="flex items-baseline justify-center gap-2">
              <h3 className="text-8xl font-black italic tracking-tighter text-[#CCFF00] animate-pulse">
                {calculatedDistance}
              </h3>
              <span className="text-2xl font-black italic text-[#CCFF00]">KM</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="glass rounded-3xl p-6 border-white/5">
                <div className="flex items-center gap-2 text-white/30 mb-2">
                  <IndianRupee size={14} />
                  <span className="text-[8px] font-black uppercase tracking-widest">{t.estimatedFare}</span>
                </div>
                <p className="text-3xl font-black italic text-[#00E5FF]">₹{estimatedFare}</p>
             </div>
             <div className="glass rounded-3xl p-6 border-white/5">
                <div className="flex items-center gap-2 text-white/30 mb-2">
                  <Info size={14} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Pricing Logic</span>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-white/60">Base: ₹10</p>
                  <p className="text-[10px] font-bold text-white/60">Rate: ₹1.5{t.perKm}</p>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderView = () => {
    switch (currentView) {
      case 'Home': return renderHome();
      case 'Search': return renderSearch();
      case 'Tracking': return renderTracking();
      case 'DistrictExplorer': return renderDistrictExplorer();
      case 'MoreTools': return renderMoreTools();
      case 'SOS': return renderSOS();
      case 'Fare': return renderFare();
      case 'Tourism': return renderTourism();
      case 'LostFound': return renderLostFound();
      case 'Weather': return renderWeather();
      case 'AIAssistant': return renderAIAssistant();
      default: return renderHome();
    }
  };

  const renderSearch = () => (
    <div className="px-6 pt-10 pb-52 animate-in fade-in slide-in-from-right-4 duration-500 overflow-y-auto h-screen no-scrollbar fade-slide-up">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('Home')} className="w-12 h-12 glass rounded-xl flex items-center justify-center border-white/10 text-white">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter leading-none text-white">{t.results}</h2>
          <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1">{search.from} → {search.to}</p>
        </div>
      </div>
      {advice && !loading && (
        <div className="glass rounded-[1.5rem] p-6 mb-6 border-[#CCFF00]/10 bg-[#CCFF00]/5">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare size={16} className="text-[#CCFF00]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#CCFF00]">AI Guidance</span>
          </div>
          <p className="text-base font-medium italic text-white/80 leading-relaxed">{advice}</p>
        </div>
      )}
      <div className="space-y-4">
        {MOCK_BUSES.map(bus => (
          <BusCard key={bus.id} bus={bus} onTrack={handleTrackBus} lang={lang} />
        ))}
      </div>
    </div>
  );

  const renderWeather = () => (
    <div className="px-6 pt-10 pb-52 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto h-screen fade-slide-up">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('Home')} className="w-12 h-12 glass rounded-xl flex items-center justify-center border-white/10 text-white">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-3xl font-black italic tracking-tighter text-white">{t.weather}</h2>
      </div>
      <div className="glass p-10 rounded-[2.5rem] border-white/5 text-center mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10"><CloudSun size={120} className="text-yellow-400" /></div>
        <p className="text-xs font-bold text-white/40 uppercase tracking-[0.3em] mb-4">Chennai Terminal</p>
        <h3 className="text-8xl font-black italic tracking-tighter text-[#CCFF00]">32°</h3>
      </div>
    </div>
  );

  const renderAIAssistant = () => (
    <div className="px-6 pt-10 pb-52 h-screen flex flex-col no-scrollbar fade-slide-up">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('Home')} className="w-12 h-12 glass rounded-xl flex items-center justify-center border-white/10 text-white"><ArrowLeft size={20} /></button>
        <h2 className="text-3xl font-black italic tracking-tighter text-white">Core AI</h2>
      </div>
      <div className="flex-1 space-y-4 mb-6">
        <div className="glass p-5 rounded-2xl rounded-tl-none border-[#CCFF00]/10 max-w-[85%]">
          <p className="text-sm font-bold italic text-white">TNPT terminal linked. How can I assist with your Tamil Nadu transit telemetry today?</p>
        </div>
      </div>
      <div className="glass p-2 rounded-3xl flex gap-2 border-white/10">
         <input type="text" className="flex-1 bg-transparent border-none outline-none p-3 font-bold text-xs" placeholder="Ask Core AI..." />
         <button className="w-12 h-12 bg-[#CCFF00] text-black rounded-2xl flex items-center justify-center shadow-lg"><Send size={18} strokeWidth={3} /></button>
      </div>
    </div>
  );

  const renderTracking = () => (
    selectedBus && (
      <div className="fixed inset-0 bg-[#0A0A0B] z-[60] flex flex-col animate-in fade-in duration-500">
        <div className="h-[45%] relative">
          <RealTimeMap bus={selectedBus} />
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[100]">
            <button onClick={() => setView('Home')} className="w-12 h-12 glass text-white rounded-xl flex items-center justify-center border-white/10 shadow-2xl backdrop-blur-3xl"><X size={20} /></button>
          </div>
        </div>
        <div className="flex-1 glass rounded-t-[3rem] -mt-10 relative z-[70] p-8 overflow-y-auto border-t border-white/10 shadow-2xl pb-20 no-scrollbar">
          <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8"></div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-4xl font-black italic tracking-tighter text-white">{selectedBus.number}</h2>
              <p className="text-xs font-black text-white/30 uppercase tracking-widest mt-1">{selectedBus.type} Fleet</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-[#CCFF00] italic">{selectedBus.remainingTime}</p>
              <p className="text-[8px] font-black text-[#CCFF00]/40 uppercase tracking-widest">{t.timeToGo}</p>
            </div>
          </div>
          <div className="space-y-4">
             <div className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-xl flex items-center justify-center text-[#00E5FF]"><Navigation2 size={24} /></div>
                  <div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Next Arrival</p>
                    <p className="text-lg font-black italic text-white">{selectedBus.nextStop}</p>
                  </div>
                </div>
                <p className="text-2xl font-black italic text-[#00E5FF]">{selectedBus.eta}</p>
             </div>
          </div>
        </div>
      </div>
    )
  );

  const renderDistrictExplorer = () => (
    <div className="px-6 pt-10 pb-52 h-screen no-scrollbar fade-slide-up">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('Home')} className="w-12 h-12 glass rounded-xl flex items-center justify-center border-white/10 text-white"><ArrowLeft size={20} /></button>
        <h2 className="text-3xl font-black italic tracking-tighter text-white">{t.districts}</h2>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {TAMIL_NADU_DISTRICTS.map(district => (
          <div key={district.name} className="glass p-6 rounded-2xl border-white/5 hover:border-[#CCFF00]/40 transition-all flex items-center justify-between group cursor-pointer" onClick={() => setActiveDistrict(district)}>
            <h3 className="text-xl font-black italic text-white group-hover:text-[#CCFF00]">{district.name}</h3>
            <ChevronRight size={20} className="text-white/10 group-hover:text-[#CCFF00]" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderSOS = () => (
    <div className="fixed inset-0 bg-red-950 z-[100] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <ShieldAlert size={60} className="text-red-500 mb-8 animate-bounce" />
      <h2 className="text-5xl font-black italic text-white mb-4 leading-none uppercase">{t.activatingSOS}</h2>
      <p className="text-red-400/60 font-bold mb-10">Broadcast Sector Alert to TN Police & Transit Authority</p>
      <button onClick={() => setView('Home')} className="glass text-white px-10 py-5 rounded-2xl font-black italic tracking-widest uppercase border-red-500/20 active:scale-95 transition-all">Cancel Action</button>
    </div>
  );

  const renderTourism = () => (
    <div className="px-6 pt-10 pb-52 h-screen no-scrollbar fade-slide-up">
      <div className="flex items-center gap-4 mb-8"><button onClick={() => setView('Home')} className="w-12 h-12 glass rounded-xl flex items-center justify-center border-white/10 text-white"><ArrowLeft size={20} /></button><h2 className="text-3xl font-black italic tracking-tighter text-white">{t.tourism}</h2></div>
      <div className="space-y-4">
        <div className="glass rounded-[2rem] h-52 relative overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700" alt="Meenakshi Amman" />
          <h3 className="absolute bottom-6 left-6 text-2xl font-black italic text-white">Madurai Meenakshi</h3>
        </div>
      </div>
    </div>
  );

  const renderLostFound = () => (
    <div className="px-6 pt-10 pb-52 h-screen no-scrollbar fade-slide-up">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('Home')} className="w-12 h-12 glass rounded-xl flex items-center justify-center border-white/10 text-white">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-3xl font-black italic tracking-tighter text-white">{t.lostFound}</h2>
      </div>
      
      {reportSuccess && (
        <div className="mb-6 glass p-6 border-[#CCFF00]/20 bg-[#CCFF00]/5 rounded-2xl animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3 text-[#CCFF00]">
            <CheckCircle2 size={24} />
            <span className="font-black italic uppercase tracking-widest text-xs">{t.reportSent}</span>
          </div>
        </div>
      )}

      <div className="space-y-4 mb-8">
        <input type="text" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl font-bold text-sm text-white" placeholder="Item Name" />
        <textarea className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl font-bold text-sm text-white h-32" placeholder="Description & Bus Number"></textarea>
      </div>

      <button 
        onClick={() => { 
          setReportSuccess(true); 
          setTimeout(() => setReportSuccess(false), 3000); 
        }} 
        className="w-full bg-[#CCFF00] text-black py-6 rounded-2xl font-black italic uppercase shadow-lg active:scale-95 transition-all"
      >
        {t.submit}
      </button>
    </div>
  );

  const renderMoreTools = () => (
    <div className="px-6 pt-10 pb-52 h-screen no-scrollbar fade-slide-up">
      <h2 className="text-5xl font-black italic text-white mb-10 leading-none">System</h2>
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div onClick={() => setView('SOS')} className="glass rounded-[2.75rem] p-12 flex flex-col items-center gap-4 border-red-500/20 bg-red-500/5 cursor-pointer active:scale-95 transition-all"><ShieldAlert size={40} className="text-red-500" /></div>
        <div onClick={() => setView('DistrictExplorer')} className="glass rounded-[2.75rem] p-12 flex flex-col items-center gap-4 border-white/5 cursor-pointer active:scale-95 transition-all"><LayoutGrid size={40} className="text-white" /></div>
      </div>
    </div>
  );

  const renderLoadingOverlay = () => {
    if (!loading) return null;
    return (
      <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0A0A0B]/90 backdrop-blur-2xl animate-in fade-in duration-300">
        <div className="relative mb-8">
          <div className="absolute -inset-10 bg-[#CCFF00]/10 rounded-full animate-ping"></div>
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(204,255,0,0.1)] relative">
            <RefreshCw size={40} className="text-[#CCFF00] animate-spin" strokeWidth={3} />
          </div>
        </div>
        <p className="text-xl font-black italic uppercase tracking-[0.3em] text-[#CCFF00] animate-pulse">
          {t.syncing}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative max-w-2xl mx-auto bg-[#0A0A0B] text-white overflow-hidden shadow-2xl flex flex-col">
      {!isKeySelected ? renderSetupScreen() : (
        <div className="flex-1 relative flex flex-col h-full overflow-hidden">
          {renderView()}
          {renderLoadingOverlay()}
          {currentView !== 'SOS' && (
            <Navigation currentView={currentView} setView={setView} lang={lang} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
