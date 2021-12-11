import React from 'react'

import { ProfileName } from 'src/components/PageHeader/Account/ProfileName'

export default {
  component: ProfileName,
  argTypes: {}
}

const Template = (args) => <ProfileName {...args} />

export const PrimaryProfileName = Template.bind({})
PrimaryProfileName.args = {
  children: '',
  usersAddress: '0x5E6CC2397EcB33e6041C15360E17c777555A5E63',
  className: 'text-inverse'
}
