import { Entity } from './Entity.js';

/**
 * Experience — one row of the experience accordion.
 *
 * Subclasses change the badge, the accent, and the small context line that sits
 * under the org name. A client project says who the client was; a normal role
 * says where it was and whether it was hybrid.
 */
export class Experience extends Entity {
  constructor(data = {}) {
    super({ id: data.id, title: data.role });

    this.role = data.role ?? '';
    this.org = data.org ?? '';
    this.orgShort = data.orgShort ?? data.org ?? '';
    this.start = data.start ?? '';
    this.end = data.end ?? null; // null means current
    this.startISO = data.startISO ?? '';
    this.location = data.location ?? '';
    this.mode = data.mode ?? '';
    this.client = data.client ?? '';
    this.summary = data.summary ?? '';
    this.bullets = data.bullets ?? [];
    this.tools = data.tools ?? [];
    this.lanes = data.lanes ?? [];
    this.highlight = data.highlight ?? null; // { value, label }
    this.logo = data.logo ?? null; // optional path to a real logo file
    this.brand = data.brand ?? '#6E7F91';
  }

  get kindLabel() {
    return 'ROLE';
  }

  get isCurrent() {
    return this.end === null;
  }

  get period() {
    return `${this.start} — ${this.end ?? 'Present'}`;
  }

  /**
   * Fallback monogram for the circular avatar when there is no logo file.
   * Splits on spaces and on internal capitals, so "DraftKings" reads DK while
   * a single lowercase word like "Goodwin" falls back to its first two letters.
   */
  get initials() {
    const words = this.orgShort
      .replace(/[^A-Za-z0-9 ]/g, ' ')
      .split(/\s+/)
      .flatMap((word) => word.split(/(?=[A-Z][a-z])/))
      .filter(Boolean);

    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return (words[0] ?? '··').slice(0, 2).toUpperCase();
  }

  /** The small line under the org name. Overridden by ClientProjectExperience. */
  get contextLine() {
    return [this.location, this.mode].filter(Boolean).join(' · ');
  }

  get searchText() {
    return [this.role, this.org, ...this.tools, ...this.bullets].join(' ');
  }

  belongsTo(laneKey) {
    return this.lanes.includes(laneKey);
  }

  /** Most recent first. */
  static compare(a, b) {
    return String(b.startISO).localeCompare(String(a.startISO));
  }
}

export class CoopExperience extends Experience {
  get kindLabel() {
    return 'CO-OP';
  }
  get accentVar() {
    return '--lane-product';
  }
}

export class InternshipExperience extends Experience {
  get kindLabel() {
    return 'INTERNSHIP';
  }
  get accentVar() {
    return '--lane-product';
  }
}

export class ResearchExperience extends Experience {
  get kindLabel() {
    return 'RESEARCH';
  }
  get accentVar() {
    return '--lane-tech';
  }
}

export class StudioExperience extends Experience {
  get kindLabel() {
    return 'SHIPPED TITLE';
  }
  get accentVar() {
    return '--lane-art';
  }
}

export class ClientProjectExperience extends Experience {
  get kindLabel() {
    return 'CLIENT PROJECT';
  }
  get accentVar() {
    return '--lane-art';
  }
  get contextLine() {
    return [this.client && `Client: ${this.client}`, this.mode].filter(Boolean).join(' · ');
  }
}

export class LeadershipExperience extends Experience {
  get kindLabel() {
    return 'LEADERSHIP';
  }
  get accentVar() {
    return '--lane-tech';
  }
}

export class VolunteerExperience extends Experience {
  get kindLabel() {
    return 'VOLUNTEER';
  }
  /** Volunteering cuts across every lane, so it stays neutral. */
  get accentVar() {
    return '--lane-neutral';
  }
}

/** Maps the `type` string in portfolio.data.js to a constructor. */
export const EXPERIENCE_TYPES = {
  coop: CoopExperience,
  internship: InternshipExperience,
  research: ResearchExperience,
  studio: StudioExperience,
  client: ClientProjectExperience,
  leadership: LeadershipExperience,
  volunteer: VolunteerExperience,
};
