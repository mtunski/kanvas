import { Meteor } from 'meteor/meteor'

import { Canvases } from './collections'

Meteor.publish('canvas', (canvasId) => Canvases.find({ _id: canvasId }))
