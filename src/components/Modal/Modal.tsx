import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import Dialog from '@reach/dialog'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { NetworkIcon } from '../Icons/NetworkIcon'
import { NextRouter } from 'next/router'
import classNames from 'classnames'

export interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  label: string
  children: React.ReactNode
  router?: NextRouter
  header?: React.ReactNode
  className?: string
  widthClassName?: string
  modalHeightClassName?: string
  maxWidthClassName?: string
  maxHeightClassName?: string
  paddingClassName?: string
  bgClassName?: string
  roundedClassName?: string
  shadowClassName?: string
  overflowClassName?: string
  style?: object
  onPreviousClick?: () => void
  onNextClick?: () => void
}

export const Modal = (props: ModalProps) => {
  const {
    isOpen,
    closeModal,
    children,
    label,
    header,
    className,
    widthClassName,
    modalHeightClassName,
    maxWidthClassName,
    maxHeightClassName,
    paddingClassName,
    bgClassName,
    roundedClassName,
    shadowClassName,
    overflowClassName,
    style,
    router,
    onPreviousClick,
    onNextClick
  } = props

  // TODO: This barely works. Better than nothing though.
  useEffect(() => {
    router?.beforePopState(() => {
      if (isOpen) {
        closeModal()
        router.replace(router.asPath, undefined, { shallow: true })
        return false
      }
      return true
    })

    return () => {
      router?.beforePopState(() => true)
    }
  }, [router, isOpen])

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
            key={`modal-${label}`}
            transition={{ duration: shouldReduceMotion ? 0 : 0.1, ease: 'linear' }}
            initial={{
              opacity: 0
            }}
            exit={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            style={style}
            className={classnames(
              'mx-auto flex flex-col',
              widthClassName,
              modalHeightClassName,
              maxWidthClassName,
              maxHeightClassName,
              bgClassName,
              roundedClassName,
              shadowClassName,
              overflowClassName
            )}
          >
            <ModalHeader
              header={header}
              closeModal={closeModal}
              onPreviousClick={onPreviousClick}
              onNextClick={onNextClick}
            />
            <div className={classNames(paddingClassName, className)}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

Modal.defaultProps = {
  noPad: false,
  bgClassName: 'bg-new-modal',
  roundedClassName: 'rounded-none xs:rounded-xl',
  maxWidthClassName: 'xs:max-w-lg',
  widthClassName: 'w-screen xs:w-full',
  modalHeightClassName: 'h-actually-full-screen xs:h-auto',
  maxHeightClassName: 'max-h-actually-full-screen xs:max-h-90-screen',
  paddingClassName: 'px-2 xs:px-8 pt-2 pb-12 xs:py-12',
  shadowClassName: 'shadow-3xl',
  overflowClassName: 'overflow-y-auto minimal-scrollbar'
}

const ModalHeader = (props: {
  header: React.ReactNode
  closeModal: () => void
  onPreviousClick: () => void
  onNextClick: () => void
}) => {
  const { header, closeModal, onPreviousClick, onNextClick } = props
  return (
    <div
      className={classNames('z-1 sticky top-0', {
        'backdrop-filter backdrop-blur-xl': !!header
      })}
    >
      <div className='absolute left-4 flex space-x-2 items-center top-2'>
        {onPreviousClick && <PreviousButton onClick={onPreviousClick} />}
        {onNextClick && <NextButton onClick={onNextClick} />}
      </div>
      <CloseModalButton
        closeModal={closeModal}
        className={classNames('absolute top-2 right-4', {
          'backdrop-filter backdrop-blur-xl rounded-full': !header
        })}
      />
      <div className='inset-x-0 top-0 flex justify-center'>
        <span className={'text-inverse font-semibold px-1 mx-auto leading-none my-4 xs:my-2'}>
          {header}
        </span>
      </div>
    </div>
  )
}

export const CloseModalButton = (props) => (
  <ModalHeaderButton icon='x' onClick={props.closeModal} className={props.className} />
)
export const PreviousButton = (props) => (
  <ModalHeaderButton icon='arrow-left' onClick={props.onClick} />
)
export const NextButton = (props) => (
  <ModalHeaderButton icon='arrow-right' onClick={props.onClick} />
)

const ModalHeaderButton: React.FC<{ onClick: () => void; className?: string; icon: string }> = (
  props
) => {
  const { onClick, className, icon } = props
  return (
    <button
      className={classNames('trans text-inverse opacity-100 hover:opacity-70 stroke-2', className)}
      onClick={onClick}
    >
      <FeatherIcon icon={icon} className='w-8 h-8 sm:w-6 sm:h-6' />
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
