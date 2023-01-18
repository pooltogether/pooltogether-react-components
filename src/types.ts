import { BigNumber } from 'ethers/lib/ethers'

export type i18nTranslate = (i18nKey: string, data?: { [key: string]: string }) => string

export type Amount = {
  amount: string
  amountUnformatted: BigNumber
  amountPretty: string
}

export type Token = {
  address: string
  symbol: string
  name: string
  decimals: string
}

export type Currencies = {
  [id: string]: { name: string; symbol: string }
}

export type Languages = {
  [locale: string]: { name: string; nativeName: string }
}
