import React from 'react'

import { ProfileAvatar } from 'src/components/PageHeader/Account/ProfileAvatar'

export default {
  title: 'PageHeader/ProfileAvatar',
  component: ProfileAvatar,
  argTypes: {}
}

const Template = (args) => <ProfileAvatar {...args} />

export const PrimaryProfileAvatar = Template.bind({})
PrimaryProfileAvatar.args = {
  children: '',
  usersAddress: '0x5E6CC2397EcB33e6041C15360E17c777555A5E63'
}
