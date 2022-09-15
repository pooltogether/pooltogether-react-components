import React, { useState } from 'react'
import classNames from 'classnames'
import { useOnScroll } from '../../hooks/useOnScroll'

export const NavigationContainer: React.FC<{ children: React.ReactNode; className?: string }> = (
  props
) => {
  const { children, className } = props

  const [positionClassName, setPositionClassName] = useState('transform translate-y-0')
  useOnScroll({
    onScrollTop: () => setPositionClassName('transform translate-y-0'),
    onScrollDown: () => setPositionClassName('transform translate-y-0'),
    onScrollUp: () => setPositionClassName('transform translate-y-14 xs:translate-y-0')
  })

  return (
    <div
      className={classNames(
        className,
        'z-3',
        'flex flex-row justify-center',
        'pointer-events-none',
        'transition fixed bottom-0 top-auto xs:bottom-auto xs:top-1 sm:top-2 inset-x-0 xs:left-12 xs:right-auto sm:inset-x-0',
        positionClassName
      )}
    >
      <nav
        className={classNames(
          className,
          'flex flex-row justify-center space-x-4 w-full xs:w-auto pointer-events-auto pt-2 pb-8 px-5',
          'dark:bg-actually-black bg-opacity-10 bg-white dark:bg-opacity-10 xs:bg-opacity-0 xs:dark:bg-opacity-0 shadow-lg xs:shadow-none rounded-t-xl p-1 backdrop-filter backdrop-blur-xl xs:backdrop-blur-none'
        )}
      >
        {children}
      </nav>
    </div>
  )
}
