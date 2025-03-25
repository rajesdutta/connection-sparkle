
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Find Your Perfect Match",
      description: "Discover meaningful connections with people who share your interests and values.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Genuine Conversations",
      description: "Our intelligent matching system helps you connect with people you'll click with.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Real Relationships",
      description: "We focus on creating a community of people looking for authentic connections.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80"
    }
  ];
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-10" />
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold mb-2">{slides[currentSlide].title}</h1>
                <p className="text-white/80 mb-6">{slides[currentSlide].description}</p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="p-8 bg-white">
        <div className="flex justify-center space-x-2 mb-6">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-primary' : 'w-4 bg-secondary'
              }`}
            />
          ))}
        </div>
        
        <motion.button
          className="w-full py-4 rounded-lg bg-primary text-white font-medium flex items-center justify-center space-x-2 button-transition"
          whileTap={{ scale: 0.98 }}
          onClick={nextSlide}
        >
          <span>{currentSlide < slides.length - 1 ? 'Continue' : 'Get Started'}</span>
          {currentSlide === slides.length - 1 && <Heart size={18} />}
        </motion.button>
        
        {currentSlide < slides.length - 1 && (
          <button 
            className="w-full mt-4 py-3 text-sm text-muted-foreground"
            onClick={() => navigate('/onboarding')}
          >
            Skip Introduction
          </button>
        )}
      </div>
    </div>
  );
};

export default Welcome;
