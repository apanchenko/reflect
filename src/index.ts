import {Command, flags} from '@oclif/command'
import {Walker} from './walker'
import {Image} from './image'
import {Storage} from './storage'

class Reflect extends Command {

  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [
    {name: 'source'},
    {name: 'mirror'}
  ]

  async run() {
    // parse cli
    const {args, flags} = this.parse(Reflect)

    if (args.source) {
      const walker = new Walker();
      const image:Image = new Storage();
      walker.list(args.source, image);
    }
  }
}

export = Reflect
