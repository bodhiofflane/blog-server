import jwt from 'jsonwebtoken';
import {JWT_ACCESS_SECRET} from '../configs/security.config.js';
import InternalServerError from '../errors/InternalServerError.js';

// Берем заголовок, берем данные и с помощью секретного ключа кодируем. На выходе получаем сигнутуру.
// Сигнарута нужна для того что-бы обедится что токен не подделан. Без secret, расшифровать сигнатуру нельзя.

const createJsonWebToken = async (id: string, username: string, role: string) => {
  try {
    return jwt.sign({id, username, role}, JWT_ACCESS_SECRET as string, {
      algorithm: 'HS256',
      expiresIn: '1d',
      issuer: 'blog-server',
    });
  } catch {
    throw new InternalServerError('Ошибка при создании токена');
  }
};

export default createJsonWebToken;
