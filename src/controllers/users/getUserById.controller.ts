import {Request, Response} from 'express';

const getUserById = async (req: Request, res: Response) => {
  return res.send({message: 'Ok'});
};

export default getUserById;
