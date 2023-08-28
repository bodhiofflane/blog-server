import {NextFunction, Request, Response, Router} from 'express';

import registration from '../controllers/auth/registration.controller.js';
import login from '../controllers/auth/login.controller.js';
import refreshAuth from '../controllers/auth/refreshAuth.controller.js';
import {check, query} from 'express-validator';
import checkRole from '../middlewares/checkAuth.middleware.js';
import asscessByRole from '../middlewares/asscessByRole.middleware.js';
import checkAuth from '../middlewares/checkAuth.middleware.js';

const router = Router();

// localhost:5000/api/auth

router.post(
  '/registration',
  [
    check(
      'username',
      'Имя пользователя должно содержать не менее 3 символов, но не более 20'
    )
      .trim()
      .isLength({min: 3, max: 20}),
    check('password', 'Пароль должен содержать не меньше 5 символов')
      .trim()
      .isLength({
        min: 5,
      }),
  ],
  registration
);

router.post(
  '/login',
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Че тут,", req.body)
    next();
  },
  [
    check('username', "'username' не меньше 3 символов")
      .trim()
      .isLength({min: 3, max: 20}),
    check('password', "'password' не меньше 5 символов")
      .trim()
      .isLength({min: 5}),
  ],
  login
);

router.get('/refresh', checkAuth, refreshAuth);

export default router;
