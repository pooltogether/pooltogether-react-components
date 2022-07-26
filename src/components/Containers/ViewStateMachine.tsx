import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import React, { useEffect, useMemo } from 'react'

export type ViewProps = {
  previous: () => void
  next: () => void
  setSelectedViewId: (viewId: string | number) => void
  viewIds: { [key: string]: string | number; [key: number]: string | number }
  [key: string]: any
}

export type View = {
  id: string | number
  view: React.FC<ViewProps>
  previousViewId?: string | number
  nextViewId?: string | number
}

export type ViewStateMachineProps<T extends View> = {
  viewIds: { [key: string]: string | number; [key: number]: string | number }
  views: T[]
  selectedViewId: string | number
  setSelectedViewId: (selectedViewId: string | number) => void
  onViewChange?: (selectedView: T) => void
  [key: string]: any
  noAnimation?: boolean
}

/**
 * @param props
 * @returns
 */
export function ViewStateMachine<T extends View>(props: ViewStateMachineProps<T>) {
  const {
    views,
    viewIds,
    selectedViewId,
    noAnimation,
    setSelectedViewId,
    onViewChange,
    ...viewProps
  } = props

  const selectedView = useMemo(() => {
    const view = views.find((view) => view.id === selectedViewId)
    console.log('New view', { view })
    return view
  }, [selectedViewId])

  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    onViewChange?.(selectedView)
  }, [selectedView])

  const previous =
    selectedView.previousViewId !== undefined
      ? () => setSelectedViewId(selectedView.previousViewId)
      : null

  const next =
    selectedView.nextViewId !== undefined ? () => setSelectedViewId(selectedView.nextViewId) : null

  if (noAnimation) {
    return (
      <selectedView.view
        setSelectedViewId={setSelectedViewId}
        viewIds={viewIds}
        previous={previous}
        next={next}
        {...viewProps}
      />
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        key={`view-state-machine-animation-wrapper-${selectedViewId}`}
        transition={{ duration: shouldReduceMotion ? 0 : 0.15, ease: 'easeIn' }}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
      >
        <selectedView.view
          setSelectedViewId={setSelectedViewId}
          viewIds={viewIds}
          previous={previous}
          next={next}
          {...viewProps}
        />
      </motion.div>
    </AnimatePresence>
  )
}
