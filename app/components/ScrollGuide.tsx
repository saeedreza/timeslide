'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ScrollGuide = () => {
  const [showGuide, setShowGuide] = useState(true);
  
  useEffect(() => {
    // Check if user has seen the guide before
    const hasSeenGuide = localStorage.getItem('hasSeenScrollGuide');
    
    if (hasSeenGuide) {
      setShowGuide(false);
      return;
    }
    
    // Hide guide after scrolling or after touching the screen
    const handleInteraction = () => {
      setShowGuide(false);
      localStorage.setItem('hasSeenScrollGuide', 'true');
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('mousedown', handleInteraction);
    };
    
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('mousedown', handleInteraction);
    
    // Auto-hide after 3 seconds
    const timer = setTimeout(() => {
      setShowGuide(false);
      localStorage.setItem('hasSeenScrollGuide', 'true');
    }, 3000);
    
    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('mousedown', handleInteraction);
      clearTimeout(timer);
    };
  }, []);
  
  if (!showGuide) return null;
  
  return (
    <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-50">
      <div className="bg-black/70 text-white px-6 py-3 rounded-full flex items-center gap-4 animate-pulse">
        <div className="flex flex-col items-center">
          <FaArrowUp className="mb-1" />
          <span>Scroll</span>
          <FaArrowDown className="mt-1" />
        </div>
        <span>to navigate stories</span>
      </div>
    </div>
  );
};

export default ScrollGuide; 