import React, { ReactNode, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'
import classNames from 'classnames'

export interface Tab {
  id: string
  title: ReactNode
  view: ReactNode
}

export const Tabs: React.FC<{
  tabs: Tab[]
  initialTabId: string
  onTabSelect?: (tab: Tab) => void
  titleClassName?: string
  className?: string
}> = (props) => {
  const { tabs, onTabSelect, className, titleClassName, initialTabId } = props
  const [selectedTabId, setSelectedTabId] = useState(initialTabId)
  const selectedTab = useMemo(() => tabs.find((tab) => tab.id === selectedTabId), [selectedTabId])
  const id = useMemo(() => uuid(), [])

  return (
    <>
      <div className={classNames('space-x-4', titleClassName)}>
        {tabs.map((tab) => (
          <TabTitle
            key={`${id}-tab-${tab.id}`}
            {...tab}
            isSelected={tab.id === selectedTabId}
            setSelected={() => {
              onTabSelect?.(tab)
              setSelectedTabId(tab.id)
            }}
          />
        ))}
      </div>
      <div className={classNames('flex flex-col', className)}>{selectedTab.view}</div>
    </>
  )
}

export const TabTitle: React.FC<
  { isSelected: boolean; setSelected: () => void; textClassName?: string } & Tab
> = (props) => {
  const { isSelected, setSelected, title, textClassName } = props

  return (
    <button
      onClick={setSelected}
      className={classNames(
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
