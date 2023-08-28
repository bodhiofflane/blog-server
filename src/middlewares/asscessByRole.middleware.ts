import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {JWT_ACCESS_SECRET} from '../configs/security.config.js';


const access = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) throw new Error('Пользователь не авторизован');

      const decodedData  = jwt.verify(token, JWT_ACCESS_SECRET) as {username: string, id: string, role: string};

      const {role: userRole} = decodedData;
      //console.log(res.locals['userData']?._id)

      if (userRole !== role) {
        res.status(401).json({message: 'Нет прав доступа'})
      }

      next();
    } catch (error) {
      throw error;
    }
  };
};

export default access;
