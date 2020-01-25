import {Command, flags} from '@oclif/command'
import {Walker} from './walker'
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
    {name: 'source', required: true},
    {name: 'mirror', required: true}
  ]

  async run() {
    // parse cli
    const {args, flags} = this.parse(Reflect)

    const walker = new Walker();

    // walk source folder
    const source:Storage = new Storage();
    walker.list(args.source, source);

    // walk mirror folder
    const mirror:Storage = new Storage();
    walker.list(args.mirror, mirror);
  }
}

export = Reflect
