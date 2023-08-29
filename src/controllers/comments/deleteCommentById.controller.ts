import {Request, Response} from 'express';
import CommentModel from '../../models/Comment.model.js';

const deleteCommentById = async (req: Request, res: Response) => {
  try {
    const commentId = req.params['id'];
    const userId = res.locals['userData']['id'] as string;

    const candidateForDetele = await CommentModel.findById(commentId);

    if (candidateForDetele?.authorId?.toString() !== userId) {
      return res.status(403).json({message: 'Нет прав на удаление комментария'});
    }

    await CommentModel.deleteOne({_id: commentId});

    console.log(candidateForDetele);

    res.status(200).json({deletedComment: candidateForDetele, message: `Комментарий с id: ${commentId} удален`})
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({message: error.message});
    }
  }
};

export default deleteCommentById;
