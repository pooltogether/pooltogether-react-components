import React, { useMemo } from 'react'
import { ViewStateMachine, ViewStateMachineProps } from '../Containers/ViewStateMachine'
import { ModalWithViewStateView } from '../Modal/ModalWithViewState'
import { BottomSheet, BottomSheetProps } from './BottomSheet'

export type BottomSheetWithViewStateProps = Omit<BottomSheetProps, 'children'> &
  ViewStateMachineProps<ModalWithViewStateView> & {
    hideNavButtons?: boolean
    [key: string]: any
  }

/**
 * NOTE: The way props are passed to views is kinda a hack.
 * @param props
 * @returns
 */
export function BottomSheetWithViewState(props: BottomSheetWithViewStateProps) {
  // Explicitly pull out all ModalProps and ViewStateMachineProps so we can pass every other prop down to the view that we are going to render
  const {
    isOpen,
    closeModal,
    label,
    header,
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
    snapPoints,
    defaultSnap,
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
    <BottomSheet
      className={className}
      isOpen={isOpen}
      closeModal={() => {
        if (selectedView.onCloseViewId !== undefined) {
          setSelectedViewId(selectedView.onCloseViewId)
        }
        closeModal()
      }}
      label={label}
      header={selectedView.header !== undefined ? selectedView.header : header}
      widthClassName={
        selectedView.widthClassName !== undefined ? selectedView.widthClassName : widthClassName
      }
      modalHeightClassName={
        !!selectedView.modalHeightClassName
          ? selectedView.modalHeightClassName
          : modalHeightClassName
      }
      maxWidthClassName={
        selectedView.maxWidthClassName !== undefined
          ? selectedView.maxWidthClassName
          : maxWidthClassName
      }
      maxHeightClassName={
        selectedView.maxHeightClassName !== undefined
          ? selectedView.maxHeightClassName
          : maxHeightClassName
      }
      paddingClassName={
        selectedView.paddingClassName !== undefined
          ? selectedView.paddingClassName
          : paddingClassName
      }
      bgClassName={selectedView.bgClassName !== undefined ? selectedView.bgClassName : bgClassName}
      roundedClassName={roundedClassName}
      shadowClassName={shadowClassName}
      overflowClassName={overflowClassName}
      style={style}
      onPreviousClick={previous}
      onNextClick={next}
      snapPoints={snapPoints}
      defaultSnap={defaultSnap}
    >
      <ViewStateMachine
        viewIds={viewIds}
        views={views}
        selectedViewId={selectedViewId}
        setSelectedViewId={setSelectedViewId}
        onViewChange={onViewChange}
        closeModal={closeModal}
        {...viewProps}
      />
    </BottomSheet>
  )
}
