import logging from '../../config/logging'
import firebaseAdmin from 'firebase-admin'
import { Request, Response, NextFunction } from 'express'

const extractFirebaseInfo = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   logging.info('Validating firebase token ...')

   /** split token from bearer a5sdsdalasdal */
   let token = req.headers.authorization?.split(' ')[1]

   if (token) {
      firebaseAdmin
         .auth()
         .verifyIdToken(token)
         .then((result) => {
            if (result) {
               /** TODO add info to response */
               res.locals.firebase = result
               res.locals.fire_token = token
               next()
            } else {
               logging.warn('Token invalid, unauthorized ...')
               return res.status(401).json({
                  message: 'unauthorized',
               })
            }
         })
         .catch((e) => {
            logging.error(e)
            return res.status(401).json({
               e,
               message: 'unauthorized',
            })
         })
   } else {
      return res.status(401).json({
         message: 'unauthorized',
      })
   }
}

export default extractFirebaseInfo
