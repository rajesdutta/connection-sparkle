
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Edit, LogOut, Camera, ChevronRight, Heart } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const user = {
    name: 'Alex Morgan',
    age: 29,
    location: 'San Francisco, CA',
    bio: 'Passionate photographer and coffee enthusiast. Love hiking and exploring new places. Looking for someone to share adventures with.',
    photos: [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80'
    ],
    interests: ['Photography', 'Hiking', 'Coffee', 'Travel', 'Reading'],
    stats: {
      matches: 32,
      likes: 64,
      conversations: 18
    },
    preferences: {
      ageRange: [25, 35],
      distance: 25,
      lookingFor: 'Women',
      relationshipType: 'Dating'
    }
  };

  const handleLogout = () => {
    // Show confirmation toast
    toast('Logging out...', {
      description: 'You will be redirected to login',
      action: {
        label: 'Cancel',
        onClick: () => {}
      },
    });
    
    // Simulate logout and redirect
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleEditProfile = () => {
    navigate('/onboarding');
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button 
            onClick={() => toast('Settings', { description: 'Settings page coming soon!' })}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>
        
        <div className="flex flex-col items-center px-4 py-6">
          <div className="relative">
            <img 
              src={user.photos[0]} 
              alt={user.name} 
              className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md"
            />
            <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md">
              <Camera size={16} />
            </button>
          </div>
          
          <h2 className="mt-4 text-xl font-bold">{user.name}, {user.age}</h2>
          <p className="text-muted-foreground">{user.location}</p>
          
          <div className="flex mt-4 space-x-2">
            <button
              onClick={handleEditProfile}
              className="flex items-center space-x-1 px-4 py-2 bg-primary text-white rounded-lg button-transition"
            >
              <Edit size={16} />
              <span>Edit Profile</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-4 py-2 bg-secondary text-foreground rounded-lg button-transition"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </div>
        </div>
        
        <div className="flex border-b border-border">
          <button
            className={`flex-1 py-3 text-center font-medium relative ${
              activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
            {activeTab === 'profile' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          
          <button
            className={`flex-1 py-3 text-center font-medium relative ${
              activeTab === 'stats' ? 'text-primary' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('stats')}
          >
            Stats
            {activeTab === 'stats' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          
          <button
            className={`flex-1 py-3 text-center font-medium relative ${
              activeTab === 'preferences' ? 'text-primary' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
            {activeTab === 'preferences' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        </div>
        
        <div className="flex-1 px-4 py-4 overflow-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">About me</h3>
                  <p className="text-sm">{user.bio}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-secondary text-foreground text-sm rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Photo Gallery</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[user.photos[0], ...Array(5)].map((photo, idx) => (
                      <div
                        key={idx}
                        className={`aspect-square rounded-lg overflow-hidden border ${
                          photo ? '' : 'border-dashed border-border/50 flex items-center justify-center bg-secondary/30'
                        }`}
                      >
                        {photo ? (
                          <img
                            src={photo}
                            alt="Gallery"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Camera size={20} className="text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-border/50 text-center">
                    <p className="text-2xl font-bold text-primary">{user.stats.matches}</p>
                    <p className="text-xs text-muted-foreground">Matches</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-border/50 text-center">
                    <p className="text-2xl font-bold text-red-500">{user.stats.likes}</p>
                    <p className="text-xs text-muted-foreground">Likes</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-border/50 text-center">
                    <p className="text-2xl font-bold text-blue-500">{user.stats.conversations}</p>
                    <p className="text-xs text-muted-foreground">Conversations</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm border border-border/50 mb-4">
                  <h3 className="text-sm font-medium mb-4">Activity Overview</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Profile views</span>
                        <span className="font-medium">87</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '65%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Match rate</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '42%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Response rate</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-2 bg-purple-500 rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm border border-border/50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Premium Features</h3>
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">Coming Soon</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Unlock advanced statistics and insights with our premium plan.
                  </p>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'preferences' && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-border/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Age Range</h3>
                        <p className="text-sm text-muted-foreground">
                          {user.preferences.ageRange[0]} - {user.preferences.ageRange[1]} years
                        </p>
                      </div>
                      <ChevronRight size={20} className="text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-border/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Distance</h3>
                        <p className="text-sm text-muted-foreground">
                          Within {user.preferences.distance} miles
                        </p>
                      </div>
                      <ChevronRight size={20} className="text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-border/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Looking For</h3>
                        <p className="text-sm text-muted-foreground">
                          {user.preferences.lookingFor}
                        </p>
                      </div>
                      <ChevronRight size={20} className="text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-border/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Relationship Type</h3>
                        <p className="text-sm text-muted-foreground">
                          {user.preferences.relationshipType}
                        </p>
                      </div>
                      <ChevronRight size={20} className="text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-border/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Advanced Filters</h3>
                        <p className="text-sm text-muted-foreground">
                          Set more specific preferences
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full mr-2">Premium</span>
                        <ChevronRight size={20} className="text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <button
                    className="w-full py-3 mt-4 flex items-center justify-center space-x-2 bg-primary text-white rounded-lg button-transition"
                    onClick={() => navigate('/onboarding')}
                  >
                    <Heart size={18} />
                    <span>Update Preferences</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
