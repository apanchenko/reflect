import * as fs from 'fs'
import * as path from 'path'
import { Entity } from './entity';

export class Storage {

  root: string
  private entities: Entity[] = [];

  constructor(root: string) {
    this.root = root;
  }

  /** add file */
  async onFile(name: string): Promise<void> {
    const full = path.join(this.root, name);
    const stats = await fs.promises.stat(full);
    this.entities.push(new Entity(name, stats));
  }

  /** complete adding files */
  onEnd(): void {
    this.entities.sort(Entity.compare);
  }

  /** iterate entities */
  each(fn: (entity:Entity) => any): void {
    this.entities.forEach(fn);
  }

  /** print to console */
  print(header: string): void {
    console.log(header);
    this.each(entity => console.log(`  ${entity.name} ${entity.size}`));
  }

}