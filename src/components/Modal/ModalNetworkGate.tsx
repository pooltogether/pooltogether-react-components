import React from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useAddNetworkToMetamask } from '@pooltogether/hooks'
import { getNetworkNiceNameByChainId } from '@pooltogether/utilities'
import { useIsWalletMetamask } from '@pooltogether/hooks'

import { SquareButton } from 'src/components/Buttons/SquareButton'

interface ModalNetworkGateProps {
  wallet: object
  chainId: number
  className?: string
  onSuccess?: () => void
}

export const ModalNetworkGate = (props: ModalNetworkGateProps) => {
  const { className, chainId } = props

  const { t } = useTranslation()

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
  chainId: number
  wallet: object
  onSuccess?: () => void
}

const NetworkSwitchButton = (props: NetworkSwitchButtonProps) => {
  const { chainId, onSuccess, wallet } = props

  const { t } = useTranslation()

  const addNetwork = useAddNetworkToMetamask(chainId, { onSuccess })
  const networkName = getNetworkNiceNameByChainId(chainId)

  const isWalletMetamask = useIsWalletMetamask(wallet)

  if (!isWalletMetamask) {
    return null
  }

  return (
    <SquareButton onClick={addNetwork}>
      {t('switchToNetworkName', 'Switch to {{networkName}}', { networkName })}
    </SquareButton>
  )
}
