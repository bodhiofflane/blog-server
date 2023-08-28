import { Schema, model } from 'mongoose';

import Post from '../types/Post.type.js';

const postSchema = new Schema(
  {
    title: {
      type: String,
      //require: true,
      minLength: 2,
      maxLength: 50,
    },
    postText: {
      type: String,
      //require: true,
      minLength: 5,
    },
    authorId: {
      //require: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    authorName: {
      type: String,
      require: true,
    },
    imgURL: {
      type: String,
      default: '',
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('Post', postSchema);
