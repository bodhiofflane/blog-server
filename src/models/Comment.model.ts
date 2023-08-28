import { Schema, model } from 'mongoose';
import Comment from '../types/Comment.type.js';

const commentSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    parentPostId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      require: true,
    },
    commentText: {
      type: String,
      require: true,
    },
    authorName: {
      type: String,
      require: true,
    },
  },
  {timestamps: true, versionKey: false}
);

export default model('Comment', commentSchema);
