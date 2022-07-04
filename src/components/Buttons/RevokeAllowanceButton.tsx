import React from 'react'
import FeatherIcon from 'feather-icons-react'
import { getNetworkNiceNameByChainId } from '@pooltogether/utilities'
import { Token } from '@pooltogether/hooks'
import { BigNumber } from 'ethers'

import { i18nTranslate } from 'src/types'
import { Button } from '../Buttons/Button'
import { toast } from 'react-toastify'

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

  const handleRevokeAllowanceClick = async () => {
    if (!isWalletOnProperNetwork) {
      toast.warn(
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

    sendRevokeAllowanceTransaction()
  }

  return (
    <Button
      disabled={!isWalletOnProperNetwork}
      onClick={handleRevokeAllowanceClick}
      className='flex w-full items-center justify-center'
    >
      <FeatherIcon icon='minus-circle' className='w-5 mr-1' />
      {t?.(`revokePoolAllowance`, { ticker: token.symbol }) || `Revoke ${token.symbol} allowance`}
    </Button>
  )
}
