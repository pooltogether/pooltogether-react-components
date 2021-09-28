import React from 'react'
import classnames from 'classnames'
import {
  useIsWalletMetamask,
  useAddNetworkToMetamask,
  useIsWalletOnNetwork,
  useIsWalletOnSupportedNetwork
} from '@pooltogether/hooks'
import { getNetworkNiceNameByChainId } from '@pooltogether/utilities'

import { Modal, NetworkIcon } from '../../..'

export const NetworkModal = (props) => {
  const { t, isOpen, closeModal, supportedNetworks, chainId } = props

  const isWalletMetamask = useIsWalletMetamask()
  const currentNetworkName = getNetworkNiceNameByChainId(chainId)
  const isWalletOnSupportedNetwork = useIsWalletOnSupportedNetwork(supportedNetworks)

  if (isWalletMetamask) {
    return (
      <Modal isOpen={isOpen} closeModal={closeModal} label='network modal'>
        <Container>
          <Header>{t?.('chooseANetwork') || 'Choose a Network'}</Header>
          <Description>
            {t?.('selectASupportedNetworkMetamask') ||
              'Select a supported network to be prompted to switch in your MetaMask wallet.'}
          </Description>
          {supportedNetworks.map((chainId) => (
            <NetworkButton t={t} key={chainId} chainId={chainId} />
          ))}
          <CurrentlyConnectedTo
            t={t}
            currentNetworkName={currentNetworkName}
            isWalletOnSupportedNetwork={isWalletOnSupportedNetwork}
          />
        </Container>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} label='network modal'>
      <Container>
        <Header>{t?.('supportedNetworks') || 'Suported Networks'}</Header>
        <Description>
          {t?.('pleaseSwitchToASupportedNetwork') ||
            'Please switch to a supported network in your wallet.'}
        </Description>
        {supportedNetworks.map((chainId) => (
          <NetworkItem t={t} key={chainId} chainId={chainId} />
        ))}
        <CurrentlyConnectedTo
          t={t}
          currentNetworkName={currentNetworkName}
          isWalletOnSupportedNetwork={isWalletOnSupportedNetwork}
        />
      </Container>
    </Modal>
  )
}

const Container = (props) => <div className='flex flex-col h-full p-4'>{props.children}</div>
const Header = (props) => <h5 className='text-accent-1'>{props.children}</h5>
const Description = (props) => <p className='mb-4 text-sm text-accent-1'>{props.children}</p>
const CurrentlyConnectedTo = (props) => (
  <p className='text-xxxs mt-auto'>
    {props.t?.('currentlyConnectedTo') || 'Currently connected to:'}{' '}
    <b className={classnames({ 'ml-1 text-red': !props.isWalletOnSupportedNetwork })}>
      {props.currentNetworkName}
    </b>
  </p>
)

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
  const { chainId } = props

  const isCurrentNetwork = useIsWalletOnNetwork(chainId)
  const networkName = getNetworkNiceNameByChainId(chainId)
  const addNetwork = useAddNetworkToMetamask(chainId)

  return (
    <div className='flex mb-4 last:mb-0'>
      <button
        className={classnames('w-full flex justify-center py-2 rounded trans', {
          'pool-gradient-1 text-white hover:text-white': isCurrentNetwork,
          'bg-body border border-body hover:border-accent-3': !isCurrentNetwork
        })}
        type='button'
        onClick={addNetwork}
      >
        <NetworkIcon chainId={chainId} className='mr-2' />
        <span className='my-auto'>{networkName}</span>
      </button>
    </div>
  )
}
