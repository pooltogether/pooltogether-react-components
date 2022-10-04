import React from 'react'
import classnames from 'classnames'
import Cookies from 'js-cookie'

import { DropdownList } from '../Input/DropdownList'

const LANGS = {
  en: {
    name: 'English',
    nativeName: 'English'
  },
  de: {
    name: 'German',
    nativeName: 'Deutsch'
  },
  es: {
    name: 'Spanish',
    nativeName: 'Español'
  },
  fa: {
    name: 'Persian',
    nativeName: 'فارسی'
  },
  fil: {
    name: 'Filipino',
    nativeName: 'Filipino'
  },
  fr: {
    name: 'French',
    nativeName: 'Français'
  },
  hi: {
    name: 'Hindi',
    nativeName: 'Hindī'
  },
  it: {
    name: 'Italian',
    nativeName: 'Italiana'
  },
  ko: {
    name: 'Korean',
    nativeName: '한국어 (韓國語)'
  },
  pt: {
    name: 'Portuguese',
    nativeName: 'Português'
  },
  sk: {
    name: 'Slovak',
    nativeName: 'Slovenčina'
  },
  tr: {
    name: 'Turkish',
    nativeName: 'Türkçe'
  },
  zh: {
    name: 'Zhōngwén',
    nativeName: '中文'
  }
}

interface LanguagePickerDropdownProps {
  locales: string[]
  currentLang: string
  onValueSet: (locale: string) => void
  className?: string
}

// TODO: Switch this back to being dynamically generated based on locize
export function LanguagePickerDropdown(props: LanguagePickerDropdownProps) {
  const { locales, currentLang, onValueSet, className } = props

  const formatValue = (locale) => {
    const lang = LANGS[locale]

    return (
      <>
        {locale} - <span className='capitalize'>{lang.nativeName.split(',')[0]}</span> (
        {lang.name.split(';')[0]})
      </>
    )
  }

  return (
    <DropdownList
      id='language-picker-dropdown'
      className={classnames('text-sm sm:text-sm', className)}
      label={currentLang}
      formatValue={formatValue}
      onValueSet={(locale) => {
        Cookies.set('NEXT_LOCALE', locale)
        onValueSet(locale)
      }}
      current={currentLang}
      values={locales}
    />
  )
}
