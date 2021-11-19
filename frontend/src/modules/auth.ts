import { TUser } from './../types/user'
import { auth } from './../config/firebase'
import { AuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'

import axios from 'axios'
import config from '../config/config'
import logging from '../config/logging'

// export const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) =>
//    new Promise<firebase.auth.UserCredential>((resolve, reject) => {
//       console.log('asdasdas', provider)
//       auth
//          .signInWithPopup(provider)
//          .then((result) => resolve(result))
//          .catch((e) => reject(e))
//    })

export const SignInWithSocialMedia = (provider: AuthProvider) =>
   new Promise<UserCredential>((resolve, reject) => {
      signInWithPopup(auth, provider)
         .then((result) => resolve(result))
         .catch((error) => reject(error))
   })

export const Authenticate = async (
   uid: string,
   name: string,
   fire_token: string,
   callback: (error: string | null, user: TUser | null) => void
) => {
   try {
      const response = await axios.post(
         `${config.server.url}/api/users/login`,
         { uid, name },
         {
            headers: {
               Authorization: `Bearer ${fire_token}`,
            },
         }
      )

      // const response = await axios({
      //    method: 'POST',
      //    url: `${config.server.url}/api/users/login`,
      //    data: {
      //       uid,
      //       name,
      //    },
      //    headers: { Authorization: `Bearer ${fire_token}` }
      // })

      if (
         response.status === 200 ||
         response.status === 201 ||
         response.status === 304
      ) {
         logging.info('Successfuly authenticated.')
         callback(null, response.data.user)
      } else {
         logging.warn(`Unable to authenticate.`)
         callback(`Unable to authenticate`, null)
      }
   } catch (error) {
      logging.error(error)
      callback(`Unable to authenticate`, null)
   }
}

export const Validate = async (
   fire_token: string,
   callback: (error: string | null, user: TUser | null) => void
) => {
   try {
      const response = await axios({
         method: 'GET',
         url: `${config.server.url}/api/users/validate`,
         headers: { Authorization: `Bearer ${fire_token}` },
      })

      if (response.status === 200 || response.status === 304) {
         logging.info('Successfuly validated.')
         callback(null, response.data.user)
      } else {
         logging.warn(`Unable to validated.`)
         callback(`Unable to validated`, null)
      }
   } catch (error) {
      logging.error(error)
      callback(`Unable to validated`, null)
   }
}
