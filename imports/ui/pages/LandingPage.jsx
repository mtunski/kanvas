import React, { Component } from 'react'

import NewCanvasFormContainer from '../components/canvas/NewCanvasFormContainer'

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <NewCanvasFormContainer />
      </div>
    )
  }
}
