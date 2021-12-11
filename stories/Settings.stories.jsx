import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SettingsContainer } from 'src/components/PageHeader/Settings/SettingsContainer'
import { SettingsItem } from 'src/components/PageHeader/Settings/SettingsItem'
import { ThemeSettingsItem } from 'src/components/PageHeader/Settings/ThemeSettingsItem'
import { TestnetSettingsItem } from 'src/components/PageHeader/Settings/TestnetSettingsItem'
import { LanguagePickerDropdown } from 'src/components/PageHeader/LanguagePickerDropdown'

const LanguagePicker = () => {
  const [currentLang, setCurrentLang] = useState('en')

  return (
    <SettingsItem label={'Language'}>
      <LanguagePickerDropdown
        className='text-white'
        currentLang={currentLang}
        changeLang={(newLang) => {
          setCurrentLang(newLang)
        }}
      />
    </SettingsItem>
  )
}

export default {
  component: SettingsContainer,
  argTypes: {}
}

const Template = (args) => {
  const { t } = useTranslation()

  return (
    <SettingsContainer t={t} className='ml-1 my-auto' title='Settings' sizeClassName='w-6 h-6'>
      <LanguagePicker />
      <ThemeSettingsItem t={t} />
      <TestnetSettingsItem t={t} />
    </SettingsContainer>
  )
}

export const PrimarySettingsContainer = Template.bind({})
PrimarySettingsContainer.args = {
  children: '',
  usersAddress: '0x5E6CC2397EcB33e6041C15360E17c777555A5E63',
  className: 'text-inverse'
}
