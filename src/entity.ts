export class Entity {
  private file: string;

  private length: number;

  constructor(name: string, size: number) {
    if (name.length === 0) {
      throw new Error('Entity name must be non-empty')
    }
    if (size < 0) {
      throw new Error(`Entity size cannot be negative (${name})`)
    }
    this.file = name
    this.length = size
  }

  /**
   * Compare to other entity
   * @param {Entity} other entity to compare with
   * @returns {boolean} true of entities are equal
   */
  equals(other: Entity): boolean {
    return this.length === other.length && this.file === other.file
  }

  /**
   * Compare entities by name
   * @param {Entity} other entity to compare with
   * @returns {boolean} true if names are equal
   */
  equalsByName(other: Entity): boolean {
    return this.file === other.file
  }

  /**
   * @returns {string} file name
   */
  get name(): string {
    return this.file
  }

  /**
   * @returns {number} file size
   */
  get size(): number {
    return this.length
  }
}
