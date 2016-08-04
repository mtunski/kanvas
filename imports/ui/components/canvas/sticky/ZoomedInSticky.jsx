import React, { Component, PropTypes } from 'react'

import Overlay from '../../Overlay'
import StickyTextEditor from './StickyTextEditor'

import '/imports/ui/styles/components/Sticky.scss'

export default class ZoomedInSticky extends Component {
  static propTypes = {
    sticky: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      text: PropTypes.string,
    }),
    onOverlayClick: PropTypes.func.isRequired,
    onTextUpdate: PropTypes.func.isRequired,
  }

  state = {
    editing: false,
  }

  handleClick = (ev) => {
    ev.stopPropagation()
    this.setState({ editing: true })
  }

  renderContent() {
    return (
      (this.state.editing || this.props.sticky.text === undefined) ?
        <StickyTextEditor
          text={this.props.sticky.text}
          onTextUpdate={this.props.onTextUpdate}
        /> : this.props.sticky.text
    )
  }

  render() {
    return (
      <Overlay onClick={this.props.onOverlayClick}>
        <div className="sticky sticky--zoomed-in" onClick={this.handleClick}>
          {this.renderContent()}
        </div>
      </Overlay>
    )
  }
}
