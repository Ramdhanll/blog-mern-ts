import { TUser } from './user'

type TBlog = {
   _id: string
   title: string
   author: string | TUser
   content: string
   headline: string
   picture: string
   createdAt: string
   updatedAt: string
}

export default TBlog
