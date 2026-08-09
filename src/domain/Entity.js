/**
 * Entity — the abstract base every portfolio object inherits from.
 *
 * This is deliberately abstract: constructing an Entity directly throws.
 * Subclasses (Project, Experience) supply their own identity and their own
 * answers to `kindLabel` / `accentVar`, which is what lets the components
 * render any item without type-checking it.
 */

let autoId = 0;

export class Entity {
  constructor({ id, title = '' } = {}) {
    if (new.target === Entity) {
      throw new TypeError('Entity is abstract — extend it rather than constructing it directly.');
    }
    this.id = id ?? `entity-${++autoId}`;
    this.title = title;
  }

  /** URL-safe version of the title, used for anchors and React keys. */
  get slug() {
    return String(this.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Subclasses override these two. Together they mean a component can render
   * any Entity — its badge text and its accent colour come from the object
   * itself, so there is never an `if (type === 'art')` branch in the UI.
   */
  get kindLabel() {
    return 'ITEM';
  }

  get accentVar() {
    return '--lane-neutral';
  }

  /** Everything a search box should look at. Subclasses widen this. */
  get searchText() {
    return this.title;
  }

  matches(query) {
    if (!query) return true;
    return this.searchText.toLowerCase().includes(String(query).toLowerCase());
  }

  toJSON() {
    return { id: this.id, title: this.title, kind: this.kindLabel };
  }

  toString() {
    return this.title;
  }
}
