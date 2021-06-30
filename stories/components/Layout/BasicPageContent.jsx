import React from 'react'

import { PageTitleAndBreadcrumbs } from 'lib/components/PageTitleAndBreadcrumbs'

const Link = (props) => {
  return <>{props.children}</>
}

export const BasicPageContent = (props) => (
  <>
    <PageTitleAndBreadcrumbs
      Link={Link}
      title={'Account'}
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
  </>
)
