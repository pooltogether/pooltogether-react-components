import React from 'react'
import classNames from 'classnames'
import { formatBlockExplorerTxUrl } from '../Links/BlockExplorerLink'

import { Button, ButtonTheme, ButtonSize, ButtonLink } from '../Buttons/Button'

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
      <ButtonLink
        target='_blank'
        href={url}
        theme={ButtonTheme.tealOutline}
        size={ButtonSize.md}
        className='w-full text-center'
      >
        {t('viewReceipt', 'View receipt')}
      </ButtonLink>
      {!hideCloseButton && (
        <Button
          onClick={() => closeModal()}
          theme={ButtonTheme.purpleOutline}
          size={ButtonSize.sm}
          className='w-full text-center mt-4'
        >
          {t('close', 'Close')}
        </Button>
      )}
    </div>
  )
}

ModalTransactionSubmitted.defaultProps = {
  hideCloseButton: false
}
