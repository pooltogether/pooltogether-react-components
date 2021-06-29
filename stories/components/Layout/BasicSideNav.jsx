import React from 'react'

import {
  SideNavLink,
  SidePoolsIcon,
  SideAccountIcon,
  SideRewardsIcon,
  SideVoteIcon
} from 'lib/components/Navigation/SideNavLink'
import {
  SocialsLinkChild,
  SocialsLinkParent,
  SocialsIcon
} from 'lib/components/Navigation/SocialsLink'
import { SideNavContainer } from 'lib/components/Navigation/SideNavContainer'

const useRouter = (props) => {
  return { pathname: '/' }
}

const Link = (props) => {
  return <>{props.children}</>
}

export const BasicSideNav = (props) => (
  <>
    <div className='flex flex-col justify-between h-full'>
      <SideNavContainer>
        <SideNavLink
          href='/'
          as='/'
          label={'Pools'}
          Link={Link}
          useRouter={useRouter}
          isCurrentPage
        >
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
      </SideNavContainer>

      <SideNavContainer className='mb-4'>
        <SocialsLinkChild
          href='/'
          as='/'
          label={'documentation'}
          Link={Link}
          useRouter={useRouter}
          isCurrentPage
        >
          <SocialsIcon />
        </SocialsLinkChild>
        <SocialsLinkChild
          href='https://gov.pooltogether.com'
          as='https://gov.pooltogether.com'
          label={'governance'}
          Link={Link}
        >
          <SocialsIcon />
        </SocialsLinkChild>
        <SocialsLinkParent label={'ecosystem'}>
          <SocialsIcon />
        </SocialsLinkParent>
      </SideNavContainer>
    </div>
  </>
)
