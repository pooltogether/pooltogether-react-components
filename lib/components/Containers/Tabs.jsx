import React from 'react'
import classnames from 'classnames'

export const Tabs = ({ children, className }) => {
  return <nav className={classnames('flex', className)}>{children}</nav>
}

export const Tab = (props) => {
  const { isSelected, onClick, children, className, textClassName } = props
  return (
    <a
      onClick={onClick}
      className={classnames(
        className,
        textClassName,
        'cursor-pointer capitalize leading-none trans tracking-wider outline-none focus:outline-none active:outline-none font-bold border-b-4 pb-2',
        {
          'text-accent-3 hover:text-inverse-1 border-transparent hover:border-accent-1':
            !isSelected,
          'text-inverse border-highlight-1 hover:border-accent-1': isSelected
        }
      )}
    >
      {children}
    </a>
  )
}

Tab.defaultProps = {
  className: '',
  textClassName: 'text-sm xs:text-lg lg:text-xl'
}

export const Content = ({ children, className }) => {
  return <div className={classnames(className, 'py-2 flex')}>{children}</div>
}

export const ContentPane = ({ children, isSelected, alwaysPresent }) => {
  let hiddenClassName = 'hidden'
  let visibleClassName = 'flex-1'

  if (alwaysPresent) {
    hiddenClassName = 'pointer-events-none opacity-0 w-0 flex-shrink'
  }

  return (
    <div
      className={classnames({
        [hiddenClassName]: !isSelected,
        [visibleClassName]: isSelected
      })}
    >
      {children}
    </div>
  )
}
