import React from 'react'
// import FeatherIcon from 'feather-icons-react'
import classNames from 'classnames'
import { FieldValues, UseFormRegister, UseFormReturn, UseFormSetValue } from 'react-hook-form'
import { Amount, i18nTranslate, Token } from 'src/types'

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
  heightClassName?: string
  inputClassName?: string
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
    heightClassName,
    inputClassName,
    form,
    inputKey,
    token,
    chainId,
    balance,
    t,
    validate,
    autoComplete
  } = props

  const { register, setValue, watch } = form

  const inputVal = watch(inputKey)

  return (
    <div
      className={classNames(
        className,
        widthClassName,
        heightClassName,
        'flex flex-col font-bold items-center'
      )}
    >
      <div className='flex flex-row space-x-2 justify-center'>
        <Input
          fontSizeClassName={classNames('transition text-10xl', inputClassName, {
            'w-1/3': inputVal?.length < 3,
            'w-2/5': inputVal?.length >= 3 && inputVal?.length < 4,
            'w-3/5': inputVal?.length >= 4 && inputVal?.length < 5,
            'w-4/5': inputVal?.length >= 5 && inputVal?.length < 6,
            'w-full': inputVal?.length >= 6
            // 'text-xl sm:text-8xl': inputVal?.length >= 12,
            // 'text-3xl sm:text-10xl': inputVal?.length >= 7 && inputVal?.length < 12,
            // 'text-10xl': !inputVal || inputVal?.length < 7
          })}
          autoComplete={autoComplete}
          register={register}
          inputKey={inputKey}
          validate={validate}
          t={t}
        />
        <InputToken className='text-xl xs:text-2xl' chainId={chainId} token={token} />
      </div>
      <MaxButton setValue={setValue} balance={balance} inputKey={inputKey} token={token} />
    </div>
  )
}

TokenAmountInputFlat.defaultProps = {
  inputClassName: '',
  bgClassName: 'bg-tertiary'
}

const InputToken = (props: { className?: string; chainId: number; token: Token }) => {
  const { token, className } = props

  if (!token) {
    return null
  }

  return (
    <div className={classNames(className, 'flex items-center')}>
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
  className?: string
  fontSizeClassName?: string
}

const Input = (props: InputProps) => {
  const { autoComplete, fontSizeClassName, className, register, inputKey, validate, t } = props

  const pattern = {
    value: /^\d*\.?\d*$/,
    message: t?.('pleaseEnterAPositiveNumber') || 'Please enter a positive number'
  }

  return (
    <input
      className={classNames(
        fontSizeClassName,
        className,
        'bg-transparent outline-none focus:outline-none active:outline-none text-right leading-none'
      )}
      placeholder='0.0'
      autoComplete={autoComplete}
      inputMode='decimal'
      {...register(inputKey, { required: true, pattern, validate })}
    />
  )
}

Input.defaultProps = {
  fontSizeClassName: 'text-xl xs:text-2xl'
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
    <div className={classNames('flex flex-row space-x-2 ml-auto items-center')}>
      <span className='font-light opacity-80'>Balance: {balance?.amountPretty || 0}</span>
      <button
        type='button'
        disabled={disabled}
        onClick={() => setValue(inputKey, balance.amount, { shouldValidate: true })}
        className={classNames('transition', {
          'opacity-50': disabled
        })}
      >
        {/* <FeatherIcon icon='credit-card' className='w-4 h-4' /> */}

        <span className='mx-auto font-bold'>{t?.('max') || 'Max'}</span>
      </button>
    </div>
  )
}
