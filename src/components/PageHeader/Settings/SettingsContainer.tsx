import React, { useState } from 'react'
import FeatherIcon from 'feather-icons-react'
import classnames from 'classnames'
import { Modal } from '../../Modal/Modal'
import classNames from 'classnames'

export const SettingsIcon: React.FC<{
  className?: string
  colorClassName?: string
  sizeClassName?: string
}> = (props) => {
  return (
    <FeatherIcon
      icon='menu'
      className={classNames(props.className, props.colorClassName, props.sizeClassName)}
    />
  )
}

SettingsIcon.defaultProps = {
  colorClassName: 'text-gradient-magenta',
  sizeClassName: 'h-6 w-6'
}

/**
 * TODO: Make settings extendible for all apps
 * @param {*} props
 * @returns
 */
export function SettingsContainer(props: {
  t?: (key: string, text?: string) => string
  className?: string
  sizeClassName?: string
  children?: React.ReactNode
}) {
  const { t, className, sizeClassName } = props
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        onClick={toggleOpen}
        className={classnames(
          'toggle-settings-button hover:text-inverse trans',
          sizeClassName,
          className,
          {
            'text-highlight-2': !isOpen,
            'text-highlight-1': isOpen
          }
        )}
      >
        <SettingsIcon />
      </button>

      <Modal
        isOpen={isOpen}
        closeModal={() => toggleOpen()}
        label='settings modal'
        className='text-inverse'
      >
        <h6 className='text-lg mb-2 font-semibold ml-2 xs:ml-0'>{t('settings', 'Settings')}</h6>

        {props.children}
      </Modal>
    </>
  )
}

SettingsContainer.defaultProps = {
  sizeClassName: 'w-6 h-6',
  className: ''
}
