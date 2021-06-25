import React from 'react'

import { SideNavContainer } from 'lib/components/Navigation'

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
      <BasicSideNav />
    </>
  )
}
