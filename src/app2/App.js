
import React, { Suspense } from 'react'

import lazyLegacyRoot from './lazyLegacyRoot'

const LegacyApp = lazyLegacyRoot(() => import('../app1/App'))

const App = () => {
  return (
    <Suspense fallback={null}>
      <div>
        <h3>Rendered by React v{React.version}</h3>
        <LegacyApp />
      </div>
    </Suspense>
  );
}
export default App
