import * as fs from 'fs'
import * as path from 'path'
import {Storage} from './storage'

export class Walker {

  /** List all files by path */
  async list(storage: Storage): Promise<void> {
    const stats = await fs.promises.stat(storage.root);
    await this.lookAt(stats, '', storage);
  }

  /** Delete all files */
  async delete(storage: Storage): Promise<void> {

  }

  /** Walk over a directory */
  private async walkDir(dir: string, storage: Storage): Promise<void> {
    const dirents = await fs.promises.readdir(
      path.join(storage.root, dir),
      {withFileTypes: true});
    for (const ent of dirents) {
      const name = path.join(dir, ent.name);
      await this.lookAt(ent, name, storage);
    }
  }

  /** Route on entity */
  private async lookAt(ent: fs.Dirent | fs.Stats, name: string, storage: Storage): Promise<void> {
    if (ent.isFile()) {
      await storage.onFile(name);
    }
    else if (ent.isDirectory()) {
      await this.walkDir(name, storage);
    }
    else {
      throw new Error(`Unknown object ${name}`);
    }
  }
}