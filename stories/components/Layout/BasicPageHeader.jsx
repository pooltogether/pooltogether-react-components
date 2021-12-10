import React from 'react'

import { PageHeaderContainer } from 'src/components/PageHeader/PageHeaderContainer'

const Link = (props) => {
  return <>{props.children}</>
}

export const BasicPageHeader = (props) => (
  <PageHeaderContainer Link={Link} as='/' href='/'>
    {/* <UsersAccount />
    <Settings /> */}
  </PageHeaderContainer>
)
