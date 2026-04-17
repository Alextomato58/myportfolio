import React, { useState, useEffect, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className, trigger = true }) => {
  const [displayText, setDisplayText] = useState(text);

  const startScramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          if (text[index] === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    if (trigger) {
      startScramble();
    }
  }, [trigger, startScramble]);

  return <span className={className}>{displayText}</span>;
};
