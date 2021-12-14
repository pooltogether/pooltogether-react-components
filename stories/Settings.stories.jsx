import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SocialLinks } from 'src/components/Navigation/SocialLinks'
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
        currentLang={currentLang}
        changeLang={(newLang) => {
          setCurrentLang(newLang)
        }}
      />
    </SettingsItem>
  )
}

const Template = (args) => <TemplateWrapper />

// Use wrapper so we don't break rule of hooks with `useTranslation()`
const TemplateWrapper = (args) => {
  const { t } = useTranslation()

  return (
    <>
      <SettingsContainer
        t={t}
        className='ml-1 my-auto'
        title='Settings'
        sizeClassName='w-6 h-6 overflow-hidden'
      >
        <div className='flex flex-col justify-between h-full sm:h-auto'>
          <div>
            <LanguagePicker />
            <ThemeSettingsItem t={t} />
            <TestnetSettingsItem t={t} />
          </div>
          <div className='sm:pt-24'>
            <SocialLinks t={t} />
          </div>
        </div>
      </SettingsContainer>
    </>
  )
}

export default {
  component: SettingsContainer,
  argTypes: {}
}

export const PrimarySettingsContainer = Template.bind({})
PrimarySettingsContainer.args = {
  children: ''
}
