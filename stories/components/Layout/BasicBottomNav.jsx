import React from 'react'

import {
  BottomAccountIcon,
  BottomNavLink,
  BottomPoolsIcon,
  BottomVoteIcon,
  BottomRewardsIcon
} from 'src/components/Navigation/BottomNavLink'
import { BottomNavContainer } from 'src/components/Navigation/BottomNavContainer'
import { CountBadge } from 'src/components/Containers/CountBadge'

const useRouter = (props) => {
  return { pathname: '/' }
}

const Link = (props) => {
  return <>{props.children}</>
}

export const BasicBottomNav = (props) => {
  const router = useRouter()
  const { pathname } = router
  const isPoolView = !['/account', '/rewards'].includes(pathname)

  return (
    <BottomNavContainer>
      <BottomNavLink
        shallow
        href='/'
        as='/'
        label={'Pools'}
        Link={Link}
        useRouter={useRouter}
        isCurrentPage={isPoolView}
      >
        <BottomPoolsIcon />
      </BottomNavLink>
      <BottomNavLink
        shallow
        href='/account'
        as='/account'
        label={'Account'}
        Link={Link}
        useRouter={useRouter}
        match='/account'
      >
        <BottomAccountIcon />
      </BottomNavLink>
      <BottomNavLink
        shallow
        href='/rewards'
        as='/rewards'
        label={'Rewards'}
        Link={Link}
        useRouter={useRouter}
        match='/rewards'
      >
        <BottomRewardsIcon />
      </BottomNavLink>
      <BottomNavLink
        href='https://vote.pooltogether.com'
        as='https://vote.pooltogether.com'
        label={'Vote'}
        Link={Link}
        useRouter={useRouter}
        match='/vote'
      >
        <VoteIcon />
      </BottomNavLink>
    </BottomNavContainer>
  )
}

const VoteIcon = () => {
  const activeCount = 22

  return (
    <div className='relative'>
      {activeCount > 0 && (
        <CountBadge className='z-10 absolute -top-2 -right-2' count={activeCount} />
      )}
      <BottomVoteIcon />
    </div>
  )
}
