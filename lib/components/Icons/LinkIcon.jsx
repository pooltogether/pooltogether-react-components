import React from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'

export const LinkIcon = (props) => {
  const { className, ...remainingProps } = props
  return (
    <FeatherIcon
      {...remainingProps}
      icon='external-link'
      className={classnames('ml-1 my-auto inline-block', className)}
    />
  )
}
