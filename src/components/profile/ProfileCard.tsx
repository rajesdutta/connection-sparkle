
import React, { useState } from 'react';
import { Heart, X, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  user: {
    id: string;
    name: string;
    age: number;
    location: string;
    bio: string;
    photos: string[];
    interests?: string[];
  };
  onLike: (id: string) => void;
  onPass: (id: string) => void;
  onMessage?: (id: string) => void;
  isMatch?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  user, 
  onLike, 
  onPass, 
  onMessage, 
  isMatch = false 
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  
  const nextPhoto = () => {
    if (currentPhotoIndex < user.photos.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1);
    }
  };
  
  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    }
  };

  return (
    <motion.div 
      className="relative rounded-2xl overflow-hidden bg-white shadow-xl mx-auto max-w-sm w-full h-[70vh] card-hover"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3 }}
      drag={!isMatch ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={() => setDragging(true)}
      onDragEnd={(e, info) => {
        setDragging(false);
        if (info.offset.x > 100) {
          onLike(user.id);
        } else if (info.offset.x < -100) {
          onPass(user.id);
        }
      }}
      style={{ 
        x: dragging ? undefined : 0,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
      
      <div className="absolute top-4 left-0 right-0 z-20 flex justify-center">
        <div className="flex space-x-1">
          {user.photos.map((_, index) => (
            <div 
              key={index} 
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentPhotoIndex ? 'w-6 bg-white' : 'w-3 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0">
        <img
          src={user.photos[currentPhotoIndex]}
          alt={`${user.name}'s photo`}
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="absolute left-4 right-4 bottom-6 z-20 text-white">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">{user.name}, {user.age}</h2>
            <p className="text-white/80">{user.location}</p>
            
            {user.interests && user.interests.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {user.interests.map((interest, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <p className="mt-2 text-sm line-clamp-3">{user.bio}</p>
      </div>
      
      {/* Tap areas for photo navigation */}
      <button 
        className="absolute top-0 left-0 w-1/2 h-full z-10 focus:outline-none" 
        onClick={(e) => {
          e.stopPropagation();
          prevPhoto();
        }}
      />
      <button 
        className="absolute top-0 right-0 w-1/2 h-full z-10 focus:outline-none" 
        onClick={(e) => {
          e.stopPropagation();
          nextPhoto();
        }}
      />
      
      {/* Action buttons */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-6">
        <motion.button
          className="w-16 h-16 rounded-full bg-white text-red-500 shadow-lg flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
          onClick={() => onPass(user.id)}
        >
          <X size={28} />
        </motion.button>
        
        <motion.button
          className="w-16 h-16 rounded-full bg-primary text-white shadow-lg flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
          onClick={() => onLike(user.id)}
        >
          <Heart size={28} />
        </motion.button>
        
        {isMatch && onMessage && (
          <motion.button
            className="w-16 h-16 rounded-full bg-white text-primary shadow-lg flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
            onClick={() => onMessage && onMessage(user.id)}
          >
            <MessageCircle size={28} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCard;
