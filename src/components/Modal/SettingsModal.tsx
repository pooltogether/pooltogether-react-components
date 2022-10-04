import { getNetworkNiceNameByChainId } from '@pooltogether/utilities'
import classNames from 'classnames'
import { useTheme } from 'next-themes'
import React, { useState } from 'react'
import { ViewProps } from '../Containers/ViewStateMachine'
import { i18nTranslate } from 'src/types'
import { NetworkIcon } from '../Icons/NetworkIcon'
import { SocialLinks } from '../Navigation/SocialLinks'
import { TestnetSettingsItem } from '../PageHeader/Settings/TestnetSettingsItem'
import { ModalWithViewState, ModalWithViewStateView } from './ModalWithViewState'

export enum ViewIds {
  main,
  network,
  language,
  currency
}

export const SettingsModal: React.FC<{
  isOpen: boolean
  closeModal: () => void
  networkView: React.FC<ViewProps>
  walletChainId: number
  t: i18nTranslate
  langs: { [locale: string]: { name: string; nativeName: string } }
  currentLang: string
  changeLang: (locale: string) => void
}> = (props) => {
  const { isOpen, networkView, walletChainId, langs, currentLang, changeLang, closeModal, t } =
    props
  const [selectedViewId, setSelectedViewId] = useState<string | number>(ViewIds.main)

  const views: ModalWithViewStateView[] = [
    {
      id: ViewIds.main,
      view: MainView
    },
    {
      id: ViewIds.network,
      view: networkView,
      title: 'Select a network',
      previousViewId: ViewIds.main,
      onCloseViewId: ViewIds.main
    },
    {
      id: ViewIds.language,
      view: LanguageView,
      title: 'Select your language',
      previousViewId: ViewIds.main,
      onCloseViewId: ViewIds.main
    },
    {
      id: ViewIds.currency,
      view: CurrencyView,
      title: 'Select your currency',
      previousViewId: ViewIds.main,
      onCloseViewId: ViewIds.main
    }
  ]

  return (
    <ModalWithViewState
      title={'Customize your experience'}
      label='settings-modal'
      bgClassName='bg-pt-purple-lightest dark:bg-pt-purple-darkest'
      isOpen={isOpen}
      closeModal={closeModal}
      viewIds={ViewIds}
      views={views}
      selectedViewId={selectedViewId}
      setSelectedViewId={setSelectedViewId}
      maxWidthClassName='xs:max-w-sm'
      // View props
      chainId={walletChainId}
      t={t}
      langs={langs}
      currentLang={currentLang}
      changeLang={changeLang}
    />
  )
}

/**
 *
 * @param props
 * @returns
 */
const MainView: React.FC<{ chainId: number; t: i18nTranslate } & ViewProps> = (props) => {
  const { t, chainId, setSelectedViewId } = props
  return (
    <div className='flex flex-col justify-between xs:justify-start h-full'>
      <div className='flex flex-col space-y-3'>
        <div className='flex space-x-3'>
          <NetworkButton chainId={chainId} onClick={() => setSelectedViewId(ViewIds.network)} />
          <ThemeButton t={t} />
        </div>
        <div className='flex space-x-3'>
          <CurrencyButton onClick={() => setSelectedViewId(ViewIds.currency)} disabled />
          <LanguageButton onClick={() => setSelectedViewId(ViewIds.language)} />
        </div>
      </div>

      <TestnetSettingsItem t={t} />

      <div className='mt-8'>
        <SocialLinks t={t} />
      </div>
    </div>
  )
}

