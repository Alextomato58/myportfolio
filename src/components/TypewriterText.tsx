import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TypewriterTextProps {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  phrases, 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  delay = 2000 
}) => {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'deleting' | 'waiting'>('typing');
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (phase === 'typing') {
      if (text.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, typeSpeed);
      } else {
        setPhase('waiting');
      }
    } else if (phase === 'waiting') {
      timer = setTimeout(() => {
        setPhase('deleting');
      }, delay);
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length - 1));
        }, deleteSpeed);
      } else {
        setPhase('typing');
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [text, phase, phraseIndex, phrases, typeSpeed, deleteSpeed, delay]);

  return (
    <span className="relative">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[0.8em] bg-current ml-1 align-middle"
      />
    </span>
  );
};
