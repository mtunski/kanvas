import { Meteor } from 'meteor/meteor'

import { Canvases } from './collections'
import { Stickies } from '../stickies/collections'

Meteor.publishComposite('canvas', (canvasId) => ({
  find: () => Canvases.find({ _id: canvasId }),
  children: [
    { find: (canvas) => Stickies.find({ canvasId: canvas._id }) },
  ],
}))
