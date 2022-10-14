import React from 'react'
import classnames from 'classnames'

// Icons
import MediumLogo from '../../assets/Socials/medium-logo.svg'
import DiscordLogo from '../../assets/Socials/discord-logo.svg'
import TwitterLogo from '../../assets/Socials/twitter-logo.svg'
import TelegramLogo from '../../assets/Socials/telegram-logo.svg'
import GithubLogo from '../../assets/Socials/github-logo.svg'
import Docs from '../../assets/Socials/docs.svg'

export enum SocialKey {
  twitter = 'twitter',
  discord = 'discord',
  medium = 'medium',
  telegram = 'telegram',
  github = 'github',
  docs = 'docs'
}

export const SocialIcon: React.FC<{
  social: SocialKey
  style?: React.CSSProperties
  sizeClassName?: string
  className?: string
  radiusClassName?: string
  onClick?: React.MouseEventHandler<HTMLImageElement>
}> = (props) => {
  const { sizeClassName, style, radiusClassName, className, social, onClick } = props

  const src = SOCIAL_MAPPING[social]

  if (!src) {
    return (
      <div
        style={style}
        className={classnames(
          'inline-block',
          'bg-actually-black bg-opacity-20',
          className,
          radiusClassName,
          sizeClassName
        )}
      />
    )
  }

  return (
    <img
      style={style}
      src={src}
      className={classnames('inline-block', className, radiusClassName, sizeClassName)}
      onClick={onClick}
    />
  )
}

SocialIcon.defaultProps = {
  sizeClassName: 'w-5 h-5'
}

export const SOCIAL_MAPPING = Object.freeze({
  [SocialKey.twitter]: TwitterLogo,
  [SocialKey.medium]: MediumLogo,
  [SocialKey.telegram]: TelegramLogo,
  [SocialKey.discord]: DiscordLogo,
  [SocialKey.github]: GithubLogo,
  [SocialKey.docs]: Docs
})
