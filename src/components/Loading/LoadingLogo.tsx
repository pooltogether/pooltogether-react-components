import React from 'react'
import classnames from 'classnames'

import { LoadingDots } from './LoadingDots'

import LogoDark from '../../assets/PoolTogetherLogos/pooltogether-p.svg'
import Logo from '../../assets/PoolTogetherLogos/pooltogether-p-purple.svg'

export function LoadingLogo(props) {
  return (
    <div className={classnames('flex flex-col', props.className)} style={{ width: 'min-content' }}>
      <div className='relative'>
        <img src={Logo} className='block dark:hidden w-8 mx-auto' style={{ borderWidth: 0 }} />
        <img src={LogoDark} className='hidden dark:block w-8 mx-auto' style={{ borderWidth: 0 }} />
      </div>
      <LoadingDots />
    </div>
  )
}
