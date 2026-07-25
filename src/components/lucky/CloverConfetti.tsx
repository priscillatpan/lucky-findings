import { useEffect, useMemo, useState } from "react";
import icon1 from "@/assets/icon_1.png.asset.json";
import icon2 from "@/assets/icon_2.png.asset.json";

type Piece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotate: number;
  spin: number;
  size: number;
  icon: string;
  drift: number;
};

export function CloverConfetti({ count = 18 }: { count?: number }) {
  const pieces = useMemo<Piece[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 1.6 + Math.random() * 1.4,
      rotate: Math.random() * 360,
      spin: (Math.random() * 720 - 360),
      size: 18 + Math.random() * 22,
      icon: Math.random() > 0.5 ? icon1.url : icon2.url,
      drift: Math.random() * 60 - 30,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-30">
      <style>{`
        @keyframes clover-fall {
          0% { transform: translate3d(0,-20%,0) rotate(var(--r0)); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate3d(var(--dx), 110vh, 0) rotate(var(--r1)); opacity: 0.9; }
        }
      `}</style>
      {pieces.map((p) => (
        <img
          key={p.id}
          src={p.icon}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            // @ts-expect-error CSS custom props
            "--r0": `${p.rotate}deg`,
            "--r1": `${p.rotate + p.spin}deg`,
            "--dx": `${p.drift}px`,
            animation: `clover-fall ${p.duration}s ${p.delay}s cubic-bezier(.4,.6,.5,1) forwards`,
          }}
        />
      ))}
    </div>
  );
}
