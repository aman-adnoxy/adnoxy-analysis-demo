import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Image, TrendingUp, FileText, Layers, Box, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: Layers, label: 'Assets', path: '/assets' },
    { icon: Map, label: 'Geo Intelligence', path: '/map' },
    { icon: Image, label: 'Creative AI', path: '/creative' },
    { icon: TrendingUp, label: 'Uplift & ROI', path: '/uplift' },
    { icon: FileText, label: 'Report', path: '/report' },
  ];

  return (
    <div 
      className={`
        fixed inset-y-0 left-0 z-[3000] w-64 bg-black text-white flex flex-col h-full border-r border-neutral-800 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
        {/* Logo Section - Hidden on Mobile, Visible on Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <img src="images/adnoxy-ai.png" className={`w-10 h-auto`} />
          <div>
              <h1 className="font-bold text-xl tracking-tight font-heading">ADNOXY AI</h1>
              <p className="text-xs text-neutral-400">Intelligence Platform</p>
          </div>
        </div>
        
        {/* Mobile Header in Drawer - Just Close Button or Minimal Title */}
        <div className="md:hidden flex items-center gap-2 text-white">
            <span className="font-bold font-heading text-lg">Menu</span>
        </div>

        <button onClick={onClose} className="md:hidden text-neutral-400 hover:text-white">
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-white">
            JD
          </div>
          <div>
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-neutral-500">Media Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;