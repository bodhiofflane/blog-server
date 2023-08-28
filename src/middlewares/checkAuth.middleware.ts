import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '../configs/security.config.js';

const checkAuth = async (req: Request , res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') next();

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({message: 'Пользователь не авторизован'});

    const decodedData = jwt.verify(token, JWT_ACCESS_SECRET);

    res.locals['userData'] = decodedData as {id: string, username: string, role: string};

    next();
  } catch (error) {
    if (error instanceof Error) {
      return res
        .set({'Access-Control-Expose-Headers': 'Corrupted-Token','Corrupted-Token': 'yes'})
        .status(401)
        .json({message: 'Срок действия токена истек'});
    }
  }
}

export default checkAuth;