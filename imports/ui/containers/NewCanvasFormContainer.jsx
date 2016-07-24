import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { withRouter } from 'react-router'

import NewCanvasForm from '../components/canvas/NewCanvasForm'

@withRouter
export default class NewCanvasFormContainer extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  handleCreateCanvas = (name) => {
    Meteor.call('canvases.create', name, (error, canvasId) => {
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
