import React from 'react'
import classnames from 'classnames'
import {
  useOnboard,
  useIsWalletMetamask,
  useAddNetworkToMetamask,
  useIsWalletOnNetwork,
  useIsWalletOnSupportedNetwork
} from '@pooltogether/hooks'
import { ETHEREUM_NETWORKS, getNetworkNiceNameByChainId } from '@pooltogether/utilities'

import { Tooltip } from '../../Containers'
import { NetworkIcon } from '../../Icons'
import { Modal } from '../../Modal'

export const NetworkModal = (props) => {
  const { t, isOpen, closeModal, supportedNetworks } = props

  const { network: chainId } = useOnboard()
  const isWalletMetamask = useIsWalletMetamask()
  const currentNetworkName = getNetworkNiceNameByChainId(chainId)
  const isWalletOnSupportedNetwork = useIsWalletOnSupportedNetwork(supportedNetworks)

  if (isWalletMetamask) {
    return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className='flex flex-col h-full'>
          <h5 className='text-accent-1'>Choose a Network</h5>
          <p className='mb-4 text-sm text-accent-1'>
            Select a supported network to be prompted to switch in your MetaMask wallet.
          </p>
          {supportedNetworks.map((chainId) => (
            <NetworkButton t={t} chainId={chainId} />
          ))}
          <p className='text-xxxs mt-auto'>
            Currently connected to{' '}
            <b className={classnames({ 'text-red': !isWalletOnSupportedNetwork })}>
              {currentNetworkName}
            </b>
          </p>
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className='flex flex-col h-full'>
        <h5 className='text-accent-1'>Suported Networks</h5>
        <p className='mb-4 text-sm text-accent-1'>
          Please switch to a supported network in your wallet.
        </p>
        {supportedNetworks.map((chainId) => (
          <NetworkItem t={t} chainId={chainId} />
        ))}
        <p className='text-xxxs mt-auto'>
          Currently connected to{' '}
          <b className={classnames({ 'text-red': !isWalletOnSupportedNetwork })}>
            {currentNetworkName}
          </b>
        </p>
      </div>
    </Modal>
  )
}

const NetworkItem = (props) => {
  const { chainId } = props

  const isCurrentNetwork = useIsWalletOnNetwork(chainId)
  const networkName = getNetworkNiceNameByChainId(chainId)

  return (
    <div
      className={classnames('flex justify-center mb-4 last:mb-0 w-full text-center py-2 rounded', {
        'pool-gradient-1': isCurrentNetwork,
        'bg-body': !isCurrentNetwork
      })}
    >
      <NetworkIcon chainId={chainId} className='my-auto mr-2' />
      <span className='my-auto'>{networkName}</span>
    </div>
  )
}

const NetworkButton = (props) => {
  const { chainId, t } = props

  const isCurrentNetwork = useIsWalletOnNetwork(chainId)
  const networkName = getNetworkNiceNameByChainId(chainId)
  const addNetwork = useAddNetworkToMetamask(chainId)

  const disabled = ETHEREUM_NETWORKS.includes(chainId)
  let toolTip
  if (disabled) {
    if (t) {
      toolTip = t('pool')
    } else {
      toolTip = 'You have to manually change to this network inside your wallet'
    }
  }

  return (
    <div className='flex mb-4 last:mb-0'>
      <button
        className={classnames('w-full flex justify-center py-2 rounded trans', {
          'pool-gradient-1': isCurrentNetwork,
          'bg-body border border-body hover:border-accent-3': !isCurrentNetwork
        })}
        type='button'
        onClick={addNetwork}
        disabled={disabled}
      >
        <NetworkIcon chainId={chainId} className='mr-2' />
        <span className='my-auto'>{networkName}</span>
      </button>
      {toolTip && (
        <Tooltip
          tip={toolTip}
          id={`${chainId}-network-button`}
          className='flex'
          iconClassName='mx-2 my-auto'
        />
      )}
    </div>
  )
}
