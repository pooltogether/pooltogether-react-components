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

`yarn add @pooltogether/pooltogether-react-components`

## Usage:

```js
// tailwind.config.js
const pooltogetherTheme = require("@pooltogether/pooltogether-react-components");
module.exports = pooltogetherTheme({
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
});
```

```js
// _app.jsx
import "@pooltogether/pooltogether-react-components/dist/index.css";
```

```js
import React from "react";
import { Button } from "@pooltogether/pooltogether-react-components";

<Button type="submit">Submit</Button>;

// -------------------

import React from "react";
import Link from "next/link";
import { ButtonLink } from "@pooltogether/pooltogether-react-components";

<Link href={href} as={as} scroll={false}>
  <Button type="submit">Submit</Button>
</Link>;
```

## Running Locally:

Due to an issue with hooks when using multiple copies of react you will need to link your local library's
react and react-dom packages to the project's react and react-dom `node_modules` directories.

In the project directory:

`cd node_modules/react && yarn link && cd ../react-dom && yarn link && cd ../..`

In the library:

`yarn link react && yarn link react-dom`

- You can run `yarn link` inside **pooltogether-react-components** and then `yarn link @pooltogether/pooltogether-react-components` inside a project you have created to test the components locally.

- You can run `yarn start` to start **pooltogether-react-components** in watch mode and it will compile any new components you add.

- `yarn test` will run jest

# TODO:

- integrate prettier/husky with our default prettier config
- figure out if Link needs to be dependency injected through props for <PageTitleAndBreadcrumbs /> :(
- copy unit tests over and get them running in this lib
- figure out how to integrate <PoolCurrencyIcon />
