import classNames from 'classnames'
import React from 'react'
import './SquareButton.css'

export enum SquareButtonTheme {
  teal = 'teal',
  purple = 'purple',
  orange = 'orange'
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

const getThemeClassName = (theme: SquareButtonTheme): string => {
  switch (theme) {
    default:
    case SquareButtonTheme.teal: {
      return 'square-btn--teal'
    }
    case SquareButtonTheme.purple: {
      return 'square-btn--purple'
    }
    case SquareButtonTheme.orange: {
      return 'square-btn--orange'
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
