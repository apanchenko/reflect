import * as fs from 'fs'
import * as path from 'path'
import {Storage} from './storage'

export class Walker {

  /**
   * List all files by path
   */
  async list(path:string, storage:Storage) {
    const stats = await fs.promises.stat(path);
    /* report file to image */
    if (stats.isFile()) {
      storage.onFile(path);
    }
    /* walk directory */
    else if (stats.isDirectory()) {
      await this.walkDir(path, storage);
    }
    /* report unknown entity */
    else {
      throw new Error(`Unknown object ${name}`);
    }
  }

  /**
   * Walk over a directory
   */
  private async walkDir(dir:string, storage:Storage) {
    const dirents:fs.Dirent[] = await fs.promises.readdir(dir, {withFileTypes: true});
    for (const dirent of dirents) {
      const name = path.join(dir, dirent.name);
      if (dirent.isFile()) {
        storage.onFile(name);
      }
      else if (dirent.isDirectory()) {
        this.walkDir(name, storage);
      }
      else {
        throw new Error(`Unknown object ${name}`);
      }
    }
  }
}