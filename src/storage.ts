import * as fs from 'fs'

export class Storage {

  entities: fs.Stats[] = [];

  /** add file */
  async onFile(name: string): Promise<void> {
    const stats = await fs.promises.stat(name);
    this.entities.push(stats);
    console.log(`${name} ${stats.size}`);
  }
}