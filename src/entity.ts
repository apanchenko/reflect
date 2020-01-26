import * as fs from 'fs'

export class Entity {

  private _name: string;
  private _size: number;

  get name(): string { return this._name; }
  get size(): number { return this._size; }
  
  constructor(name: string, stats: fs.Stats) {
    this._name = name;
    this._size = stats.size;
  }

  static compare (a: Entity, b: Entity): number {
    if (a._name > b._name) {
      return 1;
    }
    if (a._name < b._name) {
      return -1;
    }
    return 0;
  }
}