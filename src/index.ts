import {Command, flags} from '@oclif/command'
import {DriveLocal} from './drive-local'
import {Storage} from './storage'

export = class Reflect extends Command {
  static description = 'Make target folder equivalent to source'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    'dry-run': flags.boolean({char: 'n', description: 'do not change any file'}),
    progress: flags.boolean({char: 'p', description: 'show progress'}),
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
    /* print plan */
    if (!flags.quiet) {
      target.print('To delete from target:', console.log)
      source.print('To copy from source:', console.log)
    }
    /* ready to do the job */
    if (!flags['dry-run']) {
      /* delete obsolete file from target */
      target.delete()
      /* copy new/changed files from source to target */
      source.copy()
    }
  }
}
