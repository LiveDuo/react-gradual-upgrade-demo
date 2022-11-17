
import React from 'react'
import ReactDOM from 'react-dom'

const getFunctions = (ref) => {
  return {
    render: (FC, props) => ReactDOM.render(<FC {...props} />, ref),
    unmount: () =>  ReactDOM.unmountComponentAtNode(ref)
  }
}
export default getFunctions
