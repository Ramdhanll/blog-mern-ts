import React, { FC, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import logging from '../../config/logging'
import UserContext from '../../contexts/user'

export interface IAuthRouteProps {}

const AuthRoute: FC<IAuthRouteProps> = (props) => {
   const { children } = props

   const { userState } = useContext(UserContext)

   if (userState.user._id === '') {
      logging.info('Unauthorized, redirection ....')
      return <Redirect to='/login' />
   } else {
      return <> {children} </>
   }
}

export default AuthRoute
