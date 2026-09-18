import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  trackOrder
} from '../controllers/orderController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { orderLimiter } from '../middleware/rateLimiters.js';

const router = express.Router();

router.route('/')
  .post(orderLimiter, createOrder)
  .get(protectAdmin, getOrders);

router.route('/track')
  .get(trackOrder);

router.route('/track/:identifier')
  .get(trackOrder);

router.route('/:id')
  .get(protectAdmin, getOrderById);

router.route('/:id/status')
  .put(protectAdmin, updateOrderStatus);

export default router;

