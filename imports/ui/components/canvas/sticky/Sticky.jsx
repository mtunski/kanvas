import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'

import ZoomedInStickyContainer from './ZoomedInStickyContainer'

import '/imports/ui/styles/components/Sticky.scss'

const source = {
  beginDrag(props) {
    const { _id, x, y, text } = props.sticky
    return { _id, x, y, text }
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

@DragSource('sticky', source, collect)
export default class Sticky extends Component {
  static propTypes = {
    sticky: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      text: PropTypes.string,
    }),
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  }

  state = {
    zoomedIn: false,
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
    const { sticky } = this.props
    const style = {
      left: sticky.x - 50,
      top: sticky.y - 50,
      transform: `rotate(${sticky.rotation}deg)`,
    }
    const { connectDragSource, isDragging } = this.props

    return (
      <div>
        {
          !isDragging ?
            connectDragSource(
              <div
                className="sticky sticky--draggable"
                onClick={this.handleClick}
                style={style}
              >
                {sticky.text}
              </div>
            ) : null
        }
        {this.renderZoomedInSticky()}
      </div>
    )
  }
}
