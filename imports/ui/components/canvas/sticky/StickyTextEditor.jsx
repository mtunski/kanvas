import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'

import '/imports/ui/styles/components/Sticky.scss'

export default class StickyTextEditor extends Component {
  static propTypes = {
    text: PropTypes.string,
    onStickyTextUpdate: PropTypes.func.isRequired,
  }

  state = {
    text: this.props.text,
  }

  handleKeyDown = (ev) => {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault()
      this.updateStickyText()
    }
  }

  handleChange = (ev) => {
    this.setState({ text: ev.target.value })
  }

  updateStickyText = () => {
    const { text } = this.state

    this.props.onStickyTextUpdate(text && text.trim())
  }

  render() {
    return (
      <textarea
        ref={self => self && self.focus()}
        className="sticky__text-editor"
        value={this.state.text}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        onBlur={this.updateStickyText}
      />
    )
  }
}
