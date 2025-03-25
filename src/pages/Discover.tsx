
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import MainLayout from '../components/layout/MainLayout';
import ProfileCard from '../components/profile/ProfileCard';
import LoadingAnimation from '../components/ui/LoadingAnimation';

const Discover = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  
  // Mock data for users
  const users = [
    {
      id: '1',
      name: 'Sophia',
      age: 28,
      location: 'San Francisco',
      bio: 'Photography enthusiast and coffee lover. Looking for someone to explore the city with.',
      photos: [
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
      ],
      interests: ['Photography', 'Coffee', 'Travel']
    },
    {
      id: '2',
      name: 'James',
      age: 32,
      location: 'New York',
      bio: 'Musician and foodie. Love trying new restaurants and going to live shows.',
      photos: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1553267751-1c148a7280a1?auto=format&fit=crop&w=800&q=80'
      ],
      interests: ['Music', 'Food', 'Concerts']
    },
    {
      id: '3',
      name: 'Emma',
      age: 26,
      location: 'Los Angeles',
      bio: 'Yoga teacher and beach lover. Passionate about wellness and mindfulness.',
      photos: [
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=800&q=80'
      ],
      interests: ['Yoga', 'Beach', 'Meditation']
    }
  ];

  const handleLike = (userId: string) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Show match animation occasionally
      const isMatch = Math.random() > 0.7;
      
      if (isMatch) {
        setShowMatchAnimation(true);
        setTimeout(() => {
          setShowMatchAnimation(false);
          nextUser();
          setLoading(false);
        }, 3000);
      } else {
        toast('Liked!', {
          description: `You liked ${users[currentUserIndex].name}!`,
          position: 'top-center'
        });
        nextUser();
        setLoading(false);
      }
    }, 500);
  };

  const handlePass = (userId: string) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast('Passed', {
        description: `You passed on ${users[currentUserIndex].name}`,
        position: 'top-center'
      });
      nextUser();
      setLoading(false);
    }, 500);
  };

  const nextUser = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
    } else {
      // End of user stack
      setNoMoreProfiles(true);
    }
  };

  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [noMoreProfiles, setNoMoreProfiles] = useState(false);

  const restartDiscovery = () => {
    setCurrentUserIndex(0);
    setNoMoreProfiles(false);
  };

  return (
    <MainLayout>
      <div className="p-4 h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Discover</h1>
        </div>
        
        <div className="flex items-center justify-center h-[75vh]">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <LoadingAnimation size="large" />
              <p className="mt-4 text-muted-foreground">Loading profiles...</p>
            </div>
          ) : noMoreProfiles ? (
            <motion.div 
              className="text-center p-6 rounded-2xl bg-white shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-semibold mb-2">No More Profiles</h2>
              <p className="text-muted-foreground mb-6">
                We're finding more people for you. Check back soon!
              </p>
              <button 
                onClick={restartDiscovery}
                className="px-6 py-3 bg-primary text-white rounded-lg button-transition"
              >
                Restart Discovery
              </button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <ProfileCard 
                key={users[currentUserIndex].id}
                user={users[currentUserIndex]}
                onLike={handleLike}
                onPass={handlePass}
              />
            </AnimatePresence>
          )}
        </div>
        
        {/* Match Animation */}
        <AnimatePresence>
          {showMatchAnimation && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-center p-8"
              >
                <motion.div 
                  className="mb-6 text-6xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                  transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                >
                  ✨
                </motion.div>
                
                <motion.h2 
                  className="text-4xl font-bold mb-4 text-white"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  It's a Match!
                </motion.h2>
                
                <motion.p 
                  className="text-white/80 mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  You and {users[currentUserIndex].name} liked each other
                </motion.p>
                
                <motion.div
                  className="flex justify-center space-x-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <button 
                    className="px-6 py-3 bg-white text-primary rounded-lg button-transition"
                    onClick={() => {
                      setShowMatchAnimation(false);
                      navigate('/messages');
                    }}
                  >
                    Send Message
                  </button>
                  
                  <button 
                    className="px-6 py-3 bg-primary text-white rounded-lg button-transition"
                    onClick={() => {
                      setShowMatchAnimation(false);
                    }}
                  >
                    Keep Browsing
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default Discover;
