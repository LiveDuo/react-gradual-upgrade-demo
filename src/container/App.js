
import React, { Suspense } from 'react'

import lazyLoad from './lazyLoadNested'

const NestedApp = lazyLoad(() => import('../nested/App'))

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
