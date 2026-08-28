import { useEffect, useRef } from 'react';
import { SplashEffect } from '../services/SplashEffect.js';

/**
 * Mounts the splash canvas. Same shape as FishCursorLayer: React owns the
 * element, the service class owns the animation, and no pointer event ever
 * passes through React state.
 */
export default function SplashLayer({ enabled = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled || !SplashEffect.isSupported() || !canvasRef.current) return undefined;

    const splash = new SplashEffect(canvasRef.current).attach();
    return () => splash.detach();
  }, [enabled]);

  if (!enabled) return null;

  return <canvas className="splash-layer" ref={canvasRef} aria-hidden="true" />;
}
