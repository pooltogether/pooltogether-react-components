import React from 'react'

import {
  SideNavLink,
  SidePoolsIcon,
  SideAccountIcon,
  SideRewardsIcon,
  SideVoteIcon
} from 'lib/components/Navigation/SideNavLink'

const useRouter = (props) => {
  return { pathname: '/' }
}

const Link = (props) => {
  return <>{props.children}</>
}

export const BasicSideNav = (props) => (
  <>
    <SideNavLink href='/' as='/' label={'Pools'} Link={Link} useRouter={useRouter} isCurrentPage>
      <SidePoolsIcon />
    </SideNavLink>
    <SideNavLink
      href='/account'
      as='/account'
      label={'Account'}
      Link={Link}
      useRouter={useRouter}
      match='/account'
    >
      <SideAccountIcon />
    </SideNavLink>
    <SideNavLink
      href='/rewards'
      as='/rewards'
      label={'Rewards'}
      Link={Link}
      useRouter={useRouter}
      match='/rewards'
    >
      <SideRewardsIcon />
    </SideNavLink>
    <SideNavLink
      href='https://vote.pooltogether.com'
      as='https://vote.pooltogether.com'
      label={'Vote'}
      Link={Link}
      useRouter={useRouter}
    >
      <SideVoteIcon />
    </SideNavLink>
  </>
)
