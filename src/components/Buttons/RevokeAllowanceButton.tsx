import React, { useState } from 'react'
import FeatherIcon from 'feather-icons-react'
import { getNetworkNiceNameByChainId } from '@pooltogether/utilities'
import { Token, useTransaction } from '@pooltogether/hooks'
import { BigNumber } from 'ethers'

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
  chainId: number
  token: Token
  sendRevokeAllowanceTransaction: () => Promise<number>
}

export const RevokeAllowanceButton = (props: RevokeAllowanceButtonProps) => {
  const { t, isWalletOnProperNetwork, token, chainId, sendRevokeAllowanceTransaction } = props

  const [approveTxId, setApproveTxId] = useState(0)
  const approveTx = useTransaction(approveTxId)

  const handleRevokeAllowanceClick = async () => {
    if (!isWalletOnProperNetwork) {
      poolToast.warn(
        t?.('switchToNetworkToRevokeToken', {
          networkName: getNetworkNiceNameByChainId(chainId),
          token: token.symbol
        }) ||
          `Switch to ${getNetworkNiceNameByChainId(chainId)} to revoke '${
            token.symbol
          }' token allowance`
      )
      return null
    }

    const txId = await sendRevokeAllowanceTransaction()
    setApproveTxId(txId)
  }

  if (approveTx?.sent && !approveTx?.cancelled) {
    return (
      <div className='flex justify-between bg-white bg-opacity-20 dark:bg-actually-black dark:bg-opacity-10 rounded-xl w-full p-4'>
        <span>
          {t?.(`revokePoolAllowance`, { ticker: token.symbol }) ||
            `Revoke ${token.symbol} allowance`}
        </span>
        <span>
          <BlockExplorerLink shorten chainId={chainId} txHash={approveTx.hash} />
        </span>
      </div>
    )
  }

  return (
    <SquareButton
      onClick={handleRevokeAllowanceClick}
      className='flex w-full items-center justify-center'
    >
      <FeatherIcon icon='minus-circle' className='w-5 mr-1' />
      {t?.(`revokePoolAllowance`, { ticker: token.symbol }) || `Revoke ${token.symbol} allowance`}
    </SquareButton>
  )
}
