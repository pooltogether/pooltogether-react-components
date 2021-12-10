import React from 'react'

import { DefaultLayout } from 'src/components/Layout/PageLayout'

// import { BottomNav } from 'stories/components/Layout/BottomNav'
// import { Footer } from 'stories/components/Layout/Footer'
import { BasicPageHeader } from 'stories/components/Layout/BasicPageHeader'
import { BasicPageContent } from 'stories/components/Layout/BasicPageContent'
import { BasicSideNav } from 'stories/components/Layout/BasicSideNav'
import { BasicBottomNav } from 'stories/components/Layout/BasicBottomNav'

export default {
  title: 'General/DefaultLayout',
  component: DefaultLayout,
  argTypes: {}
}

const Template = (args) => <DefaultLayout {...args} />

export const Main = Template.bind({})
Main.args = {
  banner: null,
  header: <BasicPageHeader />,
  content: <BasicPageContent />,
  sideNav: <BasicSideNav />,
  bottomNav: <BasicBottomNav />,
  footer: null
}
