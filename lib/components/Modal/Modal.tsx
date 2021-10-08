import React, { useEffect } from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import Dialog from '@reach/dialog'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@pooltogether/hooks'

export interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  label: string
  children?: React.ReactNode
  className?: string
  noPad?: boolean
  noSize?: boolean
  noBgColor?: boolean
  noTextColor?: boolean
  noRoundCorners?: boolean
}

export const Modal = (props: ModalProps) => {
  const {
    isOpen,
    closeModal,
    children,
    label,
    className,
    noPad,
    noSize,
    noBgColor,
    noTextColor,
    noRoundCorners
  } = props

  const shouldReduceMotion = useReducedMotion()

  if (!label) {
    console.warn('Modal required a label! <Modal /> with children:', children)
  }

  return (
    <Dialog aria-label={label} isOpen={isOpen} onDismiss={closeModal}>
      <motion.div
        id='modal-animation-wrapper'
        key={label}
        transition={{ duration: shouldReduceMotion ? 0 : 0.1, ease: 'easeIn' }}
        initial={{
          opacity: 0
        }}
        exit={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        className={classnames(
          'mx-auto relative',
          {
            'p-4': !noPad,
            'bg-card': !noBgColor,
            'text-inverse': !noTextColor,
            'h-full sm:h-auto sm:max-w-md': !noSize,
            'rounded-none sm:rounded-xl ': !noRoundCorners
          },
          className
        )}
      >
        <CloseModalButton closeModal={closeModal} />
        {children}
      </motion.div>
    </Dialog>
  )
}

Modal.defaultProps = {
  noPad: false,
  noSize: false
}

const CloseModalButton = (props) => {
  const { closeModal } = props
  return (
    <button
      className='my-auto ml-auto close-button trans text-white opacity-50 hover:opacity-100 absolute right-7 top-6'
      onClick={closeModal}
    >
      <FeatherIcon icon='x' className='w-6 h-6' />
    </button>
  )
}
