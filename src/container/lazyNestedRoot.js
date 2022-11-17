
import React, { useRef, useLayoutEffect } from 'react'

// This is similar to React.lazy, but implemented manually.
// We use this to Suspend rendering of this component until
// we fetch the component and the nested React to render it.
const readModule = (record, createPromise) => {
  if (record.status === 'fulfilled') {
    return record.result
  }
  if (record.status === 'rejected') {
    throw record.result
  }
  if (!record.promise) {
    record.promise = createPromise().then(
      value => {
        if (record.status === 'pending') {
          record.status = 'fulfilled'
          record.promise = null
          record.result = value
        }
      },
      error => {
        if (record.status === 'pending') {
          record.status = 'rejected'
          record.promise = null
          record.result = error
        }
      }
    )
  }
  throw record.promise
}

const rendererModule = {
  status: 'pending',
  promise: null,
  result: null,
}

const componentModule = {
  status: 'pending',
  promise: null,
  result: null,
}

const lazyNestedRoot = (getContainerComponent) => {

  return (props) => {
    const createNestedRoot = readModule(rendererModule, () => import('../nested/createNestedRoot')).default
    const Component = readModule(componentModule, getContainerComponent).default
    const containerRef = useRef(null)
    const rootRef = useRef(null)

    useLayoutEffect(() => {
      if (!rootRef.current) {
        rootRef.current = createNestedRoot(containerRef.current)
      }
      return () => rootRef.current.unmount()
    }, [createNestedRoot])

    useLayoutEffect(() => {
      if (rootRef.current) {
        rootRef.current.render(Component, props, {})
      }
    }, [Component, props])

    return <div style={{display: 'contents'}} ref={containerRef} />
  }
}
export default lazyNestedRoot
