import mongoose, { Schema } from 'mongoose'
const { ObjectId } = mongoose.Types

const BlogSchema: Schema = new Schema(
   {
      title: {
         type: String,
         unique: true,
      },
      author: { type: ObjectId, ref: 'User' },
      content: { type: String },
      headline: { type: String },
      picture: { type: String },
   },
   {
      timestamps: true,
   }
)

export default mongoose.model('Blog', BlogSchema)
