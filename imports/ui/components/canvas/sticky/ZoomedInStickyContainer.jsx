import React, { Component, PropTypes } from 'react'

import ZoomedInSticky from './ZoomedInSticky'

import { updateSticky, deleteSticky } from '/imports/api/stickies/methods'

export default class ZoomedInStickyContainer extends Component {
  static propTypes = {
    sticky: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      text: PropTypes.string,
    }),
    onZoomOut: PropTypes.func.isRequired,
  }

  handleUpdateText = (text) => {
    if (!!text) {
      updateSticky.call({ _id: this.props.sticky._id, text })
      this.props.onZoomOut()
    } else {
      deleteSticky.call({ _id: this.props.sticky._id })
    }
  }

  render() {
    return (
      <ZoomedInSticky
        sticky={this.props.sticky}
        onOverlayClick={this.props.onZoomOut}
        onTextUpdate={this.handleUpdateText}
      />
    )
  }
}
