
import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, hideNav = false }) => {
  const location = useLocation();
  const isOnboarding = location.pathname === '/onboarding';

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background">
      <main className="flex-1 overflow-auto pb-16 page-transition">
        {children}
      </main>
      {!hideNav && !isOnboarding && <BottomNavigation />}
    </div>
  );
};

export default MainLayout;
