import React from 'react'

import { MOCK_POOL } from 'lib/constants'
import { PageTitleAndBreadcrumbs } from 'lib/components/PageTitleAndBreadcrumbs'

const Link = (props) => {
  return <>{props.children}</>
}

export const BasicPageContent = (props) => (
  <div className='flex justify-between items-center sm:w-9/12 lg:w-7/12'>
    <PageTitleAndBreadcrumbs
      showPrizeFrequencyChip
      Link={Link}
      title={'DAI Pool'}
      pool={MOCK_POOL}
      breadcrumbs={[
        {
          href: '/',
          as: '/',
          name: 'Pools'
        },
        {
          href: '/pools/[networkName]',
          as: `/pools/`,
          name: 'Ethereum'
        },
        {
          name: 'DAI Pool'
        }
      ]}
    />
  </div>
)
