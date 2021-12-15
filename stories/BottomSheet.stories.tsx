import React, { useState } from 'react'

import { SquareButton } from '../src/components/Buttons/SquareButton'
import { BottomSheet } from '../src/components/BottomSheets/BottomSheet'

import { BalanceBottomSheet } from '../src/components/BottomSheets/BalanceBottomSheet'
import { DefaultBalanceSheetViews } from '../src/components/BottomSheets/BalanceBottomSheet'

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

// BalanceBottomSheet Story
const BalanceBottomSheetTemplate = (args) => <BalanceBottomSheetTemplateWrapper />

const BalanceBottomSheetTemplateWrapper = (args) => {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedView, setView] = useState(DefaultBalanceSheetViews.main)

  const onDismiss = () => {
    setSheetOpen(false)
  }

  const openSheet = (e) => {
    setSheetOpen(true)
  }

  return (
    <>
      <SquareButton onClick={openSheet}>Open sheet</SquareButton>
      <BalanceBottomSheet
        open={sheetOpen}
        onDismiss={onDismiss}
        setView={setView}
        selectedView={selectedView}
        label={`Deposit Balance Bottom sheet for user + prize pool`}
        className='space-y-4'
      />
    </>
  )
}

export const BalanceBottomSheetExample = BalanceBottomSheetTemplate.bind({})
BalanceBottomSheetExample.args = {
  children: ''
}
