import { Router } from 'express';

import createPost from '../controllers/posts/createPost.controller.js';
import getPostList from '../controllers/posts/getPostList.controller.js';
import getPopularPostList from '../controllers/posts/getPopularPostList.controller.js';
import getPostById from '../controllers/posts/getPostById.controller.js';
import deletePostById from '../controllers/posts/deletePostById.controller.js';
import updatePostsById from '../controllers/posts/updatePostById.controller.js';
import { check } from 'express-validator';
import checkAuth from '../middlewares/checkAuth.middleware.js';

const router = Router();

// localhost:5000/api/posts

// Create post
router.post('/', checkAuth, [
  check('title', 'Заголовок не должен быть короче 2 символов и длинеее 50')
    .trim()
    .isLength({min: 2, max: 50}),
  check('postText', 'Текст не должен быть короче 5 символов')
    .trim()
    .isLength({min: 5})
], createPost);

// Get post list
router.get('/', getPostList);

// Get polupal comment list
router.get('/popular', getPopularPostList);

// Get post by id
router.get('/:id', getPostById);

// Update post 
router.put('/:id', updatePostsById);

// Delete post
router.delete('/:id', checkAuth, deletePostById);

export default router;