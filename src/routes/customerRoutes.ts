import { Router } from 'express';
import { createCustomer, getCustomers } from '../controllers/customerController';

const router = Router();
router.post('/', createCustomer);
router.get('/', getCustomers);
export default router;