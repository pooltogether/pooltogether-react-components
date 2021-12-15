import React, { useState } from 'react'
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
import { LinkToContractItem } from 'src/components/LinkToContractItem'
import { ModalTitle } from 'src/components/Modal/Modal'
import { ModalNetworkGate } from '../Modal/ModalNetworkGate'
import { ModalTransactionSubmitted } from '../Modal/ModalTransactionSubmitted'
import { TokenIcon } from 'src/components/Icons/TokenIcon'
import { CountUp } from 'src/components/CountUp'
import { addTokenToMetamask } from 'src/services/addTokenToMetamask'
import { poolToast } from '../../services/poolToast'
import { BottomSheet } from './BottomSheet'

import { Amount, Transaction } from '@pooltogether/hooks'
import { Overrides } from 'ethers'
import { useForm } from 'react-hook-form'

// import { useIsWalletOnNetwork } from 'lib/hooks/useIsWalletOnNetwork'

import { useSendTransaction } from 'lib/hooks/useSendTransaction'
import { useSelectedChainIdUser } from 'lib/hooks/Tsunami/User/useSelectedChainIdUser'
import { useUsersAddress } from 'lib/hooks/useUsersAddress'
import { useUsersPrizePoolBalances } from 'lib/hooks/Tsunami/PrizePool/useUsersPrizePoolBalances'
import { WithdrawStepContent } from './WithdrawStepContent'

export enum DefaultBalanceSheetViews {
  'main',
  'withdraw',
  'more'
}

export interface BalanceBottomSheetPrizePool {
  chainId: number
  address: string
}

export interface BalanceBottomSheetProps {
  setView: Function
  selectedView: DefaultBalanceSheetViews
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
  const { prizePool, setView, balances } = props
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

// const WITHDRAW_QUANTITY_KEY = 'withdrawal-quantity'

export enum WithdrawalSteps {
  input,
  review,
  viewTxReceipt
}

interface WithdrawViewProps extends ViewProps {
  withdrawTx: Transaction
  setWithdrawTxId: (txId: number) => void
  onDismiss: () => void
}

const WithdrawView = (props: WithdrawViewProps) => {
  const { prizePool, balances, setView, withdrawTx, setWithdrawTxId, onDismiss } = props
  const { t } = useTranslation()
  const { token } = balances

  const usersAddress = useUsersAddress()
  const [amountToWithdraw, setAmountToWithdraw] = useState<Amount>()
  const [currentStep, setCurrentStep] = useState<WithdrawalSteps>(WithdrawalSteps.input)
  const { isFetched: isUsersBalancesFetched, refetch: refetchUsersBalances } =
    useUsersPrizePoolBalances(usersAddress, prizePool)
  const user = useSelectedChainIdUser()
  const sendTx = useSendTransaction()
  const isWalletOnProperNetwork = useIsWalletOnNetwork(prizePool.chainId)
  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const sendWithdrawTx = async (e) => {
    e.preventDefault()

    const tokenSymbol = token.symbol
    const overrides: Overrides = { gasLimit: 750000 }

    const txId = await sendTx({
      name: `${t('withdraw')} ${amountToWithdraw?.amountPretty} ${tokenSymbol}`,
      method: 'withdrawInstantlyFrom',
      callTransaction: () => user.withdraw(amountToWithdraw?.amountUnformatted, overrides),
      callbacks: {
        onSent: () => setCurrentStep(WithdrawalSteps.viewTxReceipt),
        refetch: () => {
          refetchUsersBalances()
        }
      }
    })
    setWithdrawTxId(txId)
  }

  if (!isWalletOnProperNetwork) {
    return (
      <>
        <ModalTitle chainId={prizePool.chainId} title={t('wrongNetwork', 'Wrong network')} />
        <ModalNetworkGate chainId={prizePool.chainId} className='mt-8' />
        <BackButton onClick={() => setView(DefaultBalanceSheetViews.main)} />
      </>
    )
  }

  if (currentStep === WithdrawalSteps.viewTxReceipt) {
    return (
      <>
        <ModalTitle
          chainId={prizePool.chainId}
          title={t('withdrawalSubmitted', 'Withdrawal submitted')}
        />
        <ModalTransactionSubmitted
          className='mt-8'
          chainId={prizePool.chainId}
          tx={withdrawTx}
          closeModal={onDismiss}
          hideCloseButton
        />
        <BackButton onClick={() => setView(DefaultBalanceSheetViews.main)} />
      </>
    )
  }

  return (
    <>
      <ModalTitle
        chainId={prizePool.chainId}
        title={t('withdrawTicker', { ticker: token.symbol })}
      />
      <BackButton onClick={() => setView(DefaultBalanceSheetViews.main)} />
      <WithdrawStepContent
        form={form}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        user={user}
        prizePool={prizePool}
        usersBalances={balances}
        isUsersBalancesFetched={isUsersBalancesFetched}
        refetchUsersBalances={refetchUsersBalances}
        amountToWithdraw={amountToWithdraw}
        setAmountToWithdraw={setAmountToWithdraw}
        withdrawTx={withdrawTx}
        setWithdrawTxId={setWithdrawTxId}
        sendWithdrawTx={sendWithdrawTx}
      />
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
  const { selectedView, setView } = props
  switch (selectedView) {
    case DefaultBalanceSheetViews.main:
      return <MainView {...props} setView={setView} />
    // return <MainView withdrawTx={withdrawTx} setView={setView} />
    case DefaultBalanceSheetViews.more:
      return <MoreInfoView {...props} setView={setView} />
    case DefaultBalanceSheetViews.withdraw:
      return (
        <WithdrawView {...props} setView={setView} />
        // <WithdrawView setWithdrawTxId={setWithdrawTxId} withdrawTx={withdrawTx} setView={setView} />
      )
  }
}

export interface ViewProps {
  balances: UsersPrizePoolBalances
  prizePool: BalanceBottomSheetPrizePool
  setView: (view: DefaultBalanceSheetViews) => void
}
