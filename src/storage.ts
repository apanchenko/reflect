import {Entity} from './entity'
import {Drive} from './Drive'

export class Storage {
  private drive: Drive

  private mirror: Storage

  private entities: Entity[]

  constructor(drive: Drive, mirror: Drive | Storage) {
    this.drive = drive
    this.mirror = mirror instanceof Storage ? mirror : new Storage(mirror, this)
    this.entities = []
  }

  /**
   * Get the other side
   */
  get other(): Storage {
    return this.mirror
  }

  /**
   * Gathered entity count
   */
  get count(): number {
    return this.entities.length
  }

  get size(): number {
    return this.entities
    .map(entity => entity.size)
    .reduce((mem, cur) => {
      mem += cur
      return mem
    }, 0)
  }

  /**
   * Add entities to storage if not exists in mirror,
   * Or remove it from mirror storage.
   */
  async gather() {
    for await (const entity of this.drive.walk()) {
      if (!this.mirror.skip(entity)) {
        this.entities.push(entity)
      }
    }
  }

  /**
   * Delete all entities
   */
  async delete() {
    this.entities.forEach(ent => this.drive.delete(ent))
  }

  /**
   * Copy all entities to the other side
   */
  async copy() {
    this.entities.forEach(ent => this.drive.copy(ent, this.mirror.drive))
  }

  /**
   * Print to console
   * @param {string} header text
   * @param {any} log outout function
   */
  print(header: string, log: any): void {
    log(header, this.entities.length, 'files, total', this.size, 'bytes')
    for (const entity of this.entities) {
      log('  ' + entity.name)
    }
  }

  /**
   * Ignore entities by name
   */
  skipByName(): void {
    for (const entity of this.mirror.entities) {
      let length = this.entities.length
      for (let i = 0; i < length; i++) {
        if (this.entities[i].equalsByName(entity)) {
          length--
          this.entities[i] = this.entities[length]
          this.entities.length = length
          break
        }
      }
    }
  }

  /**
   * Remove duplicate entity
   * @param {Entity} entity to skip or not
   * @returns {boolean} true if entity was removed
   */
  private skip(entity: Entity): boolean {
    let length = this.entities.length
    for (let i = 0; i < length; i++) {
      if (entity.equals(this.entities[i])) {
        length--
        this.entities[i] = this.entities[length]
        this.entities.length = length
        return true
      }
    }
    return false
  }
}
