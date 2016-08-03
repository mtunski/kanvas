import React, { Component, PropTypes } from 'react'

import '/imports/ui/styles/components/Overlay.scss'

export default class Overlay extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  handleClick = (ev) => {
    ev.stopPropagation()
    this.props.onClick()
  }

  render() {
    return (
      <div className="overlay" onClick={this.handleClick}>
        {this.props.children}
      </div>
    )
  }
}
