import {Command, flags} from '@oclif/command'
import {Walker} from './walker'
import {Storage} from './storage'

export = class Reflect extends Command {

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
    {name: 'target', required: true}
  ]

  /**
   * Run this big program
   */
  async run() {
    /* parse command line */
    const {args, flags} = this.parse(Reflect)

    /* create entity collector and storages */
    const source = new Storage(args.source);
    const target = new Storage(args.target);

    /* storages meet each other to terminate duplicate entities */
    source.mirror = target;
    target.mirror = source;

    /* walk source and collect file info */
    await Promise.all([
      Walker.list(source),
      Walker.list(target)
    ]);

    /* skip files which will be overwritten */
    target.subtractByName(source);

    /* print results */
    source.print(`source:`);
    target.print(`target:`);

    /* delete obsolete file from target */
    target.delete();

    /* copy new/changed files from source to target*/
    source.copy(target);
  }
}