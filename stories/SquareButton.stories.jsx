import React from 'react'

import {
  SquareButton,
  SquareButtonTheme,
  SquareButtonSize
} from 'src/components/Buttons/SquareButton'

export default {
  component: SquareButton,
  argTypes: {}
}

export const AllButtons = (args) => (
  <div className='m-4 pt-1 pb-20'>
    <ButtonGrouping label='Teal' />
    <ButtonGrouping label='Teal Outline' theme={SquareButtonTheme.tealOutline} />
    <ButtonGrouping label='Purple' theme={SquareButtonTheme.purple} />
    <ButtonGrouping label='Purple Outline' theme={SquareButtonTheme.purpleOutline} />
    <ButtonGrouping label='Orange' theme={SquareButtonTheme.orange} />
    <ButtonGrouping label='Orange Outline' theme={SquareButtonTheme.orangeOutline} />
    <ButtonGrouping label='Black' theme={SquareButtonTheme.black} />
    <ButtonGrouping label='Black Outline' theme={SquareButtonTheme.blackOutline} />
    <ButtonGrouping label='Rainbow' theme={SquareButtonTheme.rainbow} />
  </div>
)

const ButtonGrouping = (props) => {
  const { label, theme } = props
  return (
    <div className='m-4 mb-8'>
      <h1 className='dark:text-white'>{label}</h1>
      <SquareButton theme={theme} className='my-2' size={SquareButtonSize.lg}>
        lg
      </SquareButton>
      <SquareButton theme={theme} className='my-2'>
        md (default)
      </SquareButton>
      <SquareButton theme={theme} className='my-2' size={SquareButtonSize.sm}>
        sm
      </SquareButton>
    </div>
  )
}

const Template = (args) => (
  <div className='m-4'>
    {' '}
    <SquareButton {...args} />
  </div>
)

// export const TealButton = Template.bind({})
// TealButton.args = {
//   children: 'Click this button',
//   theme: SquareButtonTheme.teal
// }
