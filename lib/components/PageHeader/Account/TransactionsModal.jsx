import React from 'react'

import { Modal } from '../../..'
import { WalletInfo } from './WalletInfo'
import { TransactionsList } from './TransactionsList'

export const TransactionsModal = (props) => {
  const { t, disconnectWallet, walletName, chainId, usersAddress, isOpen, closeModal } = props

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      className='h-full sm:h-auto sm:max-w-4xl'
      label='transactions modal'
      noPad
      noSize
    >
      <div className='p-8'>
        <WalletInfo
          usersAddress={usersAddress}
          chainId={chainId}
          disconnectWallet={disconnectWallet}
          walletName={walletName}
          closeModal={closeModal}
        />
      </div>
      <div className='p-8 bg-primary rounded-none sm:rounded-b-xl'>
        <TransactionsList
          t={t}
          closeTransactions={closeModal}
          chainId={chainId}
          usersAddress={usersAddress}
        />
      </div>
    </Modal>
  )
}
