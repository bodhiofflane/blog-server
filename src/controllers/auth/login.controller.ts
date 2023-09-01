import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import UserModel from '../../models/User.model.js';

import createJsonWebToken from '../../utils/createJsonWebToken.util.js';
import compareHash from '../../utils/compareHash.untils.js';
import ValidationError from '../../errors/ValidationError.js';
import InternalServerError from '../../errors/InternalServerError.js';
import NotFoundError from '../../errors/NotFoundError.js';

const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(
        errors
          .array()
          .map((item) => item.msg)
          .join('. ')
      );
    }

    const username = req.body.username as string;
    const password = req.body.password as string;

    const user = await UserModel.findOne({username: username});

    if (!user) throw new NotFoundError(`Пользователь '${username}' несуществует`);

    // Если pass неверный выбросится ошибка. Перехватится ниже.
    await compareHash(password, user.password as string); 

    const token = await createJsonWebToken(
      user._id.toString(),
      user.username as string,
      user.role
    );

    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        avatarURL: user.avatarURL,
      },
      token,
      message: 'Авторизация прошла успешно',
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(error.message);
      return res.status(400).json({message: error.message})
    }
    if (error instanceof NotFoundError) {
      console.log(error.message);
      return res.status(404).json({message: error.message});
    }
    if (error instanceof InternalServerError) {
      console.log(error.message);
      return res.status(500).json({message: error.message});
    }
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({message: error.message});
    }
  }
};

export default login;
