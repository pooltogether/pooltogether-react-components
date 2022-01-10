import React, { useMemo, useState } from 'react'
import classNames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import { Transaction, Amount, Token } from '@pooltogether/hooks'
import {
  getNetworkNiceNameByChainId,
  numberWithCommas,
  getMaxPrecision
} from '@pooltogether/utilities'

import { TOKEN_IMG_URL } from '../../constants'
import { i18nTranslate } from 'src/types'
import { BottomSheet } from './BottomSheet'
import { SquareButton, SquareButtonTheme, SquareLink } from '../Buttons/SquareButton'
import { BlockExplorerLink } from '../Links/BlockExplorerLink'
import { ModalTitle } from '../Modal/Modal'
import { TokenIcon } from '../Icons/TokenIcon'
import { CountUp } from '../CountUp'
import { Tooltip } from '../Containers/Tooltip'
import { addTokenToMetamask } from '../../services/addTokenToMetamask'
import { poolToast } from '../../services/poolToast'

enum DefaultViews {
  main = 'main',
  moreInfo = 'moreInfo'
}

export interface Link {
  id: string
  label: React.ReactNode
  href: string
}

export interface View {
  id: string
  label: React.ReactNode
  view: (props: Partial<MainViewProps & MoreInfoViewProps>) => JSX.Element
  theme?: SquareButtonTheme
}

export interface BalanceBottomSheetProps extends MainViewProps, MoreInfoViewProps {
  open: boolean
  onDismiss: () => void
  className?: string
}

export const BalanceBottomSheet = (props: BalanceBottomSheetProps) => {
  const { open, onDismiss, className, ...viewProps } = props
  const [selectedView, setSelectedView] = useState<string>(DefaultViews.main)

  const View = useMemo(() => getView(selectedView, props.views), [selectedView])

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      className={classNames(className, 'text-inverse dark:text-white')}
    >
      <View {...viewProps} setView={setSelectedView} />
      <BalanceBottomSheetBackButton
        t={props.t}
        selectedView={selectedView}
        onClick={() => setSelectedView(DefaultViews.main)}
      />
    </BottomSheet>
  )
}

BalanceBottomSheet.defaultProps = {
  label: 'balance-bottom-sheet'
}

export const BalanceBottomSheetBackButton = (props: {
  onClick: () => void
  t: i18nTranslate
  selectedView: string
}) => {
  const { onClick, t, selectedView } = props

  if (selectedView === DefaultViews.main) return null

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
  t: i18nTranslate
  chainId: number
  views: View[]
  tx: Transaction
  token: Token
  balance: Amount
  balanceUsd: Amount
  contractLinks: ContractLink[]
  title: string
  internalLinks?: JSX.Element
  externalLinks?: Link[]
  banner?: React.ReactNode
}

const MainView = (props: MainViewProps & { setView: (view: string) => void }) => {
  const {
    t,
    chainId,
    tx,
    views,
    token,
    balance,
    balanceUsd,
    setView,
    title,
    banner,
    internalLinks,
    externalLinks
  } = props

  return (
    <>
      <ModalTitle chainId={chainId} title={title} className='mb-4' />

      {banner}

      <div className='bg-white dark:bg-actually-black dark:bg-opacity-10 rounded-xl w-full py-6 flex flex-col mb-4'>
        <span
          className={classNames('text-3xl mx-auto font-bold leading-none', {
            'opacity-50': balance.amountUnformatted.isZero()
          })}
        >
          $<CountUp countTo={Number(balanceUsd.amount)} />
        </span>
        <span className='mx-auto flex mt-1'>
          <Tooltip
            id={`balance-bottom-sheet-key-${Math.random()}`}
            tip={
              <>
                {numberWithCommas(balance.amount, { precision: getMaxPrecision(balance.amount) })}{' '}
                {token.symbol}
              </>
            }
          >
            <TokenIcon chainId={chainId} address={token.address} sizeClassName='w-4 h-4 my-auto' />
            <span className='font-bold opacity-50 mx-1'>{numberWithCommas(balance.amount)}</span>
            <span className='opacity-50'>{token.symbol}</span>
          </Tooltip>
        </span>
      </div>

      {tx && <TxReceipt chainId={chainId} tx={tx} t={t} className='mb-4' />}

      <div className='flex flex-col space-y-4'>
        {internalLinks}

        {externalLinks?.map((externalLink) => (
          <SquareLink
            key={externalLink.id}
            href={externalLink.href}
            chevron
            className='flex justify-center'
          >
            {externalLink.label}
          </SquareLink>
        ))}

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
  t: i18nTranslate
  chainId: number
  token: Token
  contractLinks: ContractLink[]
  isWalletOnProperNetwork: boolean
  isWalletMetaMask: boolean
  // depositAllowance: DepositAllowance
  // isFetched: Boolean
  // useSendTransaction: any
  // revokeAllowanceCallTransaction: () => Promise<TransactionResponse>
  // refetch: () => void
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

        {/* <RevokeAllowanceButton {...props} t={t} token={token} /> */}
      </ul>
    </>
  )
}

const TxReceipt = (props: {
  tx: Transaction
  chainId: number
  t: i18nTranslate
  className?: string
}) => {
  const { chainId, tx, t, className } = props

  console.log({ tx })

  if (!tx) return null

  return (
    <div
      className={classNames(
        'bg-white bg-opacity-20 dark:bg-actually-black dark:bg-opacity-10 rounded-xl w-full px-4 py-6 flex justify-between',
        className
      )}
    >
      <span className='font-bold'>{t?.('transaction') || 'Transaction'}</span>
      <BlockExplorerLink chainId={chainId} txHash={tx.hash} shorten />
    </div>
  )
}

const LinkToContractItem = (props: {
  t: i18nTranslate
  chainId: number
  i18nKey: string
  address: string
}) => {
  const { t, chainId, i18nKey, address } = props
  return (
    <li className='w-full flex justify-between'>
      <span className='text-sm'>{t?.(i18nKey) || i18nKey}</span>
      <BlockExplorerLink shorten chainId={chainId} address={address} className='text-sm' />
    </li>
  )
}
