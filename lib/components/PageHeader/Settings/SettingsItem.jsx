import React from 'react'

export const SettingsItem = (props) => (
  <div className='mt-10'>
    <label className='uppercase text-accent-1 font-bold text-xxs mb-4 mr-2'>{props.label}</label>
    {props.children}
  </div>
)
