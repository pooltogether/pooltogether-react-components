# PoolTogether React Tailwind UI Components
React UI components using **tailwindcss**

## Components:
- Alert
- Breadcrumbs
- Button
- Card
- Dropdown
- Loader
- Modal
- Navbar
- Panel
- Select
- Table
- Tabs
- Text
- TextArea
- TextField

## Installation:

`yarn add @pooltogether/pooltogether-react-tailwind-ui`


## Usage:

<!-- - Make sure to import the css file `import '@pooltogether/pooltogether-react-tailwind-ui/dist/index.css'` -->

``` js
import React from 'react'
import { Button } from '@pooltogether/pooltogether-react-tailwind-ui'

const Button = () => (
  <Button
    color='blue'
    type='submit'
  >
    Submit
  </Button>
)

export default Button

```

## Running Locally:

Due to an issue with hooks when using multiple copies of react you will need to link your local library's
react and react-dom packages to the project's react and react-dom `node_modules` directories.

In the project directory:

`cd node_modules/react && yarn link && cd ../react-dom && yarn link && cd ../..`

In the library:

`yarn link react && yarn link react-dom`


- You can run `npm link` inside **pooltogether-react-tailwind-ui** and then `npm link @pooltogether/pooltogether-react-tailwind-ui` inside a project you have created to test the components locally.

- You can run `npm start` to start **pooltogether-react-tailwind-ui** in watch mode and it will compile any new components you add.

- `npm test` will run jest
