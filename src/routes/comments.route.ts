import { Router } from 'express';

import createComment from '../controllers/comments/createComment.controller.js';
import getCommentListByParentPostId from '../controllers/comments/getCommentListByParentPostId.controller.js';
import updateCommentById from '../controllers/comments/updateCommentById.controller.js';
import deleteCommentById from '../controllers/comments/deleteCommentById.controller.js';
import checkAuth from '../middlewares/checkAuth.middleware.js';

const router = Router();

// localhost:5000/api/comments

// Create comment
router.post('/', checkAuth, createComment);

// Get comment list by parent post id
router.get('/:id', getCommentListByParentPostId);

// Update comment
router.put('/:id', updateCommentById);

// Delete comment
router.delete('/:id', deleteCommentById);

export default router;