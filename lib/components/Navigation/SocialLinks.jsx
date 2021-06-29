import React, { useState } from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'

import { Accordion } from 'lib/components/Accordion'

const headerClasses =
  'relative leading-none w-full flex justify-start items-center font-bold text-lg py-2 px-6 trans outline-none focus:outline-none active:outline-none mb-1 ml-3 lg:ml-0 h-10'

const childClasses =
  'relative leading-none w-full flex justify-start items-center text-sm py-2 px-6 trans outline-none focus:outline-none active:outline-none mb-1 ml-3 lg:ml-0 h-10'

const SocialsIcon = (props) => {
  return <div className='w-4'></div>
}

const socialsLinkData = [
  {
    headerLabel: 'ecosystem',
    headerIcon: <SocialsIcon />,
    childLinks: [
      {
        href: 'https://docs.pooltogether.com/',
        label: 'documentation',
        icon: <SocialsIcon />
      },
      {
        href: 'https://gov.pooltogether.com/',
        label: 'governance',
        icon: <SocialsIcon />
      }
    ]
  },
  {
    headerLabel: 'socials',
    headerIcon: <SocialsIcon />,
    childLinks: [
      {
        href: 'https://twitter.com/PoolTogether_',
        label: 'Twitter',
        icon: <SocialsIcon />
      },
      {
        href: 'https://discord.gg/hxPhPDW',
        label: 'Discord',
        icon: <SocialsIcon />
      },
      {
        href: 'https://medium.com/pooltogether',
        label: 'Medium',
        icon: <SocialsIcon />
      }
    ]
  }
]

export const SocialLinks = (props) => {
  const [expanded, setExpanded] = useState()

  return (
    <>
      {socialsLinkData.map((linkData, index) => {
        return (
          <SocialLinkSet
            key={`social-link-set-${index}`}
            index={index}
            linkData={linkData}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        )
      })}
    </>
  )
}

const SocialLinkSet = (props) => {
  const { linkData } = props

  const content = linkData.childLinks.map((childLink, index) => {
    return (
      <SocialLinkChild
        key={`social-link-child-${index}`}
        href={childLink.href}
        label={childLink.label}
      >
        {childLink.icon}
      </SocialLinkChild>
    )
  })

  return <SocialLinkHeader {...props}>{content}</SocialLinkHeader>
}

const SocialLinkHeader = (props) => {
  return (
    <Accordion
      openUpwards
      key={`social-link-${props.index}`}
      i={props.index}
      expanded={props.expanded}
      setExpanded={props.setExpanded}
      content={props.children}
      header={
        <a className={classnames(headerClasses, 'text-accent-4 hover:text-highlight-2')}>
          <FeatherIcon
            icon='chevron-up'
            strokeWidth='0.25rem'
            className={classnames('w-4 h-4 stroke-current trans', {
              'rotate-180': props.expanded === props.index
            })}
          />
          <span className='pl-3 capitalize'>{props.linkData.headerLabel}</span>
        </a>
      }
    />
  )
}

const SocialLinkChild = (props) => {
  return (
    <div>
      <a
        href={props.href}
        target={props.target}
        className={classnames(childClasses, 'text-accent-4 hover:text-highlight-2')}
      >
        {props.children}
        <span className='pl-3 capitalize'>{props.label}</span>
      </a>
    </div>
  )
}

SocialLinkChild.defaultProps = {
  target: '_blank'
}