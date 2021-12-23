import React, { useState } from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import { Transaction, Amount, Token } from '@pooltogether/hooks'
import { getNetworkNiceNameByChainId, numberWithCommas } from '@pooltogether/utilities'
// import { TokenWithBalance } from '@pooltogether/hooks'
// import { useIsWalletMetamask, useIsWalletOnNetwork } from '@pooltogether/hooks'
// import {
//   getMaxPrecision
// } from '@pooltogether/utilities'

import { TOKEN_IMG_URL } from '../../constants'
import { BottomSheet } from './BottomSheet'
// import { BottomSheetProps, BottomSheet } from './BottomSheet'
import { SquareButton, SquareButtonTheme } from '../Buttons/SquareButton'
import { BlockExplorerLink } from '../Links/BlockExplorerLink'
import { ModalTitle } from '../Modal/Modal'
import { TokenIcon } from '../Icons/TokenIcon'
import { CountUp } from '../CountUp'
// import { Tooltip } from '../Containers/Tooltip'
import { addTokenToMetamask } from '../../services/addTokenToMetamask'
import { poolToast } from '../../services/poolToast'
import classNames from 'classnames'

enum DefaultViews {
  main = 'main',
  moreInfo = 'moreInfo'
}
// export enum DefaultBalanceSheetViews {
//   'main',
//   'deposit',
//   'claim',
//   'withdraw',
//   'more'
// }

// export enum BalanceBottomSheetButtonTheme {
//   'primary',
//   'secondary',
//   'tertiary',
//   'rainbow'
// }

// export interface BalanceBottomSheetPrizePool {
//   chainId: number
//   address: string
// }

type i18nTranslate = (i18nKey: string, data?: { [key: string]: string }) => string

export interface View {
  id: string
  label: React.ReactNode
  view: (props: Partial<MainViewProps & MoreInfoViewProps>) => JSX.Element
  theme?: SquareButtonTheme
}

// export interface BalanceBottomSheetProps extends BottomSheetProps {
//   setView: Function
//   selectedView: DefaultBalanceSheetViews
//   withdrawView: React.ReactNode
//   withdrawTx?: Transaction
//   claimView: React.ReactNode
//   depositView: React.ReactNode
//   depositTx?: Transaction
//   moreInfoView?: React.ReactNode
//   buttons: Array<BalanceBottomSheetButton>
//   open: any
//   onDismiss: any
//   balances: UsersPrizePoolBalances
//   prizePool: BalanceBottomSheetPrizePool
//   network: number
//   wallet: object
//   t: any
//   label?: string

export interface BalanceBottomSheetProps extends MainViewProps, MoreInfoViewProps {
  open: boolean
  onDismiss: () => void
  className?: string
}

export const BalanceBottomSheet = (props: BalanceBottomSheetProps) => {
  const { open, onDismiss, className, ...viewProps } = props
  const [selectedView, setSelectedView] = useState<string>(DefaultViews.main)

  const View = getView(selectedView, props.views)

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      className={classnames(className, 'text-inverse dark:text-white')}
    >
      <View {...viewProps} setView={setSelectedView} />
      <BalanceBottomSheetBackButton
        t={props.t}
        view={selectedView}
        onClick={() => setSelectedView(DefaultViews.main)}
      />
    </BottomSheet>
  )
}

BalanceBottomSheet.defaultProps = {
  label: 'balance-bottom-sheet'
}

// export interface BalanceBottomSheetBackButtonProps {
//   t: any
//   onClick: () => void
// }

// export const BalanceBottomSheetBackButton = (props: BalanceBottomSheetBackButtonProps) => {
//   const { t } = props

export const BalanceBottomSheetBackButton = (props: {
  onClick: () => void
  t?: i18nTranslate
  view: string
}) => {
  const { view, onClick, t } = props
  if (view === DefaultViews.main) return null
  return (
    <button
      onClick={onClick}
      className='font-bold text-lg absolute top-6 left-4 flex opacity-50 hover:opacity-100 transition-opacity'
    >
      <FeatherIcon icon='chevron-left' className='my-auto h-6 w-6' />
      {t?.('back') || 'Back'}
    </button>
  )
}

interface MainViewProps {
  t?: i18nTranslate
  chainId: number
  views: View[]
  tx: Transaction
  token: Token
  balance: Amount
  balanceUsd: Amount
  contractLinks: ContractLink[]
  title: string
  banner?: React.ReactNode
}

