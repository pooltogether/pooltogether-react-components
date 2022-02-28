import React from 'react'

import { WalletInfo } from './WalletInfo'
import { Modal } from '../../Modal/Modal'

export const TransactionsModal = (props) => {
  const { disconnectWallet, walletName, chainId, usersAddress, isOpen, closeModal } = props

  return (
    <Modal
      noPad
      isOpen={isOpen}
      closeModal={closeModal}
      label='transactions modal'
      maxWidthClassName='max-w-4xl'
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
    </Modal>
  )
}
