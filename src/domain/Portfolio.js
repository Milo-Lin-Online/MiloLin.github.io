import { Project, PROJECT_TYPES } from './Project.js';
import { slugify as slug } from '../content/loadContent.js';
import { Experience, EXPERIENCE_TYPES } from './Experience.js';

/**
 * Lane — one of the three portfolio sections (3D Art, Tech Art, Product + Marketing).
 * Owns its projects and knows how to sort and find them.
 */
export class Lane {
  constructor({ key, label, short, tagline, blurb, accentVar, reelUrl = null, projects = [], content = null }) {
    this.key = key;
    this.label = label;
    this.short = short ?? label;
    this.tagline = tagline ?? '';
    this.blurb = blurb ?? '';
    this.accentVar = accentVar ?? '--accent';
    this.reelUrl = reelUrl;
    this._projects = projects;

    // Anything found for this section in the `content/` folder. Null when
    // there's no matching folder, in which case the page renders as before.
    this.content = content;
  }

  /** True when a content folder supplied a reel, text, or at least one gallery. */
  get hasContent() {
    return Boolean(
      this.content && (this.content.reel || this.content.description || this.content.blocks.length)
    );
  }

  get projects() {
    return [...this._projects].sort(Project.compare);
  }

  get featured() {
    return this.projects.filter((p) => p.featured);
  }

  get count() {
    return this._projects.length;
  }

  find(id) {
    return this._projects.find((p) => p.id === id) ?? null;
  }
}

/**
 * ExperienceGroup — a labelled block inside the accordion
 * (Professional Experience / Client Projects / Leadership & Volunteering).
 */
export class ExperienceGroup {
  constructor({ key, label, note = '', items = [] }) {
    this.key = key;
    this.label = label;
    this.note = note;
    this._items = items;
  }

  get items() {
    return [...this._items].sort(Experience.compare);
  }

  get count() {
    return this._items.length;
  }

  /** Only the roles that are relevant to a given lane. */
  forLane(laneKey) {
    return this.items.filter((item) => item.belongsTo(laneKey));
  }
}

/**
 * Portfolio — the root aggregate. Everything the UI needs hangs off one object,
 * built once from plain data by the static factory below.
 */
export class Portfolio {
  constructor({ profile, lanes = [], groups = [] }) {
    this.profile = profile;
    this.lanes = lanes;
    this.groups = groups;
  }

  lane(key) {
    return this.lanes.find((l) => l.key === key) ?? null;
  }

  get laneKeys() {
    return this.lanes.map((l) => l.key);
  }

  /** Every experience across every group, newest first. */
  get allExperiences() {
    return this.groups.flatMap((g) => g.items).sort(Experience.compare);
  }

  /** Groups filtered down to one lane, with empty groups dropped. */
  groupsForLane(laneKey) {
    return this.groups
      .map((g) => new ExperienceGroup({ ...g, key: g.key, label: g.label, note: g.note, items: g.forLane(laneKey) }))
      .filter((g) => g.count > 0);
  }

  experiencesFor(laneKey) {
    return this.allExperiences.filter((e) => e.belongsTo(laneKey));
  }

  /**
   * Factory. Reads the plain objects in portfolio.data.js and instantiates the
   * right subclass for each one based on its `type` field.
   */
  /**
   * Factory. Reads the plain objects in portfolio.data.js, instantiates the
   * right subclass for each one, and merges in anything found in `content/`.
   *
   * @param data     the hand-written content from portfolio.data.js
   * @param content  the result of loadContent(), or null to skip the merge
   */
  static from(data, content = null) {
    const contentSections = content?.sections ?? [];

    // Match a content folder to a section by comparing slugs, so the folder
    // "Product + Marketing" finds the lane labelled "Product + Marketing"
    // regardless of spacing or capitalisation.
    const usedSlugs = new Set();
    const findContent = (label) => {
      const wanted = slug(label);
      const match = contentSections.find((c) => c.slug === wanted);
      if (match) usedSlugs.add(match.slug);
      return match ?? null;
    };

    const lanes = (data.lanes ?? []).map(
      (lane) =>
        new Lane({
          ...lane,
          content: findContent(lane.label),
          projects: (lane.projects ?? []).map((p) => {
            const ProjectClass = PROJECT_TYPES[p.type] ?? PROJECT_TYPES.art;
            return new ProjectClass({ ...p, lanes: p.lanes ?? [lane.key] });
          }),
        })
    );

    // A content folder that matched nothing becomes a brand new section, and
    // shows up in the navigation on its own. This is what makes dropping in a
    // folder enough to create a whole new page.
    for (const extra of contentSections) {
      if (usedSlugs.has(extra.slug)) continue;
      lanes.push(
        new Lane({
          key: extra.slug,
          label: extra.name,
          short: extra.name,
          tagline: '',
          blurb: '',
          accentVar: '--accent',
          reelUrl: null,
          projects: [],
          content: extra,
        })
      );
    }

    const groups = (data.experienceGroups ?? []).map(
      (group) =>
        new ExperienceGroup({
          ...group,
          items: (group.items ?? []).map((e) => {
            const ExperienceClass = EXPERIENCE_TYPES[e.type] ?? EXPERIENCE_TYPES.internship;
            return new ExperienceClass(e);
          }),
        })
    );

    return new Portfolio({ profile: data.profile, lanes, groups });
  }
}
