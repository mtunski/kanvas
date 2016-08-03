import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'

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
    onStickyTextUpdate: PropTypes.func.isRequired,
  }

  state = {
    editing: false,
  }

  handleClick = (ev) => {
    ev.stopPropagation()
    this.setState({ editing: true })
  }

  handleTextUpdate = (text) => {
    if (!!text) {
      this.props.onStickyTextUpdate(this.props.sticky._id, text)
      this.setState({ editing: false })
    } else {
      Meteor.call('stickies.delete', this.props.sticky._id)
    }
  }

  renderContent() {
    return (
      (this.state.editing || this.props.sticky.text === undefined) ?
        <StickyTextEditor
          text={this.props.sticky.text}
          onStickyTextUpdate={this.handleTextUpdate}
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
