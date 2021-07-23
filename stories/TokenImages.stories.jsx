import React from 'react'

import { TokenIcon } from 'lib/components/Icons/TokenIcon'

export default {
  title: 'General/TokenIcon',
  component: TokenIcon,
  argTypes: {}
}

const Template = (args) => <TokenIcon {...args} />

export const TestIcon = Template.bind({})
TextIcon.args = {
  address: '0xa92a861fc11b99b24296af880011b47f9cafb5ab',
  chainId: 1
}
