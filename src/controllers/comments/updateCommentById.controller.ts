import {Request, Response} from 'express';

const updateCommentById = async (req: Request, res: Response) => {
  return res.send({message: 'Ok'});
};

export default updateCommentById;
