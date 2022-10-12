import React, { useEffect, useMemo } from 'react'
import { View, ViewStateMachine, ViewStateMachineProps } from '../Containers/ViewStateMachine'
import { Modal, ModalProps } from './Modal'

export type ModalWithViewStateView = View & {
  closeModal?: () => void
  title?: React.ReactNode
  onCloseViewId?: string | number
  hideNextNavButton?: boolean
  hidePreviousNavButton?: boolean
  // Optional styling overrides
  bgClassName?: string
  widthClassName?: string
  modalHeightClassName?: string
  maxWidthClassName?: string
  maxHeightClassName?: string
  paddingClassName?: string
}

export type ModalWithViewStateProps = Omit<ModalProps, 'children'> &
  ViewStateMachineProps<ModalWithViewStateView> & {
    hideNavButtons?: boolean
    noAnimation?: boolean
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
    noAnimation,
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
    router,
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

  // TODO: This barely works. Better than nothing though.
  useEffect(() => {
    router?.beforePopState(() => {
      if (isOpen) {
        if (!!previous) {
          previous()
        } else {
          closeModal()
        }
        router.push(router.asPath, undefined, { shallow: true })
        return false
      }
      return true
    })

    return () => {
      router?.beforePopState(() => true)
    }
  }, [router, isOpen, previous])

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
    >
      <ViewStateMachine
        viewIds={viewIds}
        views={views}
        selectedViewId={selectedViewId}
        setSelectedViewId={setSelectedViewId}
        onViewChange={onViewChange}
        closeModal={closeModal}
        // TODO: Fix this animation
        noAnimation={true}
        {...viewProps}
      />
    </Modal>
  )
}
