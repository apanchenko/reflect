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
    ignorecase: flags.boolean({char: 'i'})
  }

  static args = [
    {name: 'source', required: true},
    {name: 'mirror', required: true}
  ]

  async run() {
    // parse cli
    const {args, flags} = this.parse(Reflect)

    const walker = new Walker();
    const source = new Storage();
    const mirror = new Storage();

    // walk source and mirror folders
    await Promise.all([
      walker.list(args.source, source),
      walker.list(args.mirror, mirror)
    ]);
  }
}

export = Reflect
