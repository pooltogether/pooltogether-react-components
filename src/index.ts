// ------- Component Groups -------

// Buttons
export { AddTokenToMetamaskButton } from './components/Buttons/AddTokenToMetamaskButton'

export {
  SquareButtonTheme,
  SquareButtonSize,
  SquareButton,
  SquareLink,
  SquareButtonProps
} from './components/Buttons/SquareButton'

// Containers
export { Amount } from './components/Containers/Amount'
export { Banner, BannerTheme } from './components/Containers/Banner'
export { BasicTable } from './components/Containers/BasicTable'
export { Card, CardTheme, CardProps } from './components/Containers/Card'
export { Chip } from './components/Containers/Chip'
export { Collapse } from './components/Containers/Collapse'
export { CountBadge } from './components/Containers/CountBadge'
export { Tabs, Tab, Content, ContentPane } from './components/Containers/Tabs'
export { overrideToolTipPosition, Tooltip } from './components/Containers/Tooltip'

// Icons
export { CopyIcon } from './components/Icons/CopyIcon'
export { LinkIcon } from './components/Icons/LinkIcon'
export { TokenIcon } from './components/Icons/TokenIcon'
export { PoolIcon } from './components/Icons/PoolIcon'
export { NetworkIcon } from './components/Icons/NetworkIcon'
export { WalletIcon } from './components/Icons/WalletIcon'

// Input
export { CheckboxInputGroup } from './components/Input/CheckboxInputGroup'
export * from './components/Input/TokenAmountInput'
export { DropdownInputGroup } from './components/Input/DropdownInputGroup'
export { DropdownList } from './components/Input/DropdownList'
export { InputLabel } from './components/Input/InputLabel'
export { Switch } from './components/Input/Switch'

// Layout
export { DefaultLayout, SimpleLayout } from './components/Layout/PageLayout'
export { NotificationBannerContainer } from './components/Layout/NotificationBannerContainer'
export {
  notificationBannerVisibleAtom,
  NotificationBannerList
} from './components/Layout/NotificationBannerList'

// Links
export { ButtonLink } from './components/Links/ButtonLink'
export {
  BlockExplorerLink,
  formatBlockExplorerTxUrl,
  formatBlockExplorerAddressUrl
} from './components/Links/BlockExplorerLink'
export { ExternalLink, LinkTheme } from './components/Links/ExternalLink'

// Loading
export { LoadingLogo } from './components/Loading/LoadingLogo'
export { LoadingScreen } from './components/Loading/LoadingScreen'
export { ThemedClipSpinner } from './components/Loading/ThemedClipSpinner'
export { LoadingDots } from './components/Loading/LoadingDots'

// Modal
export { Modal, ModalTitle, ModalProps } from './components/Modal/Modal'
export { ModalNetworkGate } from './components/Modal/ModalNetworkGate'
export { ModalTransactionSubmitted } from './components/Modal/ModalTransactionSubmitted'

// Navigation
export { BottomNavContainer } from './components/Navigation/BottomNavContainer'
export { SocialLinks } from './components/Navigation/SocialLinks'
export { NavPoolBalance } from './components/Navigation/NavPoolBalance'

// PageHeader
export { SettingsContainer } from './components/PageHeader/Settings/SettingsContainer'
export { ThemeSettingsItem } from './components/PageHeader/Settings/ThemeSettingsItem'
export { TestnetSettingsItem } from './components/PageHeader/Settings/TestnetSettingsItem'
export { FeatureRequestSettingsItem } from './components/PageHeader/Settings/FeatureRequestSettingsItem'
export { SettingsItem } from './components/PageHeader/Settings/SettingsItem'
export { HeaderLogo } from './components/PageHeader/HeaderLogo'
export { LanguagePickerDropdown } from './components/PageHeader/LanguagePickerDropdown'
export { PageHeaderContainer } from './components/PageHeader/PageHeaderContainer'

// Prizes
export { PrizeCountdown } from './components/Prizes/PrizeCountdown'
export { SimpleCountDown } from './components/Prizes/SimpleCountdown'
export { Time, TimeProps } from './components/Prizes/Time'

// Components
export { Accordion, ContentWrapper } from './components/Accordion'
export { BottomSheet, BottomSheetTitle } from './components/BottomSheets/BottomSheet'
export * from './components/BottomSheets/BalanceBottomSheet'
export { CountUp } from './components/CountUp'
export { ErrorsBox } from './components/ErrorsBox'
export { PageTitleAndBreadcrumbs } from './components/PageTitleAndBreadcrumbs'
export { PoolCurrencyIcon } from './components/PoolCurrencyIcon'
export { PrizeFrequencyChip } from './components/PrizeFrequencyChip'
export { ThemeContext, ThemeContextProvider, ColorTheme } from './components/ThemeContextProvider'

// Toasts 🍞
export { ToastContainer } from 'react-toastify'
export { poolToast } from './services/poolToast'

// MetaMask Functionality
export { addTokenToMetamask } from './services/addTokenToMetamask'

// Styles
import './styles/index.css'
