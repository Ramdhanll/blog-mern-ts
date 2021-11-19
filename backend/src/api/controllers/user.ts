import { Request, NextFunction, Response } from 'express'
import logging from '../../config/logging'
import User from '../models/user'

const validate = async (req: Request, res: Response, next: NextFunction) => {
   logging.info('Token validated, returning user ...')

   let firebase = res.locals.firebase

   try {
      const user = await User.findOne({ uid: firebase.uid })

      if (user) {
         return res.status(200).json({ user })
      } else {
         return res.status(401).json({ message: 'user not found' })
      }
   } catch (error) {
      logging.error(error)

      return res.status(500).json({ error })
   }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
   logging.info('Attempting to register user ...')

   const { uid, name } = req.body
   const fire_token = res.locals.fire_token

   try {
      const user = new User({ uid, name })

      const createdUser = await user.save()

      logging.info(`New user ${uid} created ...`)
      return res.status(200).json({ user: createdUser, fire_token })
   } catch (error) {
      logging.error(error)
      return res.status(500).json({ error })
   }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
   logging.info('Logging in user ...')

   const { uid } = req.body
   const fire_token = res.locals.fire_token

   try {
      const user = await User.findOne({ uid })

      if (user) {
         logging.info(`User ${uid} found, signing in ...`)
         return res
            .status(200)
            .cookie('fire_token', fire_token, { httpOnly: true })
            .json({ user, fire_token })
      } else {
         logging.info(`User ${uid} not found, register ...`)
         return create(req, res, next)
      }
   } catch (error) {
      logging.error(error)
      return res.status(500).json({
         error,
      })
   }
}

const read = async (req: Request, res: Response, next: NextFunction) => {
   const _id = req.params.userID
   logging.info(`Incoming read for ${_id} ...`)

   try {
      const user = await User.findById(_id)
      if (user) {
         return res.status(200).json({ user })
      } else {
         return res.status(404).json({ message: 'Not Found' })
      }
   } catch (error) {
      return res.status(500).json({ error })
   }
}

const readAll = async (req: Request, res: Response, next: NextFunction) => {
   logging.info(`Incoming read all`)

   try {
      const users = await User.find({})
      return res.status(200).json({ count: users.length, users })
   } catch (error) {
      return res.status(500).json({ error })
   }
}

export default {
   validate,
   create,
   login,
   read,
   readAll,
}
