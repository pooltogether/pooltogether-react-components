import React from 'react'
import classNames from 'classnames'
import { Transaction } from '@pooltogether/hooks'
import { formatBlockExplorerTxUrl } from '../Links/BlockExplorerLink'

import {
  SquareButton,
  SquareButtonTheme,
  SquareButtonSize,
  SquareLink
} from '../Buttons/SquareButton'

interface ModalTransactionSubmittedProps {
  t: Function
  chainId: number
  tx: Transaction
  closeModal: () => void
  hideCloseButton?: boolean
  className?: string
}

export const ModalTransactionSubmitted = (props: ModalTransactionSubmittedProps) => {
  const { chainId, tx, className, closeModal, hideCloseButton, t } = props

  const url = formatBlockExplorerTxUrl(tx?.hash, chainId)

  return (
    <div className={classNames('flex flex-col', className)}>
      <SquareLink
        target='_blank'
        href={url}
        theme={SquareButtonTheme.tealOutline}
        size={SquareButtonSize.md}
        className='w-full text-center'
      >
        {t('viewReceipt', 'View receipt')}
      </SquareLink>
      {!hideCloseButton && (
        <SquareButton
          onClick={() => closeModal()}
          theme={SquareButtonTheme.purpleOutline}
          size={SquareButtonSize.sm}
          className='w-full text-center mt-4'
        >
          {t('close', 'Close')}
        </SquareButton>
      )}
    </div>
  )
}

ModalTransactionSubmitted.defaultProps = {
  hideCloseButton: false
}
