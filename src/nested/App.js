
import React, { useEffect } from 'react'

import { findDOMNode } from 'react-dom'

const App = () => {
  
  useEffect(() => {
    findDOMNode(this)
  }, [])

  return (
    <div style={{border: '1px dashed black', width: 300}}>
      <h3 style={{marginLeft: 20}}>Rendered by React v{React.version}</h3>
    </div>
  )
}

export default App
