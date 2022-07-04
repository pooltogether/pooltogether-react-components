import React from 'react'

import { Button, ButtonTheme, ButtonSize, ButtonRadius } from 'src/components/Buttons/Button'

export default {
  component: Button,
  argTypes: {}
}

export const AllButtons = (args) => (
  <div className='m-4 pt-1 pb-20'>
    <ButtonGrouping label='Teal' />
    <ButtonGrouping label='Teal Round' radius={ButtonRadius.full} />
    <ButtonGrouping label='Teal Small Rounding' radius={ButtonRadius.small} />
    <ButtonGrouping label='Teal Outline' theme={ButtonTheme.tealOutline} />
    <ButtonGrouping label='Inverse' theme={ButtonTheme.inverse} />
    <ButtonGrouping label='Pink' theme={ButtonTheme.pink} />
    <ButtonGrouping label='Purple' theme={ButtonTheme.purple} />
    <ButtonGrouping label='Purple Outline' theme={ButtonTheme.purpleOutline} />
    <ButtonGrouping label='Orange' theme={ButtonTheme.orange} />
    <ButtonGrouping label='Orange Outline' theme={ButtonTheme.orangeOutline} />
    <ButtonGrouping label='Black' theme={ButtonTheme.black} />
    <ButtonGrouping label='Black Outline' theme={ButtonTheme.blackOutline} />
    <ButtonGrouping label='Rainbow' theme={ButtonTheme.rainbow} />
  </div>
)

const ButtonGrouping = (props) => {
  const { label, theme, radius } = props
  return (
    <div className='m-4 mb-8'>
      <h1 className='dark:text-white'>{label}</h1>
      <Button theme={theme} className='my-2' size={ButtonSize.lg} radius={radius}>
        lg
      </Button>
      <Button theme={theme} className='my-2' radius={radius}>
        md (default)
      </Button>
      <Button theme={theme} className='my-2' size={ButtonSize.sm} radius={radius}>
        sm
      </Button>
    </div>
  )
}

const Template = (args) => (
  <div className='m-4'>
    {' '}
    <Button {...args} />
  </div>
)

// export const TealButton = Template.bind({})
// TealButton.args = {
//   children: 'Click this button',
//   theme: ButtonTheme.teal
// }
