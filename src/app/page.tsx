"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import WeaveSpinner from '@/components/splash/weave-spinner';
import BGPattern from '@/components/splash/bg-pattern';

interface Dot {
    x: number;
    y: number;
    baseColor: string;
    targetOpacity: number;
    currentOpacity: number;
    opacitySpeed: number;
    baseRadius: number;
    currentRadius: number;
}

interface Particle {
  id: number;
  left: string;
  top: string;
}

const TMSSplashScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'loading' | 'complete' | 'transition'>('loading');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const gridRef = useRef<Record<string, number[]>>({});
  const canvasSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
  const mousePositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const router = useRouter();

  const DOT_SPACING = 30;
  const BASE_OPACITY_MIN = 0.2;
  const BASE_OPACITY_MAX = 0.4;
  const BASE_RADIUS = 1;
  const INTERACTION_RADIUS = 120;
  const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
  const OPACITY_BOOST = 0.6;
  const RADIUS_BOOST = 2;
  const GRID_CELL_SIZE = Math.max(50, Math.floor(INTERACTION_RADIUS / 1.5));

  const handleMouseMove = useCallback((event: globalThis.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      mousePositionRef.current = { x: null, y: null };
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;
    mousePositionRef.current = { x: canvasX, y: canvasY };
  }, []);

  const createDots = useCallback(() => {
    const { width, height } = canvasSizeRef.current;
    if (width === 0 || height === 0) return;

    const newDots: Dot[] = [];
    const newGrid: Record<string, number[]> = {};
    const cols = Math.ceil(width / DOT_SPACING);
    const rows = Math.ceil(height / DOT_SPACING);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * DOT_SPACING + DOT_SPACING / 2;
        const y = j * DOT_SPACING + DOT_SPACING / 2;
        const cellX = Math.floor(x / GRID_CELL_SIZE);
        const cellY = Math.floor(y / GRID_CELL_SIZE);
        const cellKey = `${cellX}_${cellY}`;

        if (!newGrid[cellKey]) {
          newGrid[cellKey] = [];
        }

        const dotIndex = newDots.length;
        newGrid[cellKey].push(dotIndex);

        const baseOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
        newDots.push({
          x,
          y,
          baseColor: isDarkMode ? `rgba(0, 242, 254, ${BASE_OPACITY_MAX})` : `rgba(142, 45, 226, ${BASE_OPACITY_MAX})`,
          targetOpacity: baseOpacity,
          currentOpacity: baseOpacity,
          opacitySpeed: (Math.random() * 0.005) + 0.002,
          baseRadius: BASE_RADIUS,
          currentRadius: BASE_RADIUS,
        });
      }
    }
    dotsRef.current = newDots;
    gridRef.current = newGrid;
  }, [DOT_SPACING, GRID_CELL_SIZE, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS, isDarkMode]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    const width = container ? container.clientWidth : window.innerWidth;
    const height = container ? container.clientHeight : window.innerHeight;

    if (canvas.width !== width || canvas.height !== height ||
        canvasSizeRef.current.width !== width || canvasSizeRef.current.height !== height)
    {
      canvas.width = width;
      canvas.height = height;
      canvasSizeRef.current = { width, height };
      createDots();
    }
  }, [createDots]);

  const animateDots = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const dots = dotsRef.current;
    const grid = gridRef.current;
    const { width, height } = canvasSizeRef.current;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;

    if (!ctx || !dots || !grid || width === 0 || height === 0) {
      animationFrameId.current = requestAnimationFrame(animateDots);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const activeDotIndices = new Set<number>();
    if (mouseX !== null && mouseY !== null) {
      const mouseCellX = Math.floor(mouseX / GRID_CELL_SIZE);
      const mouseCellY = Math.floor(mouseY / GRID_CELL_SIZE);
      const searchRadius = Math.ceil(INTERACTION_RADIUS / GRID_CELL_SIZE);
      for (let i = -searchRadius; i <= searchRadius; i++) {
        for (let j = -searchRadius; j <= searchRadius; j++) {
          const checkCellX = mouseCellX + i;
          const checkCellY = mouseCellY + j;
          const cellKey = `${checkCellX}_${checkCellY}`;
          if (grid[cellKey]) {
            grid[cellKey].forEach(dotIndex => activeDotIndices.add(dotIndex));
          }
        }
      }
    }

    dots.forEach((dot, index) => {
      dot.currentOpacity += dot.opacitySpeed;
      if (dot.currentOpacity >= dot.targetOpacity || dot.currentOpacity <= BASE_OPACITY_MIN) {
        dot.opacitySpeed = -dot.opacitySpeed;
        dot.currentOpacity = Math.max(BASE_OPACITY_MIN, Math.min(dot.currentOpacity, BASE_OPACITY_MAX));
        dot.targetOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
      }

      let interactionFactor = 0;
      dot.currentRadius = dot.baseRadius;

      if (mouseX !== null && mouseY !== null && activeDotIndices.has(index)) {
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const distSq = dx * dx + dy * dy;

        if (distSq < INTERACTION_RADIUS_SQ) {
          const distance = Math.sqrt(distSq);
          interactionFactor = Math.max(0, 1 - distance / INTERACTION_RADIUS);
          interactionFactor = interactionFactor * interactionFactor;
        }
      }

      const finalOpacity = Math.min(1, dot.currentOpacity + interactionFactor * OPACITY_BOOST);
      dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST;

      const colorMatch = dot.baseColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      const r = colorMatch ? colorMatch[1] : '0';
      const g = colorMatch ? colorMatch[2] : '242';
      const b = colorMatch ? colorMatch[3] : '254';

      ctx.beginPath();
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity.toFixed(3)})`;
      ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(animateDots);
  }, [GRID_CELL_SIZE, INTERACTION_RADIUS_SQ, OPACITY_BOOST, RADIUS_BOOST, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS, INTERACTION_RADIUS]);

  useEffect(() => {
    // Generate particles only on the client side
    setParticles(
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }))
    );
    
    handleResize();
    const handleMouseLeave = () => {
      mousePositionRef.current = { x: null, y: null };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    animationFrameId.current = requestAnimationFrame(animateDots);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleResize, handleMouseMove, animateDots]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setCurrentPhase('complete');
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentPhase === 'complete') {
      const timer = setTimeout(() => {
        setCurrentPhase('transition');
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (currentPhase === 'transition') {
        const timer = setTimeout(() => {
            router.push('/login');
        }, 1000);
        return () => clearTimeout(timer);
    }
  }, [currentPhase, router]);

  const gradientClasses = isDarkMode 
    ? 'from-[#1e3c72] to-[#2a5298]'
    : 'from-blue-50 via-purple-50 to-pink-50';

  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const accentColor = isDarkMode ? 'text-[#00f2fe]' : 'text-[#8e2de2]';

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-gradient-to-br ${gradientClasses}`}>
      <WeaveSpinner />
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none opacity-40" 
      />

      <BGPattern 
        variant="dots" 
        mask="fade-center" 
        size={32} 
        fill={isDarkMode ? 'rgba(0, 242, 254, 0.1)' : 'rgba(142, 45, 226, 0.1)'} 
        className="opacity-30"
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute w-1 h-1 ${isDarkMode ? 'bg-[#00f2fe]' : 'bg-[#8e2de2]'} rounded-full`}
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [-20, -40, -20],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-1/2 left-0 w-full h-px ${isDarkMode ? 'bg-[#00f2fe]' : 'bg-[#8e2de2]'} opacity-30`}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: `linear-gradient(90deg, transparent, ${isDarkMode ? '#00f2fe' : '#8e2de2'}, transparent)`,
            height: '1px',
            filter: 'blur(1px)',
          }}
        />
      </div>

      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDarkMode ? (
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </motion.button>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            className="relative w-40 h-40 flex items-center justify-center"
            animate={{
              filter: [
                `drop-shadow(0 0 30px ${isDarkMode ? 'rgba(0, 242, 254, 0.4)' : 'rgba(142, 45, 226, 0.5)'})`,
                `drop-shadow(0 0 50px ${isDarkMode ? 'rgba(0, 242, 254, 0.6)' : 'rgba(142, 45, 226, 0.7)'})`,
                `drop-shadow(0 0 30px ${isDarkMode ? 'rgba(0, 242, 254, 0.4)' : 'rgba(142, 45, 226, 0.5)'})`,
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isDarkMode ? '#00f2fe' : '#8e2de2'} />
                    <stop offset="100%" stopColor={isDarkMode ? '#2ecc71' : '#a6c1ee'} />
                  </linearGradient>
                </defs>
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  stroke="url(#ring-gradient)"
                  strokeWidth="2" 
                  fill="none"
                  initial={{ strokeDasharray: "0 283", rotate: -90 }}
                  animate={{ strokeDasharray: "283 283" }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                />
                <motion.g
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <circle cx="35" cy="40" r="8" fill={isDarkMode ? '#2ecc71' : '#8e2de2'} />
                  <circle cx="65" cy="40" r="8" fill={isDarkMode ? '#00f2fe' : '#a6c1ee'}/>
                  <circle cx="50" cy="65" r="8" fill={isDarkMode ? '#8e2de2' : '#3c3c3d'}/>
                  <path d="M 38 45 L 48 60" stroke={isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'} strokeWidth="1.5" />
                  <path d="M 62 45 L 52 60" stroke={isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'} strokeWidth="1.5" />
                </motion.g>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl md:text-6xl font-light ${textColor} mb-4`}>
            Welcome to{' '}
            <span className={`font-bold ${accentColor} tracking-wide`}>TMS</span>
          </h1>
          <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-light uppercase tracking-widest`}>
            Smart Collaboration. Smarter Management.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-sm"
        >
          <div className="relative h-2 bg-black/20 rounded-full overflow-hidden mb-4">
            <motion.div
              className={`absolute top-0 left-0 h-full rounded-full`}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "linear" }}
              style={{
                background: `linear-gradient(90deg, ${isDarkMode ? '#2ecc71' : '#8e2de2'}, ${isDarkMode ? '#00f2fe' : '#a6c1ee'})`,
                boxShadow: `0 0 10px ${isDarkMode ? 'rgba(0, 242, 254, 0.5)' : 'rgba(142, 45, 226, 0.5)'}`,
              }}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <AnimatePresence mode="wait">
              {currentPhase === 'loading' && (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  Initializing workspace...
                </motion.span>
              )}
              {currentPhase === 'complete' && (
                <motion.span
                  key="complete"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-xs font-medium ${accentColor}`}
                >
                  Ready to launch!
                </motion.span>
              )}
            </AnimatePresence>
            <span className={`text-sm font-mono ${accentColor}`}>
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>

      </div>

      <AnimatePresence>
        {currentPhase === 'transition' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{duration: 0.5}}
            className="absolute inset-0 z-50 bg-background flex items-center justify-center"
          >
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TMSSplashScreen;
