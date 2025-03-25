
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600"
          >
            Connect
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto"
          >
            Find meaningful connections with people who share your interests
          </motion.p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center space-y-4 mb-12"
        >
          <Link 
            to="/welcome" 
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium w-full max-w-xs md:max-w-md"
          >
            Get Started
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="bg-card text-card-foreground rounded-lg shadow-sm p-6 text-center">
            <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover</h3>
            <p className="text-muted-foreground">Find people who match your interests and preferences</p>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg shadow-sm p-6 text-center">
            <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-muted-foreground">Message your matches and build meaningful relationships</p>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg shadow-sm p-6 text-center">
            <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Meet</h3>
            <p className="text-muted-foreground">Take your online connections to the real world</p>
          </div>
        </motion.div>
        
        <footer className="mt-20 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Connect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
