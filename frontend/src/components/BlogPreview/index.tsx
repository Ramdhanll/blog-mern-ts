import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'

interface IBlogPreviewProps {
   _id: string
   title: string
   headline: string
   author: string
   createdAt: string
   updatedAt: string
}

const BlogPreview: FC<IBlogPreviewProps> = (props) => {
   const { _id, author, children, createdAt, updatedAt, headline, title } =
      props
   return (
      <div>
         <Card className='border-0'>
            <CardBody className='p-0'>
               <Link
                  to={`/blog/${_id}`}
                  style={{ textDecoration: 'none' }}
                  className='text-primary'
               >
                  <h1>
                     <strong>{title}</strong>
                  </h1>
                  <h3>{headline}</h3>
               </Link>
               {createdAt !== updatedAt ? (
                  <p>
                     Updated By {author} at{' '}
                     {new Date(updatedAt).toLocaleString()}
                  </p>
               ) : (
                  <p>
                     Posted By {author} at{' '}
                     {new Date(createdAt).toLocaleString()}
                  </p>
               )}
               {children}
            </CardBody>
         </Card>
      </div>
   )
}

export default BlogPreview
