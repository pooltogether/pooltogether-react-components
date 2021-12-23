import { BigNumber } from 'ethers'
import React from 'react'
import { useForm } from 'react-hook-form'

import { TokenAmountInput } from '../src/components/Input/TokenAmountInput'

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
  component: TokenAmountInput,
  argTypes: {}
}

export const TokenAmountInputExample = () => {
  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const message = form.formState.errors?.test?.message

  return (
    <div className='max-w-lg p-10'>
      <TokenAmountInput
        i18nKey='example'
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
  )
}
