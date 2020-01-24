import * as fs from 'fs'
import * as path from 'path'
import {Image} from './image'

export class Walker {

  /**
   * List all files by path
   */
  async list(path:string, image:Image) {
    const stats = fs.statSync(path);
    /* report file to image */
    if (stats.isFile()) {
      image.onFile(path);
    }
    /* walk directory */
    else if (stats.isDirectory()) {
      await this.walkDir(path, image);
    }
    /* report unknown entity */
    else {
      throw new Error(`Unknown object ${name}`);
    }
  }

  /**
   * Walk over a directory
   */
  private async walkDir(dir:string, image:Image) {
    /* read and iterate directory */
    const dirents:fs.Dirent[] = await fs.promises.readdir(dir, {withFileTypes: true});
    for (const dirent of dirents) {
      /* prepare entity name */
      const name = path.join(dir, dirent.name);
      /* report file to image */
      if (dirent.isFile()) {
        image.onFile(name);
      }
      /* walk another dir */
      else if (dirent.isDirectory()) {
        this.walkDir(name, image);
      }
      /* report unknown entity */
      else {
        throw new Error(`Unknown object ${name}`);
      }
    }
  }
}