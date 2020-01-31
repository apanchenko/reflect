import * as fs from 'fs'

export class Entity {

  private name: string;
  private size: number;

  constructor(name: string, stats: fs.Stats) {
    this.name = name;
    this.size = stats.size;
  }

  /** compare to other entity */
  equals(other: Entity): boolean {
    return this.size === other.size && this.name === other.name;
  }

  equalsByName(other: Entity): boolean {
    return this.name === other.name;
  }

  /** text message for log */
  toString(): string {
    return `${this.name} ${this.size}`;
  }
}