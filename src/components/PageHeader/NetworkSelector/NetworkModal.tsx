import React from 'react'
import {
  useIsWalletMetamask,
  useAddNetworkToMetamask,
  useIsWalletOnNetwork,
  useIsWalletOnSupportedNetwork
} from '@pooltogether/hooks'
import { getNetworkNiceNameByChainId } from '@pooltogether/utilities'
import classNames from 'classnames'

import { Modal } from '../../Modal/Modal'
import { NetworkIcon } from '../../Icons/NetworkIcon'

export const NetworkModal = (props) => {
  const { t, isOpen, closeModal, supportedNetworks, chainId, wallet, network } = props

  const isWalletMetamask = useIsWalletMetamask(wallet)
  const currentNetworkName = getNetworkNiceNameByChainId(chainId)
  const isWalletOnSupportedNetwork = useIsWalletOnSupportedNetwork(chainId, supportedNetworks)

  if (isWalletMetamask) {
    return (
      <Modal isOpen={isOpen} closeModal={closeModal} label='network modal'>
        <Container>
          <Header>{t?.('chooseANetwork') || 'Choose a Network'}</Header>
          <Description>
            {t?.('selectASupportedNetworkMetamask') ||
              'Select a supported network to be prompted to switch in your MetaMask wallet.'}
          </Description>
          <div className='flex flex-col space-y-2 mb-4'>
            {supportedNetworks.map((chainId) => (
              <NetworkButton
                network={network}
                t={t}
                key={chainId}
                chainId={chainId}
                closeModal={closeModal}
              />
            ))}
          </div>
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
        <div className='flex flex-col space-y-2 mb-4'>
          {supportedNetworks.map((chainId) => (
            <NetworkItem network={network} t={t} key={chainId} chainId={chainId} />
          ))}
        </div>
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
const Header = (props) => (
  <h5 className='font-semibold uppercase text-inverse mb-2'>{props.children}</h5>
)
const Description = (props) => <p className='mb-4 text-sm text-accent'>{props.children}</p>
const CurrentlyConnectedTo = (props) => (
  <p className='text-xxxs mt-auto'>
    {props.t?.('currentlyConnectedTo') || 'Currently connected to:'}{' '}
    <b className={classNames({ 'ml-1 text-red': !props.isWalletOnSupportedNetwork })}>
      {props.currentNetworkName}
    </b>
  </p>
)

const NetworkItem = (props) => {
  const { network, chainId } = props

  const isCurrentNetwork = useIsWalletOnNetwork(network, chainId)
  const networkName = getNetworkNiceNameByChainId(chainId)

  return (
    <div
      className={classNames(
        'bg-pt-purple-lighter dark:bg-pt-purple-darker rounded-lg p-4 flex items-center w-full transition-colors border',
        {
          'border-default': isCurrentNetwork,
          'border-transparent': !isCurrentNetwork
        }
      )}
    >
      <NetworkIcon chainId={chainId} className='mr-2' />
      <span>{networkName}</span>
    </div>
  )
}

const NetworkButton = (props) => {
  const { network, chainId, closeModal } = props

  const isCurrentNetwork = useIsWalletOnNetwork(network, chainId)
  const networkName = getNetworkNiceNameByChainId(chainId)
  const addNetwork = useAddNetworkToMetamask(chainId, { onSuccess: closeModal })

  return (
    <button
      type='button'
      onClick={addNetwork}
      className={classNames(
        'bg-pt-purple-lighter dark:bg-pt-purple-darker rounded-lg p-4 flex items-center w-full transition-colors',
        'border hover:border-highlight-1',
        {
          'border-default': isCurrentNetwork,
          'border-transparent': !isCurrentNetwork
        }
      )}
    >
      <NetworkIcon chainId={chainId} className='mr-2' />
      <span className='font-bold text-lg'>{networkName}</span>
    </button>
  )
}
