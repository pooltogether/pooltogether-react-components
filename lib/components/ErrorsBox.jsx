import React from 'react'
import { isEmpty } from 'lodash'

export function ErrorsBox (props) {
  const { errors } = props

  if (isEmpty(errors)) return null

  const errorMessages = Object.values(errors).map((error) => error.message)

  return (
    <div
      className='font-semibold font-inter text-red text-center mb-2'
      style={{
        minHeight: 24
      }}
    >
      {errorMessages.map((errorMsg) => errorMsg)}
    </div>
  )
}
