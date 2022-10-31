import { BigNumber } from 'ethers'
import React from 'react'
import { useForm } from 'react-hook-form'

import { TokenAmountInputFlat } from '../src/components/Input/TokenAmountInputFlat'

const USDC = {
  symbol: 'USDC',
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  name: 'USDC',
  decimals: '6'
}

const BALANCE = {
  amount: '10',
  amountPretty: '10',
  amountUnformatted: BigNumber.from('10000000')
}

export default {
  component: TokenAmountInputFlat,
  argTypes: {}
}

export const TokenAmountInputFlatExample = () => {
  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const message = form.formState.errors?.test?.message

  return (
    <>
      <div className='max-w-xl p-1 mb-10 bg-actually-black bg-opacity-10'>
        <TokenAmountInputFlat
          inputKey='test'
          form={form}
          chainId={1}
          token={USDC}
          balance={BALANCE}
          validate={{
            isValid: (v: string) => {
              try {
                return Number(v) > Number(BALANCE.amount) ? 'Number is too large' : false
              } catch (e) {
                return 'NaN'
              }
            }
          }}
          isWalletConnected
        />
        <span className='text-red mt-4'>{message}</span>
      </div>
      <div className='max-w-sm p-1  bg-actually-black bg-opacity-10'>
        <TokenAmountInputFlat
          inputKey='test'
          form={form}
          chainId={1}
          token={USDC}
          balance={BALANCE}
          validate={{
            isValid: (v: string) => {
              try {
                return Number(v) > Number(BALANCE.amount) ? 'Number is too large' : false
              } catch (e) {
                return 'NaN'
              }
            }
          }}
          isWalletConnected
        />
        <span className='text-red mt-4'>{message}</span>
      </div>
    </>
  )
}
