import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Stars = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--delay': `${star.delay}s`,
            '--duration': `${star.duration}s`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.8)`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

const Particles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 + 50, // Start lower
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-300 mix-blend-screen"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: `0 0 ${p.size * 2}px rgba(252, 211, 77, 0.6)`,
          }}
          animate={{
            y: [0, -300, -600],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const Firework = ({ id, x, y, onComplete }: { id: number, x: number, y: number, onComplete: (id: number) => void }) => {
  const particles = Array.from({ length: 16 });
  return (
    <div className="absolute pointer-events-none z-40" style={{ left: x, top: y }}>
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * velocity,
              y: Math.sin(angle) * velocity + 50, // gravity pull
              opacity: 0,
              scale: 0
            }}
            transition={{ duration: 0.8 + Math.random() * 0.5, ease: "easeOut" }}
            onAnimationComplete={() => {
              if (i === 0) onComplete(id);
            }}
            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-300"
            style={{ boxShadow: '0 0 10px rgba(252, 211, 77, 0.8)' }}
          />
        );
      })}
    </div>
  );
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[100] mix-blend-screen hidden md:block"
      animate={{ x: mousePosition.x - 24, y: mousePosition.y - 24 }}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.2 }}
      style={{
        background: 'radial-gradient(circle, rgba(252,211,77,0.4) 0%, rgba(252,211,77,0) 70%)',
      }}
    />
  );
};

const Lantern = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <div className={`flex flex-col items-center ${className}`} style={style}>
    <div className="w-[2px] h-16 md:h-24 bg-gradient-to-b from-transparent to-amber-500/50"></div>
    <svg width="40" height="70" viewBox="0 0 40 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
      <path d="M20 0L26 12H14L20 0Z" fill="#F59E0B"/>
      <rect x="12" y="12" width="16" height="4" fill="#D97706"/>
      <path d="M8 16L32 16L28 50L12 50L8 16Z" fill="#FCD34D" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5"/>
      <path d="M8 16L32 16L28 50L12 50L8 16Z" fill="url(#lanternGlow)" fillOpacity="0.6"/>
      <rect x="10" y="50" width="20" height="4" fill="#D97706"/>
      <path d="M14 54L26 54L20 65L14 54Z" fill="#F59E0B"/>
      <circle cx="20" cy="38" r="4" fill="#FEF08A" className="animate-pulse" style={{ filter: 'blur(1px)' }}/>
      <circle cx="20" cy="38" r="2" fill="#FFFFFF" />
      <defs>
        <radialGradient id="lanternGlow" cx="0.5" cy="0.6" r="0.5" fx="0.5" fy="0.6">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

const Moon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M85 50A40 40 0 1 1 45 10A30 30 0 1 0 85 50Z" fill="#FEF08A" className="drop-shadow-[0_0_20px_rgba(254,240,138,0.6)]"/>
  </svg>
);

const MosqueSilhouette = () => (
  <div className="absolute bottom-0 w-full h-auto flex justify-center items-end opacity-80 pointer-events-none z-10">
    <svg viewBox="0 0 1440 320" className="w-full h-full min-w-[800px]" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
      <path fill="#020617" d="M0,320L1440,320L1440,250L0,250Z"></path>
      
      {/* Center Dome */}
      <path fill="#020617" d="M 600 250 C 600 120, 840 120, 840 250 Z"></path>
      <path fill="#020617" d="M 715 120 L 720 60 L 725 120 Z"></path>
      <circle cx="720" cy="55" r="6" fill="#F59E0B" className="drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
      
      {/* Left Minaret */}
      <rect x="450" y="100" width="24" height="150" fill="#020617" />
      <path fill="#020617" d="M 445 100 L 462 40 L 479 100 Z"></path>
      <circle cx="462" cy="35" r="4" fill="#F59E0B" className="drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
      <rect x="445" y="130" width="34" height="6" fill="#0f172a" />
      <rect x="445" y="180" width="34" height="6" fill="#0f172a" />

      {/* Right Minaret */}
      <rect x="966" y="100" width="24" height="150" fill="#020617" />
      <path fill="#020617" d="M 961 100 L 978 40 L 995 100 Z"></path>
      <circle cx="978" cy="35" r="4" fill="#F59E0B" className="drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
      <rect x="961" y="130" width="34" height="6" fill="#0f172a" />
      <rect x="961" y="180" width="34" height="6" fill="#0f172a" />

      {/* Side Domes */}
      <path fill="#020617" d="M 500 250 C 500 180, 580 180, 580 250 Z"></path>
      <path fill="#020617" d="M 860 250 C 860 180, 940 180, 940 250 Z"></path>
      
      {/* Windows */}
      <path fill="#FEF08A" className="animate-pulse" style={{ animationDuration: '3s' }} d="M 690 200 C 690 170, 710 170, 710 200 L 710 250 L 690 250 Z"></path>
      <path fill="#FEF08A" className="animate-pulse" style={{ animationDuration: '4s' }} d="M 730 200 C 730 170, 750 170, 750 200 L 750 250 L 730 250 Z"></path>
      
      <path fill="#FEF08A" className="animate-pulse" style={{ animationDuration: '3.5s' }} d="M 530 210 C 530 190, 550 190, 550 210 L 550 250 L 530 250 Z"></path>
      <path fill="#FEF08A" className="animate-pulse" style={{ animationDuration: '4.5s' }} d="M 890 210 C 890 190, 910 190, 910 210 L 910 250 L 890 250 Z"></path>
    </svg>
  </div>
);

export default function App() {
  const [fireworks, setFireworks] = useState<{id: number, x: number, y: number}[]>([]);

  const handleScreenClick = useCallback((e: React.MouseEvent) => {
    const newFirework = { id: Date.now(), x: e.clientX, y: e.clientY };
    setFireworks(prev => [...prev, newFirework]);
  }, []);

  const removeFirework = useCallback((id: number) => {
    setFireworks(prev => prev.filter(fw => fw.id !== id));
  }, []);

  return (
    <div 
      onClick={handleScreenClick} 
      className="relative min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 overflow-hidden flex flex-col items-center justify-center font-sans cursor-crosshair"
    >
      <CustomCursor />
      <Stars />
      <Particles />
      
      {fireworks.map(fw => (
        <Firework key={fw.id} id={fw.id} x={fw.x} y={fw.y} onComplete={removeFirework} />
      ))}
      
      {/* Moon */}
      <motion.div 
        drag
        dragConstraints={{ left: -100, right: 100, top: -50, bottom: 100 }}
        whileHover={{ scale: 1.1, filter: 'drop-shadow(0 0 30px rgba(254,240,138,0.8))' }}
        whileTap={{ scale: 0.95, cursor: 'grabbing' }}
        initial={{ opacity: 0, y: 50, rotate: -20 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute top-12 right-12 md:top-24 md:right-40 w-24 h-24 md:w-40 md:h-40 z-40 cursor-grab"
      >
        <Moon className="w-full h-full pointer-events-none" />
      </motion.div>

      {/* Lanterns */}
      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} className="absolute top-0 left-8 md:left-32 z-30 cursor-pointer origin-top">
        <Lantern className="lantern pointer-events-none" style={{ '--duration': '5s' } as React.CSSProperties} />
      </motion.div>
      <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }} className="absolute top-0 left-28 md:left-64 hidden sm:block z-30 cursor-pointer origin-top">
        <Lantern className="lantern pointer-events-none" style={{ '--duration': '4.2s', transform: 'scale(0.8)' } as React.CSSProperties} />
      </motion.div>
      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} className="absolute top-0 right-32 md:right-72 hidden lg:block z-30 cursor-pointer origin-top">
        <Lantern className="lantern pointer-events-none" style={{ '--duration': '4.8s', transform: 'scale(0.9)' } as React.CSSProperties} />
      </motion.div>

      {/* Main Content */}
      <div className="z-30 text-center px-6 flex flex-col items-center mt-[-10vh] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-amber-400 font-cinzel tracking-[0.3em] text-xs md:text-lg uppercase mb-6 drop-shadow-md">
            Wishing you a blessed
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 drop-shadow-[0_5px_15px_rgba(251,191,36,0.3)] mb-2 md:mb-4">
            Eid Mubarak
          </h1>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0], textShadow: "0px 0px 30px rgba(255,255,255,1)" }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 2, delay: 2.2, type: "spring", bounce: 0.4 }}
          className="cursor-pointer z-40 pointer-events-auto"
        >
          <h3 className="text-6xl md:text-8xl lg:text-9xl font-vibes text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] mt-2 pointer-events-none">
            Anika
          </h3>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 3.5 }}
          className="mt-12 max-w-xl text-slate-300 font-sans text-sm md:text-lg leading-relaxed font-light px-4"
        >
          <p className="drop-shadow-md">
            May the magic of this Eid bring lots of happiness in your life, may you celebrate it with all your close friends, and may it fill your heart with wonders.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 5, duration: 2 }}
        className="absolute bottom-8 z-40 text-amber-200/60 font-sans text-xs md:text-sm tracking-widest uppercase pointer-events-none"
      >
        Tap anywhere for magic ✨
      </motion.div>

      <MosqueSilhouette />
    </div>
  );
}
