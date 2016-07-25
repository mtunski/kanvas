import React, { Component, PropTypes } from 'react'

import '/imports/ui/styles/components/Sticky.scss'

export default class Sticky extends Component {
  static propTypes = {
    sticky: PropTypes.shape({
      _id: React.PropTypes.string.isRequired,
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired,
      text: React.PropTypes.string,
    }),
    onClick: PropTypes.func.isRequired,
  }

  handleClick = (ev) => {
    ev.stopPropagation()
    this.props.onClick(this.props.sticky._id)
  }

  render() {
    const { sticky } = this.props
    const style = {
      top: sticky.y - 50,
      left: sticky.x - 50,
    }

    return (
      <div
        className="sticky"
        onClick={this.handleClick}
        style={style}
      >
      </div>
    )
  }
}
