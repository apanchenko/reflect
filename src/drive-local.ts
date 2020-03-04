import * as fs from 'fs'
import * as Path from 'path'
import {Drive} from './Drive'
import {Entity} from './entity'
import * as stream from 'stream'

export class DriveLocal implements Drive {
  private root: string

  constructor(root: string) {
    this.root = root
  }

  /**
   * Enumerate files
   * @param {string} path current recursive path
   */
  async * walk(path = ''): AsyncGenerator<Entity> {
    const full = Path.join(this.root, path)
    const stats: fs.Stats = await fs.promises.stat(full)
    if (stats.isFile()) {
      yield new Entity(path, stats.size)
    } else if (stats.isDirectory()) {
      const dirents: fs.Dirent[] = await fs.promises.readdir(full, {withFileTypes: true})
      for (const ent of dirents) {
        yield * this.walk(Path.join(path, ent.name))
      }
    } else {
      throw new Error(`Unsupported object ${name}`)
    }
  }

  /**
   * Copy entity to target drive
   * @param {Entity} entity to copy
   * @param {Drive} target for entity
   */
  async copy(entity: Entity, target: Drive): Promise<void> {
    const rd = this.read(entity)
    const wr = target.write(entity)
    return new Promise<void>((resolve, reject) => {
      wr.on('error', reject)
      .on('finish', resolve)
      rd.on('error', reject)
      .pipe(wr)
    }).catch(error => {
      rd.destroy()
      wr.end()
      throw error
    })
  }

  /**
   * Create stream to write entity
   * @param {Entity} entity to write to
   * @returns {stream.Writable} write stream
   */
  write(entity: Entity): stream.Writable {
    const target = Path.join(this.root, entity.name)
    return fs.createWriteStream(target)
  }

  /**
   * Delete entity
   * @param {Entity} entity to delte
   */
  async delete(entity: Entity): Promise<void> {
    await fs.promises.unlink(
      Path.join(this.root, entity.name)
    )
  }

  /**
   * Crete stream to read entity
   * @param {Entity} entity to read from
   * @returns {stream.Readable} read stream
   */
  private read(entity: Entity): stream.Readable {
    const source = Path.join(this.root, entity.name)
    return fs.createReadStream(source)
  }
}
