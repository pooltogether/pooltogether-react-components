import { ethers } from 'ethers'
import { useTranslation } from 'react-i18next'
import { useSendTransaction as _useSendTransaction } from '@pooltogether/hooks'

import { poolToast } from 'src/services/poolToast'

/**
 * A simple wrapper on useSendTx to provider t & poolToast
 */
export interface useSendTransactionWrapperProps {
  usersAddress: string
  provider: ethers.providers.Web3Provider
  chainId: number
}

export const useSendTransactionWrapper = (props: useSendTransactionWrapperProps) => {
  const { usersAddress, provider, chainId } = props
  const { t } = useTranslation()
  return _useSendTransaction(t, poolToast, usersAddress, provider, chainId)
}
