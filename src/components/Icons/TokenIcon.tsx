import React from 'react'
import classnames from 'classnames'
import { useCoingeckoTokenImage } from '@pooltogether/hooks'
import { NETWORK } from '@pooltogether/utilities'

export const TokenIcon: React.FC<{
  chainId: number
  address: string
  sizeClassName?: string
  className?: string
  style?: object
  onClick?: React.MouseEventHandler<HTMLImageElement>
}> = (props) => {
  const imageOverride = getParameterCaseInsensitive(
    TOKEN_IMAGE_OVERRIDES?.[props.chainId],
    props.address?.toLowerCase()
  )

  if (imageOverride) {
    return <TokenIconImg {...props} src={imageOverride} />
  }
  return <CoingeckoTokenIcon {...props} />
}

const CoingeckoTokenIcon: React.FC<{
  chainId: number
  address: string
  sizeClassName?: string
  className?: string
  style?: object
  onClick?: React.MouseEventHandler<HTMLImageElement>
}> = (props) => {
  const { data: tokenImage } = useCoingeckoTokenImage(props.chainId, props.address)
  return <TokenIconImg {...props} src={tokenImage} />
}

const TokenIconImg: React.FC<{
  src: string
  sizeClassName?: string
  className?: string
  style?: object
  onClick?: React.MouseEventHandler<HTMLImageElement>
}> = (props) => {
  if (!props.src) {
    return (
      <div
        className={classnames(
          'inline-block rounded-full bg-overlay-white',
          props.className,
          props.sizeClassName
        )}
        onClick={props.onClick}
      />
    )
  }

  return (
    <img
      src={props.src}
      className={classnames('inline-block rounded-full', props.className, props.sizeClassName)}
      onClick={props.onClick}
      alt={`token icon`}
      style={props.style}
    />
  )
}

TokenIcon.defaultProps = {
  sizeClassName: 'w-5 h-5'
}

// TODO: Import all images from the builder

import CELO from '../../assets/Tokens/celo-orange.png'
import CUSD from '../../assets/Tokens/cusd.png'
import CEUR from '../../assets/Tokens/ceur.png'
import ARTO from '../../assets/Tokens/arto.png'
import RAI from '../../assets/Tokens/rai.png'
import BNB from '../../assets/Tokens/bnb.svg'
import CAKE from '../../assets/Tokens/cake.png'
import aDAI from '../../assets/Tokens/adai.png'
import DAI from '../../assets/Tokens/dai.png'
import GUSD from '../../assets/Tokens/gusd.svg'
import INDEX from '../../assets/Tokens/index.png'
import DGT from '../../assets/Tokens/dgt.png'
import POOL from '../../assets/Tokens/pool.svg'
import BADGER from '../../assets/Tokens/badger.png'
import WETH from '../../assets/Networks/ethereum-icon.png'
import BUSD from '../../assets/Tokens/busd.svg'
import SUSD from '../../assets/Tokens/susd.png'
import USDC from '../../assets/Tokens/usdc.png'
import UNI from '../../assets/Tokens/uni.png'
import DPI from '../../assets/Tokens/dpi.png'
import USDT from '../../assets/Tokens/usdt.png'
import SUSHI from '../../assets/Tokens/sushi.png'
import COMP from '../../assets/Tokens/comp.svg'
import BOND from '../../assets/Tokens/bond.png'
import AAVE from '../../assets/Tokens/aave.png'
import STKAAVE from '../../assets/Tokens/stkaave.png'
import DEFISOCKS from '../../assets/Tokens/defisocks.png'
import BOOKS from '../../assets/Tokens/books.png'
import LOTTO from '../../assets/Tokens/lotto.png'
import PPOOL from '../../assets/Tokens/ppool.png'
import PCCCOMP from '../../assets/Tokens/pcccomp.png'
import PCUSDC from '../../assets/Tokens/pcusdc.png'
import PCUNI from '../../assets/Tokens/pcuni.png'
import PCDAI from '../../assets/Tokens/pcdai.png'
import PT_XSUSHI_TICKET from '../../assets/Tokens/pt-xsushi.png'
import PT_BADGER_TICKET from '../../assets/Tokens/pt-badger.png'
import PT_DAI_SPONSORSHIP from '../../assets/Tokens/pt-dai-sponsorship.png'
import PT_USDC_SPONSORSHIP from '../../assets/Tokens/pt-usdc-sponsorship.png'
import WMATIC from '../../assets/Tokens/wmatic.png'
import PT_USDT_TICKET from '../../assets/Tokens/pt-usdt.png'
import PT_USDT_SPONSORSHIP from '../../assets/Tokens/pt-usdt-sponsorship.png'
import PT_CELO_USD_TICKET from '../../assets/Tokens/pt-celo-usd-ticket.png'
import PT_CELO_EUR_TICKET from '../../assets/Tokens/pt-celo-eur-ticket.png'
import SOHM from '../../assets/Tokens/sohm.png'
import PTaUSDC from '../../assets/Tokens/ptausdc.png'
import TCAP from '../../assets/Tokens/tcap.png'
import UNI_V2_LP_TICKET from '../../assets/Tokens/uni-v2-lp-pool.png'
import WAVAX from '../../assets/Tokens/wavax.png'
import OP from '../../assets/Tokens/optimism-icon.png'

/**
 * Sometimes the CoinGecko images aren't the prettiest
 */
