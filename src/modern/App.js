
import React, { Suspense } from 'react'

import lazyLegacyRoot from './lazyLegacyRoot'

const LegacyApp = lazyLegacyRoot(() => import('../legacy/App'))

const AboutPage = () => {
  return (
    <div>
      <h3>Rendered by React v{React.version}</h3>
      <LegacyApp />
    </div>
  )
}

const App = () => {
  return (
    <Suspense fallback={null}>
      <AboutPage />
    </Suspense>
  );
}
export default App