import * as fs from 'fs'
import * as Path from 'path'
import {Drive} from './Drive'
import {Entity} from './Entity'

export class DriveLocal implements Drive {

  private root: string

  constructor(root: string) {
    this.root = root
  }

  async *walk(): AsyncGenerator<Entity> {
    yield* this.walkDeep('')
  }

  /** List all files by path */
  async *walkDeep(path: string): AsyncGenerator<Entity> {
    const full = Path.join(this.root, path)
    const stats: fs.Stats = await fs.promises.stat(full)
    if (stats.isFile()) {
      yield new Entity(path, stats.size)
    }
    else if (stats.isDirectory()) {
      const dirents = await fs.promises.readdir(full, {withFileTypes: true});
      for (const ent of dirents) {
        yield* this.walkDeep(Path.join(path, ent.name))
      }
    }
    else {
      throw new Error(`Unknown object ${name}`);
    }
  }

  /** Copy files */
  // async copy(target: Storage): Promise<void> {
  //   for (const entity of this.entities) {
  //     await fs.promises.copyFile(
  //       Path.join(this.root, entity.getName()),
  //       Path.join(target.root, entity.getName())
  //     );
  //   }
  // }

  /** Delete all files */
  async delete(ents: Entity[]): Promise<void> {
    for (const ent of ents) {
      await fs.promises.unlink(
        Path.join(this.root, ent.getName())
      );
    }
  }
}