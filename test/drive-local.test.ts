import * as sinon from 'sinon'
import {DriveLocal} from '../src/drive-local'
import {assert} from 'chai'
import * as fs from 'fs'

describe('DriveLocal', () => {
  describe('#walk()', () => {
    let statStub: sinon.SinonStub<[fs.PathLike], Promise<fs.Stats>>

    beforeEach(() => {
      statStub = sinon.stub(fs.promises, 'stat').returns(Promise.resolve(new fs.Stats()))
    })

    afterEach(() => {
      statStub.restore()
    })

    it('over single file', async () => {
      const fileStub = sinon.stub(fs.Stats.prototype, 'isFile').returns(true)
      const gen = new DriveLocal('root').walk('here.txt')
      let entity = await gen.next()
      assert.equal(entity.value.name, 'here.txt')
      entity = await gen.next()
      assert.isTrue(entity.done)
      fileStub.restore()
    })

    it('over empty folder', async () => {
      const stubs = Array.of(
        sinon.stub(fs.Stats.prototype, 'isFile').returns(false),
        sinon.stub(fs.Stats.prototype, 'isDirectory').returns(true),
      )
      const emptyDirStub = sinon.stub(fs.promises, 'readdir').returns(Promise.resolve([]))
      const gen = new DriveLocal('root').walk()
      const entity = await gen.next()
      assert.isTrue(entity.done)
      stubs.forEach(stub => stub.restore())
      emptyDirStub.restore()
    })
  })
})
