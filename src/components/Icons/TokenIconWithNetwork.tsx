import React from 'react'
import { NetworkIcon } from './NetworkIcon'
import { TokenIcon } from './TokenIcon'

export const TokenIconWithNetwork: React.FC<{
  chainId: number
  address: string
  sizeClassName?: string
  className?: string
  networkSizeClassName?: string
  networkClassName?: string
  style?: object
  onClick?: React.MouseEventHandler<HTMLImageElement>
}> = (props) => {
  const { networkClassName, networkSizeClassName, ...tokenIconProps } = props
  return (
    <div className='relative'>
      <TokenIcon {...tokenIconProps} />
      <NetworkIcon
        chainId={props.chainId}
        className={networkClassName}
        sizeClassName={networkSizeClassName}
      />
    </div>
  )
}

TokenIconWithNetwork.defaultProps = {
  networkSizeClassName: 'w-3 h-3',
  networkClassName: 'absolute top-0 -right-1'
}
