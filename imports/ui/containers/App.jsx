import React, { Component } from 'react'

import Layout from '../pages/Layout'

export default class App extends Component {
  render() {
    return <Layout {...this.props} />
  }
}
