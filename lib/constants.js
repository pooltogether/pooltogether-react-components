import { SECONDS_PER_DAY } from '@pooltogether/current-pool-data'

export const MOCK_POOL = {
  chainId: 1,
  prize: {
    prizePeriodSeconds: Math.random(1) > 0.5 ? SECONDS_PER_DAY.toString() : false
  },
  tokens: {
    underlyingToken: {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f'
    }
  }
}

export const DEFAULT_INPUT_CLASSES =
  'w-full text-inverse bg-transparent trans focus:outline-none leading-none'
export const DEFAULT_INPUT_LABEL_CLASSES = 'mt-0 mb-1 text-xs sm:text-sm'
export const DEFAULT_INPUT_GROUP_CLASSES = 'trans py-2 px-5 sm:py-4 sm:px-10 bg-body'

export const HOTKEYS_KEY_MAP = {
  TOGGLE_THEME: 'ctrl+shift+t'
}

export const POOL_ADDRESS = '0x0cec1a9154ff802e7934fc916ed7ca50bde6844e'
