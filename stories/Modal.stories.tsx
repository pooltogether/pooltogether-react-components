import React, { useState } from 'react'
import { BottomSheet } from '../src/components/BottomSheet/BottomSheet'
import { Button } from '../src/components/Buttons/Button'
import { Modal, ModalTitle } from '../src/components/Modal/Modal'

// BasicBottomSheet Story
const ModalTemplate = (args) => <ModalTemplateWrapper />

const ModalTemplateWrapper = (args) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      <Modal label={`Bottom sheet example`} isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <ModalTitle chainId={1} title={'Modal Title'} />
        <div>Basic modal</div>
      </Modal>
    </>
  )
}

export default {
  component: BottomSheet,
  argTypes: {}
}

export const ModalExample = ModalTemplate.bind({})
ModalExample.args = {
  children: ''
}
