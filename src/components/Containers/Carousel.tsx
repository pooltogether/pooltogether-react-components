import classNames from 'classnames'
import React from 'react'
import Slider from 'react-slick'

/**
 * Paginates every ReactNode passed as a child
 * TODO: Add enum to set different dotClass for different themes definte in slick-theme.css
 * @param props
 * @returns
 */
export const Carousel: React.FC<{
  children: React.ReactNode
  className?: string
  marginClassName?: string
  // https://react-slick.neostack.com/docs/api/
  settings?: {
    adaptiveHeight?: boolean
    arrows?: boolean
    centerMode?: boolean
    className?: string
    dotsClass?: string
    dots?: boolean
    draggable?: boolean
    infinite?: boolean
    lazyLoad?: 'ondemand' | 'progressive'
    slidesToShow?: number
    slidesToScroll?: number
    speed?: number
    nextArrow?: (props: any) => JSX.Element
    prevArrow?: (props: any) => JSX.Element
  }
}> = (props) => {
  const { children, className, marginClassName, settings } = props

  return (
    <Slider {...settings} children={children} className={classNames(className, marginClassName)} />
  )
}

Carousel.defaultProps = {
  settings: {
    arrows: false,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  },
  marginClassName: 'mb-4'
}
