import React, { useState } from 'react'
import { useOnboard } from '@pooltogether/hooks'

import { AccountButton } from './AccountButton'
import { TransactionsModal } from './TransactionsModal'
import { ConnectWalletButton } from './ConnectWalletButton'
import { PendingTxButton } from './PendingTxButton'

export function Account(props) {
  const { t } = props

  const [isOpen, setIsOpen] = useState(false)
  const { isWalletConnected } = useOnboard()

  return (
    <>
      {isWalletConnected && <AccountButton t={t} openModal={() => setIsOpen(true)} />}
      {!isWalletConnected && <ConnectWalletButton t={t} />}
      {isWalletConnected && <PendingTxButton t={t} openModal={() => setIsOpen(true)} />}
      <TransactionsModal t={t} isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  )
}
