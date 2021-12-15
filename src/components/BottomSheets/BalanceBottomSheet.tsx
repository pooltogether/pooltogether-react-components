import React from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import { TokenWithBalance } from '@pooltogether/hooks'
import { useTranslation } from 'react-i18next'
import { useIsWalletMetamask, useIsWalletOnNetwork } from '@pooltogether/hooks'
import {
  getMaxPrecision,
  getNetworkNiceNameByChainId,
  numberWithCommas,
  NETWORK
} from '@pooltogether/utilities'

import { TOKEN_IMG_URL } from 'src/constants'
import { SquareButton, SquareButtonTheme } from 'src/components/Buttons/SquareButton'
import { ModalTitle } from 'src/components/Modal/Modal'
import { TokenIcon } from 'src/components/Icons/TokenIcon'
import { CountUp } from 'src/components/CountUp'
import { addTokenToMetamask } from 'src/services/addTokenToMetamask'
import { poolToast } from '../../services/poolToast'
import { BottomSheet } from './BottomSheet'

export enum DefaultBalanceSheetViews {
  'main',
  'withdraw',
  'more'
}

export interface BalanceBottomSheetProps {
  setView: Function
  selectedView: DefaultBalanceSheetViews
  open: any
  onDismiss: any
  balances: UsersPrizePoolBalances
  prizePool: { chainId: number }
  network: object
  wallet: object
  label?: string
  className?: string
}

export const BalanceBottomSheet = (props: BalanceBottomSheetProps) => {
  // const { children } = props
  // const { t } = useTranslation()

  return (
    <BottomSheet {...props} className={classnames(props.className, 'text-inverse dark:text-white')}>
      {getView(props)}
    </BottomSheet>
  )
}

BalanceBottomSheet.defaultProps = {
  label: 'balance-bottom-sheet'
}

export const BackButton = (props: { onClick: () => void }) => {
  const { t } = useTranslation()
  return (
    <button
      onClick={props.onClick}
      className='font-bold text-lg absolute top-1 left-4 flex opacity-50 hover:opacity-100 transition-opacity'
    >
      <FeatherIcon icon='chevron-left' className='my-auto h-6 w-6' />
      {t('back')}
    </button>
  )
}

const MainView = (props) => {
  const { setView, balances } = props
  const { ticket } = balances

  const { t } = useTranslation()

  const chainId = NETWORK.mainnet

  return (
    <>
      <ModalTitle
        chainId={chainId}
        title={t('depositsOnNetwork', { network: getNetworkNiceNameByChainId(chainId) })}
      />
      <div className='bg-white bg-opacity-20 dark:bg-actually-black dark:bg-opacity-10 rounded-xl w-full py-6 flex flex-col'>
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

export interface UsersPrizePoolBalances {
  ticket: TokenWithBalance
  token: TokenWithBalance
}

interface MoreViewProps {
  prizePool: { chainId: number }
  balances: UsersPrizePoolBalances
  setView: Function
  network: Function
  wallet: DefaultBalanceSheetViews
}

const MoreView = (props: MoreViewProps) => {
  const { prizePool, balances, setView, network, wallet } = props
  const { t } = useTranslation()
  const { ticket, token } = balances

  const isMetaMask = useIsWalletMetamask(wallet)
  const isWalletOnProperNetwork = useIsWalletOnNetwork(network, prizePool.chainId)

  const handleAddTokenToMetaMask = async () => {
    if (!ticket) {
      return
    }

    if (!isWalletOnProperNetwork) {
      poolToast.warn(
        t('switchToNetworkToAddToken', `Switch to {{networkName}} to add token '{{token}}'`, {
          networkName: getNetworkNiceNameByChainId(prizePool.chainId),
          token: token.symbol
        })
      )
      return null
    }

    addTokenToMetamask(
      ticket.symbol,
      ticket.address,
      Number(ticket.decimals),
      TOKEN_IMG_URL[ticket.symbol]
    )
  }

  return (
    <>
      <ModalTitle
        chainId={prizePool.chainId}
        title={t('depositsOnNetwork', { network: getNetworkNiceNameByChainId(prizePool.chainId) })}
      />
      <ul className='bg-white bg-opacity-20 dark:bg-actually-black dark:bg-opacity-10 rounded-xl w-full p-4 flex flex-col space-y-1'>
        <div className='opacity-50 font-bold flex justify-between'>
          <span>{t('contract', 'Contract')}</span>
          <span>{t('explorer', 'Explorer')}</span>
        </div>
        {/* <LinkToContractItem
          i18nKey='prizePool'
          chainId={prizePool.chainId}
          address={prizePool.address}
        />
        <LinkToContractItem
          i18nKey='ticketToken'
          chainId={prizePool.chainId}
          address={ticket.address}
        />
        <LinkToContractItem
          i18nKey='underlyingToken'
          chainId={prizePool.chainId}
          address={token.address}
        /> */}
      </ul>
      {isMetaMask && (
        <SquareButton
          onClick={handleAddTokenToMetaMask}
          className='flex w-full items-center justify-center'
        >
          <FeatherIcon icon='plus-circle' className='w-5 mr-1' />{' '}
          {t('addTicketTokenToMetamask', {
            token: ticket?.symbol
          })}
        </SquareButton>
      )}
      {/* <RevokeAllowanceButton
        isWalletOnProperNetwork={isWalletOnProperNetwork}
        prizePool={prizePool}
        token={token}
      /> */}
      <BackButton onClick={() => setView(DefaultBalanceSheetViews.main)} />
    </>
  )
}

const WithdrawView = (props) => <div>I'm withdraw</div>

const getView = (props) => {
  const { selectedView, setView } = props
  switch (selectedView) {
    case DefaultBalanceSheetViews.main:
      return <MainView {...props} setView={setView} />
    // return <MainView withdrawTx={withdrawTx} setView={setView} />
    case DefaultBalanceSheetViews.more:
      return <MoreView {...props} setView={setView} />
    case DefaultBalanceSheetViews.withdraw:
      return (
        <WithdrawView {...props} setView={setView} />
        // <WithdrawView setWithdrawTxId={setWithdrawTxId} withdrawTx={withdrawTx} setView={setView} />
      )
  }
}
