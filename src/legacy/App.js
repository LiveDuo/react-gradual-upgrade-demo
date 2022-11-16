
import React from 'react'

import { Component } from 'react'
import { findDOMNode } from 'react-dom'

class AboutSection extends Component {
  componentDidMount() {
    findDOMNode(this)
  }
  render() {
    return (
      <div style={{border: '1px dashed black', padding: 20}}>
        <h4>Rendered by React {React.version}</h4>
      </div>
    )
  }
}

export default AboutSection
