
import React, { Suspense } from 'react'

import { lazyLoad } from './utils'

// requires exports of ReactDOM and App component
const NestedApp = lazyLoad(() => import('../nested'))

const App = () => {
  return (
    <Suspense fallback={null}>
      <div>
        <h3>Rendered by React v{React.version}</h3>
        <NestedApp />
      </div>
    </Suspense>
  )
}
export default App
