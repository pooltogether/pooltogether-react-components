import { getNetworkNiceNameByChainId } from '@pooltogether/utilities'
import classNames from 'classnames'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { ViewProps } from '../Containers/ViewStateMachine'
import { i18nTranslate } from 'src/types'
import { NetworkIcon } from '../Icons/NetworkIcon'
import { SocialLinks } from '../Navigation/SocialLinks'
import { ModalWithViewStateView } from './ModalWithViewState'
import { useIsTestnets } from '../../hooks/useIsTestnets'
import { BottomSheetWithViewState } from '../BottomSheet/BottomSheetWithViewState'
import FeatherIcon from 'feather-icons-react'

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
      header: 'Select a network',
      previousViewId: ViewIds.main,
      onCloseViewId: ViewIds.main
    },
    {
      id: ViewIds.language,
      view: LanguageView,
      header: 'Select your language',
      previousViewId: ViewIds.main,
      onCloseViewId: ViewIds.main
    },
    {
      id: ViewIds.currency,
      view: CurrencyView,
      header: 'Select your currency',
      previousViewId: ViewIds.main,
      onCloseViewId: ViewIds.main
    }
  ]

  return (
    <BottomSheetWithViewState
      header={'Customize your experience'}
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
const MainView: React.FC<
  {
    chainId: number
    t: i18nTranslate
    langs: { [locale: string]: { name: string; nativeName: string } }
    currentLang: string
  } & ViewProps
> = (props) => {
  const { t, chainId, setSelectedViewId, langs, currentLang } = props
  return (
    <div className='flex flex-col justify-between xs:justify-start h-full'>
      <div className='grid grid-cols-2 gap-3'>
        <NetworkButton chainId={chainId} onClick={() => setSelectedViewId(ViewIds.network)} />
        <ThemeButton t={t} />
        <CurrencyButton onClick={() => setSelectedViewId(ViewIds.currency)} disabled />
        <LanguageButton
          onClick={() => setSelectedViewId(ViewIds.language)}
          langs={langs}
          currentLang={currentLang}
        />
        <ToolsButton />
        <DeveloperButton />
      </div>

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
const LanguageButton: React.FC<{
  onClick: () => void
  langs: { [locale: string]: { name: string; nativeName: string } }
  currentLang: string
}> = (props) => (
  <Button
    onClick={props.onClick}
    icon={props.currentLang}
    title={props.langs[props.currentLang].nativeName}
    secondary='Language'
  />
)

const DeveloperButton = () => {
  const [count, setCount] = useState(0)
  const { isTestnets, enableTestnets, disableTestnets } = useIsTestnets()

  useEffect(() => {
    if (count >= 5) {
      if (isTestnets) {
        disableTestnets()
      } else {
        enableTestnets()
      }
      // after updating the cookie reload the page or else the app crashes
      window.location.reload()
    }
  }, [count])

  return (
    <Button
      onClick={() => setCount(count + 1)}
      title='Developer'
      secondary={
        count === 0 ? (isTestnets ? 'Enable mainnets' : 'Enable testnets') : `(${5 - count}) more`
      }
    />
  )
}

const ToolsButton = () => {
  return (
    <a
      href={'https://tools.pooltogether.com'}
      className={classNames(
        'flex flex-col items-center p-3 rounded-lg bg-white bg-opacity-100 dark:bg-white dark:bg-opacity-10 w-full transition hover:bg-opacity-50 dark:hover:bg-opacity-5'
      )}
      target='_blank'
    >
      <div className='text-xs flex space-x-1 items-center'>
        <span>Tools</span>
        <FeatherIcon icon='arrow-up-right' className='w-3 h-4' />
      </div>
      <div className='text-xxxs opacity-50'>PoolTogether Toolkit</div>
    </a>
  )
}

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
  title: React.ReactNode
  secondary: React.ReactNode
  icon?: React.ReactNode
  bgClassName?: string
  disabled?: boolean
}> = (props) => {
  const { disabled, icon, title, secondary, onClick, bgClassName } = props
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        'flex flex-col items-center p-3 rounded-lg bg-white bg-opacity-100 dark:bg-white dark:bg-opacity-10 w-full transition mt-auto',
        {
          'cursor-not-allowed opacity-50': disabled,
          'hover:bg-opacity-50 dark:hover:bg-opacity-5': !disabled
        }
      )}
    >
      {!!icon && (
        <div
          className={classNames(
            bgClassName,
            'h-11 w-11 text-xxs rounded-full flex flex-col text-center justify-center trans bg-opacity-10 dark:bg-opacity-80 mb-1 uppercase'
          )}
        >
          {icon}
        </div>
      )}
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
  console.log({ props })
  return (
    <ul className={classNames('flex flex-col space-y-2')}>
      {Object.keys(langs).map((locale) => (
        <LanguageItem
          key={`language-item-${locale}`}
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
