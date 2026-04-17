import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

export const CursorFollower: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the follower
  const springConfig = { damping: 25, stiffness: 200, restDelta: 0.001 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const clickableAgent = target.closest('button, a, .cursor-pointer');
      setIsPointer(!!clickableAgent);

      const projectAgent = target.closest('[data-cursor="project"]');
      setIsProject(!!projectAgent);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary-prussian/30 pointer-events-none z-[9999] hidden md:flex items-center justify-center overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isProject ? 100 : 32,
          height: isProject ? 100 : 32,
        }}
        animate={{
          scale: isPointer && !isProject ? 1.5 : 1,
          backgroundColor: isProject ? 'rgba(0, 49, 83, 1)' : (isPointer ? 'rgba(0, 49, 83, 0.05)' : 'rgba(0, 49, 83, 0)'),
          borderColor: isProject ? 'rgba(0, 49, 83, 1)' : 'rgba(0, 49, 83, 0.3)',
        }}
        transition={{
          width: { type: "spring", stiffness: 200, damping: 20 },
          height: { type: "spring", stiffness: 200, damping: 20 },
        }}
      >
        <AnimatePresence>
          {isProject && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-white text-[10px] font-bold tracking-[0.2em] uppercase"
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary-prussian rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer || isProject ? 0 : 1,
        }}
      />
    </>
  );
};
