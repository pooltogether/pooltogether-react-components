import React from 'react'
import classnames from 'classnames'
import { useAtom } from 'jotai'
import { transactionsAtom, useEnsName } from '@pooltogether/hooks'

import { ProfileAvatar } from './ProfileAvatar'
import { ProfileName } from './ProfileName'
import { ThemedClipSpinner } from '../../Loading/ThemedClipSpinner'

export function AccountButton (props) {
  const { openModal, className, t, usersAddress } = props

  const [transactions] = useAtom(transactionsAtom)
  const pendingTransactionsCount = transactions.filter((t) => !t.completed).length

  const ensName = useEnsName(usersAddress)

  return (
    <button
      onClick={openModal}
      className={classnames(
        'transition text-highlight-2 bg-default rounded-full px-2 xs:px-4 hover:bg-pt-purple-bright hover:text-inverse',
        'trans trans-fastest text-xs font-bold tracking-wider outline-none focus:outline-none active:outline-none',
        'flex justify-center trans trans-fastest z-20 h-8',

        className
      )}
      style={{ minWidth: '134px' }}
    >
      {pendingTransactionsCount ? (
        <>
          <div className='inline-flex flex-col justify-center mr-2 my-auto'>
            <ThemedClipSpinner size='16px' />
          </div>
          <span className='my-auto'>
            {t?.('pendingTransactionsCount', { count: pendingTransactionsCount }) ||
              `${pendingTransactionsCount} pending`}
          </span>
        </>
      ) : (
        <>
          <ProfileAvatar usersAddress={usersAddress} className='mr-2' />
          <span className='my-auto'>
            <ProfileName ensName={ensName} usersAddress={usersAddress} />
          </span>
        </>
      )}
    </button>
  )
}
