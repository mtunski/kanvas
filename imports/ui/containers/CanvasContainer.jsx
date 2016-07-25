import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import TrackerReact from 'meteor/ultimatejs:tracker-react'

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
    Meteor.call('stickies.create', this.props.canvasId, x, y)
  }

  handleDeleteSticky = (stickyId) => {
    Meteor.call('stickies.delete', stickyId)
  }

  handleMoveSticky = (stickyId, x, y) => {
    Meteor.call('stickies.update', stickyId, { x, y })
  }

  render() {
    return (
      <Canvas
        {...this.meteorData()}
        onClick={this.handleCreateSticky}
        onStickyClick={this.handleDeleteSticky}
        onStickyMove={this.handleMoveSticky}
      />
    )
  }
}
