import {Entity} from './Entity'
import * as stream from "stream";

export interface Drive {

  walk(): AsyncGenerator<Entity>
  copy(entity: Entity, target: Drive): Promise<void>
  delete(entity: Entity): Promise<void>
  write(entity: Entity): stream.Writable
}