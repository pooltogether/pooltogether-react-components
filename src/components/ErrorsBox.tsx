import classNames from 'classnames'
import React from 'react'

interface ErrorsBoxProps {
  errors: string[]
  className?: string
  colorClassName: string
  fontClassName: string
}

/**
 * Placeholder box for errors with a minium height so components don't jump
 * @param {*} props
 * @returns
 */
export function ErrorsBox(props: ErrorsBoxProps) {
  const { errors, className, colorClassName, fontClassName } = props

  if (errors.length === 0) return null

  return <div className={classNames(className, fontClassName, colorClassName)}>{errors}</div>
}

ErrorsBox.defaultProps = {
  className: 'mb-2',
  colorClassName: 'text-red',
  fontClassName: 'font-semibold text-center'
}
