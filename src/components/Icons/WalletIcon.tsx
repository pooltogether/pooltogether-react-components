import React from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'

// Wallets
import MetaMask from '../../assets/Wallets/metamask-icon.png'
import Coinbase from '../../assets/Wallets/coinbase-icon.svg'
import WalletConnect from '../../assets/Wallets/walletconnect-icon.svg'
import Injected from '../../assets/Wallets/injected-icon.svg'

interface WalletIconProps {
  wallet: string
  sizeClassName?: string
  className?: string
}

export const WalletIcon: React.FC<WalletIconProps> = (props) => {
  const { sizeClassName, className, wallet } = props

  const src = WALLET_MAPPING[wallet]

  if (!src) {
    return (
      <FeatherIcon
        icon='plus-circle'
        className={classnames('inline-block', className, sizeClassName)}
      />
    )
  }

  return <img src={src} className={classnames('inline-block', className, sizeClassName)} />
}

WalletIcon.defaultProps = {
  sizeClassName: 'w-5 h-5'
}

export const WALLET_MAPPING = Object.freeze({
  'metamask': MetaMask,
  'coinbase': Coinbase,
  'coinbase wallet': Coinbase,
  'walletconnect': WalletConnect,
  'injected': Injected
})
