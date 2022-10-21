import React, { useState } from 'react'
import { BottomSheet } from '../src/components/BottomSheet/BottomSheet'
import { ModalTitle } from '../src/components/Modal/Modal'
import { Button } from '../src/components/Buttons/Button'

// BasicBottomSheet Story
const BasicBottomSheetTemplate = (args) => <BasicBottomSheetTemplateWrapper />

const BasicBottomSheetTemplateWrapper = (args) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>

      <BottomSheet
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        label={`Bottom sheet example`}
        className='space-y-4'
      >
        <ModalTitle chainId={1} title={'Bottom Sheet Title'} />
        <div>I'm a basic bottom sheet</div>
      </BottomSheet>
    </>
  )
}

export default {
  component: BottomSheet,
  argTypes: {}
}

export const BasicBottomSheetExample = BasicBottomSheetTemplate.bind({})
BasicBottomSheetExample.args = {
  children: ''
}
