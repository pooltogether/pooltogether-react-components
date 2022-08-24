import React, { useMemo } from 'react'
import { View, ViewStateMachine, ViewStateMachineProps } from '../Containers/ViewStateMachine'
import { BottomSheet, BottomSheetProps, BottomSheetTitle } from './BottomSheet'

export type BottomSheetWithViewStateView = View & {
  title?: React.ReactNode
  bgClassName?: string
  onCloseViewId?: string | number
  hideNextNavButton?: boolean
  hidePreviousNavButton?: boolean
}

export type BottomSheetWithViewStateProps = Omit<BottomSheetProps, 'children'> &
  ViewStateMachineProps<BottomSheetWithViewStateView> & {
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
    open,
    label,
    onDismiss,
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
    snapPoints,
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
      open={open}
      onDismiss={() => {
        if (selectedView.onCloseViewId !== undefined) {
          setSelectedViewId(selectedView.onCloseViewId)
        }
        onDismiss()
      }}
      label={label}
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
      snapPoints={snapPoints}
    >
      <BottomSheetTitle title={selectedView.title !== undefined ? selectedView.title : title} />
      <ViewStateMachine
        viewIds={viewIds}
        views={views}
        selectedViewId={selectedViewId}
        setSelectedViewId={setSelectedViewId}
        onViewChange={onViewChange}
        {...viewProps}
      />
    </BottomSheet>
  )
}
