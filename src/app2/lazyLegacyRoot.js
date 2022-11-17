
import React, { useMemo, useRef, useLayoutEffect } from 'react'

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
export default function lazyLegacyRoot(getLegacyComponent) {

  return function Wrapper(props) {
    const createLegacyRoot = readModule(rendererModule, () =>
      import('../app1/createLegacyRoot')
    ).default
    const Component = readModule(componentModule, getLegacyComponent).default
    const containerRef = useRef(null)
    const rootRef = useRef(null)

    // Populate every contexts we want the legacy subtree to see.
    // Then in src/legacy/createLegacyRoot we will apply them.
    const context = useMemo(() => ({}), [])

    // Create/unmount.
    useLayoutEffect(() => {
      if (!rootRef.current) {
        rootRef.current = createLegacyRoot(containerRef.current)
      }
      const root = rootRef.current
      return () => {
        root.unmount()
      }
    }, [createLegacyRoot])

    // Mount/update.
    useLayoutEffect(() => {
      if (rootRef.current) {
        rootRef.current.render(Component, props, context)
      }
    }, [Component, props, context])

    return <div style={{display: 'contents'}} ref={containerRef} />
  }
}

// This is similar to React.lazy, but implemented manually.
// We use this to Suspend rendering of this component until
// we fetch the component and the legacy React to render it.
function readModule(record, createPromise) {
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
