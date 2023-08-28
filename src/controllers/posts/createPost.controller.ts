import PostModel from '../../models/Post.model.js';
import {validationResult} from 'express-validator';

import saveImgToDirAndReturnURL from '../../utils/saveImgToDirAndReturnURL.util.js';

import {Request, Response} from 'express';

const createPost = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(
        errors
          .array()
          .map((item) => item.msg)
          .join('. ')
      );
    }

    // Выглядит стрёмно, но сюда дойдет только в случае если этот userData точно есть.
    const userData = res.locals['userData'];

    const title = req.body.title;
    const postText = req.body.postText;
    const postImgFile = req.files && req.files['postImg'] ? req.files['postImg'] : null;
    const postImgUrl = await saveImgToDirAndReturnURL(postImgFile, 'posts');

    console.log(postImgUrl);
    const newPost = await PostModel.create({
      title,
      postText,
      authorName: userData['username'],
      authorId: userData['id'],
      imgURL: postImgUrl,
    });

    return res
      .status(201)
      .json({post: newPost, message: 'Пост успешно создан'});
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({message: error.message});
    }
  }
};

export default createPost;
