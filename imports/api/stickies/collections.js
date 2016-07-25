import { Mongo } from 'meteor/mongo'

const Stickies = new Mongo.Collection('stickies')

export { Stickies }
