import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import { Canvases } from './collections'

Meteor.methods({
  'canvases.create'(name) {
    check(name, String)

    return (
      Canvases.insert({
        name,
        createdAt: Date.now(),
      })
    )
  },
})
