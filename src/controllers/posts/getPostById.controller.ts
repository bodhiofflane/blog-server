import {Request, Response} from 'express';
import PostModel from '../../models/Post.model.js';

const getPostById = async (req: Request, res: Response) => {
  try {
    const requestedPostId = req.params['id'];
    if (!requestedPostId) return res.status(400).json({message: 'Невозможно'});

    const post =  await PostModel.findByIdAndUpdate(requestedPostId, {$inc: {views: 1}} , {new: true});
    if (!post) return res.status(404).json({message: 'Запрашиваемый пост не существует'});
    
    res.status(200).json({post, message: 'Пост успешно получен'});
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(400).json({message: error.message});
    }
  }
};

export default getPostById;
