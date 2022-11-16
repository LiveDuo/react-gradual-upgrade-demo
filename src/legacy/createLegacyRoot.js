
import React from 'react'
import ReactDOM from 'react-dom'

const createLegacyRoot = (container) => {
  return {
    render(Component, props) {
      ReactDOM.render(<Component {...props} />, container)
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container)
    }
  }
}
export default createLegacyRoot
