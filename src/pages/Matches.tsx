
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LoadingAnimation from '../components/ui/LoadingAnimation';
import { Search } from 'lucide-react';

const Matches = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for matches
  const mockMatches = [
    {
      id: '1',
      name: 'Sophia',
      photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
      matchDate: new Date(Date.now() - 3600000 * 24 * 2), // 2 days ago
      lastActive: '2 hours ago',
      compatibility: 92
    },
    {
      id: '2',
      name: 'James',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      matchDate: new Date(Date.now() - 3600000 * 24), // 1 day ago
      lastActive: 'Just now',
      compatibility: 85
    },
    {
      id: '3',
      name: 'Emma',
      photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
      matchDate: new Date(Date.now() - 3600000 * 4), // 4 hours ago
      lastActive: '4 hours ago',
      compatibility: 78
    },
    {
      id: '4',
      name: 'Michael',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      matchDate: new Date(Date.now() - 3600000 * 12), // 12 hours ago
      lastActive: '30 minutes ago',
      compatibility: 88
    },
    {
      id: '5',
      name: 'Olivia',
      photo: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=800&q=80',
      matchDate: new Date(Date.now() - 3600000 * 8), // 8 hours ago
      lastActive: '1 hour ago',
      compatibility: 95
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMatches(mockMatches);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredMatches = matches.filter(match => 
    match.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort matches by date (newest first)
  const sortedMatches = [...filteredMatches].sort((a, b) => 
    b.matchDate.getTime() - a.matchDate.getTime()
  );

  const formatMatchDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <MainLayout>
      <div className="p-4 h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Matches</h1>
        </div>
        
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search matches..."
            className="pl-10 w-full py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
          />
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <LoadingAnimation size="large" />
            <p className="mt-4 text-muted-foreground">Loading your matches...</p>
          </div>
        ) : sortedMatches.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-2">No matches found</p>
            <p className="text-sm text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search' : 'Keep swiping to find new matches!'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-secondary text-foreground rounded-lg"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4"
          >
            {sortedMatches.map(match => (
              <motion.div
                key={match.id}
                variants={itemVariants}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => navigate(`/messages/${match.id}`)}
              >
                <div className="relative">
                  <img 
                    src={match.photo} 
                    alt={match.name} 
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {match.compatibility}% Match
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{match.name}</h3>
                    <span className="text-xs text-muted-foreground">{formatMatchDate(match.matchDate)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{match.lastActive}</p>
                  
                  <button
                    className="w-full mt-3 py-2 text-xs bg-primary text-white rounded-lg button-transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/messages/${match.id}`);
                    }}
                  >
                    Message
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default Matches;
