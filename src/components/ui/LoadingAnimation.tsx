
import React from 'react';
import { motion } from 'framer-motion';

interface LoadingAnimationProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  size = 'medium', 
  color = 'primary' 
}) => {
  const sizeMap = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colorClass = `bg-${color}`;
  const sizeClass = sizeMap[size];

  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const dotVariants = {
    initial: { scale: 0.5, opacity: 0.3 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        repeatType: "reverse",
        repeat: Infinity
      }
    }
  };

  return (
    <motion.div
      className={`relative ${sizeClass}`}
      variants={containerVariants}
      animate="animate"
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${colorClass}`}
          style={{
            top: i === 0 || i === 1 ? 0 : 'auto',
            bottom: i === 2 || i === 3 ? 0 : 'auto',
            left: i === 0 || i === 3 ? 0 : 'auto',
            right: i === 1 || i === 2 ? 0 : 'auto',
          }}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: i * 0.2 }}
        />
      ))}
    </motion.div>
  );
};

export default LoadingAnimation;
