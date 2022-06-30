import React from 'react'
import FeatherIcon from 'feather-icons-react'
import classnames from 'classnames'
import classNames from 'classnames'

export enum SquareButtonTheme {
  teal = 'teal',
  tealOutline = 'tealOutline',
  purple = 'purple',
  purpleOutline = 'purpleOutline',
  orange = 'orange',
  orangeOutline = 'orangeOutline',
  black = 'black',
  blackOutline = 'blackOutline',
  rainbow = 'rainbow'
}

export enum SquareButtonSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg'
}

export interface SquareButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  theme?: SquareButtonTheme
  size?: SquareButtonSize
  chevron?: boolean
  noCenter?: boolean
}

export const SquareButton: React.FC<SquareButtonProps> = (props) => {
  const { theme, size, noCenter, className, ...buttonProps } = props

  return (
    <button
      className={classnames(
        'square-btn',
        getThemeClassName(theme),
        getSizeClassName(size),
        getCenterClassName(noCenter),
        className
      )}
      {...buttonProps}
    />
  )
}

SquareButton.defaultProps = {
  theme: SquareButtonTheme.teal,
  size: SquareButtonSize.md,
  noCenter: false
}

interface SquareLinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  noCenter?: boolean
  theme?: SquareButtonTheme
  size?: SquareButtonSize
  chevron?: boolean
}

export const SquareLink: React.FC<SquareLinkProps> = React.forwardRef((props, ref) => {
  const { chevron, theme, size, noCenter, className, ...linkProps } = props

  return (
    <a
      {...linkProps}
      ref={ref}
      className={classnames(
        'square-btn',
        getThemeClassName(theme),
        getSizeClassName(size),
        getCenterClassName(noCenter),
        className
      )}
    >
      {props.children}{' '}
      {chevron && (
        <FeatherIcon
          icon={'chevron-right'}
          className={classnames('inline-block my-auto', getChevronClassName(size))}
        />
      )}
    </a>
  )
})

SquareLink.defaultProps = {
  noCenter: false,
  theme: SquareButtonTheme.teal,
  size: SquareButtonSize.md
}

const getChevronClassName = (size: SquareButtonSize): string => {
  switch (size) {
    default:
    case SquareButtonSize.sm: {
      return 'w-5 h-5'
    }
    case SquareButtonSize.md: {
      return 'w-6 h-6'
    }
    case SquareButtonSize.lg: {
      return 'w-8 h-8'
    }
  }
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
    case SquareButtonTheme.black: {
      return 'square-btn--black'
    }
    case SquareButtonTheme.blackOutline: {
      return 'square-btn--black-outline'
    }
    case SquareButtonTheme.rainbow: {
      return 'square-btn--rainbow seamless-gradient-animation'
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

const getCenterClassName = (noCenter: boolean): string => {
  return classNames({
    'flex items-center justify-center': !noCenter
  })
}
