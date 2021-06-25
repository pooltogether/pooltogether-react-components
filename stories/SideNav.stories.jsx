import React from 'react'

import { SideNavContainer } from 'lib/components/Navigation'
import {
  SideNavLink,
  SidePoolsIcon,
  SideAccountIcon,
  SideRewardsIcon,
  SideVoteIcon
} from 'lib/components/Navigation/SideNavLink'

// Toasts 🍞
import 'react-toastify/dist/ReactToastify.css'

// Styles
// ONLY for Storybook. This is typically imported within the
// app and not @pooltogether/react-components:
// import './assets/globals.css'

// import 'lib/styles/index.css'

// import 'lib/styles/utils.css'
// import 'lib/styles/toast-blur.css'
// import 'lib/styles/layout.css'
// import 'lib/styles/loader.css'
// import 'lib/styles/themes.css'

// import 'lib/styles/typography.css'
// import 'lib/styles/tables.css'
// import 'lib/styles/pool.css'
// import 'lib/styles/pool-toast.css'
// import 'lib/styles/animations.css'
// import 'lib/styles/transitions.css'

// import 'lib/styles/interactable-cards.css'
// import 'lib/styles/forms.css'
// import 'lib/styles/tabs.css'
// import 'lib/styles/tickets.css'

// import 'lib/styles/bnc-onboard--custom.css'
// import 'lib/styles/reach--custom.css'
// import 'lib/styles/vx--custom.css'

const useRouter = (props) => {
  return { pathname: '/' }
}

const Link = (props) => {
  return <>{props.children}</>
}

export default {
  title: 'General/SideNavContainer',
  component: SideNavContainer,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

const Template = (args) => <SideNavContainer {...args} />

export const SideNav = Template.bind({})
SideNav.args = {
  // primary: true,
  // label: 'SideNavContainer',
  children: (
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
}
