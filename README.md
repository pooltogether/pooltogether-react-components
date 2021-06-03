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

## Local development

TODO: Make this better...

In pooltogether-react-components:
`yarn link`

In the app you're importing pooltogether-react-components:
`yarn link-components`

In pooltogether-react-components:
`yarn link-local`
`yarn start`

In the app you're importing pooltogether-react-components:
`yarn dev`

And your app will hot reload when changes are detected in the components folder!

## Testing

- `yarn test` will run jest

# TODO:

- integrate prettier/husky with our default prettier config
- figure out if Link needs to be dependency injected through props for <PageTitleAndBreadcrumbs /> :(
- copy unit tests over and get them running in this lib
- figure out how to integrate <PoolCurrencyIcon />
