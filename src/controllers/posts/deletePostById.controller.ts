import {Request, Response} from 'express';
import PostModel from '../../models/Post.model.js';

const deletePostById = async (req: Request, res: Response) => {
  try {
    // Такого не может быть. Наверно стоит убрать
    if (!res.locals['userData'] && !res.locals['userData']['id']) {
      return res.status(401).json({message: 'Невозможно'});
    };

    const comingIdFromParams = req.params['id'];
    const userIdFromToken = res.locals['userData']['id'] as string;

    const candidateFroDeletion = await PostModel.findById(comingIdFromParams);
    if (!candidateFroDeletion) {
      return res.status(404).json({message: 'Пост не найден'});
    }

    if (userIdFromToken !== candidateFroDeletion?.authorId?.toString()) {
      return res.status(403).json({message: 'Нет прав'});
    }

    const deletedPost = await PostModel.findByIdAndDelete(comingIdFromParams);
    res
      .status(200)
      .json({
        post: deletedPost,
        message: `Пост c id: ${comingIdFromParams} успешно удален`,
      });

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({message: error.message})
    }
  }
};

export default deletePostById;
