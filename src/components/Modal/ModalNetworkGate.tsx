import React from 'react'
import classNames from 'classnames'
import { useAddNetworkToMetamask } from '@pooltogether/hooks'
import { getNetworkNiceNameByChainId } from '@pooltogether/utilities'
import { useIsWalletMetamask } from '@pooltogether/hooks'

import { Button } from '../Buttons/Button'

interface ModalNetworkGateProps {
  t: Function
  wallet: object
  chainId: number
  className?: string
  onSuccess?: () => void
}

export const ModalNetworkGate = (props: ModalNetworkGateProps) => {
  const { className, chainId, t } = props

  const networkName = getNetworkNiceNameByChainId(chainId)

  return (
    <>
      <div className={classNames(className, 'flex flex-col text-inverse')}>
        <div className='mx-4 opacity-70'>
          <p className='mb-4'>
            {t(
              'thePrizePoolLivesOnTheNetwork',
              'The Prize Pool you are intertacting with lives on the {{networkName}} network.',
              { networkName }
            )}
          </p>
          <p className='mb-10'>
            {t(
              'toContinueYouMustSwitchNetwork',
              'To continue you must switch the network your wallet is on to {{networkName}}, or connect another wallet.',
              { networkName }
            )}
          </p>
        </div>

        <NetworkSwitchButton {...props} />
      </div>
    </>
  )
}

interface NetworkSwitchButtonProps {
  t: Function
  chainId: number
  wallet: object
  onSuccess?: () => void
}

const NetworkSwitchButton = (props: NetworkSwitchButtonProps) => {
  const { chainId, onSuccess, wallet, t } = props

  const addNetwork = useAddNetworkToMetamask(chainId, { onSuccess })
  const networkName = getNetworkNiceNameByChainId(chainId)

  const isWalletMetamask = useIsWalletMetamask(wallet)

  if (!isWalletMetamask) {
    return null
  }

  return (
    <Button onClick={addNetwork}>
      {t('switchToNetworkName', 'Switch to {{networkName}}', { networkName })}
    </Button>
  )
}
