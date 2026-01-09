
import React from 'react';
import { Home, Search, Settings2 } from 'lucide-react';
import { View, Language } from '../types';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
  lang?: Language;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, lang = 'ta' }) => {
  const isTa = lang === 'ta';

  const navItems = [
    { id: 'Home', icon: Home, label: isTa ? 'முகப்பு' : 'HOME' },
    { id: 'Search', icon: Search, label: isTa ? 'தேடல்' : 'RADAR' },
    { id: 'MoreTools', icon: Settings2, label: isTa ? 'வசதிகள்' : 'SYSTEM' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none">
      <nav className="max-w-md mx-auto glass rounded-[2rem] p-3 flex justify-around items-center border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] pointer-events-auto backdrop-blur-3xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id || (item.id === 'MoreTools' && ['Fare', 'Tourism', 'LostFound', 'DistrictExplorer', 'SOS'].includes(currentView));
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`flex flex-col items-center transition-all flex-1 py-1 gap-1 relative group ${
                isActive ? 'text-[#CCFF00]' : 'text-white/20 hover:text-white/50'
              }`}
            >
              {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#CCFF00] rounded-full shadow-[0_0_12px_#CCFF00]"></div>
              )}
              <Icon 
                size={isActive ? 22 : 20} 
                strokeWidth={isActive ? 3 : 2} 
                className="transition-all"
              />
              <span className={`text-[9px] font-black uppercase tracking-[0.1em] transition-all ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;
