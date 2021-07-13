import React, { FC } from 'react'

interface IErrorTextProps {
   error: string
}

const ErrorText: FC<IErrorTextProps> = (props) => {
   const { error } = props

   if (error === '') return null

   return <small className='text-danger'>{error}</small>
}

export default ErrorText
