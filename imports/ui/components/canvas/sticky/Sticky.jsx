import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import '/imports/ui/styles/components/Sticky.scss'

export default class Sticky extends Component {
  static propTypes = {
    sticky: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      text: PropTypes.string,
    }),
    isDraggable: PropTypes.bool,
    isDragged: PropTypes.bool,
  }

  classes = () => {
    const { isDraggable, isDragged } = this.props

    return classNames(
      'sticky',
      {
        'sticky--draggable': isDraggable,
        'sticky--dragged': isDragged,
      }
    )
  }

  render() {
    const { sticky } = this.props

    return (
      <div>
        <div
          className={this.classes()}
          style={{ transform: `rotate(${sticky.rotation}deg)` }}
        >
          {sticky.text}
        </div>
      </div>
    )
  }
}
