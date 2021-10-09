import React from 'react'
import classnames from 'classnames'

export const CardTheme = Object.freeze({
  default: 'bg-card',
  purple: 'bg-card-purple'
})

export interface CardProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  theme: string
  style?: object
  backgroundClassName?: string
  sizeClassName: string
  paddingClassName: string
}

export const Card = (props: CardProps) => {
  const {
    children,
    className,
    paddingClassName,
    sizeClassName,
    backgroundClassName,
    theme,
    style
  } = props

  return (
    <div
      className={classnames(
        'rounded-xl',
        sizeClassName,
        paddingClassName,
        backgroundClassName || theme,
        className
      )}
      style={style}
    >
      {children}
    </div>
  )
}

Card.defaultProps = {
  paddingClassName: 'p-4 xs:py-6 xs:px-8 sm:py-6 sm:px-12',
  sizeClassName: 'w-full',
  theme: CardTheme.default
}
