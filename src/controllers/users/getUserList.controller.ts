import {Request, Response} from 'express';

const getUserList = async (req: Request, res: Response) => {
  return res.send({message: 'Ok'});
};

export default getUserList;
