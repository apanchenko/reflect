import {Entity} from '../src/entity'
import {assert} from 'chai'

describe('Entity', () => {
  describe('#construct()', () => {
    it('getters are ok', () => {
      const entity: Entity = new Entity('x', 11)
      assert.equal(entity.name, 'x')
      assert.equal(entity.size, 11)
    })
    it('negative size throws', () => {
      assert.throws(() => new Entity('x', -5))
    })
    it('empty name throws', () => {
      assert.throws(() => new Entity('', 5))
    })
  })
  describe('#equals()', () => {
    it('entity equal to self', () => {
      const ent: Entity = new Entity('x', 5)
      assert.isTrue(ent.equals(ent))
    })
    it('same entities are equal', () => {
      const ent1: Entity = new Entity('x', 1)
      const ent2: Entity = new Entity('x', 1)
      assert.isTrue(ent1.equals(ent2))
      assert.isTrue(ent2.equals(ent1))
    })
    it('different name entities are not equal', () => {
      assert.isFalse(new Entity('x', 2).equals(new Entity('y', 2)))
    })
    it('different size entities are not equal', () => {
      assert.isFalse(new Entity('x', 2).equals(new Entity('x', 3)))
    })
  })
  describe('#equalsByName()', () => {
    it('same name is ok', () => {
      assert.isTrue(new Entity('x', 2).equalsByName(new Entity('x', 20)))
    })
    it('same size is not ok', () => {
      assert.isFalse(new Entity('x', 2).equalsByName(new Entity('y', 2)))
    })
  })
})

