import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Overview from './pages/Overview';
import Assets from './pages/Assets';
import MapPage from './pages/MapPage';
import CreativeInsights from './pages/CreativeInsights';
import Uplift from './pages/Uplift';
import Report from './pages/Report';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HashRouter>
      <div className="flex h-screen bg-white overflow-hidden text-black font-sans">
        <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        
        {/* Mobile Overlay Backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
            onClick={closeMobileMenu}
          ></div>
        )}

        {/* 
            Fixed: Added min-h-0 to flex-1 container to ensure proper height calculation for children (Leaflet Map) 
            Fixed: Relative positioning for TopBar context
        */}
        <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative min-h-0">
          <TopBar onMenuClick={toggleMobileMenu} />
          <main className="flex-1 overflow-y-auto bg-neutral-50 scroll-smooth min-h-0 relative">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/creative" element={<CreativeInsights />} />
              <Route path="/uplift" element={<Uplift />} />
              <Route path="/report" element={<Report />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;