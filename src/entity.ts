import * as fs from 'fs'

export class Entity {

  private name: string;
  private size: number;
  
  constructor(name: string, stats: fs.Stats) {
    this.name = name;
    this.size = stats.size;
  }

  static compare (a: Entity, b: Entity): number {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  }
}