const MainView = (props: MainViewProps & { setView: (view: string) => void }) => {
  const { t, chainId, tx, views, token, balance, balanceUsd, setView, title, banner } = props

  return (
    <>
      <ModalTitle chainId={chainId} title={title} className='mb-4' />

      {banner}

      <div className='bg-white dark:bg-actually-black dark:bg-opacity-10 rounded-xl w-full py-6 flex flex-col mb-4'>
        <span
          className={classnames('text-3xl mx-auto font-bold leading-none', {
            'opacity-50': balance.amountUnformatted.isZero()
          })}
        >
          $<CountUp countTo={Number(balanceUsd.amount)} />
        </span>
        <span className='mx-auto flex'>
          <TokenIcon chainId={chainId} address={token.address} sizeClassName='w-4 h-4 my-auto' />
          <span className='font-bold opacity-50 mx-1'>{numberWithCommas(balance.amount)}</span>
          <span className='opacity-50'>{token.symbol}</span>
        </span>
        {/* </div>
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

      {withdrawTx && <WithdrawReceipt t={t} withdrawTx={withdrawTx} />} */}
      </div>

      {tx && <TxReceipt tx={tx} t={t} className='mb-4' />}

      <div className='flex flex-col space-y-4'>
        {views.map((view) => (
          <ViewButton key={view.id} {...view} setView={setView} />
        ))}
        <button
          onClick={() => setView(DefaultViews.moreInfo)}
          className='font-bold pt-2 hover:opacity-50 transition-opacity'
        >
          {t?.('moreInfo') || 'More info'}
        </button>
      </div>
    </>
  )
}

interface ViewButtonProps extends View {
  setView: (view: string) => void
}
{
  /* 
interface MoreInfoViewProps {
  t: Function
  prizePool: BalanceBottomSheetPrizePool
  balances: UsersPrizePoolBalances
  setView: Function
  network: number
  wallet: DefaultBalanceSheetViews */
}

const ViewButton = (props: ViewButtonProps) => {
  const { id, label, theme, setView } = props
  return (
    <SquareButton theme={theme} onClick={() => setView(id)}>
      {label}
    </SquareButton>
  )
}

ViewButton.defaultProps = {
  theme: SquareButtonTheme.tealOutline
}

const getView = (selectedView: string, views: View[]) => {
  if (selectedView === DefaultViews.main) {
    return MainView
  } else if (selectedView === DefaultViews.moreInfo) {
    return MoreInfoView
  } else {
    return views.find((view) => view.id === selectedView).view
  }
}

export interface ContractLink {
  i18nKey: string
  chainId: number
  address: string
}

interface MoreInfoViewProps {
  t?: i18nTranslate
  chainId: number
  token: Token
  contractLinks: ContractLink[]
  isWalletOnProperNetwork: boolean
  isWalletMetaMask: boolean
}

const MoreInfoView = (props: MoreInfoViewProps) => {
  const { t, chainId, token, contractLinks, isWalletOnProperNetwork, isWalletMetaMask } = props
  const handleAddTokenToMetaMask = async () => {
    if (!token) {
      return
    }

    if (!isWalletOnProperNetwork) {
      poolToast.warn(
        t?.('switchToNetworkToAddToken', {
          networkName: getNetworkNiceNameByChainId(chainId),
          token: token.symbol
        }) ||
          `Switch your wallet's network to ${getNetworkNiceNameByChainId(chainId)} to add token '${
            token.symbol
          }'`
      )
      return null
    }

    addTokenToMetamask(
      token.symbol,
      token.address,
      Number(token.decimals),
      TOKEN_IMG_URL[token.symbol]
    )
  }

  return (
    <>
      <ModalTitle chainId={chainId} title={t?.('moreInfo') || 'More info'} className='mb-4' />

      {contractLinks.length > 0 && (
        <ul className='bg-white bg-opacity-20 dark:bg-actually-black dark:bg-opacity-10 rounded-xl w-full p-4 flex flex-col space-y-1 mb-4'>
          <div className='opacity-50 font-bold flex justify-between'>
            <span>{t?.('contract') || 'Contract'}</span>
            <span>{t?.('explorer') || 'Explorer'}</span>
          </div>
          {contractLinks.map((contractLink) => (
            <LinkToContractItem
              key={`${contractLink.address}-${contractLink.chainId}`}
              {...contractLink}
              t={t}
            />
          ))}
        </ul>
      )}
      <ul className='space-y-4'>
        {isWalletMetaMask && (
          <li>
            <SquareButton
              onClick={handleAddTokenToMetaMask}
              className='flex w-full items-center justify-center'
            >
              <FeatherIcon icon='plus-circle' className='w-5 mr-1' />{' '}
              {t?.('addTicketTokenToMetamask', {
                token: token.symbol
              }) || `Add ${token.symbol} to MetaMask`}
            </SquareButton>
          </li>
        )}
        {/* <RevokeAllowanceButton
        isWalletOnProperNetwork={isWalletOnProperNetwork}
        prizePool={prizePool}
        token={token}
      /> */}
      </ul>
      {/* <BalanceBottomSheetBackButton t={t} onClick={() => setView(DefaultBalanceSheetViews.main)} /> */}
    </>
  )
}

