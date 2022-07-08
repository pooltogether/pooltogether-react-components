import React, { ReactNode, useMemo, useState } from 'react'
import classnames from 'classnames'
import classNames from 'classnames'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export interface Tab {
  id: string
  title: ReactNode
  view: ReactNode
}

export const Tabs: React.FC<{
  tabs: Tab[]
  initialTabId: string
  titleClassName?: string
  className?: string
}> = (props) => {
  const { tabs, className, titleClassName, initialTabId } = props
  const [selectedTabId, setSelectedTabId] = useState(initialTabId)
  const selectedTab = useMemo(() => tabs.find((tab) => tab.id === selectedTabId), [selectedTabId])
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      <motion.div
        id='tab-animation-wrapper'
        transition={{ duration: shouldReduceMotion ? 0 : 0.1, ease: 'easeIn' }}
        initial={{
          opacity: 0
        }}
        exit={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        className={classnames('flex flex-col', className)}
      >
        <div className={classNames('space-x-4', titleClassName)}>
          {tabs.map((tab) => (
            <TabTitle
              {...tab}
              isSelected={tab.id === selectedTabId}
              setSelected={() => setSelectedTabId(tab.id)}
            />
          ))}
        </div>
        <div>{selectedTab.view}</div>
      </motion.div>
    </AnimatePresence>
  )
}

export const TabTitle: React.FC<
  { isSelected: boolean; setSelected: () => void; textClassName?: string } & Tab
> = (props) => {
  const { isSelected, setSelected, title, textClassName } = props

  return (
    <button
      onClick={setSelected}
      className={classnames(
        'text-inverse leading-none trans font-bold border-b-2 pb-3 trans hover:opacity-80',
        textClassName,
        {
          'border-inverse': isSelected,
          'border-transparent opacity-60': !isSelected
        }
      )}
    >
      {title}
    </button>
  )
}

TabTitle.defaultProps = {
  textClassName: 'text-lg'
}
