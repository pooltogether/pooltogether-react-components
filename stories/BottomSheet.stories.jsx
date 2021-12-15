import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from 'src/components/Buttons/Button'
import { BottomSheet } from 'src/components/BottomSheet/BottomSheet'

const BasicBottomSheetTemplate = (args) => <BasicBottomSheetTemplateWrapper />

// Use wrapper so we don't break rule of hooks with `useTranslation()`
const BasicBottomSheetTemplateWrapper = (args) => {
  const { t } = useTranslation()

  const open = true
  const onDismiss = () => {}

  return (
    <>
      <BottomSheet
        open={open}
        onDismiss={onDismiss}
        label={`Bottom sheet for prize pool`}
        className='space-y-4'
      >
        <div className='flex flex-col justify-between h-full sm:h-auto'></div>
      </BottomSheet>
    </>
  )
}

export default {
  component: BottomSheet,
  argTypes: {}
}

export const BasicBottomSheet = BasicBottomSheetTemplate.bind({})
BasicBottomSheet.args = {
  children: ''
}

const DepositBottomSheetTemplate = (args) => <DepositBottomSheetTemplateWrapper />

// Use wrapper so we don't break rule of hooks with `useTranslation()`
const DepositBottomSheetTemplateWrapper = (args) => {
  const [sheetOpen, setSheetOpen] = useState(false)
  const { t } = useTranslation()

  const onDismiss = () => {
    setSheetOpen(false)
  }

  const openSheet = (e) => {
    setSheetOpen(true)
  }

  return (
    <>
      <Button onClick={openSheet}>Open sheet</Button>
      <BottomSheet
        open={sheetOpen}
        onDismiss={onDismiss}
        label={`Bottom sheet for prize pool`}
        className='space-y-4'
      >
        <div className='flex flex-col justify-between h-full sm:h-auto'></div>
      </BottomSheet>
    </>
  )
}

export const DepositBottomSheet = DepositBottomSheetTemplate.bind({})
DepositBottomSheet.args = {
  children: ''
}
