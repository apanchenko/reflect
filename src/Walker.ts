import * as fs from 'fs'
import * as path from 'path'

export class Walker {

  /**
   * List all files by path
   */
  async list(path:string, onFile:any) {
    const stats = fs.statSync(path);
    if (stats.isFile()) {
      onFile(path);
    }
    else if (stats.isDirectory()) {
      await this.walkDir(path, onFile);
    }
    else {
      throw new Error(`Unknown object ${name}`);
    }
  }

  /**
   * Walk over a directory
   */
  private async walkDir(dir:string, onFile:any) {
    const dirents:fs.Dirent[] = await fs.promises.readdir(dir, {withFileTypes: true});
    for (const dirent of dirents) {
      const name = path.join(dir, dirent.name);
      if (dirent.isFile()) {
        onFile(name);
      }
      else if (dirent.isDirectory()) {
        this.walkDir(name, onFile);
      }
      else {
        throw new Error(`Unknown object ${name}`);
      }
    }
  }
}