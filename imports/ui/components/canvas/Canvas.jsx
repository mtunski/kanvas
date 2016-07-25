import React, { Component, PropTypes } from 'react'
import { map } from 'lodash'

import Sticky from './Sticky'

import '/imports/ui/styles/components/Canvas.scss'

export default class Canvas extends Component {
  static propTypes = {
    canvas: PropTypes.shape({
      name: React.PropTypes.string.isRequired,
    }),
    stickies: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    onStickyClick: PropTypes.func.isRequired,
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
    const { canvas } = this.props

    return (
      <div
        className="canvas"
        onClick={this.handleClick}
      >
        Canvas: {canvas.name}
        {this.renderStickies()}
      </div>
    )
  }
}
