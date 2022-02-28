import React from 'react'
import classnames from 'classnames'

import { ProfileAvatar } from './ProfileAvatar'
import { ProfileName } from './ProfileName'

export function AccountButton(props) {
  const { openModal, className, usersAddress } = props

  return (
    <button
      onClick={openModal}
      className={classnames(
        'transition text-pt-teal px-2 xs:px-4 hover:text-inverse',
        'text-xs font-bold tracking-wider outline-none focus:outline-none active:outline-none',
        'flex justify-center z-20 h-8',
        className
      )}
    >
      <ProfileAvatar usersAddress={usersAddress} className='mr-2' />
      <span className='my-auto'>
        <ProfileName usersAddress={usersAddress} />
      </span>
    </button>
  )
}
