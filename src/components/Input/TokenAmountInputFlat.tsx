import React from 'react'
import classNames from 'classnames'
import { Amount, Token } from '@pooltogether/hooks'
import { FieldValues, UseFormRegister, UseFormReturn, UseFormSetValue } from 'react-hook-form'

import { i18nTranslate } from 'src/types'

interface TokenAmountInputFlatProps {
  inputKey: string
  form: UseFormReturn<FieldValues, object>
  chainId: number
  token: Token
  balance: Amount
  validate?: {
    [key: string]: (value: string) => boolean | string
  }
  isWalletConnected: boolean
  t?: i18nTranslate
  className?: string
  widthClassName?: string
  bgClassName?: string
  autoComplete?: string
}

/**
 * For use in conjunction with react-hook-form.
 * @param props
 * @returns
 */
export const TokenAmountInputFlat: React.FC<TokenAmountInputFlatProps> = (props) => {
  const {
    className,
    widthClassName,
    form,
    inputKey,
    token,
    chainId,
    balance,
    t,
    validate,
    autoComplete
  } = props

  const { register, setValue } = form

  return (
    <div
      className={classNames(
        className,
        widthClassName,
        'flex flex-row text-xl xs:text-2xl font-bold space-x-2'
      )}
    >
      <MaxButton setValue={setValue} balance={balance} inputKey={inputKey} token={token} />
      <Input
        autoComplete={autoComplete}
        register={register}
        inputKey={inputKey}
        validate={validate}
        t={t}
      />
      <InputToken chainId={chainId} token={token} />
    </div>
  )
}

TokenAmountInputFlat.defaultProps = {
  widthClassName: 'w-full',
  bgClassName: 'bg-tertiary'
}

const InputToken = (props: { chainId: number; token: Token }) => {
  const { token } = props

  if (!token) {
    return null
  }

  return (
    <div className={classNames('flex items-center', 'placeholder-white placeholder-opacity-50')}>
      <span className=''>{token.symbol}</span>
    </div>
  )
}

interface InputProps {
  autoComplete?: string
  inputKey: string
  register: UseFormRegister<FieldValues>
  validate: {
    [key: string]: (value: string) => boolean | string
  }
  t?: i18nTranslate
}

const Input = (props: InputProps) => {
  const { autoComplete, register, inputKey, validate, t } = props

  const pattern = {
    value: /^\d*\.?\d*$/,
    message: t?.('pleaseEnterAPositiveNumber') || 'Please enter a positive number'
  }

  return (
    <input
      className={classNames(
        'bg-transparent outline-none w-full text-xl xs:text-2xl focus:outline-none active:outline-none text-right flex-grow'
      )}
      placeholder='0.0'
      autoComplete={autoComplete}
      {...register(inputKey, { required: true, pattern, validate })}
    />
  )
}

const MaxButton: React.FC<{
  t?: i18nTranslate
  setValue: UseFormSetValue<FieldValues>
  balance: Amount
  inputKey: string
  token: Token
}> = (props) => {
  const { t, inputKey, setValue, balance } = props

  const disabled = !balance || balance.amountUnformatted.isZero()

  return (
    <button
      type='button'
      disabled={disabled}
      onClick={() => setValue(inputKey, balance.amount)}
      className={classNames(
        'h-11 w-11 px-2 py-3 text-xxs rounded-full flex flex-col text-center justify-center trans',
        {
          'dark:bg-actually-black dark:opacity-10 bg-white opacity-10': disabled,
          'dark:bg-actually-black dark:bg-opacity-30 dark:hover:bg-opacity-10 bg-white bg-opacity-30 hover:bg-opacity-10':
            !disabled
        }
      )}
    >
      <span className='mx-auto'>{t?.('max') || 'Max'}</span>
    </button>
  )
}
