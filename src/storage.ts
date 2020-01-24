import {Image} from './image'

export class Storage implements Image {

  onFile(name: string) : void {
    console.log(name);
  }
}