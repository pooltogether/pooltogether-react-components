import React, { useState } from 'react'
import { BottomSheet } from '../src/components/BottomSheet/BottomSheet'
import { Button } from '../src/components/Buttons/Button'
import {
  ModalWithViewState,
  ModalWithViewStateView
} from '../src/components/Modal/ModalWithViewState'

const ModalTemplate = (args) => <ModalTemplateWrapper />

enum ViewIds {
  primary,
  secondary,
  tertiary
}

const views: ModalWithViewStateView[] = [
  {
    id: ViewIds.primary,
    view: (props) => (
      <div className='flex flex-col h-full pb-10 mb-10'>
        <span>{props.description}</span>
        <span>{props.count}</span>
        <button onClick={() => props.increment()}>increment</button>
        <div className='bg-pt-red-light mt-auto flex justify-end'>
          <button onClick={() => props.setSelectedViewId(ViewIds.secondary)}>Next view</button>
        </div>
      </div>
    ),
    title: 'Primary'
  },
  {
    id: ViewIds.secondary,
    view: (props) => (
      <div className='flex flex-col mb-10 pb-10'>
        <span>{props.description}</span>

        <span>{props.count}</span>
        <button onClick={() => props.increment()}>increment</button>
        <div className='bg-pt-red h-128'>Realllly talllllll</div>
        <div className='bg-pt-red-light mt-auto flex justify-between'>
          <button disabled={!props?.previous} onClick={() => props?.previous()}>
            Previous view
          </button>
          <button disabled={!props?.next} onClick={() => props?.next()}>
            Next view
          </button>
        </div>
      </div>
    ),
    title: 'Secondary',
    previousViewId: ViewIds.primary,
    nextViewId: ViewIds.tertiary
  },
  {
    id: ViewIds.tertiary,
    view: (props) => (
      <div className='flex flex-col mb-10'>
        <button onClick={() => props.setSelectedViewId(ViewIds.primary)}>Back to Primary</button>
        <span>{props.count}</span>
        <button onClick={() => props.increment()}>increment</button>
        <div className='bg-pt-red-light mt-auto flex justify-between'>
          <button disabled={!props?.previous} onClick={() => props?.previous()}>
            Previous view
          </button>
          <button disabled={!props?.next} onClick={() => props?.next()}>
            Next view
          </button>
        </div>
      </div>
    ),
    previousViewId: ViewIds.secondary
  }
]

const ModalTemplateWrapper = (args) => {
  const [isOpen, setIsOpen] = useState(true)
  const [count, setCount] = useState(0)
  const [selectedViewId, setSelectedViewId] = useState<string | number>(ViewIds.primary)

  let description = 'view prop 1'
  if (selectedViewId === ViewIds.secondary) {
    description = 'view prop 2'
  } else if (selectedViewId === ViewIds.tertiary) {
    description = 'view prop 3'
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      <ModalWithViewState
        label={`Bottom sheet example`}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        viewIds={ViewIds}
        views={views}
        selectedViewId={selectedViewId}
        setSelectedViewId={setSelectedViewId}
        description={description}
        count={count}
        increment={() => setCount((count) => count + 1)}
      />
    </>
  )
}

export default {
  component: BottomSheet,
  argTypes: {}
}

export const ModalExample = ModalTemplate.bind({})
ModalExample.args = {
  children: ''
}
