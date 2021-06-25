import React from 'react'

import { DefaultLayout } from 'lib/components/Layout/PageLayout'

// import { BottomNav } from 'stories/components/Layout/BottomNav'
// import { Footer } from 'stories/components/Layout/Footer'
import { BasicPageHeader } from 'stories/components/Layout/BasicPageHeader'
import { BasicSideNav } from 'stories/components/Layout/BasicSideNav'
import { BasicBottomNav } from 'stories/components/Layout/BasicBottomNav'

export default {
  title: 'General/DefaultLayout',
  component: DefaultLayout,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

const Template = (args) => <DefaultLayout {...args} />

// banner={null}
//     content={props.children}
//     bottomNav={<BottomNav />}
//     footer={<Footer />}

export const Main = Template.bind({})
Main.args = {
  banner: null,
  header: <BasicPageHeader />,
  content: 'children',
  sideNav: <BasicSideNav />,
  bottomNav: <BasicBottomNav />,
  footer: null,
  // primary: true,
  // label: 'DefaultLayout',
  children: <></>
}
