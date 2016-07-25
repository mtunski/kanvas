import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'

import '/imports/ui/styles/components/Sticky.scss'

const stickySource = {
  beginDrag(props) {
    const { _id, x, y } = props.sticky
    return { _id, x, y }
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

@DragSource('sticky', stickySource, collect)
export default class Sticky extends Component {
  static propTypes = {
    sticky: PropTypes.shape({
      _id: React.PropTypes.string.isRequired,
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired,
      text: React.PropTypes.string,
    }),
    onClick: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  }

  handleClick = (ev) => {
    ev.stopPropagation()
    this.props.onClick(this.props.sticky._id)
  }

  render() {
    const { sticky } = this.props
    const style = {
      left: sticky.x - 50,
      top: sticky.y - 50,
    }
    const { connectDragSource, isDragging } = this.props

    return isDragging ?
      null :
      connectDragSource(
        <div
          className="sticky"
          onClick={this.handleClick}
          style={style}
        >
          x: {sticky.x}
          y: {sticky.y}
        </div>
      )
  }
}
