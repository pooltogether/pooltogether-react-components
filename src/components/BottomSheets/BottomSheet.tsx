import React from 'react'
import classNames from 'classnames'

import { Modal } from '../Modal/Modal'
import {
  BottomSheet as ReactSpringBottomSheet,
  BottomSheetProps as ReactSpringBottomSheetProps
} from 'react-spring-bottom-sheet'
import { SnapPointProps } from 'react-spring-bottom-sheet/dist/types'
import { ScreenSize, useScreenSize } from '@pooltogether/hooks'
import { i18nTranslate } from '../../types'

export interface BottomSheetProps extends ReactSpringBottomSheetProps {
  t?: i18nTranslate
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
    t,
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
      <div className={classNames('px-4 pt-4 flex-grow ', className)}>{children}</div>
      {!hideCloseButton && (
        <button className='flex-none mx-auto text-accent-3 font-bold p-2 my-3' onClick={onDismiss}>
          {t?.('Close') || 'Close'}
        </button>
      )}
    </ReactSpringBottomSheet>
  )
}

BottomSheet.defaultProps = {
  label: 'bottom-sheet'
}

export const snapTo90 = (snapPoints: SnapPointProps) => snapPoints.maxHeight * 0.9
