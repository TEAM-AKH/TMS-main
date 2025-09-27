'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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

const BGPattern: React.FC<{
  variant?: 'dots' | 'grid';
  mask?: 'fade-edges' | 'fade-center' | 'none';
  size?: number;
  fill?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({
  variant = 'grid',
  mask = 'none',
  size = 24,
  fill = '#252525',
  className,
  style,
  ...props
}) => {
  const maskClasses = {
    'fade-edges': '[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]',
    'fade-center': '[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]',
    'none': '',
  };

  const getBgImage = (variant: string, fill: string, size: number) => {
    switch (variant) {
      case 'dots':
        return `radial-gradient(${fill} 1px, transparent 1px)`;
      case 'grid':
        return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
      default:
        return undefined;
    }
  };

  const bgSize = `${size}px ${size}px`;
  const backgroundImage = getBgImage(variant, fill, size);

  return (
    <div
      className={cn('absolute inset-0 z-[-10] size-full', maskClasses[mask], className)}
      style={{
        backgroundImage,
        backgroundSize: bgSize,
        ...style,
      }}
      {...props}
    />
  );
};

const WeaveSpinner: React.FC = () => {
  return (
    <>
      <style>
        {`
          .spinner-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .spinner-container {
            position: relative;
            width: 80px;
            height: 80px;
            transform-style: preserve-3d;
            perspective: 1200px;
          }

          .node {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 8px;
            height: 8px;
            background: #4facfe;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            box-shadow:
              0 0 15px #4facfe,
              0 0 30px rgba(79, 172, 254, 0.6);
            animation: nodePulse 1.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
          }

          .thread {
            position: absolute;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(79, 172, 254, 0.8),
              transparent
            );
            box-shadow: 0 0 8px rgba(79, 172, 254, 0.5);
            transform-origin: center;
          }

          .t1 {
            width: 100%;
            height: 1px;
            top: 30%;
            left: 0;
            animation: weave1 2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          }

          .t2 {
            width: 1px;
            height: 100%;
            top: 0;
            left: 70%;
            animation: weave2 2.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
          }

          .t3 {
            width: 100%;
            height: 1px;
            bottom: 30%;
            left: 0;
            animation: weave3 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;
          }

          .t4 {
            width: 1px;
            height: 100%;
            top: 0;
            left: 30%;
            animation: weave4 2.6s cubic-bezier(0.36, 0, 0.66, -0.56) infinite;
          }

          @keyframes nodePulse {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              box-shadow:
                0 0 15px #4facfe,
                0 0 30px rgba(79, 172, 254, 0.6);
            }
            50% {
              transform: translate(-50%, -50%) scale(1.4);
              box-shadow:
                0 0 25px #4facfe,
                0 0 50px rgba(79, 172, 254, 0.8);
            }
          }

          @keyframes weave1 {
            0% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
            50% {
              transform: translateY(20px) rotateX(60deg) rotateZ(20deg);
              opacity: 1;
            }
            100% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
          }

          @keyframes weave2 {
            0% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
            50% {
              transform: translateX(-20px) rotateY(60deg) rotateZ(-20deg);
              opacity: 1;
            }
            100% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
          }

          @keyframes weave3 {
            0% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
            50% {
              transform: translateY(-20px) rotateX(-60deg) rotateZ(15deg);
              opacity: 1;
            }
            100% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
          }

          @keyframes weave4 {
            0% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
            50% {
              transform: translateX(20px) rotateY(-60deg) rotateZ(-15deg);
              opacity: 1;
            }
            100% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
          }

          @keyframes logoGlow {
            0%, 100% {
              filter: drop-shadow(0 0 20px rgba(79, 172, 254, 0.8));
            }
            50% {
              filter: drop-shadow(0 0 40px rgba(79, 172, 254, 1));
            }
          }

          @keyframes logoScale {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }

          @keyframes progressGlow {
            0% {
              box-shadow: 0 0 10px rgba(79, 172, 254, 0.5);
            }
            50% {
              box-shadow: 0 0 20px rgba(79, 172, 254, 0.8);
            }
            100% {
              box-shadow: 0 0 10px rgba(79, 172, 254, 0.5);
            }
          }

          @keyframes waveMove {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          @keyframes particleFloat {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.7;
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

interface Particle {
  id: number;
  left: string;
  top: string;
}

const TMSSplashScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'loading' | 'complete'>('loading');
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
          baseColor: isDarkMode ? `rgba(79, 172, 254, ${BASE_OPACITY_MAX})` : `rgba(139, 92, 246, ${BASE_OPACITY_MAX})`,
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
      const r = colorMatch ? colorMatch[1] : '79';
      const g = colorMatch ? colorMatch[2] : '172';
      const b = colorMatch ? colorMatch[3] : '254';

      ctx.beginPath();
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity.toFixed(3)})`;
      ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(animateDots);
  }, [GRID_CELL_SIZE, INTERACTION_RADIUS, INTERACTION_RADIUS_SQ, OPACITY_BOOST, RADIUS_BOOST, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS]);

  useEffect(() => {
    // Generate particles only on the client side to prevent hydration mismatch
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
        return prev + Math.random() * 15 + 5; 
      });
    }, 100); 

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentPhase === 'complete') {
        const redirectTimer = setTimeout(() => {
            router.push('/login');
        }, 500); // A brief delay for the "complete" state to be visible

        return () => clearTimeout(redirectTimer);
    }
  }, [currentPhase, router]);


  const gradientClasses = isDarkMode 
    ? 'from-slate-900 via-blue-900 to-purple-900'
    : 'from-blue-50 via-purple-50 to-pink-50';

  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const accentColor = isDarkMode ? 'text-blue-400' : 'text-purple-600';

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-gradient-to-br ${gradientClasses}`}>
      <WeaveSpinner />
      
      {/* Interactive Dot Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none opacity-60" 
      />

      {/* Background Pattern */}
      <BGPattern 
        variant="dots" 
        mask="fade-center" 
        size={32} 
        fill={isDarkMode ? 'rgba(79, 172, 254, 0.1)' : 'rgba(139, 92, 246, 0.1)'} 
        className="opacity-30"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute w-1 h-1 ${isDarkMode ? 'bg-blue-400' : 'bg-purple-500'} rounded-full`}
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

      {/* Wave Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-1/2 left-0 w-full h-px ${isDarkMode ? 'bg-blue-400' : 'bg-purple-500'} opacity-30`}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: `linear-gradient(90deg, transparent, ${isDarkMode ? '#4facfe' : '#8b5cf6'}, transparent)`,
            height: '2px',
            filter: 'blur(1px)',
          }}
        />
      </div>

      {/* Theme Toggle */}
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

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 w-40 h-40"
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <filter id="grainy" x="0" y="0" width="100%" height="100%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                      <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  <path id="top-curve" d="M 50 100 A 50 50 0 0 1 150 100" />
                  <path id="bottom-curve" d="M 50 100 A 50 50 0 0 0 150 100" />
              </defs>
              
              <g filter="url(#grainy)" opacity="0.8">
                  <circle cx="100" cy="100" r="100" fill="#4B0082" />
                  <circle cx="100" cy="100" r="85" fill="#f0e6f2" /> 
                  <path d="M18.8,123.4 A90 90 0 0 1 181.2 123.4" fill="none" stroke="#B8860B" strokeWidth="8" />
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#403068" strokeWidth="6" />
              </g>

              <text fill="#4B0082" fontSize="18" fontWeight="bold" letterSpacing="1">
                  <textPath href="#top-curve" startOffset="50%" textAnchor="middle">
                      TEAM MANAGEMENT SYSTEM
                  </textPath>
              </text>

              <g transform="translate(100, 100)">
                  <text y="-5" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#B8860B">T</text>
                  <text x="-18" y="30" textAnchor="middle" fontSize="60" fontWeight="bold" fill="#6A5ACD" stroke="#fff" strokeWidth="1">M</text>
                  <text x="18" y="30" textAnchor="middle" fontSize="60" fontWeight="bold" fill="#fff" stroke="#4B0082" strokeWidth="1">S</text>
              </g>

              <text fill="#4B0082" fontSize="24" fontWeight="bold" letterSpacing="4">
                  <textPath href="#bottom-curve" startOffset="50%" textAnchor="middle">
                      AKH
                  </textPath>
              </text>
          </svg>
        </motion.div>


        {/* Welcome Text */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl md:text-6xl font-light ${textColor} mb-4`}>
            Welcome to{' '}
            <span className={`font-bold ${accentColor}`}>TMS</span>
          </h1>
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-light`}>
            Team Management System
          </p>
        </motion.div>

        {/* Loading Progress */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-md"
        >
          <div className={`relative h-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden mb-4`}>
            <motion.div
              className={`absolute top-0 left-0 h-full ${isDarkMode ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'} rounded-full`}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                boxShadow: `0 0 10px ${isDarkMode ? 'rgba(79, 172, 254, 0.5)' : 'rgba(139, 92, 246, 0.5)'}`,
              }}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {currentPhase === 'loading' ? 'Loading...' : 'Complete!'}
            </span>
            <span className={`text-sm font-mono ${accentColor}`}>
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8"
        >
          <div className="spinner-wrapper">
            <div className="spinner-container">
              <div className="thread t1" />
              <div className="thread t2" />
              <div className="thread t3" />
              <div className="thread t4" />
              <div className="node" />
            </div>
          </div>
        </motion.div>

        {/* Status Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-6 text-center"
        >
          <AnimatePresence mode="wait">
            {currentPhase === 'loading' && (
              <motion.p
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                Initializing your workspace...
              </motion.p>
            )}
            {currentPhase === 'complete' && (
              <motion.p
                key="complete"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`text-sm ${accentColor} font-medium`}
              >
                Ready to manage your team!
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default TMSSplashScreen;
