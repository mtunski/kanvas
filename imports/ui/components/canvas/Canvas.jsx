import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'
import { default as TouchBackend } from 'react-dnd-touch-backend'
import { DragDropContext, DropTarget } from 'react-dnd'

import CanvasDragLayer from './CanvasDragLayer'
import Sticky from './Sticky'

import '/imports/ui/styles/components/Canvas.scss'

const target = {
  drop(props, monitor, component) {
    const sticky = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();

    component.handleStickyMove(
      sticky._id,
      Math.round(sticky.x + delta.x),
      Math.round(sticky.y + delta.y)
    )
  },
}

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

@DragDropContext(TouchBackend({ enableMouseEvents: true }))
@DropTarget('sticky', target, collect)
export default class Canvas extends Component {
  static propTypes = {
    canvas: PropTypes.shape({
      name: React.PropTypes.string.isRequired,
    }),
    stickies: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    onStickyClick: PropTypes.func.isRequired,
    onStickyMove: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  }

  static defaultProps = {
    canvas: {
      name: '',
    },
  }

  handleClick = (ev) => {
    this.props.onClick(ev.clientX, ev.clientY)
  }

  handleStickyClick = (stickyId) => {
    this.props.onStickyClick(stickyId)
  }

  handleStickyMove = (stickyId, x, y) => {
    this.props.onStickyMove(stickyId, x, y)
  }

  renderStickies() {
    const { stickies } = this.props

    return map(stickies, (sticky) =>
      <Sticky
        key={sticky._id}
        sticky={sticky}
        onClick={this.handleStickyClick}
      />
    )
  }

  render() {
    const { canvas, connectDropTarget } = this.props

    return connectDropTarget(
      <div
        className="canvas"
        onClick={this.handleClick}
      >
        Canvas: {canvas.name}
        {this.renderStickies()}
        <CanvasDragLayer />
      </div>
    )
  }
}
