import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import BlogPreview from '../components/BlogPreview'
import ErrorText from '../components/ErrorText'
import Header from '../components/Header'
import { LoadingComponent } from '../components/Loading'
import Navigation from '../components/Navigation'
import config from '../config/config'
import logging from '../config/logging'
import TBlog from '../types/blog'
import TPage from '../types/page'
import { TUser } from '../types/user'
import BlogPage from './Blog'

const HomePage: FC<TPage> = (props) => {
   const [blogs, setBlogs] = useState<TBlog[]>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string>('')

   useEffect(() => {
      getAllBlogs()
   }, [])

   const getAllBlogs = async () => {
      setLoading(true)
      try {
         const response = await axios.get(`${config.server.url}/api/blogs`)

         if (response.status === 200 || response.status === 304) {
            let blogs = response.data.blogs as TBlog[]
            blogs.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt))
            setBlogs(blogs)
         }
      } catch (error) {
         logging.error(error)
         setError('Unable to retreive blogs')
      } finally {
         setTimeout(() => {
            setLoading(false)
         }, 1000)
      }
   }

   if (loading) {
      return <LoadingComponent>Loading Blogs ...</LoadingComponent>
   }

   return (
      <Container fluid className='p-0'>
         <Navigation />
         <Header
            title='A Nerdy Blog Website'
            headline='Check out what people have to say!'
         />
         <Container className='mt-5'>
            {blogs.length === 0 && (
               <p>
                  There are no blogs yet, you should{' '}
                  <Link to='/edit'>post</Link> one 😃.{' '}
               </p>
            )}

            {blogs.map((blog, i) => {
               return (
                  <div key={i}>
                     <BlogPreview
                        _id={blog._id}
                        author={(blog.author as TUser).name}
                        headline={blog.headline}
                        title={blog.title}
                        createdAt={blog.createdAt}
                        updatedAt={blog.updatedAt}
                     />
                     <hr />
                  </div>
               )
            })}
            <ErrorText error={error} />
         </Container>
      </Container>
   )
}

export default HomePage
