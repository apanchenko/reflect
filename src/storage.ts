import * as fs from 'fs'
import { Entity } from './entity';

export class Storage {

  entities: Entity[] = [];

  /** add file */
  async onFile(name: string): Promise<void> {
    const stats = await fs.promises.stat(name);
    this.entities.push(new Entity(name, stats));
    console.log(`${name} ${stats.size}`);
  }

  /** complete adding files */
  onEnd(): void {
    this.entities.sort(Entity.compare);
  }
}