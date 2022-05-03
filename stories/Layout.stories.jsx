import React from 'react'

import { DefaultLayout } from 'src/components/Layout/PageLayout'

import { BasicPageHeader } from 'stories/components/Layout/BasicPageHeader'
import { BasicPageContent } from 'stories/components/Layout/BasicPageContent'

export default {
  component: DefaultLayout,
  argTypes: {}
}

const Template = (args) => <DefaultLayout {...args} />

export const Main = Template.bind({})
Main.args = {
  banner: null,
  header: <BasicPageHeader />,
  content: <BasicPageContent />,
  footer: null
}
