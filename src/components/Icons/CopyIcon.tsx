import React, { useState } from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import CopyToClipboard from 'react-copy-to-clipboard'

export const CopyIcon = (props) => {
  const { text, className } = props

  const [copied, setCopied] = useState(false)

  return (
    <CopyToClipboard text={text} onCopy={setCopied(true)}>
      {copied ? (
        <>Copied!</>
      ) : (
        <FeatherIcon
          icon='copy'
          className={classnames(
            'em-1 my-auto inline-block trans cursor-pointer hover:opacity-70',
            className
          )}
        />
      )}
    </CopyToClipboard>
  )
}
