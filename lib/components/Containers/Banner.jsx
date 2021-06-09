import React from 'react'
import classnames from 'classnames'

export const BannerGradient = {
  purplePink: 'purple-pink',
  rainbow: 'rainbow'
}

const BannerUnmemoized = (props) => {
  const { gradient, className, children, style, paddingClassName } = props

  const bannerClass = 'rounded-lg'

  if (gradient === BannerGradient.rainbow) {
    return (
      <div
        className={classnames(bannerClass, paddingClassName, 'text-purple', className)}
        style={{
          ...style,
          backgroundImage: 'url("/BackgroundGradient.svg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className={classnames(bannerClass, paddingClassName, 'pool-gradient-1', className)}
      style={style}
    >
      {children}
    </div>
  )
}

BannerUnmemoized.defaultProps = {
  gradient: BannerGradient.purplePink,
  paddingClassName: 'p-4 xs:py-6 xs:px-8 sm:py-6 sm:px-12'
}

export const Banner = React.memo(BannerUnmemoized)
