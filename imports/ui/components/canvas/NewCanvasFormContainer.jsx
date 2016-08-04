import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'

import NewCanvasForm from './NewCanvasForm'

import { createCanvas } from '/imports/api/canvases/methods'

@withRouter
export default class NewCanvasFormContainer extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  handleCreateCanvas = (name) => {
    createCanvas.call({ name }, (error, canvasId) => {
      if (!error) {
        this.props.router.push(`canvases/${canvasId}`)
      }
    })
  }

  render() {
    return (
      <NewCanvasForm onSubmit={this.handleCreateCanvas} />
    )
  }
}
