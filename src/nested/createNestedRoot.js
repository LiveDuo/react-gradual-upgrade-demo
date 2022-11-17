
import React from 'react'
import ReactDOM from 'react-dom'

const createNestedRoot = (container) => {
  return {
    render(Component, props) {
      ReactDOM.render(<Component {...props} />, container)
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container)
    }
  }
}
export default createNestedRoot
