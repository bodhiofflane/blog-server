import {Request, Response} from 'express';
import CommentModel from '../../models/Comment.model.js';

const getCommentListByParentPostId = async (req: Request, res: Response) => {
  try {
    const parentPostId = req.params['id'];

    // Если комментариев нет, то получаем пустой массив
    const commentList = await CommentModel.find({parentPostId: parentPostId});

    res.status(200).json({commentList: commentList, message: 'Комментарии успешно получены'})
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({message: error.message});
    }
  }
};

export default getCommentListByParentPostId;
