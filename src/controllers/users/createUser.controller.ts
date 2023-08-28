import {Request, Response} from 'express';

const createUser = async (req: Request, res: Response) => {
  return res.send({message: 'Ok'});
};

export default createUser;
