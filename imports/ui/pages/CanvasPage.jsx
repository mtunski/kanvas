import React, { Component, PropTypes } from 'react'

import CanvasContainer from '../components/canvas/CanvasContainer'

export default class CanvasPage extends Component {
  static propTypes = {
    params: PropTypes.shape({
      canvasId: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    return <CanvasContainer canvasId={this.props.params.canvasId} />
  }
}
