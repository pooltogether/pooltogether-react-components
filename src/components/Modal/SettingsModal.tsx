import { getNetworkNiceNameByChainId } from '@pooltogether/utilities'
import classNames from 'classnames'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { ViewProps } from '../Containers/ViewStateMachine'
import { Currencies, i18nTranslate, Languages } from 'src/types'
import { NetworkIcon } from '../Icons/NetworkIcon'
import { SocialLinks } from '../Navigation/SocialLinks'
import { ModalWithViewStateView } from './ModalWithViewState'
import { useIsTestnets } from '../../hooks/useIsTestnets'
import { BottomSheetWithViewState } from '../BottomSheet/BottomSheetWithViewState'
import FeatherIcon from 'feather-icons-react'
import { Trans } from 'react-i18next'
import { ExternalLink } from '../Links/ExternalLink'

export enum ViewIds {
  main,
  network,
  language,
  currency
}

interface CustomButton {
  link: string
  title: string
  description: string
}

export const SettingsModal: React.FC<{
  isOpen: boolean
  closeModal: () => void
  networkView: React.FC<ViewProps>
  walletChainId: number
  t: i18nTranslate
  langs: Languages
  currentLang: string
  changeLang: (locale: string) => void
  currencies: Currencies
  currentCurrency: string
  changeCurrency: (id: string) => void
  customButton?: CustomButton
}> = (props) => {
  const {
    isOpen,
    networkView,
    walletChainId,
    langs,
    currentLang,
    changeLang,
    currencies,
    currentCurrency,
    changeCurrency,
    closeModal,
    t,
    customButton
  } = props
  const [selectedViewId, setSelectedViewId] = useState<string | number>(ViewIds.main)

  const views: ModalWithViewStateView[] = [
    {
      id: ViewIds.main,
      view: MainView
    },
    {
      id: ViewIds.network,
      view: networkView,
      header: t?.('selectANetwork') || 'Select a network',
      previousViewId: ViewIds.main,
      onCloseViewId: ViewIds.main
    },
    {
      id: ViewIds.language,
      view: LanguageView,
      header: t?.('selectALanguage') || 'Select a language',
      previousViewId: ViewIds.main,
      onCloseViewId: ViewIds.main
    },
    {
      id: ViewIds.currency,
      view: CurrencyView,
      header: t?.('selectACurrency') || 'Select a currency',
      previousViewId: ViewIds.main,
      onCloseViewId: ViewIds.main
    }
  ]

  return (
    <BottomSheetWithViewState
      header={t?.('customizeYourExperience') || 'Customize your experience'}
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
      currencies={currencies}
      currentCurrency={currentCurrency}
      changeCurrency={changeCurrency}
      customButton={customButton}
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
    langs: Languages
    currentLang: string
    currencies: Currencies
    currentCurrency: string
    customButton?: CustomButton
  } & ViewProps
> = (props) => {
  const { t, chainId, setSelectedViewId, langs, currentLang, currencies, currentCurrency, customButton } = props
  return (
    <div className='flex flex-col justify-between xs:justify-start h-full'>
      <div className='grid grid-cols-2 gap-3'>
        <NetworkButton t={t} chainId={chainId} onClick={() => setSelectedViewId(ViewIds.network)} />
        <ThemeButton t={t} />
        <CurrencyButton
          t={t}
          onClick={() => setSelectedViewId(ViewIds.currency)}
          currencies={currencies}
          currentCurrency={currentCurrency}
          disabled={Object.keys(currencies).length === 0}
        />
        <LanguageButton
          t={t}
          onClick={() => setSelectedViewId(ViewIds.language)}
          langs={langs}
          currentLang={currentLang}
        />
        <CustomButton data={customButton} t={t} />
        <DeveloperButton t={t} />
      </div>

      <div className='mt-8'>
        <SocialLinks t={t} />
      </div>

      <div className='flex align-center justify-center mt-4'>
        <FeedbackPrompt />
      </div>
    </div>
  )
}

const NetworkButton: React.FC<{ chainId: number; onClick: () => void; t: i18nTranslate }> = (
  props
) => (
  <Button
    onClick={props.onClick}
    disabled={!props.chainId}
    icon={
      !!props.chainId ? <NetworkIcon chainId={props.chainId} sizeClassName='' className='' /> : null
    }
    title={getNetworkNiceNameByChainId(props.chainId)}
    secondary={props.t?.('walletNetwork') || 'Wallet Network'}
  />
)
const CurrencyButton: React.FC<{
  onClick: () => void
  currencies: Currencies
  currentCurrency: string
  t: i18nTranslate
  disabled?: boolean
}> = (props) => (
  <Button
    {...props}
    icon={props.currencies[props.currentCurrency].symbol ?? '$'}
    title={props.currencies[props.currentCurrency].name ?? 'US Dollar'}
    secondary={props.t?.('currency') || 'Currency'}
  />
)
const LanguageButton: React.FC<{
  onClick: () => void
  langs: Languages
  currentLang: string
  t: i18nTranslate
}> = (props) => (
  <Button
    onClick={props.onClick}
    icon={props.currentLang}
    title={props.langs[props.currentLang].nativeName}
    secondary={props.t?.('language') || 'Language'}
  />
)

const DeveloperButton = (props: { t: i18nTranslate }) => {
  const { t } = props
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
      title={t?.('developer') || 'Developer'}
      secondary={
        count === 0
          ? isTestnets
            ? t?.('enableMainnets') || 'Enable mainnets'
            : t?.('enableTestnets') || 'Enable testnets'
          : `(${t?.('clickMoreTimes', { n: (5 - count).toString() }) || 5 - count})`
      }
    />
  )
}

