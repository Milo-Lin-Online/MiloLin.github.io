/**
 * FishCursor — drives the fish that follows the pointer.
 *
 * Efficiency notes, because this runs on every mouse move:
 *  - One requestAnimationFrame loop, and it stops itself once the fish has
 *    caught up with the pointer. An idle page runs zero frames.
 *  - The pointermove listener is passive and only stores two numbers.
 *  - Each frame writes `transform` plus two custom properties. Nothing that
 *    triggers layout or paint, so the compositor handles it on its own.
 *  - No React state is involved, so moving the mouse never re-renders the page.
 */
export class FishCursor {
  /** Pointer must be a real mouse, and the visitor must not have asked for less motion. */
  static isSupported() {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return (
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  constructor(element, { ease = 0.16, turnEase = 0.22 } = {}) {
    this.el = element;
    this.ease = ease;
    this.turnEase = turnEase;

    this.pos = { x: -200, y: -200 };
    this.target = { x: -200, y: -200 };
    this.angle = 0;
    this.flip = 1;

    this.frame = null;
    this.running = false;
    this.hasSeenPointer = false;

    this._onMove = this._onMove.bind(this);
    this._onLeave = this._onLeave.bind(this);
    this._onEnter = this._onEnter.bind(this);
    this._tick = this._tick.bind(this);
  }

  attach() {
    if (!this.el) return this;
    window.addEventListener('pointermove', this._onMove, { passive: true });
    document.addEventListener('pointerleave', this._onLeave);
    document.addEventListener('pointerenter', this._onEnter);
    document.body.classList.add('fish-cursor-on');
    return this;
  }

  detach() {
    window.removeEventListener('pointermove', this._onMove);
    document.removeEventListener('pointerleave', this._onLeave);
    document.removeEventListener('pointerenter', this._onEnter);
    document.body.classList.remove('fish-cursor-on');
    this._stop();
    if (this.el) this.el.style.opacity = '0';
    this.hasSeenPointer = false;
  }

  _onMove(event) {
    this.target.x = event.clientX;
    this.target.y = event.clientY;

    // First sighting: drop the fish straight onto the pointer instead of
    // letting it swim in from the corner.
    if (!this.hasSeenPointer) {
      this.hasSeenPointer = true;
      this.pos.x = event.clientX;
      this.pos.y = event.clientY;
      this.el.style.opacity = '1';
    }

    this._start();
  }

  _onLeave() {
    if (this.el) this.el.style.opacity = '0';
  }

  _onEnter() {
    if (this.el && this.hasSeenPointer) this.el.style.opacity = '1';
  }

  _start() {
    if (this.running) return;
    this.running = true;
    this.frame = requestAnimationFrame(this._tick);
  }

  _stop() {
    this.running = false;
    if (this.frame !== null) cancelAnimationFrame(this.frame);
    this.frame = null;
  }

  _tick() {
    const dx = this.target.x - this.pos.x;
    const dy = this.target.y - this.pos.y;

    this.pos.x += dx * this.ease;
    this.pos.y += dy * this.ease;

    const speed = Math.hypot(dx, dy);

    // Only steer when actually moving, so the fish holds its heading at rest.
    if (speed > 1.5) {
      let desired = (Math.atan2(dy, dx) * 180) / Math.PI;

      // Swimming left would put the fish upside down, so mirror it vertically
      // and steer by the mirrored angle instead.
      const facingLeft = Math.abs(desired) > 90;
      this.flip = facingLeft ? -1 : 1;
      if (facingLeft) desired = desired > 0 ? desired - 180 : desired + 180;

      let delta = desired - this.angle;
      while (delta > 180) delta -= 360;
      while (delta < -180) delta += 360;
      this.angle += delta * this.turnEase;
    }

    this.el.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
    this.el.style.setProperty('--fish-angle', `${this.angle.toFixed(2)}deg`);
    this.el.style.setProperty('--fish-flip', String(this.flip));

    // Caught up with the pointer, so stop burning frames until it moves again.
    if (speed < 0.25) {
      this._stop();
      return;
    }

    this.frame = requestAnimationFrame(this._tick);
  }
}
