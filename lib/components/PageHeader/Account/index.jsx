import React, { useState } from 'react'
import { useOnboard } from '@pooltogether/hooks'

import { AccountButton } from './AccountButton'
import { TransactionsModal } from './TransactionsModal'
import { ConnectWalletButton } from './ConnectWalletButton'

// TODO: Pending inside the account button like Uniswap
export function Account(props) {
  const { t, className } = props

  const [isOpen, setIsOpen] = useState(false)
  const { isWalletConnected } = useOnboard()

  return (
    <>
      {isWalletConnected && (
        <AccountButton t={t} openModal={() => setIsOpen(true)} className={className} />
      )}
      {!isWalletConnected && <ConnectWalletButton t={t} className={className} />}
      <TransactionsModal t={t} isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  )
}
