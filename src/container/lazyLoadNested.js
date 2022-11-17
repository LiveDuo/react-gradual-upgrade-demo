
import React, { useRef, useLayoutEffect } from 'react'

const getRecord = (status, promise, result) => ({ status, promise, result })

const handlePromise = (record) => [
  value => Object.assign(record, getRecord('fulfilled', null, value)),
  error => Object.assign(record, getRecord('rejected', null, error))
]

// We use this to Suspend rendering of this component until
// we fetch the component and the nested React to render it.
const readModule = (record, createPromise) => {
  if (record.status === 'fulfilled') return record.result
  else if (record.status === 'rejected') throw record.result
  else if (!record.promise) record.promise = createPromise().then(...handlePromise(record))
  else throw record.promise
}

const rendererModule = getRecord('pending', null, null)
const componentModule = getRecord('pending', null, null)

const lazyLoadNested = (getContainerComponent) => {

  return (props) => {
    const getNestedRender = readModule(rendererModule, () => import('../nested/render')).default
    const Component = readModule(componentModule, getContainerComponent).default
    const containerRef = useRef(null)
    const rootRef = useRef(null)

    useLayoutEffect(() => {
      if (!rootRef.current) rootRef.current = getNestedRender(containerRef.current)
      return () => rootRef.current.unmount()
    }, [getNestedRender])

    useLayoutEffect(() => {
      if (rootRef.current) rootRef.current.render(Component, props, {})
    }, [Component, props])

    return <div ref={containerRef} />
  }
}
export default lazyLoadNested
