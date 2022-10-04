import React from 'react'
import { SettingsItem } from './SettingsItem'
import { CheckboxInputGroup } from '../../Input/CheckboxInputGroup'
import { useIsTestnets } from '../../../hooks/useIsTestnets'

export const TestnetSettingsItem = (props) => {
  const { t } = props

  return (
    <SettingsItem label={t('developmentMode', 'Development mode')}>
      <Toggle label={t?.('useTestnets', 'Use testnets') || 'Use testnets'} />
    </SettingsItem>
  )
}

const Toggle = (props) => {
  const { isTestnets, enableTestnets, disableTestnets } = useIsTestnets()

  return (
    <CheckboxInputGroup
      large
      id='testnets-view-toggle'
      name='testnets-view-toggle'
      label={props.label}
      checked={isTestnets}
      className='font-bold'
      marginClasses='mt-0 mb-0 sm:mb-0'
      handleClick={() => {
        if (isTestnets) {
          disableTestnets()
        } else {
          enableTestnets()
        }
        // after updating the cookie reload the page or else the app crashes
        window.location.reload()
      }}
    />
  )
}
