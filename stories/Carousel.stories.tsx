import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Carousel } from '../src/components/Containers/Carousel'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Carousel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Carousel>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />

export const BasicExample = Template.bind({})
BasicExample.args = {
  children: [<div>Hey, this is page 1</div>, <div>Hello, this is page 2</div>],
  label: 'Basic example'
}
