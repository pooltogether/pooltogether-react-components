// ------- Component Groups -------

// App Container
export { AppContainer } from './components/AppContainer'

// Buttons
export {
  SquareButtonTheme,
  SquareButtonSize,
  SquareButton,
  SquareLink,
  SquareButtonProps
} from './components/Buttons/SquareButton'

// Containers
export { Banner, BannerTheme } from './components/Containers/Banner'
export { BasicTable } from './components/Containers/BasicTable'
export { Card, CardTheme, CardProps } from './components/Containers/Card'
export { Chip } from './components/Containers/Chip'
export { Collapse } from './components/Containers/Collapse'
export { CountBadge } from './components/Containers/CountBadge'
export { overrideToolTipPosition, Tooltip } from './components/Containers/Tooltip'

// Icons
export { CopyIcon } from './components/Icons/CopyIcon'
export { LinkIcon } from './components/Icons/LinkIcon'
export { TokenIcon } from './components/Icons/TokenIcon'
export { PoolIcon } from './components/Icons/PoolIcon'
export { NetworkIcon } from './components/Icons/NetworkIcon'

// Input
export { CheckboxInputGroup } from './components/Input/CheckboxInputGroup'
export * from './components/Input/TokenAmountInput'
export { DropdownInputGroup } from './components/Input/DropdownInputGroup'
export { DropdownList } from './components/Input/DropdownList'
export { InputLabel } from './components/Input/InputLabel'
export { TextInputGroup } from './components/Input/TextInputGroup'
export { SimpleInput, RoundInput, RectangularInput } from './components/Input/TextInputs'
export { Switch } from './components/Input/Switch'

// Layout
export { DefaultLayout, SimpleLayout } from './components/Layout/PageLayout'
export { NotificationBannerContainer } from './components/Layout/NotificationBannerContainer'
export {
  notificationBannerVisibleAtom,
  NotificationBannerList
} from './components/Layout/NotificationBannerList'

// Links
export {
  BlockExplorerLink,
  formatBlockExplorerTxUrl,
  formatBlockExplorerAddressUrl
} from './components/Links/BlockExplorerLink'
export { ExternalLink, LinkTheme } from './components/Links/ExternalLink'
export { SocialLinks } from './components/Links/SocialLinks'

// Loading
export { LoadingLogo } from './components/Loading/LoadingLogo'
export { LoadingScreen } from './components/Loading/LoadingScreen'
export { LoadingSpinner } from './components/Loading/LoadingSpinner'
export { LoadingDots } from './components/Loading/LoadingDots'

// Modal
export { Modal, ModalTitle, ModalProps } from './components/Modal/Modal'

// PageHeader
export { SettingsContainer } from './components/PageHeader/Settings/SettingsContainer'
export { ThemeSettingsItem } from './components/PageHeader/Settings/ThemeSettingsItem'
export { TestnetSettingsItem } from './components/PageHeader/Settings/TestnetSettingsItem'
export { FeatureRequestSettingsItem } from './components/PageHeader/Settings/FeatureRequestSettingsItem'
export { SettingsItem } from './components/PageHeader/Settings/SettingsItem'
export { HeaderLogo } from './components/PageHeader/HeaderLogo'
export { LanguagePickerDropdown } from './components/PageHeader/LanguagePickerDropdown'
export { NetworkSelector } from './components/PageHeader/NetworkSelector'
export { PageHeaderContainer } from './components/PageHeader/PageHeaderContainer'
export { Account } from './components/PageHeader/Account/index'

// Prizes
export { PrizeCountdown } from './components/Time/PrizeCountdown'
export { SimpleCountDown } from './components/Time/SimpleCountdown'
export { Time, TimeProps } from './components/Time/Time'

// Components
export { Accordion, ContentWrapper } from './components/Accordion'
export { BottomSheet, snapTo90 } from './components/BottomSheets/BottomSheet'
export { CountUp } from './components/CountUp'
export { ErrorsBox } from './components/ErrorsBox'
export { ThemeContext, ThemeContextProvider, ColorTheme } from './components/ThemeContextProvider'

// Toasts 🍞
export { ToastContainer } from 'react-toastify'
export { toast } from './services/toast'

// // Styles
import './styles/tailwind.css'

import './styles/colors.css'
import './styles/toast.css'
import './styles/toggle.css'
import './styles/layout.css'
import './styles/typography.css'
import './styles/tables.css'
import './styles/animations.css'
import './styles/tooltip.css'
import './styles/bottomSheet.css'
import './styles/forms.css'
import './styles/reach--custom.css'
import './styles/SquareButton.css'
