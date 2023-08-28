import { validationResult, matchedData } from 'express-validator';
import {Request, Response} from 'express';

import UserModel from '../../models/User.model.js';
import saveImgToDirAndReturnURL from '../../utils/saveImgToDirAndReturnURL.util.js';
import checkLoginForUniq from '../../utils/checkLoginForUniq.util.js';
import createHash from '../../utils/createHash.util.js';
import createJsonWebToken from '../../utils/createJsonWebToken.util.js';

const registration = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error (errors.array().map(item => item.msg).join('. '));
    }

    const username = await checkLoginForUniq(req.body.username); // Надо переделать и не выбрасывать ошибку и отправлять 403.
    const password = await createHash(req.body.password); // Здесь я просто выбрасываю ошибку в общий обработчик. Хотя нужена 500.

    const lastName = req.body.lastName || 'Фамилия';
    const firstName = req.body.firstName || 'Имя';

    const avatarFile = (req.files && req.files['avatar']) ? req.files['avatar'] : null;
    const avatarURL = await saveImgToDirAndReturnURL(avatarFile, 'avatars');

    const newUser = await UserModel.create({
      username,
      password,
      lastName,
      firstName,
      avatarURL,
    });

    // Надо тоже переделать. При ошибке возвращать 500.
    const token = await createJsonWebToken(
      newUser.id,
      newUser.username as string,
      newUser.role,
    ); // Почему username -> string || undefined?

    res.status(201).json({
        user: {
          _id: newUser._id,
          username: newUser.username,
          role: newUser.role,
          avatarURL: newUser.avatarURL
        },
        token,
        message: 'Пользователь успешно создан'
      });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({message: error.message}); // Переделать. Сделать либо общим обработчика с разными статусами либо...
    }
  }
};

export default registration;
