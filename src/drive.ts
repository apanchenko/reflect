import {Entity} from './entity'
import * as stream from 'stream'

export interface OnProgress {
  (size: number): void;
}

export interface Drive {

  walk(): AsyncGenerator<Entity>;
  copy(entity: Entity, target: Drive, onCopy?: OnProgress): Promise<void>;
  delete(entity: Entity): Promise<void>;
  write(entity: Entity): stream.Writable;
}
