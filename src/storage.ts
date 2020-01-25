import * as fs from 'fs'

export class Storage {

  entities:fs.Stats[] = [];

  async onFile(name: string) : Promise<void> {
    const stats = await fs.promises.stat(name);
    console.log(name);
  }
}