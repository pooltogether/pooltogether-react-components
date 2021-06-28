import React from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'

const navParentClasses =
  'relative leading-none rounded-full w-full flex justify-start items-center text-lg lg:text-xl py-3 px-6 lg:px-8 trans tracking-wider outline-none focus:outline-none active:outline-none mb-3 font-bold ml-3 lg:ml-0 h-10'

export const SocialsLink = (props) => {
  const { Link } = props

  return (
    <div>
      <Link href={props.href} as={props.as} shallow>
        <a className={classnames(navParentClasses, 'text-accent-4 hover:text-highlight-2')}>
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
