import { Request, NextFunction, Response } from 'express'
import logging from '../../config/logging'
import Blog from '../models/blog'

const create = async (req: Request, res: Response, next: NextFunction) => {
   logging.info('Attempting to register blog ...')

   const { author, title, content, headline, picture } = req.body

   try {
      const blog = new Blog({ author, title, content, headline, picture })

      const createdBlog = await blog.save()

      logging.info(`New blog created ...`)
      return res.status(200).json({ blog: createdBlog })
   } catch (error) {
      logging.error(error)
      return res.status(500).json({ error })
   }
}

const read = async (req: Request, res: Response, next: NextFunction) => {
   const _id = req.params.blogID
   logging.info(`Incoming read for ${_id} ...`)

   try {
      const blog = await Blog.findById(_id).populate('author')
      if (blog) {
         return res.status(200).json({ blog })
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
      const blogs = await Blog.find({}).populate('author')
      return res.status(200).json({ count: blogs.length, blogs })
   } catch (error) {
      return res.status(500).json({ error })
   }
}

const query = async (req: Request, res: Response, next: NextFunction) => {
   logging.info(`Incoming query ...`)

   try {
      const blogs = await Blog.find(req.body).populate('author')
      return res.status(200).json({ count: blogs.length, blogs })
   } catch (error) {
      return res.status(500).json({ error })
   }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
   const _id = req.params.blogID
   logging.info(`Incoming update for ${_id} ...`)

   try {
      const blogs = await Blog.findById(_id)

      blogs.set(req.body)
      const blogUpdated = await blogs.save()

      return res.status(200).json({ blog: blogUpdated })
   } catch (error) {
      return res.status(500).json({ error })
   }
}

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
   const _id = req.params.blogID
   logging.warn(`Incoming delete for ${_id} ...`)

   try {
      const blog = await Blog.findById(_id)
      await blog.deleteOne()

      return res.status(200).json({ message: 'Blog has been deleted' })
   } catch (error) {
      return res.status(500).json({ error })
   }
}

export default {
   create,
   read,
   readAll,
   update,
   query,
   deleteBlog,
}
