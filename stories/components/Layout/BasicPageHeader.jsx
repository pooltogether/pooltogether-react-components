import React from 'react'

import { PageHeaderContainer } from 'lib/components/PageHeader'

const Link = (props) => {
  return <>{props.children}</>
}

export const BasicPageHeader = (props) => (
  <PageHeaderContainer Link={Link} as='/' href='/'>
    {/* <UsersAccount />
    <Settings /> */}
  </PageHeaderContainer>
)
