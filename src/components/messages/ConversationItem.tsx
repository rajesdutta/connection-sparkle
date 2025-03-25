import React from 'react';
import { Link } from 'react-router-dom';

interface ConversationItemProps {
  conversation: {
    id: string;
    user: {
      id: string;
      name: string;
      photo: string;
      online?: boolean;
    };
    lastMessage: {
      text: string;
      timestamp: Date;
      isRead: boolean;
    };
    unreadCount?: number;
  };
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation }) => {
  const { id, user, lastMessage, unreadCount = 0 } = conversation;
  
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    // If message is from today, show time
    if (messageDate.getTime() === today.getTime()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If message is from yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.getTime() === yesterday.getTime()) {
      return 'Yesterday';
    }
    
    // Otherwise show date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <Link 
      to={`/messages/${id}`} 
      className="flex items-center p-4 hover:bg-secondary/50 transition-colors rounded-lg"
    >
      <div className="relative mr-3">
        <img 
          src={user.photo} 
          alt={user.name} 
          className="w-14 h-14 rounded-full object-cover"
        />
        {user.online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium truncate">{user.name}</h3>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(lastMessage.timestamp)}
          </span>
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-muted-foreground truncate">
            {lastMessage.text}
          </p>
          
          {unreadCount > 0 && (
            <div className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ConversationItem;
