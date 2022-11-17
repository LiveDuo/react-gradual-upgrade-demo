
import React, { useRef, useLayoutEffect } from 'react'

const getRecord = (status, promise, result) => ({ status, promise, result })

const handlePromise = (record) => ((value) => Object.assign(record, getRecord('fulfilled', null, value)))

// Suspend render the module until both container and nested are fetched
const readModule = (record, createPromise) => {
  
  if (record.status === 'fulfilled') return record.result
  else if (record.status === 'rejected') throw record.result

  if (!record.promise) record.promise = createPromise().then(handlePromise(record))
  else throw record.promise
}

const rendererModule = {}

const lazyLoadNested = (loadNested) => {

  return () => {
    const containerRef = useRef(null)
    
    const Nested = readModule(rendererModule, loadNested)
    
    useLayoutEffect(() => {
      const ref = containerRef.current
      const Component = Nested.App.default
      const root = Nested.ReactDOM.createRoot(ref)

      if (Component) root.render(<Component/>)
      return () => root.unmount()
    }, [Nested])

    return <div ref={containerRef} />
  }
}
export default lazyLoadNested
