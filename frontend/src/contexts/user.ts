import React, { createContext } from 'react'
import { DEFAULT_FIRE_TOKEN, DEFAULT_USER, TUser } from '../types/user'

export type TUserState = {
   user: TUser
   fire_token: string
}

export type TUserActions = {
   type: 'login' | 'logout' | 'authenticate'
   payload: TUserState
}

export const initialUserState: TUserState = {
   user: DEFAULT_USER,
   fire_token: DEFAULT_FIRE_TOKEN,
}

export const userReducer = (state: TUserState, action: TUserActions) => {
   let { user, fire_token } = action.payload

   switch (action.type) {
      case 'login':
         localStorage.setItem('fire_token', fire_token)
         return { user, fire_token }
      case 'logout':
         localStorage.removeItem('fire_token')
         return initialUserState
      default:
         return state
   }
}

export type TUserContextProps = {
   userState: TUserState
   userDispatch: React.Dispatch<TUserActions>
}

const UserContext = createContext<TUserContextProps>({
   userState: initialUserState,
   userDispatch: () => {},
})

export const UserContextConsumer = UserContext.Consumer
export const UserContextProvider = UserContext.Provider

export default UserContext
