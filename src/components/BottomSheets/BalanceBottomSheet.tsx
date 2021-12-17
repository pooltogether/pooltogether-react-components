import React from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import { Transaction, TokenWithBalance } from '@pooltogether/hooks'
import { useTranslation } from 'react-i18next'
import { useIsWalletMetamask, useIsWalletOnNetwork } from '@pooltogether/hooks'
import {
  getMaxPrecision,
  getNetworkNiceNameByChainId,
  numberWithCommas
} from '@pooltogether/utilities'

import { TOKEN_IMG_URL } from '../../constants'
import { BottomSheet } from './BottomSheet'
import { SquareButton, SquareButtonTheme } from '../Buttons/SquareButton'
import { BlockExplorerLink } from '../Links/BlockExplorerLink'
import { LinkToContractItem } from '../LinkToContractItem'
import { ModalTitle } from '../Modal/Modal'
import { TokenIcon } from '../Icons/TokenIcon'
import { CountUp } from '../CountUp'
import { addTokenToMetamask } from '../../services/addTokenToMetamask'
import { poolToast } from '../../services/poolToast'
// import { DepositAmountInput } from './Input/DepositAmountInput'

export enum DefaultBalanceSheetViews {
  'main',
  'deposit',
  'withdraw',
  'more'
}

export enum BalanceBottomSheetButtonTheme {
  'primary',
  'secondary',
  'tertiary'
}

export interface BalanceBottomSheetPrizePool {
  chainId: number
  address: string
}

export interface BalanceBottomSheetProps {
  setView: Function
  selectedView: DefaultBalanceSheetViews
  withdrawView: React.ReactNode // // <WithdrawView setWithdrawTxId={setWithdrawTxId} withdrawTx={withdrawTx} setView={setView} />:
  buttons: Array<object>
  withdrawTx?: Transaction
  open: any
  onDismiss: any
  balances: UsersPrizePoolBalances
  prizePool: BalanceBottomSheetPrizePool
  network: object
  wallet: object
  label?: string
  className?: string
}

export const BalanceBottomSheet = (props: BalanceBottomSheetProps) => {
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
  const { prizePool, buttons, balances, withdrawTx } = props
  // const { prizePool, buttons, setView, balances, withdrawTx } = props
  const { ticket } = balances
  const { chainId } = prizePool

  const { t } = useTranslation()

  return (
    <>
      <BalanceBottomSheetTitle t={t} chainId={chainId} />
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

      {withdrawTx && <WithdrawReceipt withdrawTx={withdrawTx} />}

      <div className='flex flex-col space-y-4'>
        {/* <SquareButton
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
        </button> */}

        {buildButtons(buttons)}
      </div>
    </>
  )
}

const DepositView = (props) => {
  const { setView, prizePool } = props
  const { t } = useTranslation()

  return (
    <>
      <BalanceBottomSheetTitle t={t} chainId={prizePool.chainId} />
      <BackButton onClick={() => setView(DefaultBalanceSheetViews.main)} />
    </>
  )
}

export interface UsersPrizePoolBalances {
  ticket: TokenWithBalance
  token: TokenWithBalance
}

interface MoreInfoViewProps {
  prizePool: BalanceBottomSheetPrizePool
  balances: UsersPrizePoolBalances
  setView: Function
  network: Function
  wallet: DefaultBalanceSheetViews
}

const MoreInfoView = (props: MoreInfoViewProps) => {
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
      <BalanceBottomSheetTitle t={t} chainId={prizePool.chainId} />

      <ul className='bg-white bg-opacity-20 dark:bg-actually-black dark:bg-opacity-10 rounded-xl w-full p-4 flex flex-col space-y-1'>
        <div className='opacity-50 font-bold flex justify-between'>
          <span>{t('contract', 'Contract')}</span>
          <span>{t('explorer', 'Explorer')}</span>
        </div>
        <LinkToContractItem
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
        />
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

const BalanceBottomSheetTitle = ({ t, chainId }) => (
  <ModalTitle
    chainId={chainId}
    title={t('depositsOnNetwork', { network: getNetworkNiceNameByChainId(chainId) })}
  />
)

const getView = (props) => {
  const { selectedView, setView, withdrawView } = props
  switch (selectedView) {
    case DefaultBalanceSheetViews.main:
      return <MainView {...props} setView={setView} />
    // return <MainView withdrawTx={withdrawTx} setView={setView} />
    case DefaultBalanceSheetViews.deposit:
      return <DepositView {...props} setView={setView} />
    case DefaultBalanceSheetViews.withdraw:
      return withdrawView /* {...props} setView={setView} />*/
    case DefaultBalanceSheetViews.more:
      return <MoreInfoView {...props} setView={setView} />
  }
}

export interface ViewProps {
  balances: UsersPrizePoolBalances
  prizePool: BalanceBottomSheetPrizePool
  setView: (view: DefaultBalanceSheetViews) => void
}

const WithdrawReceipt = (props: { withdrawTx: Transaction }) => {
  const { withdrawTx } = props
  const { t } = useTranslation()

  if (!withdrawTx) return null

  return (
    <div className='bg-white bg-opacity-20 dark:bg-actually-black dark:bg-opacity-10 rounded-xl w-full py-6 flex justify-between'>
      <span className='font-bold'>{t('withdrawTx', 'Withdraw transaction')}</span>
      <BlockExplorerLink chainId={withdrawTx.chainId} txHash={withdrawTx.hash} />
    </div>
  )
}

const buildButtons = (buttons) => {
  return buttons.map((button) => {
    if (button.theme === BalanceBottomSheetButtonTheme.tertiary) {
      return (
        <button
          key={`balance-bottom-sheet-button-${button.label.replace(' ', '')}`}
          disabled={button.disabled}
          onClick={button.onClick}
        >
          {button.label}
        </button>
      )
    } else {
      return (
        <SquareButton
          onClick={button.onClick}
          disabled={button.disabled}
          theme={
            button.theme === BalanceBottomSheetButtonTheme.primary
              ? SquareButtonTheme.teal
              : SquareButtonTheme.tealOutline
          }
        >
          {button.label}
        </SquareButton>
      )
    }
  })
}