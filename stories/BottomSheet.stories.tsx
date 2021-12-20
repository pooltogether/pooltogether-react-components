import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ethers } from 'ethers'
import { prettyNumber } from '@pooltogether/utilities'
import { formatUnits } from '@ethersproject/units'
import { useTransaction } from '@pooltogether/hooks'

import { SquareButton } from '../src/components/Buttons/SquareButton'
import { BottomSheet } from '../src/components/BottomSheets/BottomSheet'

import {
  BalanceBottomSheetButtonTheme,
  BalanceBottomSheet
} from '../src/components/BottomSheets/BalanceBottomSheet'
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
  const { t } = useTranslation()
  const [selectedView, setView] = useState(DefaultBalanceSheetViews.main)

  const onDismiss = () => {
    setSheetOpen(false)
  }

  const openSheet = (e) => {
    setSheetOpen(true)
  }

  const ticketBalance = ethers.BigNumber.from('1234120000')
  const ticketDecimals = '6'
  const ticket = {
    address: '0xdd4d117723c257cee402285d3acf218e9a8236e1',
    amount: formatUnits(ticketBalance, ticketDecimals),
    amountUnformatted: ticketBalance,
    amountPretty: prettyNumber(ticketBalance, ticketDecimals),
    decimals: ticketDecimals,
    hasBalance: true,
    name: 'PT Ticket Token',
    symbol: 'PTaUSDC'
  }

  const tokenBalance = ethers.BigNumber.from('8728360000')
  const tokenDecimals = '6'
  const token = {
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    amount: formatUnits(tokenBalance, tokenDecimals),
    amountUnformatted: tokenBalance,
    amountPretty: prettyNumber(tokenBalance, tokenDecimals),
    decimals: tokenDecimals,
    hasBalance: true,
    symbol: 'USDC',
    name: 'USDC Token'
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

  const depositView = <div>App specific deposit view here</div>
  const withdrawView = <div>App specific withdraw view here</div>

  const buttons = [
    {
      theme: BalanceBottomSheetButtonTheme.primary,
      label: t('deposit'),
      onClick: () => setView(DefaultBalanceSheetViews.deposit)
    },
    {
      theme: BalanceBottomSheetButtonTheme.secondary,
      label: t('withdraw'),
      disabled: !balances.ticket.hasBalance,
      onClick: () => setView(DefaultBalanceSheetViews.withdraw)
    },
    {
      theme: BalanceBottomSheetButtonTheme.tertiary,
      label: t('moreInfo'),
      onClick: () => setView(DefaultBalanceSheetViews.more)
    }
  ]

  return (
    <>
      <SquareButton onClick={openSheet}>Open sheet</SquareButton>
      <BalanceBottomSheet
        t={t}
        buttons={buttons}
        setView={setView}
        selectedView={selectedView}
        depositView={depositView}
        depositTx={depositTx}
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
