export class Entity {

  private name: string;

  private size: number;

  constructor(name: string, size: number) {
    this.name = name
    this.size = size
  }

  /**
   * Compare to other entity
   * @param {Entity} other entity to compare with
   * @returns {boolean} true of entities are equal
   */
  equals(other: Entity): boolean {
    return this.size === other.size && this.name === other.name
  }

  equalsByName(other: Entity): boolean {
    return this.name === other.name
  }

  /**
   * @returns {string} text message for log
   */
  toString(): string {
    return `${this.name} ${this.size}`
  }

  /**
   * @returns {string} file name
   */
  getName(): string {
    return this.name
  }
}
