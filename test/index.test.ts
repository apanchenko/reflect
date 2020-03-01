import {expect, test} from '@oclif/test'
import mock = require('mock-fs');
import cmd = require('../src')
import {Storage} from '../src/storage'

describe('reflect', () => {

  beforeEach(() => mock({'fake-file': 'file contents'}));

  it("test test", () => {
    expect(2+2).to.equal(4);
  })

  // it('test walker', async () => {
  //   let storage = new Storage('.');
  //   await walk(storage);
  //   expect(storage.size).to.equal(1)
  // })
  // test
  //   .stdout()
  //   .do(() => cmd.run(['src', 't', '-p']))
  //   .it('show full scan', ctx => {
  //     expect(ctx.stdout).to.contain('source:')
  //   })

  // test
  // .stdout()
  // .do(() => cmd.run(['--name', 'jeff']))
  // .it('runs hello --name jeff', ctx => {
  //   expect(ctx.stdout).to.contain('hello jeff')
  // })

  afterEach(mock.restore);
})

