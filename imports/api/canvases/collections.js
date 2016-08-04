import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Canvases = new Mongo.Collection('canvases')

const canvasesSchema = new SimpleSchema({
  name: { type: String, max: 100 },
  createdAt: { type: Date },
})

Canvases.attachSchema(canvasesSchema)

export { Canvases }