export const TOKEN_IMAGE_OVERRIDES = Object.freeze({
  [NETWORK.mainnet]: {
    '0x57bc752ec42238bb60a6e65b0de82ef44013225d': ARTO,
    '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919': RAI,
    '0x6b175474e89094c44da98b954eedeac495271d0f': DAI,
    '0x028171bca77440897b824ca71d1c56cac55b68a3': aDAI,
    '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd': GUSD,
    '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2': SUSHI,
    '0xc00e94cb662c3520282e6f5717214004a7f26888': COMP,
    '0x0954906da0bf32d5479e25f46056d22f08464cab': INDEX,
    '0x8b9c35c79af5319c70dd9a3e3850f368822ed64e': DGT,
    '0x0cec1a9154ff802e7934fc916ed7ca50bde6844e': POOL,
    '0x0391d2021f89dc339f60fff84546ea23e337750f': BOND,
    '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9': AAVE,
    '0x4da27a545c0c5b758a6ba100e3a049001de870f5': STKAAVE,
    '0x9d942bd31169ed25a1ca78c776dab92de104e50e': DEFISOCKS,
    '0x117c2aca45d87958ba054cb85af0fd57be00d624': BOOKS,
    '0xb0dfd28d3cf7a5897c694904ace292539242f858': LOTTO,
    '0x3472a5a71965499acd81997a54bba8d852c6e53d': BADGER,
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': WETH,
    '0x4fabb145d64652a948d72533023f6e7a623c7c53': BUSD,
    '0x57ab1ec28d129707052df4df418d58a2d46d5f51': SUSD,
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': USDC,
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984': UNI,
    '0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b': DPI,
    '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0': WMATIC,
    '0xdac17f958d2ee523a2206206994597c13d831ec7': USDT,
    '0x334cbb5858417aee161b53ee0d5349ccf54514cf': PCDAI,
    '0xd81b1a8b1ad00baa2d6609e0bae28a38713872f7': PCUSDC,
    '0x27d22a7648e955e510a40bdb058333e9190d12d4': PPOOL,
    '0x27b85f596feb14e4b5faa9671720a556a7608c69': PCCCOMP,
    '0xa92a861fc11b99b24296af880011b47f9cafb5ab': PCUNI,
    '0xfa831a04cb52fc89dd519d08dc5e94ab2df52b7e': PT_BADGER_TICKET,
    '0x0a2e7f69fe9588fa7fba5f5864236883cd4aac6d': PT_DAI_SPONSORSHIP,
    '0x391a437196c81eea7bbbbd5ed4df6b49de4f5c96': PT_USDC_SPONSORSHIP,
    '0xfdc192c153044dedb67c5a17b8651951cf70ee4a': PT_XSUSHI_TICKET,
    '0x04f2694c8fcee23e8fd0dfea1d4f5bb8c352111f': SOHM,
    '0xdd4d117723c257cee402285d3acf218e9a8236e1': PTaUSDC,
    '0x16c52ceece2ed57dad87319d91b5e3637d50afa4': TCAP,
    '0xeb8928ee92efb06c44d072a24c2bcb993b61e543': UNI_V2_LP_TICKET,
    '0x85cb0bab616fe88a89a35080516a8928f38b518b': UNI
  },
  [NETWORK.rinkeby]: {
    '0xc4e90a8dc6caab329f08ed3c8abc6b197cf0f40a': POOL,
    '0x6a9865ade2b6207daac49f8bcba9705deb0b0e6d': DAI,
    '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea': DAI,
    '0x4aaded56bd7c69861e8654719195fca9c670eb45': DAI,
    '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b': USDC,
    '0xeb8f08a975ab53e34d8a0330e0d34de942c95926': USDC,
    '0xb18d016cdd2d9439a19f15633005a6b2cd6aa774': USDC
  },
  [NETWORK.polygon]: {
    '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270': WMATIC,
    '0x85e16156eb86a134ac6db5754be6c5e1c7f1aa59': PT_USDT_SPONSORSHIP,
    '0x9ecb26631098973834925eb453de1908ea4bdd4e': PT_USDT_TICKET,
    '0xc2132d05d31c914a87c6611c10748aeb04b58e8f': USDT,
    '0x25788a1a171ec66da6502f9975a15b609ff54cf6': POOL,
    '0x19c0e557ee5a9b456f613ba3d025a4dc45b52c35': PT_USDC_SPONSORSHIP,
    '0x6a304dfdb9f808741244b6bfee65ca7b3b3a6076': PTaUSDC
  },
  [NETWORK.bsc]: {
    '0xe9e7cea3dedca5984780bafc599bd69add087d56': BUSD,
    '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c': BNB,
    '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82': CAKE
  },
  [NETWORK.celo]: {
    '0x765de816845861e75a25fca122bb6898b8b1282a': CUSD,
    '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73': CEUR,
    '0x471ece3750da237f93b8e339c536989b8978a438': CELO,
    '0xddbdbe029f9800f7c49764f15a1a1e55755648e4': PT_CELO_EUR_TICKET,
    '0xa45ba19df569d536251ce65dd3120bf7873e14ec': PT_CELO_USD_TICKET
  },
  [NETWORK.avalanche]: {
    '0xb27f379c050f6ed0973a01667458af6ecebc1d90': PTaUSDC,
    '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7': WAVAX
  },
  [NETWORK.optimism]: {
    '0x5E5b54cd73872ba3103cd95A58067A7079d0259b': PTaUSDC,
    '0x62BB4fc73094c83B5e952C2180B23fA7054954c4': PTaUSDC,
    '0x4200000000000000000000000000000000000042': OP
  }
})

/**
 * @param {Object} object
 * @param {string} key
 * @return {any} value
 *
 * Allows you to not worry about putting keys in the TOKEN_IMAGE_OVERRIDES object checksummed or lowercase
 */
function getParameterCaseInsensitive(object, key) {
  return object?.[Object.keys(object).find((k) => k.toLowerCase() === key?.toLowerCase())]
}
