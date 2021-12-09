import React from 'react'

import { TokenIcon } from 'src/components/Icons/TokenIcon'

export default {
  title: 'General/TokenIcon',
  component: TokenIcon,
  argTypes: {}
}

const Template = (args) => <TokenIcon {...args} />

export const TestIcon = Template.bind({})
TestIcon.args = {
  address: '0xa92a861fc11b99b24296af880011b47f9cafb5ab',
  chainId: 1
}
