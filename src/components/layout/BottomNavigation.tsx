
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Heart, MessageCircle } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 glass-effect border-t border-border/30 shadow-lg">
      <div className="container mx-auto px-4">
        <nav className="flex justify-around items-center h-16">
          <NavLink 
            to="/discover" 
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-16 h-16 button-transition ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            <Home size={24} />
            <span className="text-xs mt-1">Discover</span>
          </NavLink>
          
          <NavLink 
            to="/matches" 
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-16 h-16 button-transition ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            <Heart size={24} />
            <span className="text-xs mt-1">Matches</span>
          </NavLink>
          
          <NavLink 
            to="/messages" 
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-16 h-16 button-transition ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            <MessageCircle size={24} />
            <span className="text-xs mt-1">Messages</span>
          </NavLink>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-16 h-16 button-transition ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`
            }
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default BottomNavigation;
