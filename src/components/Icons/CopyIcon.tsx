import React from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { toast } from '../../services/toast'

export const CopyIcon = (props) => {
  const { t, text, className } = props

  const handleCopy = () => {
    toast.success(t?.('copiedToClipboard') || 'Copied to clipboard')
  }

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <FeatherIcon
        icon='copy'
        className={classnames(
          'em-1 my-auto inline-block trans cursor-pointer hover:opacity-70',
          className
        )}
      />
    </CopyToClipboard>
  )
}
