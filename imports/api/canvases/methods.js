import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import { Canvases } from './collections'

const createCanvas = new ValidatedMethod({
  name: 'canvases.create',

  validate: new SimpleSchema({
    name: { type: String, max: 100 },
  }).validator(),

  run({ name }) {
    return (
      Canvases.insert({
        name,
        createdAt: Date.now(),
      })
    )
  },
})

export { createCanvas }
