import React from 'react'
import { shorten } from '@pooltogether/utilities'
import { useEnsName } from '@pooltogether/hooks'

export function ProfileName(props) {
  const { usersAddress } = props
  const { data: ensName } = useEnsName(usersAddress)
  const name = ensName || shorten({ hash: usersAddress, short: true })
  return <>{name}</>
}

ProfileName.defaultProps = {
  ensName: '',
  usersAddress: '',
  className: ''
}
