
import React, { useEffect } from 'react'

import { findDOMNode } from 'react-dom'

const App = () => {
  
  useEffect(() => {
    findDOMNode(this)
  }, [])

  return (
    <div style={{border: '1px dashed black', padding: 20}}>
      <h4>Rendered by React v{React.version}</h4>
    </div>
  )
}

export default App
