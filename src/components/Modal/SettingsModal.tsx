import React, { useState } from 'react'
import { ViewProps } from 'src/components/Containers/ViewStateMachine'
import { i18nTranslate } from 'src/types'
import { SocialLinks } from '../Navigation/SocialLinks'
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
  t: i18nTranslate
}> = (props) => {
  const { isOpen, networkView, closeModal, t } = props
  const [selectedViewId, setSelectedViewId] = useState<string | number>(ViewIds.main)

  const views: ModalWithViewStateView[] = [
    {
      id: ViewIds.main,
      view: MainView
    },
    {
      id: ViewIds.network,
      view: networkView,
      title: 'Connect to ',
      previousViewId: ViewIds.main
    },
    {
      id: ViewIds.language,
      view: LanguageView,
      title: 'Select your language',
      previousViewId: ViewIds.main
    },
    {
      id: ViewIds.currency,
      view: CurrencyView,
      title: 'Select your currency',
      previousViewId: ViewIds.main
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
      maxWidthClassName='max-w-sm'
      // View props
      t={t}
    />
  )
}

/**
 *
 * @param props
 * @returns
 */
const MainView: React.FC<{ t: i18nTranslate } & ViewProps> = (props) => {
  const { t, setSelectedViewId } = props
  return (
    <div className='flex flex-col justify-between xs:justify-start h-full'>
      <div className='flex flex-col space-y-3'>
        <div className='flex space-x-3'>
          <NetworkButton onClick={() => setSelectedViewId(ViewIds.network)} />
          <ThemeButton />
        </div>
        <div className='flex space-x-3'>
          <CurrencyButton onClick={() => setSelectedViewId(ViewIds.currency)} />
          <LanguageButton onClick={() => setSelectedViewId(ViewIds.language)} />
        </div>
      </div>
      <div className='mt-8'>
        <SocialLinks t={t} />
      </div>
    </div>
  )
}

const NetworkButton: React.FC<{ onClick: () => void }> = (props) => (
  <SquareButton onClick={props.onClick} icon={'$'} title='Polygon' secondary='Wallet Network' />
)
const CurrencyButton: React.FC<{ onClick: () => void }> = (props) => (
  <SquareButton onClick={props.onClick} icon={'$'} title='Dollar (US)' secondary='Currency' />
)
const LanguageButton: React.FC<{ onClick: () => void }> = (props) => (
  <SquareButton onClick={props.onClick} icon={'EN'} title='English' secondary='Language' />
)
const ThemeButton = () => (
  <SquareButton
    onClick={() => console.log('theme')}
    icon={')'}
    title='Dark mode'
    secondary='Theme'
  />
)

const SquareButton: React.FC<{
  onClick: () => void
  icon: React.ReactNode
  title: React.ReactNode
  secondary: React.ReactNode
}> = (props) => {
  const { icon, title, secondary, onClick } = props
  return (
    <button
      onClick={onClick}
      className='flex flex-col items-center p-3 rounded-lg bg-actually-black dark:bg-white bg-opacity-10 hover:bg-opacity-5 dark:bg-opacity-10 dark:hover:bg-opacity-5 w-full transition'
    >
      <div className='h-11 w-11 px-2 py-3 text-xxs rounded-full flex flex-col text-center justify-center trans bg-gradient-magenta hover:bg-opacity-70 mb-1'>
        {icon}
      </div>
      <div className='text-xs'>{title}</div>
      <div className='text-xxxs opacity-50'>{secondary}</div>
    </button>
  )
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
const LanguageView: React.FC<{}> = () => {
  return null
}
