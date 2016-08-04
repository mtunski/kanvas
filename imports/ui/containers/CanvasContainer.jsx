import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { random } from 'lodash'

import { Canvases } from '/imports/api/canvases/collections'
import { Stickies } from '/imports/api/stickies/collections'
import Canvas from '../components/canvas/Canvas'

import { createSticky, updateSticky } from '/imports/api/stickies/methods'

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
    createSticky.call({ canvasId: this.props.canvasId, x, y, rotation: random(-3, 3) })
  }

  handleUpdateStickyText = (stickyId, text) => {
    updateSticky.call({ _id: stickyId, text })
  }

  handleMoveSticky = (stickyId, x, y) => {
    updateSticky.call({ _id: stickyId, x, y })
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
