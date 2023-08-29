import ValidationError from '../errors/ValidationError.js';
import UserModel from '../models/User.model.js'

const checkLoginForUniq = async (username: string) => {
  try {
    if (await UserModel.findOne({username: username})) {
      throw new ValidationError('Пользователь с таким логином уже существует');
    }
    return username;
  } catch (error) {
    throw error;
  }
};

export default checkLoginForUniq;