import {Request, Response} from 'express';

const updatePostsById = async (req: Request, res: Response) => {
  try {
    res.json({sd: 'sd'})
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(400).json({message: error.message})
    }
  }
};

export default updatePostsById;
