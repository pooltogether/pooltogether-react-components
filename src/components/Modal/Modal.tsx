import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import Dialog from '@reach/dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@pooltogether/hooks'
import { NetworkIcon } from '../Icons/NetworkIcon'
import classNames from 'classnames'

export interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  label: string
  title?: React.ReactNode
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
  onPreviousClick?: () => void
  onNextClick?: () => void
}

export const Modal = (props: ModalProps) => {
  const {
    isOpen,
    closeModal,
    children,
    label,
    title,
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
    onPreviousClick,
    onNextClick
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
            style={style}
            className={classnames(
              'mx-auto relative',
              widthClassName,
              heightClassName,
              maxWidthClassName,
              maxHeightClassName,
              bgClassName,
              paddingClassName,
              roundedClassName,
              shadowClassName,
              overflowClassName,
              className
            )}
          >
            <div className='absolute w-full flex justify-between p-2 px-4 top-0 left-0'>
              <div className='absolute left-4 flex space-x-2 items-center'>
                {onPreviousClick && <PreviousButton onClick={onPreviousClick} />}
                {onNextClick && <NextButton onClick={onNextClick} />}
              </div>
              <CloseModalButton closeModal={closeModal} />
              <SimpleModalTitle title={title} />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

Modal.defaultProps = {
  noPad: false,
  bgClassName: 'bg-new-modal',
  roundedClassName: 'rounded-none sm:rounded-xl',
  maxWidthClassName: 'sm:max-w-lg',
  widthClassName: 'w-screen sm:w-full',
  heightClassName: 'h-screen sm:h-auto',
  maxHeightClassName: 'max-h-screen',
  paddingClassName: 'px-2 xs:px-8 pt-12 pb-2 xs:pb-10 ',
  shadowClassName: 'shadow-3xl',
  overflowClassName: 'overflow-y-auto'
}

const CloseModalButton = (props) => (
  <ModalHeaderButton icon='x' onClick={props.closeModal} className='absolute right-4' />
)
const PreviousButton = (props) => <ModalHeaderButton icon='arrow-left' onClick={props.onClick} />
const NextButton = (props) => <ModalHeaderButton icon='arrow-right' onClick={props.onClick} />

const ModalHeaderButton: React.FC<{ onClick: () => void; className?: string; icon: string }> = (
  props
) => {
  const { onClick, className, icon } = props
  return (
    <button
      className={classNames('trans text-inverse opacity-100 hover:opacity-70 stroke-2', className)}
      onClick={onClick}
    >
      <FeatherIcon icon={icon} className='w-6 h-6' />
    </button>
  )
}

const SimpleModalTitle: React.FC<{ title?: React.ReactNode }> = (props) => {
  const { title } = props
  return <span className='text-inverse font-semibold mx-auto min-h-10'>{title}</span>
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
