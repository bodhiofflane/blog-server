import {Request, Response} from 'express';

const updateUserById = async (req: Request, res: Response) => {
  return res.send({message: 'Ok'});
};

export default updateUserById;
