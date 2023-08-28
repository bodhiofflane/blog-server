import bcrypt from 'bcrypt';
import InternalServerError from '../errors/InternalServerError.js';
import ValidationError from '../errors/ValidationError.js';

const compareHash = async (password: string,hashPassword: string) => {
  try {
    const isValidPassword =  await bcrypt.compare(password, hashPassword);
    if (!isValidPassword) {
      throw new ValidationError('Неверный пароль');
    }
    return true;
  } catch(error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new InternalServerError('Внутренняя ошибка сервера');
  }
};

export default compareHash;
