/**
 * SplashEffect — a small water splash wherever the page is clicked or tapped.
 *
 * Deliberately drawn as thin expanding rings plus a few droplets, not a glow:
 * strokes only, no shadowBlur, no radial gradients. It reads as water without
 * fighting the flat black-and-hairline look of the rest of the site.
 *
 * Efficiency, since this fires on every interaction:
 *  - One <canvas> and one requestAnimationFrame loop for the whole page.
 *  - The loop stops itself the moment the last particle dies, so an idle page
 *    runs zero frames.
 *  - `pointerdown` is passive and never calls preventDefault, so taps, scrolls
 *    and buttons behave exactly as they would without it.
 *  - Nothing touches React state, so clicking never triggers a re-render.
 *  - Canvas is sized to devicePixelRatio and resized only on window resize.
 */

const RING_COLOR = '34, 211, 238'; // --accent, as RGB for rgba() strokes

export class SplashEffect {
  static isSupported() {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;

    this.rings = [];
    this.drops = [];

    this.frame = null;
    this.running = false;
    this.lastTime = 0;
    this.dpr = 1;

    this._onPointerDown = this._onPointerDown.bind(this);
    this._onResize = this._onResize.bind(this);
    this._tick = this._tick.bind(this);
  }

  attach() {
    if (!this.ctx) return this;
    this._onResize();
    window.addEventListener('resize', this._onResize, { passive: true });
    // Capture phase so a splash still appears when a handler stops propagation.
    document.addEventListener('pointerdown', this._onPointerDown, {
      passive: true,
      capture: true,
    });
    return this;
  }

  detach() {
    window.removeEventListener('resize', this._onResize);
    document.removeEventListener('pointerdown', this._onPointerDown, { capture: true });
    this._stop();
    this.rings.length = 0;
    this.drops.length = 0;
    if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _onResize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dpr = dpr;
    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  _onPointerDown(event) {
    this.splash(event.clientX, event.clientY);
  }

  /** Public, so anything else can trigger a splash if it ever wants to. */
  splash(x, y) {
    // Two rings, the second slightly behind, like a real impact.
    this.rings.push({ x, y, r: 2, maxR: 34, life: 1, speed: 62, width: 1.4 });
    this.rings.push({ x, y, r: 0, maxR: 20, life: 1, speed: 40, width: 1, delay: 0.07 });

    // A handful of droplets thrown outward and pulled back down.
    const count = 7;
    for (let i = 0; i < count; i += 1) {
      // Bias upward so it behaves like something splashing out of a surface.
      const angle = Math.PI + (i / (count - 1)) * Math.PI + (Math.random() - 0.5) * 0.4;
      const speed = 40 + Math.random() * 70;
      this.drops.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 1 + Math.random() * 1.6,
        life: 1,
      });
    }

    this._start();
  }

  _start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.frame = requestAnimationFrame(this._tick);
  }

  _stop() {
    this.running = false;
    if (this.frame !== null) cancelAnimationFrame(this.frame);
    this.frame = null;
  }

  _tick(now) {
    // Seconds since the last frame, clamped so a backgrounded tab doesn't
    // teleport every particle when it comes back.
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // ── Rings ──────────────────────────────────────────────────────────────
    for (let i = this.rings.length - 1; i >= 0; i -= 1) {
      const ring = this.rings[i];

      if (ring.delay > 0) {
        ring.delay -= dt;
        continue;
      }

      ring.r += ring.speed * dt;
      ring.life -= dt * 1.7;

      if (ring.life <= 0 || ring.r > ring.maxR) {
        this.rings.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${RING_COLOR}, ${(ring.life * 0.55).toFixed(3)})`;
      ctx.lineWidth = ring.width;
      ctx.stroke();
    }

    // ── Droplets ───────────────────────────────────────────────────────────
    for (let i = this.drops.length - 1; i >= 0; i -= 1) {
      const drop = this.drops[i];

      drop.vy += 260 * dt; // gravity
      drop.x += drop.vx * dt;
      drop.y += drop.vy * dt;
      drop.life -= dt * 1.5;

      if (drop.life <= 0) {
        this.drops.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(drop.x, drop.y, drop.r * drop.life, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${RING_COLOR}, ${(drop.life * 0.7).toFixed(3)})`;
      ctx.fill();
    }

    if (this.rings.length === 0 && this.drops.length === 0) {
      this._stop();
      return;
    }

    this.frame = requestAnimationFrame(this._tick);
  }
}
