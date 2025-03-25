import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ConversationItem from '../components/messages/ConversationItem';
import LoadingAnimation from '../components/ui/LoadingAnimation';
import { Search } from 'lucide-react';

const Messages = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for conversations
  const mockConversations = [
    {
      id: '1',
      user: {
        id: '1',
        name: 'Sophia',
        photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
        online: true
      },
      lastMessage: {
        text: 'Would you like to meet for coffee this weekend?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        isRead: false
      },
      unreadCount: 1
    },
    {
      id: '2',
      user: {
        id: '2',
        name: 'James',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        online: true
      },
      lastMessage: {
        text: "That sounds perfect! I'll see you then.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        isRead: true
      }
    },
    {
      id: '3',
      user: {
        id: '3',
        name: 'Emma',
        photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80'
      },
      lastMessage: {
        text: 'Have you been to that new restaurant downtown?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
        isRead: true
      }
    },
    {
      id: '4',
      user: {
        id: '4',
        name: 'Michael',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        online: true
      },
      lastMessage: {
        text: 'Just matched with you!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        isRead: false
      },
      unreadCount: 1
    },
    {
      id: '5',
      user: {
        id: '5',
        name: 'Olivia',
        photo: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=400&q=80'
      },
      lastMessage: {
        text: 'Yes, I love hiking too! Do you have any favorite trails?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 hours ago
        isRead: true
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setConversations(mockConversations);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredConversations = conversations.filter(convo => 
    convo.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort conversations by timestamp (newest first)
  const sortedConversations = [...filteredConversations].sort((a, b) => 
    b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime()
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <div className="p-4 h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
        
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="pl-10 w-full py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
          />
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <LoadingAnimation size="large" />
            <p className="mt-4 text-muted-foreground">Loading your messages...</p>
          </div>
        ) : sortedConversations.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-2">No conversations found</p>
            <p className="text-sm text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search' : 'Match with people to start chatting!'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-secondary text-foreground rounded-lg"
              >
                Clear Search
              </button>
            )}
            <button
              onClick={() => navigate('/discover')}
              className="w-full mt-4 py-3 bg-primary text-white rounded-lg button-transition"
            >
              Find Matches
            </button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2 divide-y divide-border"
          >
            {sortedConversations.map(conversation => (
              <motion.div
                key={conversation.id}
                variants={itemVariants}
              >
                <ConversationItem conversation={conversation} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default Messages;
