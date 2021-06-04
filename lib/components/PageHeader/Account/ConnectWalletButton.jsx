import { useOnboard } from '@pooltogether/hooks'
import React from 'react'
import { Button } from '../../Buttons/Button'

export const ConnectWalletButton = (props) => {
  const { t } = props
  const { connectWallet } = useOnboard()
  return (
    <Button padding='px-4 sm:px-6 py-1' onClick={() => connectWallet()} textSize='xxxs'>
      {t?.('connectWallet') || 'Connect wallet'}
    </Button>
  )
}
