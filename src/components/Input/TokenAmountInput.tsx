import React, { useEffect } from 'react'
import classNames from 'classnames'
import { Amount, Token } from '@pooltogether/hooks'
import {
  FieldValues,
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
  UseFormTrigger
} from 'react-hook-form'

import { TokenIcon } from '../Icons/TokenIcon'
import { ThemedClipSpinner } from '../Loading/ThemedClipSpinner'

import WalletIcon from '../../assets/Misc/icon-wallet.svg'
import { i18nTranslate } from 'src/types'

interface TokenAmountInputProps {
  inputKey: string
  form: UseFormReturn<FieldValues, object>
  chainId: number
  token: Token
  balance: Amount
  validate?: {
    [key: string]: (value: string) => boolean | string
  }
  isWalletConnected: boolean
  i18nKey: string
  t?: i18nTranslate
  className?: string
  widthClassName?: string
}

/**
 * For use in conjunction with react-hook-form.
 * @param props
 * @returns
 */
export const TokenAmountInput: React.FC<TokenAmountInputProps> = (props) => {
  const {
    className,
    widthClassName,
    form,
    inputKey,
    token,
    balance,
    isWalletConnected,
    chainId,
    t,
    validate,
    i18nKey
  } = props

  const { register, setValue, trigger } = form

  return (
    <div
      className={classNames(className, widthClassName, 'flex flex-col', 'font-inter', 'text-xl')}
    >
      <InputHeader
        i18nKey={i18nKey}
        t={t}
        inputKey={inputKey}
        balance={balance}
        token={token}
        isWalletConnected={isWalletConnected}
        setValue={setValue}
        trigger={trigger}
      />

      <div
        className={classNames(
          'p-0.5 bg-tertiary rounded-lg overflow-hidden',
          'transition-all hover:bg-gradient-cyan focus-within:bg-pt-gradient',
          'cursor-pointer'
        )}
      >
        <div className='bg-tertiary w-full rounded-lg flex'>
          <InputToken chainId={chainId} token={token} />
          <Input register={register} inputKey={inputKey} validate={validate} t={t} />
        </div>
      </div>
    </div>
  )
}

TokenAmountInput.defaultProps = {
  widthClassName: 'w-full'
}

interface InputHeaderProps {
  inputKey: string
  balance: Amount
  token: Token
  isWalletConnected: boolean
  setValue: UseFormSetValue<FieldValues>
  trigger: UseFormTrigger<FieldValues>
  i18nKey?: string
  t?: i18nTranslate
}

const InputHeader = (props: InputHeaderProps) => {
  const { inputKey, setValue, trigger, isWalletConnected, balance, token, i18nKey, t } = props

  // If the user input a larger amount than their wallet balance before connecting a wallet
  useEffect(() => {
    trigger(inputKey)
  }, [isWalletConnected, balance])

  const isBalanceFetched = isWalletConnected && Boolean(balance)

  return (
    <div className='flex justify-between font-inter text-xs uppercase font-semibold text-pt-purple-dark text-opacity-60 dark:text-pt-purple-lighter mb-1'>
      <span className={classNames('')}>{(i18nKey && t?.(i18nKey)) || 'Amount'}</span>
      {isWalletConnected && (
        <button
          id='_setMaxDepositAmount'
          type='button'
          className='font-bold inline-flex items-center '
          disabled={isBalanceFetched && balance.amountUnformatted.isZero()}
          onClick={(e) => {
            e.preventDefault()
            setValue(inputKey, balance.amount, { shouldValidate: true })
          }}
        >
          <img src={WalletIcon} className='mr-2' style={{ maxHeight: 12 }} />
          {!isBalanceFetched ? (
            <ThemedClipSpinner sizeClassName='w-3 h-3' className='mr-2 opacity-50' />
          ) : (
            <span className='mr-1'>{balance.amountPretty || 0}</span>
          )}
          {token && <span>{token.symbol}</span>}
        </button>
      )}
    </div>
  )
}

const InputToken = (props: { chainId: number; token: Token }) => {
  const { chainId, token } = props

  if (!token) {
    return null
  }

  return (
    <div
      className={classNames(
        'flex items-center',
        'py-4 pl-8 pr-4',
        'placeholder-white placeholder-opacity-50'
      )}
    >
      <TokenIcon
        sizeClassName='w-6 h-6'
        className='mr-2'
        chainId={chainId}
        address={token.address}
      />
      <span className='font-bold'>{token.symbol}</span>
    </div>
  )
}

interface InputProps {
  inputKey: string
  register: UseFormRegister<FieldValues>
  validate: {
    [key: string]: (value: string) => boolean | string
  }
  t?: i18nTranslate
}

const Input = (props: InputProps) => {
  const { register, inputKey, validate, t } = props

  const pattern = {
    value: /^\d*\.?\d*$/,
    message: t?.('pleaseEnterAPositiveNumber') || 'Please enter a positive number'
  }

  return (
    <input
      className={classNames(
        'bg-transparent w-full outline-none focus:outline-none active:outline-none text-right py-4 pr-8 pl-4 font-semibold'
      )}
      placeholder='0.0'
      {...register(inputKey, { required: true, pattern, validate })}
    />
  )
}
