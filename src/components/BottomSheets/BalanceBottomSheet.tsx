import React from 'react'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'
import {
  getMaxPrecision,
  getNetworkNiceNameByChainId,
  numberWithCommas,
  NETWORK
} from '@pooltogether/utilities'

import { SquareButton, SquareButtonTheme } from 'src/components/Buttons/SquareButton'

import { ModalTitle } from 'src/components/Modal/Modal'
import { TokenIcon } from 'src/components/Icons/TokenIcon'
import { CountUp } from 'src/components/CountUp'

import { BottomSheet } from './BottomSheet'

export enum DefaultBalanceSheetViews {
  'main',
  'withdraw',
  'more'
}

const MainView = (props) => {
  const { setView } = props
  const { t } = useTranslation()
  const chainId = NETWORK.mainnet

  const ticket = {
    hasBalance: true,
    amount: 1234.12412,
    address: '0x04f2694c8fcee23e8fd0dfea1d4f5bb8c352111f',
    symbol: 'sOHM'
  }

  return (
    <>
      <ModalTitle
        chainId={chainId}
        title={t('depositsOnNetwork', { network: getNetworkNiceNameByChainId(chainId) })}
      />
      <div className='bg-white bg-opacity-20 dark:bg-actually-black dark:bg-opacity-10 text-inverse dark:text-white rounded-xl w-full py-6 flex flex-col'>
        <span
          className={classnames('text-3xl mx-auto font-bold leading-none', {
            'opacity-50': !ticket.hasBalance
          })}
        >
          $<CountUp countTo={Number(ticket.amount)} />
        </span>
        <span className='mx-auto flex'>
          <TokenIcon chainId={chainId} address={ticket.address} sizeClassName='w-4 h-4 my-auto' />
          <span className='font-bold opacity-50 mx-1'>
            {numberWithCommas(ticket.amount, { precision: getMaxPrecision(ticket.amount) })}
          </span>
          <span className='opacity-50'>{ticket.symbol}</span>
        </span>
      </div>

      {/* <WithdrawReceipt withdrawTx={withdrawTx} /> */}

      <div className='flex flex-col space-y-4'>
        <SquareButton
          onClick={() => {
            alert('push to deposit page')
          }}
        >
          {t('deposit')}
        </SquareButton>
        <SquareButton
          onClick={() => setView(DefaultBalanceSheetViews.withdraw)}
          disabled={!ticket.hasBalance}
          theme={SquareButtonTheme.tealOutline}
        >
          {t('withdraw')}
        </SquareButton>
        <button
          onClick={() => setView(DefaultBalanceSheetViews.more)}
          className='font-bold text-accent-3 dark:text-white'
        >
          {t('moreInfo')}
        </button>
      </div>
    </>
  )
}

const MoreView = (props) => <div>I'm more</div>
const WithdrawView = (props) => <div>I'm withdraw</div>

const getView = (selectedView, setView) => {
  switch (selectedView) {
    case DefaultBalanceSheetViews.main:
      return <MainView setView={setView} />
    // return <MainView withdrawTx={withdrawTx} setView={setView} />
    case DefaultBalanceSheetViews.more:
      return <MoreView setView={setView} />
    case DefaultBalanceSheetViews.withdraw:
      return (
        <WithdrawView setView={setView} />
        // <WithdrawView setWithdrawTxId={setWithdrawTxId} withdrawTx={withdrawTx} setView={setView} />
      )
  }
}

export interface BalanceBottomSheetProps {
  setView: Function
  selectedView: DefaultBalanceSheetViews
  open: any
  onDismiss: any
  label?: string
  className?: string
}

export const BalanceBottomSheet = (props: BalanceBottomSheetProps) => {
  // const { children } = props
  // const { t } = useTranslation()

  return <BottomSheet {...props}>{getView(props.selectedView, props.setView)}</BottomSheet>
}

BalanceBottomSheet.defaultProps = {
  label: 'balance-bottom-sheet'
}
