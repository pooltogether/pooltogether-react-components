import React from 'react'
import { APP_ENVIRONMENT, useAppEnv } from '@pooltogether/hooks'
import { SettingsItem } from './SettingsItem'
import { CheckboxInputGroup } from '../../Input/CheckboxInputGroup'

export const TestnetToggle = (props) => (
  <SettingsItem label={props.label}>
    <Toggle />
  </SettingsItem>
)

const Toggle = (props) => {
  const { appEnv, setAppEnv } = useAppEnv()

  return (
    <CheckboxInputGroup
      large
      id='testnets-view-toggle'
      name='testnets-view-toggle'
      label={props.label}
      checked={appEnv === APP_ENVIRONMENT.testnets}
      handleClick={() => {
        if (appEnv === APP_ENVIRONMENT.testnets) {
          setAppEnv(APP_ENVIRONMENT.mainnets)
        } else {
          setAppEnv(APP_ENVIRONMENT.testnets)
        }
      }}
    />
  )
}

TestnetToggle.defaultProps = {
  label: 'Development mode'
}

Toggle.defaultProps = {
  label: 'Use testnets'
}
