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
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 500 500">
            <image xlinkHref="data:image/png;base64,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V/vvD6G64t1s743uS/6vG2vXn35/u3q8vEaG74f/T3990t949479354vN5vF9y/bV31/0v55/1+37XnNf/sX9L/9+z9215+f9aPjDt/98L5PPnb1i3fd/6k9DzvksfG7Vn+83g9k6HlRj/fX7G0l5Wd09h88a/2/N99//8g/P/38P8/b6Xk7+g+5p/dff+D/dD/4T/eN3fN/9n3Wwz+969qNNt1+2d03jS7y2s8+f26XvS3b1n7m99a/M2257d03P3D/g/Y8oF2l22+/vW21xS995bLz//fXn9z78JOf3Xm/t+/bV1/7i4W5c9L6h+2e/KqD5T4VfX7pX7L3t74//4HXPvz01/r+144sW3n/7U0b1r9T+9i488/u+d/n17326M6f3nHzrY22H1m2/8f777L55n+84y9/+eS//u1Pz//01r/cdNfPnvnZ739+z0PPvPjuC+47+6k/XXbZzXfccL1tDjz7gD9vuvW/L7/y7/vvf6rO07uP/sVq1aF+v3v+d9fd393f9z/4u+ee273Xh98579v/2n/d/9x7P7z+4L887cMP/+/6hzzgqD9P6e/0k0+k239w1KnnnfPTwQ9U/s1/L17x8M8+/uwn9z39kF/ec98151/87NfG/2iPPe3X5y+60+ePPn2s+zffuf99p910/fHnnl13jP/n74n6+x+4/98HH330o+fF+s+y3/55m9/29z88v+7a61uP9qK/6n/2tHdf/d+99t9x7f03H1z9+y/uvf/pT377/7b/97yXf/3X35133l+uu//q3zff+/Cddz/48MP/+/mH/1k62G+X79/+XzYk/74I2iIBAAAAAAAAAElFTkSuQmCC" x="0" y="0" width="500" height="500"/>
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
