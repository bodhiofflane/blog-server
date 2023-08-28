import {Request, Response} from 'express';

const deleteCommentById = async (req: Request, res: Response) => {
  return res.send({message: 'Ok'});
};

export default deleteCommentById;
