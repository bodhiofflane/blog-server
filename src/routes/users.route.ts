import { Router } from 'express';

import createUser from '../controllers/users/createUser.controller.js';
import getUserList from '../controllers/users/getUserList.controller.js';
import getUserById from '../controllers/users/getUserById.controller.js';
import updateUserById from '../controllers/users/updateUserById.controller.js';
import deleteUserById from '../controllers/users/deleteUserById.contoller.js';

const router = Router();

// localhost:5000/api/users

// Create user
router.post('/', createUser);

// Get users list
router.get('/', getUserList);

// Get user by id
router.get('/:id', getUserById);

// Update user by id
router.put('/:id', updateUserById);

// Delete user by id
router.delete('/:id', deleteUserById);

export default router;
