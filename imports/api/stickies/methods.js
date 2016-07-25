import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import { Stickies } from './collections'

Meteor.methods({
  'stickies.create'(canvasId, x, y) {
    check(canvasId, String)
    check(x, Number)
    check(y, Number)

    return (
      Stickies.insert({
        canvasId, x, y,
        createdAt: Date.now(),
      })
    )
  },
  'stickies.update'(_id, fields) {
    check(_id, String)
    check(fields, Object)

    return Stickies.update(_id, { $set: fields })
  },
  'stickies.delete'(_id) {
    check(_id, String)

    return Stickies.remove(_id)
  },
})
