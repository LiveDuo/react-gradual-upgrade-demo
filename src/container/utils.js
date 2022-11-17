
import React, { useRef, useLayoutEffect, useState } from 'react'

const lazyLoad = (loadNested) => {

  return () => {
    const containerRef = useRef(null)
    
    const [root, setRoot] = useState()

    const updateRoot = (m) => {
      const _root = m.ReactDOM.createRoot(containerRef.current)
      
      const App = m.App.default
      _root.render(<App/>)

      setRoot(_root)
    }

    useLayoutEffect(() => {
      if (!root) loadNested().then(updateRoot)
      return () => root?.unmount()
    }, [root])

    return <div ref={containerRef} />
  }
}
export { lazyLoad }
