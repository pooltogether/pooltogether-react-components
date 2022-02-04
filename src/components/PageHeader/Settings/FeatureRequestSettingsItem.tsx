import React from 'react'

import { ExternalLink } from '../../Links/ExternalLink'
import { i18nTranslate } from '../../../types'
import { SettingsItem } from './SettingsItem'

interface FeatureRequestSettingsItemProps {
  t?: i18nTranslate
}

export const FeatureRequestSettingsItem = (props: FeatureRequestSettingsItemProps) => {
  const { t } = props

  return (
    <SettingsItem label={t?.('featureRequest') || 'Feature request'}>
      <ExternalLink className='font-bold' href='https://pooltogether.canny.io/feature-requests'>
        Canny
      </ExternalLink>
    </SettingsItem>
  )
}
