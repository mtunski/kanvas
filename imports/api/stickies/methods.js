import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import { Stickies } from './collections'

const createSticky = new ValidatedMethod({
  name: 'stickies.create',

  validate: new SimpleSchema({
    canvasId: { type: String },
    x: { type: Number },
    y: { type: Number },
    rotation: { type: Number, min: -3, max: 3 },
  }).validator(),

  run({ canvasId, x, y, rotation }) {
    return (
      Stickies.insert({
        canvasId, x, y, rotation,
        createdAt: Date.now(),
      })
    )
  },
})

const updateSticky = new ValidatedMethod({
  name: 'stickies.update',

  validate: new SimpleSchema({
    _id: { type: String },
    x: { type: Number, optional: true },
    y: { type: Number, optional: true },
    text: { type: String, optional: true },
  }).validator(),

  run({ _id, ...fields }) {
    return Stickies.update(_id, { $set: fields })
  },
})

const deleteSticky = new ValidatedMethod({
  name: 'stickies.delete',

  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),

  run({ _id }) {
    return Stickies.remove(_id)
  },
})

export { createSticky, updateSticky, deleteSticky }
