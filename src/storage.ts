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
   * Print to console
   */
  print(header: string): void {
    console.log(header);
    this.each(entity => console.log('  ' + entity.toString()));
  }

  /**
   * Remove multiple entities by name
   */
  subtractByName(storage: Storage): void {
    storage.each(entity => this.removeByName(entity));
  }

  /**
   * Remove entity by name
   */
  private removeByName(entity: Entity): void {
    let length = this.entities.length;
    for (let i = 0; i < length; i++) {
      if (this.entities[i].equalsByName(entity)) {
        length--;
        this.entities[i] = this.entities[length];
        this.entities.length = length;
        break;
      }
    }
  }

  /**
   * Iterate entities
   */
  async each(fn: (entity:Entity) => any): Promise<void> {
    for (const entity of this.entities) {
      await fn(entity);
    }
  }

  /** Copy files */
  async copy(target: Storage): Promise<void> {
    for (const entity of this.entities) {
      await fs.promises.copyFile(
        path.join(this.root, entity.getName()),
        path.join(target.root, entity.getName())
      );
    }
  }

  /** Delete all files */
  async delete(): Promise<void> {
    for (const entity of this.entities) {
      await fs.promises.unlink(
        path.join(this.root, entity.getName())
      );
    }
    this.entities.length = 0;
  }
}