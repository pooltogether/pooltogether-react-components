import React, { useState } from 'react'
import { useOnboard } from '@pooltogether/hooks'

import { HeaderLogo } from './HeaderLogo/index'
// import { NetworkText } from "lib/components/NetworkText";
// import { NavPoolBalance } from "lib/components/NavPoolBalance";
// import { PendingTxButton } from "lib/components/PendingTxButton";
// import { NavAccount } from "lib/components/NavAccount";
// import { LanguagePicker } from "lib/components/LanguagePicker";
// import { Settings } from "lib/components/Settings";

/**
 * TODO: Migrate remaining components
 * @returns
 */
export const PageHeaderContainer = (props) => (
  <div className='flex justify-between items-center mx-auto max-w-screen-lg px-4 sm:px-8 py-4 sm:pb-6 sm:pt-5'>
    <HeaderLogo />
    <div className='flex flex-row justify-end'>{props.children}</div>
  </div>
)

{
  /* {usersAddress && <NetworkText openTransactions={openTransactions} />} */
}
{
  /* <NavPoolBalance /> */
}
{
  /* <PendingTxButton openTransactions={openTransactions} /> */
}
{
  /* {usersAddress && (
      <NavAccount
        openTransactions={openTransactions}
        closeTransactions={closeTransactions}
        showTransactionsDialog={showTransactionsDialog}
      />
    )} */
}
{
  /* {!usersAddress && (
      <button
        onClick={(e) => {
          e.preventDefault()
          connectWallet(() => {})
        }}
        className='text-highlight-2 font-bold hover:text-inverse text-xs trans trans-fastest tracking-wider outline-none focus:outline-none active:outline-none z-20 h-8 mb-1 sm:mb-0 mr-2 sm:mr-1'
      >
        <div className='flex items-center bg-default hover:bg-body rounded-full border border-highlight-2 px-4 trans trans-fastest z-20 h-8'>
          {t('connectWallet')}
        </div>
      </button>
    )} */
}

{
  /* <LanguagePicker />
<Settings /> */
}
