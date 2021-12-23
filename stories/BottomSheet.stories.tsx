import React from 'react'
import { BottomSheet } from '../src/components/BottomSheets/BottomSheet'

// BasicBottomSheet Story
const BasicBottomSheetTemplate = (args) => <BasicBottomSheetTemplateWrapper />

const BasicBottomSheetTemplateWrapper = (args) => {
  const open = true
  const onDismiss = () => {}

  return (
    <>
      <BottomSheet
        open={open}
        onDismiss={onDismiss}
        label={`Bottom sheet example`}
        className='space-y-4'
      >
        <div className='text-inverse'>I'm a basic bottom sheet</div>
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
