import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import { Canvases } from '/imports/api/canvases/collections'
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
    }
  }

  render() {
    return (
      <Canvas canvas={this.meteorData()} />
    )
  }
}
