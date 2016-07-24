import React, { Component, PropTypes } from 'react'

export default class AuthForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    name: '',
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.setState({ name: '' })
    this.props.onSubmit(this.state.name)
  }

  handleNameChange = (ev) => {
    this.setState({ name: ev.target.value })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.name}
          type="text"
          placeholder="Name"
          onChange={this.handleNameChange}
        />
        <button>Create canvas</button>
      </form>
    )
  }
}
