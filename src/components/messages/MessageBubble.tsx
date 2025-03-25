
import React from 'react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: {
    id: string;
    text: string;
    timestamp: Date;
    isSender: boolean;
    isRead?: boolean;
  };
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { text, timestamp, isSender, isRead } = message;
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div 
      className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-3`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
          isSender 
            ? 'bg-primary text-white rounded-br-none' 
            : 'bg-secondary text-foreground rounded-bl-none'
        }`}
      >
        <p className="text-sm">{text}</p>
        <div className={`flex items-center justify-end mt-1 text-xs ${isSender ? 'text-white/70' : 'text-muted-foreground'}`}>
          <span>{formatTime(timestamp)}</span>
          {isSender && (
            <span className="ml-1">
              {isRead ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
