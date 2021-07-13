import React, { FC } from 'react'

interface ISuccessTextProps {
   success: string
}

const SuccessText: FC<ISuccessTextProps> = (props) => {
   const { success } = props

   if (success === '') return null

   return <small className='text-success'>{success}</small>
}

export default SuccessText
