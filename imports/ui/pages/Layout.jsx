import { Component, PropTypes } from 'react'

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return this.props.children
  }
}