const CustomButton = (props: { data?: CustomButton; t: i18nTranslate }) => {
  const { data, t } = props
  return (
    <a
      href={data?.link || 'https://tools.pooltogether.com'}
      className={classNames(
        'flex flex-col items-center p-3 rounded-lg bg-white bg-opacity-100 dark:bg-white dark:bg-opacity-10 w-full transition hover:bg-opacity-50 dark:hover:bg-opacity-5'
      )}
      target='_blank'
      rel='noreferrer'
    >
      <div className='text-xs flex space-x-1 items-center'>
        <span>{data?.title || t?.('tools') || 'Tools'}</span>
        <FeatherIcon icon='arrow-up-right' className='w-3 h-4' />
      </div>
      <div className='text-xxxs opacity-50'>
        {data?.description || t?.('pooltogetherToolkit') || 'PoolTogether Toolkit'}
      </div>
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
      secondary={t?.('theme') || 'Theme'}
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
        'flex flex-col items-center justify-center p-3 rounded-lg bg-white bg-opacity-100 dark:bg-white dark:bg-opacity-10 w-full transition mt-auto min-h-full',
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
const CurrencyView: React.FC<{
  currencies: Currencies
  currentCurrency: string
  changeCurrency: (id: string) => void
  closeModal: () => void
}> = (props) => {
  const { currencies, currentCurrency, changeCurrency, closeModal } = props
  return (
    <ul className={classNames('flex flex-col space-y-2')}>
      {Object.keys(currencies).map((id) => (
        <CurrencyItem
          key={`currency-item-${id}`}
          id={id}
          isSelected={id === currentCurrency}
          {...currencies[id]}
          onClick={() => {
            changeCurrency(id)
            closeModal()
          }}
        />
      ))}
    </ul>
  )
}

const CurrencyItem: React.FC<{
  isSelected: boolean
  id: string
  name: string
  symbol: string
  onClick: () => void
}> = (props) => {
  const { id, isSelected, name, symbol, onClick } = props
  return (
    <button
      className={classNames('rounded px-2 py-2 bg-pt-purple border  hover:border-pt-teal', {
        'border-pt-purple-light': isSelected,
        'border-transparent': !isSelected
      })}
      onClick={onClick}
    >
      <li>
        {id} - <span>{name}</span> ({symbol})
      </li>
    </button>
  )
}

/**
 *
 * @returns
 */
const LanguageView: React.FC<{
  langs: Languages
  currentLang: string
  changeLang: (locale: string) => void
  closeModal: () => void
}> = (props) => {
  const { langs, currentLang, changeLang, closeModal } = props
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

const FeedbackPrompt = () => (
  <span className='text-xxs opacity-60'>
    <Trans
      i18nKey='feedbackTalkToUs'
      components={{
        LinkToDiscord: (
          <ExternalLink href={'https://pooltogether.com/discord/'} children={undefined} />
        )
      }}
    />
  </span>
)
