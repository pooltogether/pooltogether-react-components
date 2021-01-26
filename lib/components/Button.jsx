import React from 'react'
import omit from 'lodash'

import { getButtonClasses } from './ButtonLink.jsx'

export function Button(props) {
  const classes = getButtonClasses(props)

  let newProps = omit(props, [
    'border',
    'bold',
    'text',
    'bg',
    'hoverBorder',
    'hoverText',
    'hoverBg',
    'noAnim',
    'outline',
    'secondary',
    'textSize',
  ])

  return <button
    {...newProps}
    className={classes}
  >
    {props.children}
  </button>
}

// textSize = 'xxxs'
// padding = 'px-4 py-1'
// disabled = { txPending || refetching || !claimable}
// className = 'w-full'
// onClick = { handleClaim }