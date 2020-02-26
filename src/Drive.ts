import {Entity} from './Entity'

export interface Drive {

  walk(): AsyncGenerator<Entity>
}