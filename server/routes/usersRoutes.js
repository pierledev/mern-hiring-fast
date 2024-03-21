import express from 'express';

import { deleteUser, getDashboardOverview, updateUser } from '../controllers/usersController.js';
import { adminHandlerMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.route('/update').patch(updateUser);
router.route('/dashboard-overview').get(getDashboardOverview);
router.route('/:id').delete(adminHandlerMiddleware, deleteUser);

export default router;
