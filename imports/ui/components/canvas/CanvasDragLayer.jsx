import React, { Component, PropTypes } from 'react'
import { DragLayer } from 'react-dnd'

import StickyDragPreview from './sticky/StickyDragPreview'

import '/imports/ui/styles/components/CanvasDragLayer.scss'
import '/imports/ui/styles/components/Sticky.scss'

function getStickyDragPreviewStyles(props) {
  const { initialOffset, currentOffset } = props

  if (!initialOffset || !currentOffset) {
    return { display: 'none' }
  }

  const { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`

  return { transform, WebkitTransform: transform }
}

function collect(monitor) {
  return {
    sticky: monitor.getItem(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }
}

@DragLayer(collect)
export default class CustomDragLayer extends Component {
  static propTypes = {
    sticky: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }),
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired,
  }

  render() {
    const { sticky, isDragging } = this.props

    return isDragging ?
      <div className="canvas-drag-layer">
        <div style={getStickyDragPreviewStyles(this.props)}>
          <StickyDragPreview sticky={sticky} />
        </div>
      </div> : null
  }
}
