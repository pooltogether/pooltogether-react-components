import React from 'react'
import { useTranslation } from 'react-i18next'
import { BlockExplorerLink } from './Links/BlockExplorerLink'

export const LinkToContractItem = (props: {
  chainId: number
  i18nKey: string
  address: string
}) => {
  const { chainId, i18nKey, address } = props
  const { t } = useTranslation()
  return (
    <li className='w-full flex justify-between'>
      <span className='font-bold'>{t(i18nKey)}</span>
      <BlockExplorerLink shorten chainId={chainId} address={address} />
    </li>
  )
}
