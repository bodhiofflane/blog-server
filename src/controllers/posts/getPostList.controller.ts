import {Request, Response} from 'express';
import PostModel from '../../models/Post.model.js';

const getPostList = async (req: Request, res: Response) => {
  try {
    const postList = await PostModel.find({}).sort({createdAt: -1});
    res.status(200).json({posts: postList, message: 'Массив постов получен'});
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({message: error.message});
    }
  }
};

export default getPostList;
