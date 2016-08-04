import React, { Component, PropTypes } from 'react'
import { pick } from 'lodash'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import Sticky from './Sticky'
import ZoomedInStickyContainer from './ZoomedInStickyContainer'

const source = {
  beginDrag(props) {
    return pick(props.sticky, ['_id', 'x', 'y', 'text'])
  },
}

function getStyles(props) {
  const { sticky, isDragging } = props

  return {
    position: 'absolute',
    top: `${sticky.y - 50}px`,
    left: `${sticky.x - 50}px`,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

@DragSource('sticky', source, collect)
export default class DraggableSticky extends Component {
  static propTypes = {
    sticky: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      text: PropTypes.string,
    }),
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  }

  state = {
    zoomedIn: false,
  }

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), { captureDraggingState: true })
  }

  handleClick = (ev) => {
    ev.stopPropagation()
    this.setState({ zoomedIn: true })
  }

  handleZoomOut = () => {
    this.setState({ zoomedIn: false })
  }

  renderZoomedInSticky() {
    return (
      this.state.zoomedIn || this.props.sticky.text === undefined ?
        <ZoomedInStickyContainer
          sticky={this.props.sticky}
          onZoomOut={this.handleZoomOut}
        /> : null
    )
  }

  render() {
    const { sticky, connectDragSource } = this.props

    return (
      <div>
        {
          connectDragSource(
            <div
              style={getStyles(this.props)}
              onClick={this.handleClick}
            >
              <Sticky sticky={sticky} isDraggable />
            </div>
          )
        }
        {this.renderZoomedInSticky()}
      </div>
    )
  }
}
