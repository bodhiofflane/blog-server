import {Request, Response} from 'express';
import CommentModel from '../../models/Comment.model.js';

const createComment = async (req: Request, res: Response) => {
  try {
    const parentPostId = req.body.parentPostId as string;
    const commentText = req.body.commentText as string;

    const {id, username} = res.locals['userData'] as {
      id: string;
      username: string;
      role: string;
    };

    const newComment = await CommentModel.create({
      authorId: id,
      authorName: username,
      parentPostId: parentPostId,
      commentText: commentText,
    });

    console.log(newComment);
    res.status(201).json({comment: newComment, message: 'Комментарий успешно добавлен'});
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({message: error.message});
    }
  }
};

export default createComment;
