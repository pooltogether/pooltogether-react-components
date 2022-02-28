import React from 'react'
import { SquareButton } from '../../Buttons/SquareButton'

export const ConnectWalletButton = (props) => {
  const { connectWallet, t, className } = props

  return (
    <SquareButton onClick={() => connectWallet()} className={className}>
      {t?.('connectWallet') || 'Connect wallet'}
    </SquareButton>
  )
}
