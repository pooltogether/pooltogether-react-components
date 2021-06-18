import VisuallyHidden from '@reach/visually-hidden'
import React from 'react'
import FeatherIcon from 'feather-icons-react'

import { Modal } from '../../Modal'
import { WalletInfo } from './WalletInfo'
import { TransactionsList } from './TransactionsList'

export const TransactionsModal = (props) => {
  const { isOpen, closeModal, t } = props

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
        <WalletInfo closeModal={closeModal} />
      </div>
      <div className='p-8 bg-primary rounded-none sm:rounded-b-xl'>
        <TransactionsList closeTransactions={closeModal} t={t} />
      </div>
    </Modal>
  )
}
