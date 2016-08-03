import React, { Component, PropTypes } from 'react'
import { DragLayer } from 'react-dnd'

import Sticky from './Sticky'

import '/imports/ui/styles/components/CanvasDragLayer.scss'
import '/imports/ui/styles/components/Sticky.scss'

function collect(monitor) {
  return {
    sticky: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }
}

function getItemStyles(props) {
  const { currentOffset } = props
  if (!currentOffset) {
    return { display: 'none' }
  }

  const { x, y } = currentOffset
  return { transform: `translate(${x}px, ${y}px) scale(1.1)` }
}

@DragLayer(collect)
export default class CustomDragLayer extends Component {
  static propTypes = {
    sticky: PropTypes.shape({
      _id: React.PropTypes.string.isRequired,
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired,
      text: React.PropTypes.string,
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired,
  }

  render() {
    const { sticky, isDragging } = this.props;

    return !isDragging ?
      null :
      <div className="canvas-drag-layer">
        <div className="sticky sticky--is-dragged" style={getItemStyles(this.props)}>
          x: {sticky.x}
          y: {sticky.y}
        </div>
      </div>
  }
}
