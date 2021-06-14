import React, { useState } from 'react'
import { useOnboard } from '@pooltogether/hooks'

import { NetworkModal } from './NetworkModal'
import { NetworkTrigger } from './NetworkTrigger'

export const NetworkSelector = (props) => {
  const { t, supportedNetworks, className } = props
  const [isOpen, setIsOpen] = useState(false)

  const { isWalletConnected } = useOnboard()

  return (
    <>
      {isWalletConnected && (
        <NetworkTrigger t={t} openModal={() => setIsOpen(true)} className={className} />
      )}
      <NetworkModal
        t={t}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        supportedNetworks={supportedNetworks}
      />
    </>
  )
}