const TxReceipt = (props: { tx: Transaction; t?: i18nTranslate; className?: string }) => {
  const { tx, t, className } = props

  if (!tx) return null

  return (
    <div
      className={classNames(
        'bg-white bg-opacity-20 dark:bg-actually-black dark:bg-opacity-10 rounded-xl w-full py-6 flex justify-between',
        className
      )}
    >
      <span className='font-bold'>{t?.('transaction') || 'Transaction'}</span>
      <BlockExplorerLink chainId={tx.chainId} txHash={tx.hash} />
    </div>
  )
}

// const LinkToContractItem = (props: {
//   t?: i18nTranslate
//   chainId: number
//   i18nKey: string
//   address: string
// }) => {
//   const { t, chainId, i18nKey, address } = props
//   return (
//     <li className='w-full flex justify-between'>
//       <span className='text-sm'>{t?.(i18nKey) || i18nKey}</span>
//       <BlockExplorerLink shorten chainId={chainId} address={address} className='text-sm' />
//     </li>
//   )
// }

// const buildButtons = (buttons) => {
//   return buttons.map((button) => {
//     if (button.theme === BalanceBottomSheetButtonTheme.tertiary) {
//       return (
//         <button
//           key={`balance-bottom-sheet-button-${button.label.replace(' ', '')}`}
//           disabled={button.disabled}
//           onClick={button.onClick}
//           className='font-semibold'
//         >
//           {button.label}
//         </button>
//       )
//     } else if (button.theme === BalanceBottomSheetButtonTheme.rainbow) {
//       return (
//         <SquareButton
//           onClick={button.onClick}
//           disabled={button.disabled}
//           theme={SquareButtonTheme.rainbow}
//         >
//           {button.label}
//         </SquareButton>
//       )
//     } else {
//       return (
//         <SquareButton
//           onClick={button.onClick}
//           disabled={button.disabled}
//           theme={
//             button.theme === BalanceBottomSheetButtonTheme.primary
//               ? SquareButtonTheme.teal
//               : SquareButtonTheme.tealOutline
//           }
//         >
//           {button.label}
//         </SquareButton>
//       )
//     }
//   })

// export const BalanceBottomSheetTitle = ({ t, chainId }) => (
//   <ModalTitle
//     chainId={chainId}
//     title={t('depositsOnNetwork', { network: getNetworkNiceNameByChainId(chainId) })}
//   />
// )

// const getView = (props) => {
//   const { selectedView, setView, withdrawView, depositView, claimView, moreInfoView } = props
//   switch (selectedView) {
//     case DefaultBalanceSheetViews.main:
//       return <MainView {...props} setView={setView} />
//     case DefaultBalanceSheetViews.claim:
//       return claimView
//     case DefaultBalanceSheetViews.deposit:
//       return depositView
//     case DefaultBalanceSheetViews.withdraw:
//       return withdrawView
//     case DefaultBalanceSheetViews.more:
//       return moreInfoView || <MoreInfoView {...props} setView={setView} />
//   }
// }

// export interface ViewProps {
//   balances: UsersPrizePoolBalances
//   prizePool: BalanceBottomSheetPrizePool
//   setView: (view: DefaultBalanceSheetViews) => void
// }

// export interface WithdrawReceiptProps {
//   withdrawTx: Transaction
//   t: any
// }

// const WithdrawReceipt = (props: WithdrawReceiptProps) => {
//   const { t, withdrawTx } = props

//   if (!withdrawTx) return null
