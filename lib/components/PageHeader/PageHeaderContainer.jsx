import React, { useState } from 'react'
import { useOnboard } from '@pooltogether/hooks'

import { HeaderLogo } from './HeaderLogo'
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
export const PageHeaderContainer = (props) => {
  const { Link, as, href } = props
  return (
    <div className='flex justify-between items-center mx-auto max-w-screen-lg px-4 sm:px-8 py-4 sm:pb-6 sm:pt-5'>
      <Link as={as} href={href}>
        <a>
          <HeaderLogo />
        </a>
      </Link>
      <div className='flex flex-row justify-end'>{props.children}</div>
    </div>
  )
}
