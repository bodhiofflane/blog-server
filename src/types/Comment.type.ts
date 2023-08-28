import { Types } from 'mongoose';

type Comment = {
  text: string,
  author: Types.ObjectId,
  parentPost: Types.ObjectId,
}

export default Comment;