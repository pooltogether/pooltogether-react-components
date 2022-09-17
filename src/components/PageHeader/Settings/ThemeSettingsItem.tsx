import React from 'react'
import { useTheme } from 'next-themes'
import { SettingsItem } from './SettingsItem'
import { i18nTranslate } from 'src/types'

export const ThemeSettingsItem = (props: { t: i18nTranslate }) => {
  const { t } = props
  return (
    <SettingsItem label={t?.('theme') || 'Theme'}>
      <ThemeSwitcher t={t} />
    </SettingsItem>
  )
}

const ThemeSwitcher = (props: { t: i18nTranslate }) => {
  const { t } = props
  const { theme, themes, setTheme, systemTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(themes[(themes.indexOf(theme) + 1) % themes.length])}
      className='transition-opacity hover:opacity-70'
    >
      {theme === 'system' && (
        <b>{`${t?.('system') || 'System'} (${
          systemTheme === 'dark' ? t?.('dark') || 'Dark' : t?.('light') || 'Light'
        }) ⚙️`}</b>
      )}
      {theme === 'light' && <b>{`${t?.('light') || 'Light'} ☀️`}</b>}
      {theme === 'dark' && <b>{`${t?.('dark') || 'Dark'} 🌙`}</b>}
    </button>
  )
}

// <div className='toggle'></div>
// <div className='theme-toggler--names relative z-10 flex items-center justify-between'>
//   <span className='theme-toggler--light font-bold text-xxs ml-2 sm:ml-3'>
//     <FeatherIcon icon='sun' className='relative w-4 h-4 sm:w-3 sm:h-3' strokeWidth='3' />
//   </span>
//   <span className='theme-toggler--dark font-bold text-xxs mr-2 sm:mr-3'>
//     <FeatherIcon icon='moon' className='relative w-4 h-4 sm:w-3 sm:h-3' strokeWidth='3' />
//   </span>
// </div>
