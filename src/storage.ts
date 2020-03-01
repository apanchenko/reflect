import {Entity} from './Entity';
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
  get size(): number {
    return this.entities.length
  }

  /** 
   * Add entities to storage if not exists in mirror,
   * Or remove it from mirror storage.
   */
  async gather() {
    for await (const entity of this.drive.walk()) {
      if (!this.mirror.skip(entity)) {
        this.entities.push(entity);
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
   * Remove duplicate entity
   * @return true if entity was removed
   */
  private skip(entity: Entity): boolean {
    let length = this.entities.length;
    for (let i = 0; i < length; i++) {
      if (entity.equals(this.entities[i])) {
        length--;
        this.entities[i] = this.entities[length];
        this.entities.length = length;
        return true;
      }
    }
    return false;
  }

  /**
   * Print to console
   */
  print(header: string): void {
    console.log(header);
    for (const entity of this.entities) {
      console.log('  ' + entity.toString());
    }
  }

  /**
   * Ignore entities by name
   */
  skipByName(): void {
    for (const entity of this.mirror.entities) {
      let length = this.entities.length;
      for (let i = 0; i < length; i++) {
        if (this.entities[i].equalsByName(entity)) {
          length--;
          this.entities[i] = this.entities[length];
          this.entities.length = length;
          break;
        }
      }
    }
  }
}