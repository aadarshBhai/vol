import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type AnimateOnScrollProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
  duration?: number;
};

const AnimateOnScroll = ({
  children,
  delay = 0,
  className = '',
  yOffset = 20,
  duration = 0.5,
}: AnimateOnScrollProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: duration,
          delay: delay,
          ease: [0.2, 0.65, 0.3, 0.9] 
        } 
      }}
      viewport={{ once: true, margin: '-100px 0px -50px 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;
