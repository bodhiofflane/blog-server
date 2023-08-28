import {Request, Response} from 'express';

const deleteUserById = async (req: Request, res: Response) => {
  return res.send({message: 'Ok'});
};

export default deleteUserById;
