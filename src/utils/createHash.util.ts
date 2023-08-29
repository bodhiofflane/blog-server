import bcrypt from 'bcrypt';
import InternalServerError from '../errors/InternalServerError.js';

const createHash = async (string: string) => {
  try {
    return await bcrypt.hash(string, 3);
  } catch{
    throw new InternalServerError('Ошибка при хешировании пароля');
  }
}

export default createHash;