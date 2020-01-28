import * as fs from 'fs'
import * as path from 'path'
import { Entity } from './entity';

export class Storage {

  root: string;
  mirror?: Storage = undefined;
  private entities: Entity[] = [];

  constructor(root: string) {
    this.root = root;
  }

  /** 
   * Add entity to storage if not exists in mirror,
   * Or remove it from mirror storage.
   */
  async onFile(name: string): Promise<void> {
    const full = path.join(this.root, name);
    const stats = await fs.promises.stat(full);
    const entity = new Entity(name, stats);
    if (!this.mirror?.removeDuplicate(entity)) {
      this.entities.push(entity);
    }
  }

  /**
   * Finish adding files
   */
  onEnd(): void {
    this.entities.sort(Entity.compare);
  }

  /**
   * Remove duplicate entity
   * @return true if entity was removed
   */
  removeDuplicate(entity: Entity): boolean {
    let length = this.entities.length;
    for (let i = 0; i < length; i++) {
      if (entity.equals(this.entities[i])) {
        length--;
        this.entities[i] = this.entities[length];
        this.entities.length = length;
        return true;
      }
    }
    return false;
  }

  /**
   * Iterate entities
   */
  each(fn: (entity:Entity) => any): void {
    this.entities.forEach(fn);
  }

  /**
   * Print to console
   */
  print(header: string): void {
    console.log(header);
    this.each(entity => console.log(`  ${entity.name} ${entity.size}`));
  }
}