# PoolTogether React Tailwind UI Components

React UI components using **tailwindcss**

## Components:

Component Groups
- [Buttons](https://github.com/pooltogether/pooltogether-react-components/tree/main/src/components/Buttons)
- [Containers](https://github.com/pooltogether/pooltogether-react-components/tree/main/src/components/Containers)
- [Icons](https://github.com/pooltogether/pooltogether-react-components/tree/main/src/components/Icons)
- [Input](https://github.com/pooltogether/pooltogether-react-components/tree/main/src/components/Input)
- [Layout](https://github.com/pooltogether/pooltogether-react-components/tree/main/src/components/Layout)
- [Links](https://github.com/pooltogether/pooltogether-react-components/tree/main/src/components/Links)
- [Loading](https://github.com/pooltogether/pooltogether-react-components/tree/main/src/components/Loading)
- [Modal](https://github.com/pooltogether/pooltogether-react-components/tree/main/src/components/Modal)
- [Navigation](https://github.com/pooltogether/pooltogether-react-components/tree/main/src/components/Navigation)
- [PageHeader](https://github.com/pooltogether/pooltogether-react-components/tree/main/src/components/PageHeader)

Top level components
- [PageTitleAndBreadcrumbs](https://github.com/pooltogether/pooltogether-react-components/tree/main/src/components/PageTitleAndBreadcrumbs.jsx)
- [PoolCurrencyIcon](https://github.com/pooltogether/pooltogether-react-components/tree/main/src/components/PoolCurrencyIcon.jsx)
- [ThemeContextProvider](https://github.com/pooltogether/pooltogether-react-components/tree/main/src/components/ThemeContextProvider.jsx)

## Installation:

`yarn add @pooltogether/pooltogether-react-components`

## Usage

Required:

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

Wrap your app in `ThemeContextProvider`
```js
// _app.jsx
import { ThemeContextProvider } from '@pooltogether/react-components'
import '@pooltogether/react-components/dist/globals.css'
```

Now you can use any components you want:

```js
import React from "react";
import { SquareButton } from "@pooltogether/pooltogether-react-components";

<SquareButton type="submit">Submit</SquareButton>;

// -------------------

import React from "react";
import Link from "next/link";
import { ButtonLink } from "@pooltogether/pooltogether-react-components";

// External links
<ButtonLink href={href}>View</ButtonLink>
// Internal links
<Link as={'/home'} href={'/home'}><ButtonLink>Home</ButtonLink></Link>
```

## Local development (yalc)

In `pooltogether-react-components`:
`yalc publish`

In the app you're importing `pooltogether-react-components`:
`yalc add @pooltogether/react-components`


## Local development (yarn)

TODO: Make this better...

In `pooltogether-react-components`:
`yarn link`

In the app you're importing `pooltogether-react-components`:
`yarn link-components`

In `pooltogether-react-components`:
`yarn link-local`
`yarn start`

In the app you're importing `pooltogether-react-components`:
`yarn dev`

And your app will hot reload when changes are detected in the components folder!

## Testing

- `yarn test` will run jest

# TODO:

- integrate prettier/husky with our default prettier config
- copy unit tests over and get them running in this lib
