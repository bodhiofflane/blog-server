import {Request, Response} from 'express';
import UserModel from '../../models/User.model.js';
import createJsonWebToken from '../../utils/createJsonWebToken.util.js';

const refreshAuth = async (req: Request, res: Response) => {
  try {
    const id = res.locals['userData']['id'];
    const username = res.locals['userData']['username'];
    const role = res.locals['userData']['role'];

    const userFromDB = await UserModel.findById(id);

    if (!userFromDB) {
      return res.status(401).json({message: 'Неверный токен'});
    }

    const token = createJsonWebToken(id, username, role);

    const user = {
      _id: userFromDB._id,
      username: userFromDB.username,
      role: userFromDB.role,
      avatarURL: userFromDB.avatarURL,
    };

    res.status(200).json({user, token, message: 'Подтверждено'});
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({message: error.message});
    }
  }
};

export default refreshAuth;
