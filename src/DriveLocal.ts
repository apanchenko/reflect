import * as fs from 'fs'
import * as Path from 'path'
import {Drive} from './Drive'
import {Entity} from './Entity'
import * as stream from "stream"

export class DriveLocal implements Drive {

  private root: string

  constructor(root: string) {
    this.root = root
  }

  /** List all files by path */
  async *walk(path?: string): AsyncGenerator<Entity> {
    path = path ?? ''
    const full = Path.join(this.root, path)
    const stats: fs.Stats = await fs.promises.stat(full)
    if (stats.isFile()) {
      yield new Entity(path, stats.size)
    }
    else if (stats.isDirectory()) {
      const dirents: fs.Dirent[] = await fs.promises.readdir(full, {withFileTypes: true})
      for (const ent of dirents) {
        yield* this.walk(Path.join(path, ent.name))
      }
    }
    else {
      throw new Error(`Unknown object ${name}`);
    }
  }

  /** Copy files */
  async copy(entity: Entity, target: Drive): Promise<void> {
    let rd = this.read(entity)
    var wr = target.write(entity)
    return new Promise<void>(function(resolve, reject) {
      wr.on('error', reject)
        .on('finish', resolve)
      rd.on('error', reject)
        .pipe(wr);
    }).catch(function(error) {
      rd.destroy()
      wr.end()
      throw error
    });
  }

  read(entity: Entity): stream.Readable {
    const source = Path.join(this.root, entity.name)
    return fs.createReadStream(source);
  }

  write(entity: Entity): stream.Writable {
    const target = Path.join(this.root, entity.name)
    return fs.createWriteStream(target);
  }

  /** Delete entity */
  async delete(entity: Entity): Promise<void> {
    await fs.promises.unlink(
      Path.join(this.root, entity.name)
    );
  }
}