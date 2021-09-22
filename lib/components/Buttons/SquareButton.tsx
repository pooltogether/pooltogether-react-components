import classNames from 'classnames'
import React from 'react'
import './SquareButton.css'

export enum SquareButtonTheme {
  teal = 'teal',
  tealOutline = 'tealOutline',
  purple = 'purple',
  purpleOutline = 'purpleOutline',
  orange = 'orange',
  orangeOutline = 'orangeOutline'
}

export enum SquareButtonSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg'
}

interface SquareButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  theme?: SquareButtonTheme
  size?: SquareButtonSize
}

export const SquareButton: React.FC<SquareButtonProps> = (props) => {
  const { theme, size, className, ...buttonProps } = props

  return (
    <button
      className={classNames(
        'square-btn',
        getThemeClassName(theme),
        getSizeClassName(size),
        className
      )}
      {...buttonProps}
    />
  )
}

SquareButton.defaultProps = {
  theme: SquareButtonTheme.teal,
  size: SquareButtonSize.md
}

interface SquareLinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  theme?: SquareButtonTheme
  size?: SquareButtonSize
}

export const SquareLink: React.FC<SquareLinkProps> = (props) => {
  const { theme, size, className, ...buttonProps } = props

  return (
    <a
      className={classNames(
        'square-btn',
        getThemeClassName(theme),
        getSizeClassName(size),
        className
      )}
      {...buttonProps}
    />
  )
}

SquareLink.defaultProps = {
  theme: SquareButtonTheme.teal,
  size: SquareButtonSize.md
}

const getThemeClassName = (theme: SquareButtonTheme): string => {
  switch (theme) {
    default:
    case SquareButtonTheme.teal: {
      return 'square-btn--teal'
    }
    case SquareButtonTheme.tealOutline: {
      return 'square-btn--teal-outline'
    }
    case SquareButtonTheme.purple: {
      return 'square-btn--purple'
    }
    case SquareButtonTheme.purpleOutline: {
      return 'square-btn--purple-outline'
    }
    case SquareButtonTheme.orange: {
      return 'square-btn--orange'
    }
    case SquareButtonTheme.orangeOutline: {
      return 'square-btn--orange-outline'
    }
  }
}

const getSizeClassName = (size: SquareButtonSize): string => {
  switch (size) {
    default:
    case SquareButtonSize.sm: {
      return 'square-btn--sm'
    }
    case SquareButtonSize.md: {
      return 'square-btn--md'
    }
    case SquareButtonSize.lg: {
      return 'square-btn--lg'
    }
  }
}
