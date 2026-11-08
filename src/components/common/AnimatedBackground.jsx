import React, { useMemo } from "react";

export default function AnimatedBackground() {
  // Pre-generate randomized ember particles for smooth 60fps CSS animations
  const embers = useMemo(() => {
    return Array.from({ length: 26 }).map((_, i) => {
      const left = Math.floor((i * 3.8) % 100);
      const size = i % 4 === 0 ? 4 : i % 2 === 0 ? 3 : 2;
      const duration = 12 + (i % 8) * 2; // 12s - 26s
      const delay = (i * 0.7) % 12; // 0s - 12s
      const driftX = (i % 2 === 0 ? 1 : -1) * (20 + (i % 40));
      const color =
        i % 3 === 0
          ? "bg-[#00f2fe] shadow-[0_0_10px_#00f2fe]"
          : i % 3 === 1
          ? "bg-[#7c5cfc] shadow-[0_0_10px_#7c5cfc]"
          : "bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]";

      return {
        id: i,
        left: `${left}%`,
        size: `${size}px`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        driftX: `${driftX}px`,
        color,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* 1. Deep Cosmic Nebula Glows (Drifting & Breathing) */}
      <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-[#7c5cfc]/20 rounded-full blur-[140px] animate-float-slow-1" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-[#00f2fe]/14 rounded-full blur-[150px] animate-float-slow-2" />
      <div className="absolute -bottom-20 left-1/4 w-[550px] h-[550px] bg-[#7c5cfc]/16 rounded-full blur-[160px] animate-pulse-glow" />



      {/* 3. Diagonal Shooting Neon Light Beams */}
      <div
        className="animate-beam-1 absolute top-20 left-1/4 w-[280px] h-[2px] bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent blur-[1px] opacity-0"
      />
      <div
        className="animate-beam-2 absolute top-1/2 left-1/3 w-[340px] h-[2px] bg-gradient-to-r from-transparent via-[#7c5cfc] to-transparent blur-[1.5px] opacity-0"
      />

      {/* 4. Drifting Ember Sparks & Stardust */}
      <div className="absolute inset-0 overflow-hidden">
        {embers.map((ember) => (
          <div
            key={ember.id}
            className={`animate-ember absolute rounded-full ${ember.color}`}
            style={{
              left: ember.left,
              bottom: "0",
              width: ember.size,
              height: ember.size,
              "--duration": ember.duration,
              "--delay": ember.delay,
              "--drift-x": ember.driftX,
            }}
          />
        ))}
      </div>
    </div>
  );
}

