import { useOnboard } from '@pooltogether/hooks'
import React from 'react'
import { Button } from '../../Buttons/Button'

export const ConnectWalletButton = (props) => {
  const { t, className } = props
  const { connectWallet } = useOnboard()
  return (
    <Button onClick={() => connectWallet()} textSize='xxxs' className={className}>
      {t?.('connectWallet') || 'Connect wallet'}
    </Button>
  )
}
