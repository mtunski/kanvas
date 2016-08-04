import React, { Component, PropTypes } from 'react'

import Sticky from './Sticky'

export default class StickyDragPreview extends Component {
  static propTypes = {
    sticky: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      text: PropTypes.string,
    }),
  }

  render() {
    return <Sticky sticky={this.props.sticky} isDragged />
  }
}
