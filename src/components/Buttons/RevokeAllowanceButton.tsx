import React, { useState } from 'react'
import FeatherIcon from 'feather-icons-react'
import { getNetworkNiceNameByChainId } from '@pooltogether/utilities'
import { Token, useTransaction } from '@pooltogether/hooks'
import { BigNumber } from 'ethers'
import { TransactionResponse } from '@ethersproject/abstract-provider'

import { i18nTranslate } from 'src/types'
import { BlockExplorerLink } from '../Links/BlockExplorerLink'
import { poolToast } from '../../services/poolToast'
import { SquareButton } from '../Buttons/SquareButton'

export interface DepositAllowance {
  allowanceUnformatted: BigNumber
  isApproved: boolean
}

interface RevokeAllowanceButtonProps {
  t: i18nTranslate
  isWalletOnProperNetwork: boolean
  depositAllowance: DepositAllowance
  isFetched: Boolean
  chainId: number
  token: Token
  useSendTransaction: any
  revokeAllowanceCallTransaction: () => Promise<TransactionResponse>
  refetch: () => void
}

export const RevokeAllowanceButton = (props: RevokeAllowanceButtonProps) => {
  const {
    t,
    isWalletOnProperNetwork,
    token,
    chainId,
    depositAllowance,
    isFetched,
    refetch,
    revokeAllowanceCallTransaction,
    useSendTransaction
  } = props

  const sendTx = useSendTransaction()
  const [approveTxId, setApproveTxId] = useState(0)
  const approveTx = useTransaction(approveTxId)

  const handleRevokeAllowanceClick = async () => {
    if (!isWalletOnProperNetwork) {
      poolToast.warn(
        t(
          'switchToNetworkToRevokeToken',
          // `Switch to {{networkName}} to revoke '{{token}}' token allowance`,
          {
            networkName: getNetworkNiceNameByChainId(chainId),
            token: token.symbol
          }
        )
      )
      return null
    }

    const name = t(`revokePoolAllowance`, { ticker: token.symbol })
    const txId = await sendTx({
      name,
      method: 'approve',
      callTransaction: revokeAllowanceCallTransaction,
      callbacks: {
        refetch
      }
    })

    setApproveTxId(txId)
  }

  let disabled
  if (!isFetched || depositAllowance.allowanceUnformatted.isZero()) {
    disabled = true
  }

  if (approveTx?.sent && !approveTx?.cancelled) {
    return (
      <div className='flex justify-between bg-white bg-opacity-20 dark:bg-actually-black dark:bg-opacity-10 rounded-xl w-full p-4'>
        <span>
          {' '}
          {t('revokePoolAllowance', {
            ticker: token?.symbol
          })}
        </span>
        <span>
          <BlockExplorerLink shorten chainId={chainId} txHash={approveTx.hash} />
        </span>
      </div>
    )
  }

  return (
    <SquareButton
      disabled={disabled}
      onClick={handleRevokeAllowanceClick}
      className='flex w-full items-center justify-center'
    >
      <FeatherIcon icon='minus-circle' className='w-5 mr-1' />{' '}
      {t('revokePoolAllowance', {
        ticker: token?.symbol
      })}
    </SquareButton>
  )
}
