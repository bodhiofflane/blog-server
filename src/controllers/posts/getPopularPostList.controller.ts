import e, {Request, Response} from 'express';
import PostModel from '../../models/Post.model.js';

const getPopularPostList = async (req: Request, res: Response) => {
  try {
    const popularPostList = await PostModel.find({}).sort({views: -1}).limit(5);

    res.status(200).json({popularPostList, message: 'Успешное получение популярных постов'});
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({message: error.message});
    }
  }
};

export default getPopularPostList;
