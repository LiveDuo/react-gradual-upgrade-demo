
import React, { useRef, useLayoutEffect } from 'react'

const getRecord = (status, promise, result) => ({ status, promise, result })

const handlePromise = (record) => ((value) => Object.assign(record, getRecord('fulfilled', null, value)))

// Suspend render the module until both container and nested are fetched
const readModule = (record, readPromise) => {
  
  if (record.status === 'fulfilled') return record.result
  else if (record.status === 'rejected') throw record.result

  if (!record.promise) record.promise = readPromise().then(handlePromise(record))
  else throw record.promise
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
