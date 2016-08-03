import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { random } from 'lodash'

import { Canvases } from '/imports/api/canvases/collections'
import { Stickies } from '/imports/api/stickies/collections'
import Canvas from '../components/canvas/Canvas'

@TrackerReact
export default class CanvasContainer extends Component {
  static propTypes = {
    canvasId: PropTypes.string.isRequired,
  }

  state = {
    subscription: {
      canvas: Meteor.subscribe('canvas', this.props.canvasId),
    },
  }

  componentWillUnmount() {
    this.state.subscription.canvas.stop()
  }

  meteorData() {
    return {
      canvas: Canvases.find({}).fetch()[0],
      stickies: Stickies.find({}).fetch(),
    }
  }

  handleCreateSticky = (x, y) => {
    Meteor.call('stickies.create', this.props.canvasId, x, y, random(-3, 3))
  }

  handleUpdateStickyText = (stickyId, text) => {
    Meteor.call('stickies.update', stickyId, { text })
  }

  handleMoveSticky = (stickyId, x, y) => {
    Meteor.call('stickies.update', stickyId, { x, y })
  }

  render() {
    return (
      <Canvas
        {...this.meteorData()}
        onClick={this.handleCreateSticky}
        onStickyMove={this.handleMoveSticky}
        onStickyTextUpdate={this.handleUpdateStickyText}
      />
    )
  }
}
