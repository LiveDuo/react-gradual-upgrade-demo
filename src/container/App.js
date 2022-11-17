
import React, { Suspense } from 'react'

import lazyNestedRoot from './lazyNestedRoot'

const NestedApp = lazyNestedRoot(() => import('../nested/App'))

const App = () => {
  return (
    <Suspense fallback={null}>
      <div>
        <h3>Rendered by React v{React.version}</h3>
        <NestedApp />
      </div>
    </Suspense>
  );
}
export default App
