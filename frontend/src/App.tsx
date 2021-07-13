import React, { FC, useEffect, useReducer, useState } from 'react'
import { Route, RouteChildrenProps, Switch } from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import { LoadingComponent } from './components/Loading'
import routes from './config/routes'
import {
   initialUserState,
   UserContextProvider,
   userReducer,
} from './contexts/user'

export interface IAppProps {}

const App: FC<IAppProps> = (props) => {
   const [userState, userDispatch] = useReducer(userReducer, initialUserState)
   const [loading, setLoading] = useState<boolean>(true)

   // Used for Debugging
   const [authStage, setAuthStage] = useState<string>(
      'Checking localstorage ...'
   )

   useEffect(() => {
      setTimeout(() => {
         checkLocalStorageForCredentials()
      }, 1000)
   }, [])

   /**
    * Check to see if we have a token.
    * If we do, verify it with the backend,
    * If not, we are logged out initially
    */

   const checkLocalStorageForCredentials = () => {
      setAuthStage('Checking credentials ...')
      const fire_token = localStorage.getItem('fire_token')

      if (fire_token === null) {
         userDispatch({ type: 'logout', payload: initialUserState })
         setAuthStage('No credentials found.')
         setTimeout(() => {
            setLoading(false)
         }, 1000)
      } else {
         /** validate with the backend */
         setAuthStage('Credentials found, validating ...')
         setTimeout(() => {
            setLoading(false)
         }, 1000)
      }
   }

   const userContextValues = {
      userState,
      userDispatch,
   }

   if (loading) {
      return <LoadingComponent>{authStage}</LoadingComponent>
   }

   return (
      <UserContextProvider value={userContextValues}>
         <Switch>
            {routes.map((route, i) => {
               if (route.auth) {
                  ;<Route
                     key={i}
                     exact={route.exact}
                     path={route.path}
                     render={(routeProps: RouteChildrenProps<any>) => (
                        <AuthRoute>
                           <route.component {...routeProps} />
                        </AuthRoute>
                     )}
                  />
               }
               return (
                  <Route
                     key={i}
                     exact={route.exact}
                     path={route.path}
                     render={(routeProps: RouteChildrenProps<any>) => (
                        <route.component {...routeProps} />
                     )}
                  />
               )
            })}
         </Switch>
      </UserContextProvider>
   )
}

export default App
