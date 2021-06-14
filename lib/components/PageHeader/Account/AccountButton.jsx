import React, { useState } from 'react'
import classnames from 'classnames'
import { useAtom } from 'jotai'

import { ProfileAvatar } from './ProfileAvatar'
import { ProfileName } from './ProfileName'
import { transactionsAtom } from '../../TransactionStatusChecker'
import { ThemedClipSpinner } from '../../Loading/ThemedClipSpinner'

export function AccountButton(props) {
  const { openModal, className, t } = props

  const [transactions] = useAtom(transactionsAtom)
  const pendingTransactionsCount = transactions.filter((t) => !t.completed).length

  return (
    <button
      onClick={openModal}
      className={classnames(
        'text-highlight-2 font-bold hover:text-inverse text-xs trans trans-fastest tracking-wider outline-none focus:outline-none active:outline-none z-20 h-8',
        className
      )}
    >
      <div
        className={classnames(
          'flex justify-center bg-default hover:bg-body rounded-full border border-highlight-2 px-2 xs:px-4 trans trans-fastest z-20 h-8'
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
            <ProfileAvatar className='mr-2' />
            <span className='my-auto'>
              <ProfileName />
            </span>
          </>
        )}
      </div>
    </button>
  )
}
