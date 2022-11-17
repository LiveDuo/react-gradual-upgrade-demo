
import React, { useRef, useLayoutEffect } from 'react'

const getRecord = (status, promise, result) => ({ status, promise, result })

const handlePromise = (record) => [
  value => Object.assign(record, getRecord('fulfilled', null, value)),
  error => Object.assign(record, getRecord('rejected', null, error))
]

// Suspend render the module until both container and nested are fetched
const readModule = (record, createPromise) => {
  if (record.status === 'fulfilled') return record.result
  else if (record.status === 'rejected') throw record.result
  else if (!record.promise) record.promise = createPromise().then(...handlePromise(record))
  else throw record.promise
}

const rendererModule = getRecord('pending', null, null)
const componentModule = getRecord('pending', null, null)

const lazyLoadNested = (getContainerComponent) => {

  return () => {
    const containerRef = useRef(null)
    
    const Nested = readModule(rendererModule, () => import('../nested'))
    const Container = readModule(componentModule, getContainerComponent)
    
    useLayoutEffect(() => {
      const ref = containerRef.current
      const Component = Container.default
      if (Nested && Component) Nested.ReactDOM.render(<Component />, ref)
      return () => Nested.ReactDOM.unmountComponentAtNode(ref)
    }, [Container, Nested])

    return <div ref={containerRef} />
  }
}
export default lazyLoadNested
