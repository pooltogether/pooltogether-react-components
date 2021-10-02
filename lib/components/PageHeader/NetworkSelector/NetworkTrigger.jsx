import React from 'react'
import classnames from 'classnames'
import { ScreenSize, useScreenSize } from '@pooltogether/hooks'
import { getNetworkNiceNameByChainId } from '@pooltogether/utilities'

import { networkTextColorClassname } from '../../../utils/networkColorClassnames'
import { NetworkIcon } from '../../Icons/NetworkIcon'

export const NetworkTrigger = (props) => {
  const { openModal, className, chainId } = props
  const screenSize = useScreenSize()

  const networkName = getNetworkNiceNameByChainId(chainId)

  if (screenSize <= ScreenSize.sm) {
    return (
      <NetworkIcon
        onClick={openModal}
        className={className}
        sizeClassName='h-6 w-6'
        chainId={chainId}
      />
    )
  }

  return (
    <button
      onClick={openModal}
      className={classnames(
        'transition tracking-wide flex items-center capitalize trans trans-fast font-bold',
        'bg-default hover:bg-pt-purple-bright hover:text-inverse',
        'text-xxs sm:text-xs sm:px-4 py-1 rounded-full',
        `text-${networkTextColorClassname(chainId)}`,
        className
      )}
    >
      <NetworkIcon className='' sizeClassName='h-6 w-6 mr-2' chainId={chainId} />
      <span className='capitalize hidden sm:block'>{networkName}</span>
    </button>
  )
}
