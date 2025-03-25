
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Phone, Video, Image } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import MessageBubble from '../components/messages/MessageBubble';
import LoadingAnimation from '../components/ui/LoadingAnimation';

const MessageDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock conversation data
  const mockConversations = {
    '1': {
      user: {
        id: '1',
        name: 'Sophia',
        photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
        online: true,
        lastActive: 'Just now'
      },
      messages: [
        {
          id: '1-1',
          text: 'Hi there! I noticed we both like photography.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          isSender: false,
          isRead: true
        },
        {
          id: '1-2',
          text: 'Yes! I love capturing moments, especially during my travels. What kind of photography do you enjoy?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.9), // 1.9 hours ago
          isSender: true,
          isRead: true
        },
        {
          id: '1-3',
          text: 'I\'m really into street photography and portraits. I think they tell such interesting stories about people and places.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.8), // 1.8 hours ago
          isSender: false,
          isRead: true
        },
        {
          id: '1-4',
          text: 'That sounds amazing! I'd love to see some of your work sometime.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
          isSender: true,
          isRead: true
        },
        {
          id: '1-5',
          text: 'Would you like to meet for coffee this weekend? We could talk more about photography.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          isSender: false,
          isRead: false
        }
      ]
    },
    '2': {
      user: {
        id: '2',
        name: 'James',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        online: true,
        lastActive: 'Just now'
      },
      messages: [
        {
          id: '2-1',
          text: 'Hey! Just saw we matched.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
          isSender: false,
          isRead: true
        },
        {
          id: '2-2',
          text: 'Hi James! How are you doing today?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30), // 2 days ago + 30 min
          isSender: true,
          isRead: true
        },
        {
          id: '2-3',
          text: 'I\'m doing great, thanks for asking! I see you like hiking too. Any favorite trails?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          isSender: false,
          isRead: true
        },
        {
          id: '2-4',
          text: 'Yes! I love the trails around Mount Tam. Have you been there?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
          isSender: true,
          isRead: true
        },
        {
          id: '2-5',
          text: 'I haven\'t but I\'ve heard it\'s beautiful! Maybe we could go sometime?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          isSender: false,
          isRead: true
        },
        {
          id: '2-6',
          text: 'That sounds perfect! I'll see you then.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          isSender: true,
          isRead: true
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (id && mockConversations[id as keyof typeof mockConversations]) {
        setConversation(mockConversations[id as keyof typeof mockConversations]);
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    setSending(true);
    
    // Simulate API call
    setTimeout(() => {
      const newMsg = {
        id: `new-${Date.now()}`,
        text: newMessage,
        timestamp: new Date(),
        isSender: true,
        isRead: false
      };
      
      setConversation(prev => ({
        ...prev,
        messages: [...prev.messages, newMsg]
      }));
      
      setNewMessage('');
      setSending(false);
      
      // Simulate reply after 2 seconds
      setTimeout(() => {
        const replyMsg = {
          id: `reply-${Date.now()}`,
          text: getRandomReply(),
          timestamp: new Date(),
          isSender: false,
          isRead: true
        };
        
        setConversation(prev => ({
          ...prev,
          messages: [...prev.messages, replyMsg]
        }));
      }, 2000);
    }, 500);
  };

  const getRandomReply = () => {
    const replies = [
      "That's interesting! Tell me more.",
      "I was just thinking about that too!",
      "Sounds great! When would you like to meet?",
      "I'd love to hear more about that.",
      "That's awesome! I've been wanting to try that too.",
      "What else do you enjoy doing in your free time?",
      "Haha, you're funny! 😊",
      "I really like talking with you.",
      "Yes, I agree completely!",
      "I haven't thought about it that way before."
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  if (loading) {
    return (
      <MainLayout hideNav>
        <div className="flex flex-col items-center justify-center h-screen">
          <LoadingAnimation size="large" />
          <p className="mt-4 text-muted-foreground">Loading conversation...</p>
        </div>
      </MainLayout>
    );
  }

  if (!conversation) {
    return (
      <MainLayout hideNav>
        <div className="flex flex-col items-center justify-center h-screen p-4">
          <p className="text-xl text-center mb-4">Conversation not found</p>
          <button
            onClick={() => navigate('/messages')}
            className="px-6 py-3 bg-primary text-white rounded-lg button-transition"
          >
            Back to Messages
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout hideNav>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="glass-effect border-b border-border/30 p-4 flex items-center z-10">
          <button
            onClick={() => navigate('/messages')}
            className="mr-3 p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="relative">
            <img 
              src={conversation.user.photo} 
              alt={conversation.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {conversation.user.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          
          <div className="ml-3 flex-1">
            <h2 className="font-semibold">{conversation.user.name}</h2>
            <p className="text-xs text-muted-foreground">
              {conversation.user.online ? 'Online' : conversation.user.lastActive}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Phone size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Video size={20} />
            </button>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-background">
          <div className="space-y-3 py-2">
            {conversation.messages.map((message: any) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Message Input */}
        <div className="glass-effect border-t border-border/30 p-3">
          <div className="flex items-center">
            <button className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors">
              <Image size={20} />
            </button>
            
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 mx-2 px-4 py-2 rounded-full border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${
                newMessage.trim() 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary text-muted-foreground'
              } transition-colors`}
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending}
            >
              {sending ? (
                <LoadingAnimation size="small" color="primary-foreground" />
              ) : (
                <Send size={20} />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MessageDetail;
