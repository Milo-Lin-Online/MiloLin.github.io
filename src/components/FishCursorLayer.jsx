import { useEffect, useRef } from 'react';
import { FishCursor } from '../services/FishCursor.js';
import { FishGlyph } from './primitives.jsx';

/**
 * Thin bridge between React and the FishCursor class.
 *
 * React owns the element; the class owns the animation. Nothing about pointer
 * movement passes through React state, so the page never re-renders while the
 * fish is swimming.
 */
export default function FishCursorLayer({ enabled }) {
  const layerRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (!enabled || !FishCursor.isSupported() || !layerRef.current) return undefined;

    const cursor = new FishCursor(layerRef.current).attach();
    cursorRef.current = cursor;

    return () => {
      cursor.detach();
      cursorRef.current = null;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fish-layer" ref={layerRef} aria-hidden="true">
      <FishGlyph />
    </div>
  );
}
