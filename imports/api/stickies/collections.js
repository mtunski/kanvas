import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Stickies = new Mongo.Collection('stickies')

const stickiesSchema = new SimpleSchema({
  canvasId: { type: String },
  x: { type: Number },
  y: { type: Number },
  rotation: { type: Number, min: -3, max: 3 },
  text: { type: String, optional: true },
})

Stickies.attachSchema(stickiesSchema)

export { Stickies }
