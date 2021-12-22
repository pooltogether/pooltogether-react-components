import React from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import { Transaction, TokenWithBalance } from '@pooltogether/hooks'
import { useIsWalletMetamask, useIsWalletOnNetwork } from '@pooltogether/hooks'
import {
  getNetworkNiceNameByChainId,
  numberWithCommas,
  getMaxPrecision
} from '@pooltogether/utilities'

import { TOKEN_IMG_URL } from '../../constants'
import { BottomSheetProps, BottomSheet } from './BottomSheet'
import { SquareButton, SquareButtonTheme } from '../Buttons/SquareButton'
import { BlockExplorerLink } from '../Links/BlockExplorerLink'
import { LinkToContractItem } from '../LinkToContractItem'
import { ModalTitle } from '../Modal/Modal'
import { TokenIcon } from '../Icons/TokenIcon'
import { CountUp } from '../CountUp'
import { Tooltip } from '../Containers/Tooltip'
import { addTokenToMetamask } from '../../services/addTokenToMetamask'
import { poolToast } from '../../services/poolToast'

export enum DefaultBalanceSheetViews {
  'main',
  'deposit',
  'claim',
  'withdraw',
  'more'
}

export enum BalanceBottomSheetButtonTheme {
  'primary',
  'secondary',
  'tertiary',
  'rainbow'
}

export interface BalanceBottomSheetPrizePool {
  chainId: number
  address: string
}

export interface BalanceBottomSheetButton {
  label: string
  onClick: () => void
  theme: BalanceBottomSheetButtonTheme
  disabled?: boolean
}

export interface BalanceBottomSheetProps extends BottomSheetProps {
  setView: Function
  selectedView: DefaultBalanceSheetViews
  withdrawView: React.ReactNode
  withdrawTx?: Transaction
  claimView: React.ReactNode
  depositView: React.ReactNode
  depositTx?: Transaction
  moreInfoView?: React.ReactNode
  buttons: Array<BalanceBottomSheetButton>
  open: any
  onDismiss: any
  balances: UsersPrizePoolBalances
  prizePool: BalanceBottomSheetPrizePool
  network: number
  wallet: object
  t: any
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

export interface BalanceBottomSheetBackButtonProps {
  t: any
  onClick: () => void
}

export const BalanceBottomSheetBackButton = (props: BalanceBottomSheetBackButtonProps) => {
  const { t } = props

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
  const { t, prizePool, buttons, balances, withdrawTx } = props
  const { ticket } = balances
  const { chainId } = prizePool

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
          <Tooltip
            id={`balance-bottom-sheet-key-${Math.random()}`}
            tip={
              <>
                {numberWithCommas(ticket.amount, { precision: getMaxPrecision(ticket.amount) })}{' '}
                {ticket.symbol}
              </>
            }
          >
            <TokenIcon chainId={chainId} address={ticket.address} sizeClassName='w-4 h-4 my-auto' />

            <span className='font-bold opacity-50 mx-1'>{numberWithCommas(ticket.amount)}</span>

            <span className='opacity-50'>{ticket.symbol}</span>
          </Tooltip>
        </span>
      </div>

      {withdrawTx && <WithdrawReceipt t={t} withdrawTx={withdrawTx} />}

      <div className='flex flex-col space-y-4'>{buildButtons(buttons)}</div>
    </>
  )
}

export interface UsersPrizePoolBalances {
  ticket: TokenWithBalance
  token: TokenWithBalance
}

interface MoreInfoViewProps {
  t: Function
  prizePool: BalanceBottomSheetPrizePool
  balances: UsersPrizePoolBalances
  setView: Function
  network: number
  wallet: DefaultBalanceSheetViews
}

const MoreInfoView = (props: MoreInfoViewProps) => {
  const { t, prizePool, balances, setView, network, wallet } = props
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
      <BalanceBottomSheetBackButton t={t} onClick={() => setView(DefaultBalanceSheetViews.main)} />
    </>
  )
}

export const BalanceBottomSheetTitle = ({ t, chainId }) => (
  <ModalTitle
    chainId={chainId}
    title={t('depositsOnNetwork', { network: getNetworkNiceNameByChainId(chainId) })}
  />
)

const getView = (props) => {
  const { selectedView, setView, withdrawView, depositView, claimView, moreInfoView } = props
  switch (selectedView) {
    case DefaultBalanceSheetViews.main:
      return <MainView {...props} setView={setView} />
    case DefaultBalanceSheetViews.claim:
      return claimView
    case DefaultBalanceSheetViews.deposit:
      return depositView
    case DefaultBalanceSheetViews.withdraw:
      return withdrawView
    case DefaultBalanceSheetViews.more:
      return moreInfoView || <MoreInfoView {...props} setView={setView} />
  }
}

export interface ViewProps {
  balances: UsersPrizePoolBalances
  prizePool: BalanceBottomSheetPrizePool
  setView: (view: DefaultBalanceSheetViews) => void
}

export interface WithdrawReceiptProps {
  withdrawTx: Transaction
  t: any
}

const WithdrawReceipt = (props: WithdrawReceiptProps) => {
  const { t, withdrawTx } = props

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
          className='font-semibold'
        >
          {button.label}
        </button>
      )
    } else if (button.theme === BalanceBottomSheetButtonTheme.rainbow) {
      return (
        <SquareButton
          onClick={button.onClick}
          disabled={button.disabled}
          theme={SquareButtonTheme.rainbow}
        >
          {button.label}
        </SquareButton>
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
