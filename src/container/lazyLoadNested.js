
import React, { useRef, useLayoutEffect } from 'react'

// Lazy render the module until the nested module is fetched
const readModule = (record, readPromise) => {
  
  if (record.status === 'fulfilled') return record.result
  else if (record.status === 'rejected') throw record.result

  if (!record.promise) {
    record.promise = readPromise()
      .then((v) => Object.assign(record, { status: 'fulfilled', promise: null, result: v }))
  } else throw record.promise
}

const rendererModule = {}

const lazyLoadNested = (loadNested) => {

  return () => {
    const containerRef = useRef(null)
    
    const Nested = readModule(rendererModule, loadNested)
    
    useLayoutEffect(() => {
      const root = Nested.ReactDOM.createRoot(containerRef.current)
      
      if (Nested) {
        const Component = Nested.App.default
        root.render(<Component/>)
      }
      return () => root.unmount()
    }, [Nested])

    return <div ref={containerRef} />
  }
}
export default lazyLoadNested
