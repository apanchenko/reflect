export class Entity {

  private file: string;

  private size: number;

  constructor(name: string, size: number) {
    this.file = name
    this.size = size
  }

  /**
   * Compare to other entity
   * @param {Entity} other entity to compare with
   * @returns {boolean} true of entities are equal
   */
  equals(other: Entity): boolean {
    return this.size === other.size && this.file === other.file
  }

  /**
   * Compare entities by name
   * @param other enity to compare with
   */
  equalsByName(other: Entity): boolean {
    return this.file === other.file
  }

  /**
   * @returns {string} text message for log
   */
  toString(): string {
    return `${this.file} ${this.size}`
  }

  /**
   * @returns {string} file name
   */
  get name(): string {
    return this.file
  }
}
