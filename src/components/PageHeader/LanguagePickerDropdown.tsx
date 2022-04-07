import React from 'react'
import classnames from 'classnames'

import { DropdownList } from '../Input/DropdownList'

interface LanguagePickerDropdownProps {
  langs: { [locale: string]: { name: string; nativeName: string } }
  currentLang: string
  changeLang: (locale: string) => void
  className?: string
}

// TODO: Switch this back to being dynamically generated based on locize
export function LanguagePickerDropdown(props: LanguagePickerDropdownProps) {
  const { langs, currentLang, changeLang, className } = props

  const formatValue = (key) => {
    const lang = langs[key]

    return (
      <>
        {key} - <span className='capitalize'>{lang.nativeName.split(',')[0]}</span> (
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
      onValueSet={changeLang}
      current={currentLang}
      values={langs}
    />
  )
}
