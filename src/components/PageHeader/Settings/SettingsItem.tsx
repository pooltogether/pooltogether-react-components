import React from 'react'
import { Tooltip } from '../../Containers/Tooltip'

export const SettingsItem = (props) => (
  <div className='pt-4 sm:pt-2'>
    <div className='flex items-center justify-between px-4 xs:px-0'>
      <div>
        <span className='flex text-accent-1 font-bold text-xxs'>
          <span className='uppercase'>{props.label}</span>
          {props.tip && <Tooltip className='ml-1 my-auto' tip={props.tip} id={props.label} />}
        </span>
      </div>

      <div>{props.children}</div>
    </div>

    <div className='pb-4 sm:pb-2 border-b border-purple opacity-10'></div>
  </div>
)
