import { auth } from './../config/firebase'
import firebase from 'firebase'

export const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) =>
   new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      auth
         .signInWithPopup(provider)
         .then((result) => resolve(result))
         .catch((e) => reject(e))
   })
