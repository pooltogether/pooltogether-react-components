import React, { useState } from 'react'
import { ethers, BigNumber } from 'ethers'
import { numberWithCommas } from '@pooltogether/utilities'
import { formatUnits } from '@ethersproject/units'
import { useTransaction } from '@pooltogether/hooks'

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

  const prettyNumber = (amount: BigNumber, decimals: string): string =>
    numberWithCommas(amount, { decimals }) as string

  const ticketBalance = ethers.BigNumber.from('1234120000')
  const ticketDecimals = '6'
  const ticket = {
    hasBalance: true,
    address: '0x04f2694c8fcee23e8fd0dfea1d4f5bb8c352111f',
    symbol: 'sOHM',
    amount: formatUnits(ticketBalance, ticketDecimals),
    amountUnformatted: ticketBalance,
    amountPretty: prettyNumber(ticketBalance, ticketDecimals)
  }

  const tokenBalance = ethers.BigNumber.from('8728360000')
  const tokenDecimals = '6'
  const token = {
    hasBalance: true,
    address: '0xdd4d117723c257cee402285d3acf218e9a8236e1',
    symbol: 'PTaUSDC',
    amount: formatUnits(tokenBalance, tokenDecimals),
    amountUnformatted: tokenBalance,
    amountPretty: prettyNumber(tokenBalance, tokenDecimals)
  }

  const balances = { ticket, token }

  const prizePool = {
    address: '0xdd4d117723c257cee402285d3acf218e9a8236e1',
    chainId: 1
  }

  const network = {
    chainId: 1
  }

  const wallet = {
    chainId: 1
  }

  const [withdrawTxId, setWithdrawTxId] = useState(0)
  const withdrawTx = useTransaction(withdrawTxId)

  const withdrawView = <div>App specific view here</div>

  return (
    <>
      <SquareButton onClick={openSheet}>Open sheet</SquareButton>
      <BalanceBottomSheet
        setView={setView}
        selectedView={selectedView}
        withdrawView={withdrawView}
        withdrawTx={withdrawTx}
        open={sheetOpen}
        onDismiss={onDismiss}
        balances={balances}
        prizePool={prizePool}
        network={network}
        wallet={wallet}
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
