import React from 'react'

import { DefaultLayout } from 'lib/components/Layout/PageLayout'

// import { BottomNav } from 'lib/components/Layout/BottomNav'
// import { Footer } from 'lib/components/Layout/Footer'
// import { PageHeader } from 'lib/components/Layout/PageHeader'
import { BasicSideNav } from 'stories/components/BasicSideNav'

export default {
  title: 'General/DefaultLayout',
  component: DefaultLayout,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

const Template = (args) => <DefaultLayout {...args} />

// banner={null}
//     header={<PageHeader />}
//     content={props.children}
//     sideNav={<SideNav />}
//     bottomNav={<BottomNav />}
//     footer={<Footer />}

export const Main = Template.bind({})
Main.args = {
  banner: null,
  header: <div>header</div>,
  content: 'children',
  sideNav: <BasicSideNav />,
  bottomNav: null,
  footer: null,
  // primary: true,
  // label: 'DefaultLayout',
  children: <></>
}
