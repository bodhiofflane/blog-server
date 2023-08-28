import { Types } from 'mongoose';

type Post = {
  title: string;
  postText: string;
  author: Types.ObjectId;
  //comments: Schema.Types.ObjectId[];
  views: number;
  likes: Types.ObjectId[];
  imgURL?: string;
};

export default Post;
