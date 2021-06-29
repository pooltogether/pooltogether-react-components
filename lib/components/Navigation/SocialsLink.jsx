import React from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'

const socialsParentClasses =
  'relative leading-none w-full flex justify-start items-center font-bold text-lg lg:text-xl py-2 px-6 lg:px-8 trans outline-none focus:outline-none active:outline-none mb-1 ml-3 lg:ml-0 h-10'
const socialsChildClasses =
  'relative leading-none w-full flex justify-start items-center text-sm lg:text-base py-2 px-6 lg:px-8 trans outline-none focus:outline-none active:outline-none mb-1 ml-3 lg:ml-0 h-10'

export const SocialsLinkParent = (props) => {
  const { Link } = props

  return (
    <a className={classnames(socialsParentClasses, 'text-accent-4 hover:text-highlight-2')}>
      <FeatherIcon icon='chevron-up' strokeWidth='0.25rem' className={'w-4 h-4 stroke-current'} />
      <span className='pl-3 capitalize'>{props.label}</span>
    </a>
  )
}

export const SocialsLinkChild = (props) => {
  const { Link } = props

  return (
    <div>
      <Link href={props.href} as={props.as} shallow>
        <a className={classnames(socialsChildClasses, 'text-accent-4 hover:text-highlight-2')}>
          {props.children}
          <span className='pl-3 capitalize'>{props.label}</span>
        </a>
      </Link>
    </div>
  )
}

export const SocialsIcon = (props) => {
  return <FeatherIcon icon='check-circle' className={'w-4 h-4 stroke-current'} />
}
