import React from 'react'
import classNames from 'classnames'
import { CloseModalButton, Modal, NextButton, PreviousButton } from '../Modal/Modal'
import {
  BottomSheet as ReactSpringBottomSheet,
  BottomSheetProps as ReactSpringBottomSheetProps
} from 'react-spring-bottom-sheet'
import { SnapPointProps } from 'react-spring-bottom-sheet/dist/types'
import { ScreenSize, useScreenSize } from '../../hooks/useScreenSize'

/**
 * @notice This component is a wrapper around react-spring-bottom-sheet
 */
export interface BottomSheetProps extends Omit<ReactSpringBottomSheetProps, 'onDismiss' | 'open'> {
  isOpen: boolean
  closeModal: () => void
  className?: string
  label: string
  hideCloseButton?: boolean
  // Modal specific props, pull from ModalProps as needed
  maxWidthClassName?: string
  widthClassName?: string
  maxHeightClassName?: string
  paddingClassName?: string
  bgClassName?: string
  roundedClassName?: string
  shadowClassName?: string
  overflowClassName?: string
  modalHeightClassName?: string
  style?: object
  onPreviousClick?: () => void
  onNextClick?: () => void
}

export const BottomSheet = (props: BottomSheetProps) => {
  const {
    children,
    isOpen,
    closeModal,
    className,
    label,
    header,
    hideCloseButton,
    maxWidthClassName,
    shadowClassName,
    widthClassName,
    maxHeightClassName,
    paddingClassName,
    modalHeightClassName,
    bgClassName,
    roundedClassName,
    overflowClassName,
    style,
    onPreviousClick,
    onNextClick,
    ...sheetProps
  } = props
  const size = useScreenSize()

  if (size > ScreenSize.sm) {
    return (
      <Modal
        header={header}
        label={label}
        isOpen={isOpen}
        closeModal={closeModal}
        className={className}
        modalHeightClassName={modalHeightClassName}
        maxWidthClassName={maxWidthClassName}
        widthClassName={widthClassName}
        maxHeightClassName={maxHeightClassName}
        paddingClassName={paddingClassName}
        bgClassName={bgClassName}
        roundedClassName={roundedClassName}
        overflowClassName={overflowClassName}
        style={style}
        onPreviousClick={onPreviousClick}
        onNextClick={onNextClick}
      >
        {children}
      </Modal>
    )
  }

  return (
    <ReactSpringBottomSheet
      {...sheetProps}
      open={isOpen}
      onDismiss={closeModal}
      className='z-40'
      header={
        <BottomSheetHeader
          header={header}
          closeModal={closeModal}
          onPreviousClick={onPreviousClick}
          onNextClick={onNextClick}
        />
      }
    >
      {/* <CloseBottomSheetButton closeModal={closeModal} hide={hideCloseButton} /> */}
      <div className={classNames('px-4 pt-4 flex-grow pb-8', className, overflowClassName)}>
        {children}
      </div>
    </ReactSpringBottomSheet>
  )
}

BottomSheet.defaultProps = {
  label: 'bottom-sheet',
  overflowClassName: 'overflow-y-auto minimal-scrollbar'
}

export const snapTo90 = (snapPoints: SnapPointProps) => snapPoints.maxHeight * 0.9
export const snapToFull = (snapPoints: SnapPointProps) => {
  return snapPoints.maxHeight
}

// const CloseBottomSheetButton: React.FC<{ closeModal: () => void; hide: boolean }> = (props) => {
//   const { closeModal, hide } = props

//   if (hide) return null

//   return (
//     <button
//       className='my-auto ml-auto close-button trans text-inverse opacity-80 hover:opacity-100 absolute right-4 top-4'
//       onClick={closeModal}
//     >
//       <FeatherIcon icon='x' className='w-6 h-6' />
//     </button>
//   )
// }

const BottomSheetHeader = (props: {
  header: React.ReactNode
  closeModal: () => void
  onPreviousClick: () => void
  onNextClick: () => void
}) => {
  const { header, closeModal, onPreviousClick, onNextClick } = props
  return (
    <div className='h-6'>
      <div className='absolute left-2 flex space-x-2 items-center top-3'>
        {!!onPreviousClick && <PreviousButton onClick={onPreviousClick} />}
        {!!onNextClick && <NextButton onClick={onNextClick} />}
      </div>
      <CloseModalButton
        closeModal={closeModal}
        className={classNames('absolute top-3 right-2', {
          'rounded-full': !header
        })}
      />
      <span className={'text-inverse font-semibold mx-auto leading-none'}>{header}</span>
    </div>
  )
}
