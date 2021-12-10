import React from 'react'

import { Button } from 'src/components/Buttons/Button'

export default {
  title: 'General/Button',
  component: Button,
  argTypes: {}
}

const Template = (args) => <Button {...args} />

export const PrimaryButton = Template.bind({})
PrimaryButton.args = {
  children: 'Primary Btn'
}

export const SecondaryButton = Template.bind({ secondary: true })
SecondaryButton.args = {
  children: 'Secondary Btn',
  secondary: true
}

export const TertiaryButton = Template.bind({ tertiary: true })
TertiaryButton.args = {
  children: 'Tertiary Btn',
  tertiary: true
}

export const InverseButton = Template.bind({ inverse: true })
InverseButton.args = {
  children: 'Inverse Btn',
  inverse: true
}
