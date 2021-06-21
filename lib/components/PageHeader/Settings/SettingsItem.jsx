import React from 'react'
import classnames from 'classnames'

export const SettingsItem = (props) => (
  <div className='mt-10'>
    <label
      className={classnames('uppercase text-accent-1 font-bold text-xxs', {
        'mb-4': !Boolean(props.description)
      })}
    >
      {props.label}
    </label>
    {props.description && (
      <p className='text-inverse font-bold text-xxs mb-4'>{props.description}</p>
    )}
    {props.children}
  </div>
)
