import React, { useState } from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'

import { Accordion } from '../Accordion'
import KnowledgeBaseIcon from '../../assets/Socials/knowledge-base.svg'
import DocsIcon from '../../assets/Socials/docs.svg'
import GovForumIcon from '../../assets/Socials/gov-forum.svg'
import TreasuryIcon from '../../assets/Socials/treasury.svg'
import MediumLogo from '../../assets/Socials/medium-logo.svg'
import DiscordLogo from '../../assets/Socials/discord-logo.svg'
import TwitterLogo from '../../assets/Socials/twitter-logo.svg'
import TelegramLogo from '../../assets/Socials/telegram-logo.svg'

const sharedClasses =
  'relative leading-none w-full flex justify-start items-center py-2 px-0 mb-1 ml-0 trans outline-none focus:outline-none active:outline-none h-10'

const headerClasses = 'text-lg font-bold hover:text-pt-teal'

const childClasses = 'text-xs opacity-70 hover:text-pt-teal'

export const SocialLinks = (props) => {
  const { t } = props

  if (!t) {
    console.error('<SocialLinks /> requires the prop t (i18n trans method)')
  }

  const [expanded, setExpanded] = useState()

  return (
    <>
      {socialsLinkData.map((linkData, index) => {
        return (
          <SocialLinkSet
            t={t}
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
    return <SocialLinkChild {...props} key={`social-link-child-${index}`} childLink={childLink} />
  })

  return <SocialLinkHeader {...props}>{content}</SocialLinkHeader>
}

const SocialLinkHeader = (props) => {
  const { t } = props

  return (
    <Accordion
      openUpwards
      key={`social-link-${props.index}`}
      i={props.index}
      expanded={props.expanded}
      setExpanded={props.setExpanded}
      content={props.children}
      header={
        <a className={classnames(sharedClasses, headerClasses)}>
          <FeatherIcon
            icon='chevron-up'
            strokeWidth='0.25rem'
            className={classnames('w-4 h-4 stroke-current trans', {
              'rotate-180': props.expanded === props.index
            })}
          />
          <span className='pl-3 capitalize'>
            {t(props.linkData.langKey, props.linkData.headerLabel)}
          </span>
        </a>
      }
    />
  )
}

const SocialLinkChild = (props) => {
  const { t, childLink } = props
  const { langKey, label, icon, href, target } = childLink

  return (
    <div>
      <a href={href} target={target} className={classnames(sharedClasses, childClasses)}>
        <span className='w-4'>{icon}</span>
        <span className='pl-3 capitalize'>{langKey ? t(langKey, label) : label}</span>
      </a>
    </div>
  )
}

SocialLinkChild.defaultProps = {
  target: '_blank'
}

const BottomVoteIcon = () => (
  <div className='flex items-center justify-center h-6'>
    <svg
      className='fill-current stroke-current'
      width='20'
      height='25'
      viewBox='0 0 20 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M16.994 10.3965C16.9924 10.3869 16.9903 10.3776 16.988 10.3682C16.9854 10.3575 16.9847 10.3466 16.9811 10.3361L15.101 4.78371C15.0514 4.63717 14.9176 4.53904 14.7675 4.53904H11.3679L8.04561 1.1069C7.90755 0.964407 7.68401 0.964288 7.54595 1.10702L4.89902 3.84348C4.83275 3.91199 4.79547 4.00488 4.79547 4.10182C4.79547 4.19876 4.83275 4.29165 4.89902 4.36016L5.07221 4.53904H3.23034C3.08009 4.53904 2.94629 4.63729 2.8967 4.78394L1.01979 10.3363C1.01752 10.343 1.0173 10.3501 1.01543 10.3569C1.011 10.3727 1.00746 10.3887 1.00512 10.4054C1.00364 10.4161 1.00256 10.4267 1.002 10.4375C1.00163 10.4445 1 10.451 1 10.458V19.6346C1 19.8365 1.15819 20 1.35343 20H16.6466C16.8418 20 17 19.8365 17 19.6346V10.458C17 10.4539 16.999 10.4502 16.9988 10.4461C16.9984 10.4295 16.9967 10.4131 16.994 10.3965ZM7.79595 1.88191L11.4957 5.70383L9.93702 7.31523H8.76018L5.64879 4.10182L7.79595 1.88191ZM3.48126 5.26981H5.77914L7.75993 7.31523H6.71461C6.51937 7.31523 6.36118 7.47878 6.36118 7.68062C6.36118 7.88246 6.51937 8.04601 6.71461 8.04601H8.61395H10.0834H11.2864C11.4817 8.04601 11.6399 7.88246 11.6399 7.68062C11.6399 7.47878 11.4817 7.31523 11.2864 7.31523H10.9366L12.2454 5.96217C12.3834 5.81956 12.3834 5.58822 12.2454 5.44549L12.0756 5.26981H14.5168L16.1494 10.0914H1.85136L3.48126 5.26981ZM16.2931 19.2692H1.70686V10.8234H16.2931V19.2692V19.2692Z' />
    </svg>
  </div>
)

const socialsLinkData = [
  {
    langKey: 'ecosystem',
    headerLabel: 'ecosystem',
    childLinks: [
      {
        href: 'https://vote.pooltogether.com',
        langKey: 'vote',
        label: 'Vote',
        icon: (
          <div className='opacity-60 pt-1'>
            <BottomVoteIcon />
          </div>
        )
      },
      {
        href: 'https://docs.pooltogether.com',
        langKey: 'knowledgeBase',
        label: 'Knowledge Base',
        icon: <img src={KnowledgeBaseIcon} className='w-4 opacity-70 mx-auto' />
      },
      {
        href: 'https://v4.docs.pooltogether.com/',
        langKey: 'documentation',
        label: 'Documentation',
        icon: <img src={DocsIcon} className='w-3 opacity-70 mx-auto' />
      },
      {
        href: 'https://gov.pooltogether.com/',
        langKey: 'governanceForum',
        label: 'Governance forum',
        icon: <img src={GovForumIcon} className='w-4 opacity-70 mx-auto' />
      },
      {
        href: 'https://info.pooltogether.com/',
        langKey: 'treasury',
        label: 'Treasury',
        icon: <img src={TreasuryIcon} className='w-4 opacity-70 mx-auto' />
      }
    ]
  },
  {
    langKey: 'socials',
    headerLabel: 'socials',
    childLinks: [
      {
        href: 'https://twitter.com/PoolTogether_',
        label: 'Twitter',
        icon: <img src={TwitterLogo} className='w-4 opacity-70 mx-auto' />
      },
      {
        href: 'https://t.me/PoolTogetherTelegram',
        label: 'Telegram',
        icon: <img src={TelegramLogo} className='w-4 opacity-70 mx-auto hover:opacity-100 trans' />
      },
      {
        href: 'https://pooltogether.com/discord/',
        label: 'Discord',
        icon: <img src={DiscordLogo} className='w-4 opacity-70 mx-auto hover:opacity-100 trans' />
      },
      {
        href: 'https://medium.com/pooltogether',
        label: 'Medium',
        icon: <img src={MediumLogo} className='w-4 opacity-70 mx-auto hover:opacity-100 trans' />
      }
    ]
  }
]
