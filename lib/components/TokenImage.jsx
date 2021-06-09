import React, { useEffect } from 'react'
import classnames from 'classnames'
import { useCoingeckoTokenImage } from '@pooltogether/hooks'
import { NETWORK } from '@pooltogether/utilities'

export const TokenImage = (props) => {
  const { sizeClassName, className, chainId, address } = props

  const { data: tokenImage, isFetched } = useCoingeckoTokenImage(chainId, address)

  const imageOverride = TOKEN_IMAGE_OVERRIDES[chainId][address]

  if (imageOverride || isFetched) {
    const src = imageOverride || tokenImage

    return (
      <img
        src={src}
        className={classnames('inline-block rounded-full', className, sizeClassName)}
      />
    )
  }

  return (
    <div
      className={classnames('inline-block rounded-full bg-overlay-white', className, sizeClassName)}
    />
  )
}

TokenImage.defaultProps = {
  sizeClassName: 'w-5 h-5'
}

// TODO: Import all images from the builder

// Mainnet
import BOND from '../assets/Tokens/0x0391d2021f89dc339f60fff84546ea23e337750f.png'
import ARTO from '../assets/Tokens/0x57bc752ec42238bb60a6e65b0de82ef44013225d.png'
import RAI from '../assets/Tokens/0x03ab458634910aad20ef5f1c8ee96f1d6ac54919.png'
import DAI from '../assets/Tokens/0x6b175474e89094c44da98b954eedeac495271d0f.png'
import GUSD from '../assets/Tokens/0x056fd409e1d7a124bd7017459dfea2f387b6d5cd.png'
import AAVE from '../assets/Tokens/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png'
import INDEX from '../assets/Tokens/0x0954906da0bf32d5479e25f46056d22f08464cab.png'
import DGT from '../assets/Tokens/0x8b9c35c79af5319c70dd9a3e3850f368822ed64e.png'
import POOL from '../assets/Tokens/0x0cec1a9154ff802e7934fc916ed7ca50bde6844e.svg'
import DEFISOCKS from '../assets/Tokens/0x9d942bd31169ed25a1ca78c776dab92de104e50e.png'
import BOOKS from '../assets/Tokens/0x117c2aca45d87958ba054cb85af0fd57be00d624.png'
import LOTTO from '../assets/Tokens/0xb0dfd28d3cf7a5897c694904ace292539242f858.png'
import BADGER from '../assets/Tokens/0x3472a5a71965499acd81997a54bba8d852c6e53d.png'
import WETH from '../assets/Tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png'
import BUSD from '../assets/Tokens/0x4fabb145d64652a948d72533023f6e7a623c7c53.svg'
import SUSD from '../assets/Tokens/0x57ab1ec28d129707052df4df418d58a2d46d5f51.png'
import DPI from '../assets/Tokens/0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b.png'
import USDT from '../assets/Tokens/0xc2132d05d31c914a87c6611c10748aeb04b58e8f.png'
import PCDAI from '../assets/Tokens/0x0a2e7f69fe9588fa7fba5f5864236883cd4aac6d.png'
import PCUSDC from '../assets/Tokens/0x391a437196c81eea7bbbbd5ed4df6b49de4f5c96.png'
// Polygon
import WMATIC from '../assets/Tokens/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270.png'

/**
 * Sometimes the CoinGecko images aren't the prettiest
 */
export const TOKEN_IMAGE_OVERRIDES = Object.freeze({
  [NETWORK.mainnet]: {
    '0x0391d2021f89dc339f60fff84546ea23e337750f': BOND,
    '0x57bc752ec42238bb60a6e65b0de82ef44013225d': ARTO,
    '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919': RAI,
    '0x6b175474e89094c44da98b954eedeac495271d0f': DAI,
    '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd': GUSD,
    '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9': AAVE,
    '0x0954906da0bf32d5479e25f46056d22f08464cab': INDEX,
    '0x8b9c35c79af5319c70dd9a3e3850f368822ed64e': DGT,
    '0x0cec1a9154ff802e7934fc916ed7ca50bde6844e': POOL,
    '0x9d942bd31169ed25a1ca78c776dab92de104e50e': DEFISOCKS,
    '0x117c2aca45d87958ba054cb85af0fd57be00d624': BOOKS,
    '0xb0dfd28d3cf7a5897c694904ace292539242f858': LOTTO,
    '0x3472a5a71965499acd81997a54bba8d852c6e53d': BADGER,
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': WETH,
    '0x4fabb145d64652a948d72533023f6e7a623c7c53': BUSD,
    '0x57ab1ec28d129707052df4df418d58a2d46d5f51': SUSD,
    '0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b': DPI,
    '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0': WMATIC,
    '0xdac17f958d2ee523a2206206994597c13d831ec7': USDT,
    '0x0a2e7f69fe9588fa7fba5f5864236883cd4aac6d': PCDAI,
    '0x334cbb5858417aee161b53ee0d5349ccf54514cf': PCDAI,
    '0x391a437196c81eea7bbbbd5ed4df6b49de4f5c96': PCUSDC,
    '0xd81b1a8b1ad00baa2d6609e0bae28a38713872f7': PCUSDC
  },
  [NETWORK.polygon]: {
    '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270': WMATIC,
    '0xc2132d05d31c914a87c6611c10748aeb04b58e8f': USDT
  }
})
