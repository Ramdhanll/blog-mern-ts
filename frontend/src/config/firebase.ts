import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

import config from '../config/config'

const app = initializeApp(config.firebase)

export const Providers = {
   google: new GoogleAuthProvider(),
}

export const auth = getAuth(app)
