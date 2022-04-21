import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import Dialog from '@reach/dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@pooltogether/hooks'
import { NetworkIcon } from '../Icons/NetworkIcon'

export interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  label: string
  children: React.ReactNode
  className?: string
  widthClassName?: string
  heightClassName?: string
  maxWidthClassName?: string
  maxHeightClassName?: string
  paddingClassName?: string
  bgClassName?: string
  roundedClassName?: string
  shadowClassName?: string
  overflowClassName?: string
  style?: object
  noPad?: boolean
}

export const Modal = (props: ModalProps) => {
  const {
    isOpen,
    closeModal,
    children,
    label,
    className,
    widthClassName,
    heightClassName,
    maxWidthClassName,
    maxHeightClassName,
    paddingClassName,
    bgClassName,
    roundedClassName,
    shadowClassName,
    overflowClassName,
    style,
    noPad
  } = props

  const [isDialogOpen, setIsDialogOpen] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setIsDialogOpen(true)
    }
  }, [isOpen])

  const shouldReduceMotion = useReducedMotion()

  if (!label) {
    console.warn('Modal required a label! <Modal /> with children:', children)
  }

  return (
    <Dialog aria-label={label} isOpen={isDialogOpen} onDismiss={closeModal}>
      <AnimatePresence onExitComplete={() => setIsDialogOpen(false)}>
        {isOpen && (
          <motion.div
            id='modal-animation-wrapper'
            key={label}
            transition={{ duration: shouldReduceMotion ? 0 : 0.1, ease: 'linear' }}
            initial={{
              opacity: 0,
              translateY: 20
            }}
            exit={{
              opacity: 0,
              translateY: 20
            }}
            animate={{
              opacity: 1,
              translateY: 0
            }}
            className={classnames(
              'mx-auto relative',
              widthClassName,
              heightClassName,
              maxWidthClassName,
              maxHeightClassName,
              noPad ? null : paddingClassName,
              bgClassName,
              roundedClassName,
              shadowClassName,
              overflowClassName,
              className
            )}
            style={style}
          >
            <CloseModalButton closeModal={closeModal} />
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

Modal.defaultProps = {
  noPad: false,
  noSize: false,
  bgClassName: 'bg-new-modal',
  roundedClassName: 'rounded-none sm:rounded-xl',
  maxWidthClassName: 'sm:max-w-lg',
  widthClassName: 'w-screen sm:w-full',
  heightClassName: 'h-screen sm:h-auto',
  maxHeightClassName: 'max-h-screen',
  paddingClassName: 'px-2 xs:px-8 py-10',
  shadowClassName: 'shadow-3xl',
  overflowClassName: 'overflow-y-auto'
}

const CloseModalButton = (props) => {
  const { closeModal } = props
  return (
    <button
      className='my-auto ml-auto close-button trans text-inverse opacity-80 hover:opacity-100 absolute right-6 top-6'
      onClick={closeModal}
    >
      <FeatherIcon icon='x' className='w-6 h-6' />
    </button>
  )
}

interface ModalTitleProps {
  className?: string
  icon?: React.ReactNode
  title: string
  chainId?: number
}

export const ModalTitle = (props: ModalTitleProps) => {
  const { className, title, chainId, icon } = props
  return (
    <div className={classnames('flex flex-col mx-auto', className)}>
      {chainId ? (
        <NetworkIcon chainId={chainId} className='mx-auto mb-2' sizeClassName='w-8 h-8' />
      ) : (
        icon
      )}
      <div className='mx-auto text-xl font-bold text-inverse text-center'>{title}</div>
    </div>
  )
}

ModalTitle.defaultProps = { icon: null }
