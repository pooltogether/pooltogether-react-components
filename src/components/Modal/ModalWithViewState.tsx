import React, { useMemo } from 'react'
import { View, ViewStateMachine, ViewStateMachineProps } from '../Containers/ViewStateMachine'
import { Modal, ModalProps } from './Modal'

export type ModalWithViewStateView = View & {
  title?: React.ReactNode
  bgClassName?: string
  onCloseViewId?: string | number
  hideNextNavButton?: boolean
  hidePreviousNavButton?: boolean
}

export type ModalWithViewStateProps = Omit<ModalProps, 'children'> &
  ViewStateMachineProps<ModalWithViewStateView> & {
    hideNavButtons?: boolean
    [key: string]: any
  }

/**
 * NOTE: The way props are passed to views is kinda a hack.
 * @param props
 * @returns
 */
export function ModalWithViewState(props: ModalWithViewStateProps) {
  // Explicitly pull out all ModalProps and ViewStateMachineProps so we can pass every other prop down to the view that we are going to render
  const {
    isOpen,
    closeModal,
    label,
    title,
    className,
    outerClassName,
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
    viewIds,
    views,
    selectedViewId,
    setSelectedViewId,
    onViewChange,
    hideNavButtons,
    ...viewProps
  } = props

  const selectedView = useMemo(
    () => views.find((view) => view.id === selectedViewId),
    [selectedViewId]
  )

  const previous =
    !hideNavButtons &&
    !selectedView.hidePreviousNavButton &&
    selectedView.previousViewId !== undefined
      ? () => setSelectedViewId(selectedView.previousViewId)
      : null

  const next =
    !hideNavButtons && !selectedView.hideNextNavButton && selectedView.nextViewId !== undefined
      ? () => setSelectedViewId(selectedView.nextViewId)
      : null

  return (
    <Modal
      className={className}
      isOpen={isOpen}
      closeModal={() => {
        if (selectedView.onCloseViewId !== undefined) {
          setSelectedViewId(selectedView.onCloseViewId)
        }
        closeModal()
      }}
      label={label}
      title={selectedView.title !== undefined ? selectedView.title : title}
      widthClassName={widthClassName}
      modalHeightClassName={modalHeightClassName}
      maxWidthClassName={maxWidthClassName}
      maxHeightClassName={maxHeightClassName}
      paddingClassName={paddingClassName}
      bgClassName={selectedView.bgClassName !== undefined ? selectedView.bgClassName : bgClassName}
      roundedClassName={roundedClassName}
      shadowClassName={shadowClassName}
      overflowClassName={overflowClassName}
      style={style}
      onPreviousClick={previous}
      onNextClick={next}
    >
      <ViewStateMachine
        viewIds={viewIds}
        views={views}
        selectedViewId={selectedViewId}
        setSelectedViewId={setSelectedViewId}
        onViewChange={onViewChange}
        {...viewProps}
      />
    </Modal>
  )
}