const NetworkButton: React.FC<{ chainId: number; onClick: () => void }> = (props) => (
  <Button
    onClick={props.onClick}
    disabled={!props.chainId}
    icon={
      !!props.chainId ? <NetworkIcon chainId={props.chainId} sizeClassName='' className='' /> : null
    }
    title={getNetworkNiceNameByChainId(props.chainId)}
    secondary='Wallet Network'
  />
)
const CurrencyButton: React.FC<{ disabled?: boolean; onClick: () => void }> = (props) => (
  <Button {...props} icon={'$'} title='Dollar (US)' secondary='Currency' />
)
const LanguageButton: React.FC<{ onClick: () => void }> = (props) => (
  <Button onClick={props.onClick} icon={'EN'} title='English' secondary='Language' />
)
const ThemeButton = (props: { t: i18nTranslate }) => {
  const { t } = props
  const { theme, themes, setTheme, systemTheme } = useTheme()
  return (
    <Button
      onClick={() => setTheme(themes[(themes.indexOf(theme) + 1) % themes.length])}
      icon={
        <>
          {theme === 'system' && '⚙️'}
          {theme === 'light' && '☀️'}
          {theme === 'dark' && '🌙'}
        </>
      }
      title={
        <>
          {theme === 'system' && (
            <b>{`${t?.('system') || 'System'} (${
              systemTheme === 'dark' ? t?.('dark') || 'Dark' : t?.('light') || 'Light'
            })`}</b>
          )}
          {theme === 'light' && <b>{t?.('light') || 'Light'}</b>}
          {theme === 'dark' && <b>{t?.('dark') || 'Dark'}</b>}
        </>
      }
      bgClassName={
        theme === 'system'
          ? systemTheme === 'dark'
            ? 'bg-pt-purple-darkest'
            : 'bg-gradient-yellow'
          : theme === 'dark'
          ? 'bg-pt-purple-darkest'
          : 'bg-gradient-yellow'
      }
      secondary='Theme'
    />
  )
}

const Button: React.FC<{
  onClick: () => void
  icon: React.ReactNode
  title: React.ReactNode
  secondary: React.ReactNode
  bgClassName?: string
  disabled?: boolean
}> = (props) => {
  const { disabled, icon, title, secondary, onClick, bgClassName } = props
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        'flex flex-col items-center p-3 rounded-lg bg-white bg-opacity-100 dark:bg-white dark:bg-opacity-10 w-full transition',
        {
          'cursor-not-allowed opacity-50': disabled,
          'hover:bg-opacity-50 dark:hover:bg-opacity-5': !disabled
        }
      )}
    >
      <div
        className={classNames(
          bgClassName,
          'h-11 w-11 text-xxs rounded-full flex flex-col text-center justify-center trans bg-opacity-10 dark:bg-opacity-80 mb-1'
        )}
      >
        {icon}
      </div>
      <div className='text-xs'>{title}</div>
      <div className='text-xxxs opacity-50'>{secondary}</div>
    </button>
  )
}
Button.defaultProps = {
  bgClassName: 'bg-gradient-magenta'
}

/**
 *
 * @returns
 */
const CurrencyView: React.FC<{}> = () => {
  return null
}

/**
 *
 * @returns
 */
const LanguageView: React.FC<{
  langs: { [locale: string]: { name: string; nativeName: string } }
  currentLang: string
  changeLang: (locale: string) => void
  closeModal: () => void
}> = (props) => {
  const { langs, currentLang, changeLang, closeModal } = props
  return (
    <ul className={classNames('flex flex-col space-y-2')}>
      {Object.keys(langs).map((locale) => (
        <LanguageItem
          locale={locale}
          isSelected={locale === currentLang}
          {...langs[locale]}
          onClick={() => {
            changeLang(locale)
            closeModal()
          }}
        />
      ))}
    </ul>
  )
}

const LanguageItem: React.FC<{
  isSelected: boolean
  locale: string
  name: string
  nativeName: string
  onClick: () => void
}> = (props) => {
  const { locale, isSelected, name, nativeName, onClick } = props
  return (
    <button
      className={classNames('rounded px-2 py-2 bg-pt-purple border  hover:border-pt-teal', {
        'border-pt-purple-light': isSelected,
        'border-transparent': !isSelected
      })}
      onClick={onClick}
    >
      <li>
        {locale} - <span className='capitalize'>{nativeName.split(',')[0]}</span> (
        {name.split(';')[0]})
      </li>
    </button>
  )
}
