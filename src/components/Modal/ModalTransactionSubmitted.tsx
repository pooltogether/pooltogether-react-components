import React from 'react'
import classNames from 'classnames'
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
  hash: string
  closeModal: () => void
  hideCloseButton?: boolean
  className?: string
}

export const ModalTransactionSubmitted = (props: ModalTransactionSubmittedProps) => {
  const { chainId, hash, className, closeModal, hideCloseButton, t } = props

  const url = formatBlockExplorerTxUrl(hash, chainId)

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
