# PoolTogether React Tailwind UI Components

React UI components using **tailwindcss**

## Components:

Component Groups
- [Buttons](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/Buttons)
- [Containers](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/Containers)
- [Icons](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/Icons)
- [Input](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/Input)
- [Layout](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/Layout)
- [Links](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/Links)
- [Loading](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/Loading)
- [Modal](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/Modal)
- [Navigation](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/Navigation)
- [PageHeader](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/PageHeader)

Top level components
- [TransactionStatusChecker](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/TransactionStatusChecker)
- [PageTitleAndBreadcrumbs](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/PageTitleAndBreadcrumbs.jsx)
- [PoolCurrencyIcon](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/PoolCurrencyIcon.jsx)
- [ThemeContextProvider](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/ThemeContextProvider.jsx)
- [TxStatus](https://github.com/pooltogether/pooltogether-react-components/tree/main/lib/components/TxStatus.jsx)


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

```js
// _app.jsx
import "@pooltogether/pooltogether-react-components/dist/index.css";
```

Now you can use any components you want:

```js
import React from "react";
import { Button } from "@pooltogether/pooltogether-react-components";

<Button type="submit">Submit</Button>;

// -------------------

import React from "react";
import Link from "next/link";
import { ButtonLink } from "@pooltogether/pooltogether-react-components";

<ButtonLink Link={Link} href={href} as={as}>View</Button>
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
