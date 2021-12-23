import React, { useState } from 'react'
import { BigNumber } from 'ethers'

import { SquareButton, SquareButtonTheme } from '../src/components/Buttons/SquareButton'

import { BalanceBottomSheet } from '../src/components/BottomSheets/BalanceBottomSheet'

// BalanceBottomSheet Story
const BalanceBottomSheetTemplate = (args) => <BalanceBottomSheetTemplateWrapper />

const BalanceBottomSheetTemplateWrapper = (args) => {
  const [isOpen, setIsOpen] = useState(false)

  const onDismiss = () => {
    setIsOpen(false)
  }

  const openSheet = (e) => {
    setIsOpen(true)
  }

  const title = 'Balance sheet'
  const chainId = 1
  const balance = {
    amount: '10',
    amountPretty: '10',
    amountUnformatted: BigNumber.from('10000000')
  }
  const balanceUsd = {
    amount: '10',
    amountPretty: '10',
    amountUnformatted: BigNumber.from('10000000')
  }
  const token = {
    address: '0xdd4d117723c257cee402285d3acf218e9a8236e1',
    decimals: '6',
    name: 'PT Ticket Token',
    symbol: 'PTaUSDC'
  }
  const contractLinks = [
    {
      chainId: 1,
      address: '0xdd4d117723c257cee402285d3acf218e9a8236e1',
      i18nKey: 'ticket'
    }
  ]

  return (
    <>
      <SquareButton onClick={openSheet}>Open sheet</SquareButton>
      <BalanceBottomSheet
        title={title}
        chainId={chainId}
        open={isOpen}
        onDismiss={onDismiss}
        views={[
          {
            id: 'example',
            view: () => <ExampleView />,
            label: 'Example',
            theme: SquareButtonTheme.teal
          }
        ]}
        tx={null}
        token={token}
        balance={balance}
        balanceUsd={balanceUsd}
        contractLinks={contractLinks}
        isWalletOnProperNetwork={true}
        isWalletMetaMask={true}
      />
    </>
  )
}

const ExampleView = () => {
  return <div>Example view</div>
}

export default {
  component: BalanceBottomSheet,
  argTypes: {}
}

export const BalanceBottomSheetExample = BalanceBottomSheetTemplate.bind({})
BalanceBottomSheetExample.args = {
  children: ''
}
