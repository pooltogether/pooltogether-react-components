import React from 'react'
import FeatherIcon from 'feather-icons-react'
import classnames from 'classnames'
import classNames from 'classnames'

export enum ButtonTheme {
  teal = 'teal',
  tealOutline = 'teal-outline',
  purple = 'purple',
  purpleOutline = 'purple-outline',
  orange = 'orange',
  orangeOutline = 'orange-outline',
  inverse = 'inverse',
  pink = 'pink',
  black = 'black',
  blackOutline = 'black-outline',
  rainbow = 'rainbow',
  transparent = 'transparent'
}

export enum ButtonSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl'
}

export enum ButtonRadius {
  small = 'rounded-xs',
  medium = 'rounded',
  large = 'rounded-lg',
  full = 'rounded-full'
}

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  theme?: ButtonTheme
  size?: ButtonSize
  radius?: ButtonRadius
  chevron?: boolean
  noCenter?: boolean
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { theme, size, noCenter, className, radius, ...buttonProps } = props

  return (
    <button
      className={classnames(
        'pt-btn',
        getThemeClassName(theme),
        getSizeClassName(size),
        getCenterClassName(noCenter),
        radius,
        className
      )}
      {...buttonProps}
    />
  )
}

Button.defaultProps = {
  theme: ButtonTheme.teal,
  size: ButtonSize.md,
  radius: ButtonRadius.large,
  noCenter: false
}

interface ButtonLinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  noCenter?: boolean
  theme?: ButtonTheme
  size?: ButtonSize
  radius?: ButtonRadius
  chevron?: boolean
}

export const ButtonLink: React.FC<ButtonLinkProps> = React.forwardRef((props, ref) => {
  const { chevron, radius, theme, size, noCenter, className, ...linkProps } = props

  return (
    <a
      {...linkProps}
      ref={ref}
      className={classnames(
        'pt-btn',
        getThemeClassName(theme),
        getSizeClassName(size),
        getCenterClassName(noCenter),
        radius,
        className
      )}
    >
      {props.children}
      {chevron && (
        <FeatherIcon
          icon={'chevron-right'}
          className={classnames('inline-block my-auto', getChevronClassName(size))}
        />
      )}
    </a>
  )
})

ButtonLink.defaultProps = {
  noCenter: false,
  theme: ButtonTheme.teal,
  radius: ButtonRadius.large,
  size: ButtonSize.md
}

const getChevronClassName = (size: ButtonSize): string => {
  switch (size) {
    default:
    case ButtonSize.sm: {
      return 'w-5 h-5'
    }
    case ButtonSize.md: {
      return 'w-6 h-6'
    }
    case ButtonSize.lg: {
      return 'w-8 h-8'
    }
  }
}

const getThemeClassName = (theme: ButtonTheme = ButtonTheme.teal): string => {
  switch (theme) {
    case ButtonTheme.rainbow: {
      return 'pt-btn--rainbow gradient-background-anim'
    }
    default: {
      return `pt-btn--${theme}`
    }
  }
}

const getSizeClassName = (size: ButtonSize = ButtonSize.md): string => {
  switch (size) {
    default: {
      return `pt-btn--${size}`
    }
  }
}

const getCenterClassName = (noCenter: boolean = false): string => {
  return classNames({
    'flex items-center justify-center': !noCenter
  })
}
