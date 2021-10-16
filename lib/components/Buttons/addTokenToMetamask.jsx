const DEFAULT_TOKEN_PRECISION = 18

export const addTokenToMetaMask = async (
  t,
  symbol,
  tokenAddress,
  decimals = DEFAULT_TOKEN_PRECISION,
  tokenImgUrl = 'https://app.pooltogether.com/pooltogether-token-logo@2x.png'
) => {
  try {
    symbol = symbol.replace('-', '').substr(0, 5)

    return await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals, // The number of decimals in the token
          image: tokenImgUrl
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
}
