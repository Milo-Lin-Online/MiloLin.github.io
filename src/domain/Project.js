import { Entity } from './Entity.js';

/**
 * Project — a single piece of work shown as a card.
 *
 * The three subclasses below differ in how they label themselves, which accent
 * they carry, and how they compose their meta line. The card component asks the
 * object; it never asks what type the object is.
 */
export class Project extends Entity {
  constructor(data = {}) {
    super({ id: data.id, title: data.title });

    this.subtitle = data.subtitle ?? '';
    this.year = data.year ?? '';
    this.role = data.role ?? '';
    this.tools = data.tools ?? [];
    this.bullets = data.bullets ?? [];
    this.media = data.media ?? [];
    this.links = data.links ?? [];
    this.tags = data.tags ?? [];
    this.lanes = data.lanes ?? [];
    this.featured = Boolean(data.featured);
    this.note = data.note ?? '';
  }

  get kindLabel() {
    return 'PROJECT';
  }

  get cover() {
    return this.media[0] ?? null;
  }

  get hasMedia() {
    return this.media.length > 0;
  }

  /** Two letters used on the typographic plate when a project has no image. */
  get plate() {
    const words = this.title.replace(/[^A-Za-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
    return (words.slice(0, 2).map((w) => w[0]).join('') || '··').toUpperCase();
  }

  get metaLine() {
    return this.tools.join(' / ');
  }

  get searchText() {
    return [this.title, this.subtitle, ...this.tools, ...this.tags].join(' ');
  }

  belongsTo(laneKey) {
    return this.lanes.includes(laneKey);
  }

  /** Featured work first, then most recent. */
  static compare(a, b) {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return String(b.year).localeCompare(String(a.year));
  }
}

export class ArtProject extends Project {
  get kindLabel() {
    return 'ART';
  }


  get metaLine() {
    return [this.year, this.tools.join(' / ')].filter(Boolean).join('  ·  ');
  }
}

export class TechArtProject extends Project {
  get kindLabel() {
    return 'TECH ART';
  }


  get metaLine() {
    return [this.year, this.tools.join(' / ')].filter(Boolean).join('  ·  ');
  }
}

export class ProductProject extends Project {
  get kindLabel() {
    return 'PRODUCT';
  }


  /** Product work is read by role and outcome first, tools second. */
  get metaLine() {
    return [this.year, this.role || this.subtitle].filter(Boolean).join('  ·  ');
  }
}

/** Maps the `type` string in portfolio.data.js to a constructor. */
export const PROJECT_TYPES = {
  art: ArtProject,
  techart: TechArtProject,
  product: ProductProject,
};
