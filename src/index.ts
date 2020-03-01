import {Command, flags} from '@oclif/command'
import {Drive} from './Drive'
import {DriveLocal} from './DriveLocal'
import {Storage} from './Storage'

export = class Reflect extends Command {

  static description = 'Make target folder equivalent to source'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    ignorecase: flags.boolean({char: 'i', description: 'not implemented yet'}),
    preview: flags.boolean({char: 'p', description: 'do not change any file'}),
    quiet: flags.boolean({char: 'q', description: 'no console output'}),
  }

  static args = [
    {name: 'source', required: true},
    {name: 'target', required: true},
  ]

  /**
   * Run this big program
   */
  async run() {
    /* parse command line */
    const {args, flags} = this.parse(Reflect)
    /* create entity collector and storages */
    const source = new Storage(
      new DriveLocal(args.source),
      new DriveLocal(args.target)
    )
    const target = source.other
    /* walk source and collect file info */
    await Promise.all([
      source.gather(),
      target.gather(),
    ])
    /* skip files which will be overwritten */
    target.skipByName()
    /* print results */
    if (!flags.quiet) {
      source.print('source:')
      target.print('target:')
    }
    /* ready to do the job */
    if (!flags.preview) {
      /* delete obsolete file from target */
      target.delete()
      /* copy new/changed files from source to target */
      source.copy()
    }
  }
}
