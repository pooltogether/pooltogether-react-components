import React from 'react'
import FeatherIcon from 'feather-icons-react'
import classNames from 'classnames'
import { ScreenSize, useScreenSize } from '@pooltogether/hooks'

import { Modal } from '../Modal/Modal'
import {
  BottomSheet as ReactSpringBottomSheet,
  BottomSheetProps as ReactSpringBottomSheetProps
} from 'react-spring-bottom-sheet'
import { SnapPointProps } from 'react-spring-bottom-sheet/dist/types'

export interface BottomSheetProps extends ReactSpringBottomSheetProps {
  className?: string
  label?: string
  hideCloseButton?: boolean
  // Modal specific props, pull from ModalProps as needed
  maxWidthClassName?: string
}

export const BottomSheet = (props: BottomSheetProps) => {
  const {
    children,
    open,
    onDismiss,
    className,
    label,
    hideCloseButton,
    maxWidthClassName,
    ...sheetProps
  } = props
  const size = useScreenSize()

  if (size > ScreenSize.sm) {
    return (
      <Modal
        label={label}
        isOpen={open}
        closeModal={onDismiss}
        className={className}
        maxWidthClassName={maxWidthClassName}
      >
        {children}
      </Modal>
    )
  }

  return (
    <ReactSpringBottomSheet {...sheetProps} open={open} onDismiss={onDismiss}>
      <CloseBottomSheetButton closeModal={onDismiss} hide={hideCloseButton} />
      <div className={classNames('px-4 pt-4 flex-grow pb-8', className)}>{children}</div>
    </ReactSpringBottomSheet>
  )
}

BottomSheet.defaultProps = {
  label: 'bottom-sheet'
}

export const snapTo90 = (snapPoints: SnapPointProps) => snapPoints.maxHeight * 0.9

const CloseBottomSheetButton: React.FC<{ closeModal: () => void; hide: boolean }> = (props) => {
  const { closeModal, hide } = props

  if (hide) return null

  return (
    <button
      className='my-auto ml-auto close-button trans text-inverse opacity-80 hover:opacity-100 absolute right-6 top-6'
      onClick={closeModal}
    >
      <FeatherIcon icon='x' className='w-6 h-6' />
    </button>
  )
}
