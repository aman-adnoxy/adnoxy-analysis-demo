import React from 'react';
import { Calendar, Bell, Menu } from 'lucide-react';
import { CAMPAIGN_SUMMARY } from '../data/mockData';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-[2000] flex-shrink-0 shadow-sm md:shadow-none">
      <div className="flex items-center gap-3 flex-1">
        <button 
          onClick={onMenuClick}
          className="md:hidden text-black hover:bg-neutral-100 p-2 rounded-md transition-colors"
        >
          <Menu size={24} />
        </button>
        
        {/* Logo */}
        <div className="flex items-center gap-2">
            <div className="bg-black text-white p-1">
                <img src="/images/adnoxy-ai.png" className={`w-5 h-auto`} />
            </div>
            <span className="font-bold text-sm tracking-tight font-heading">ADNOXY AI</span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button className="text-neutral-400 hover:text-black relative transition-colors p-2">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-black rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;