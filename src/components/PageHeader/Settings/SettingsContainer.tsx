import React, { useState } from 'react'
import classnames from 'classnames'
import { Modal } from '../../Modal/Modal'

export function SettingsIcon(props) {
  return (
    <svg
      {...props}
      width='100%'
      height='auto'
      viewBox='0 0 19 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='stroke-current'
    >
      <path strokeWidth={2} strokeLinecap='round' d='M1 1h13M1 7h17M1 13h11' />
    </svg>
  )
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
        paddingClassName='px-4 py-6 sm:px-6 sm:py-6'
        maxWidthClassName='max-w-4xl'
        className='text-inverse'
      >
        <h6 className='text-lg mb-2 font-semibold'>{t('settings', 'Settings')}</h6>

        {props.children}
      </Modal>
    </>
  )
}

SettingsContainer.defaultProps = {
  sizeClassName: 'w-6 h-6',
  className: ''
}
