// routes/saleRoutes.ts
import express from 'express';
import {
  createNewSale,
  getAllCustomers,
  getAllMedicines,
  getAllSales
} from '../controllers/saleController';

const router = express.Router();

router.post('/new', createNewSale);

router.get('/customers', getAllCustomers);

router.get('/medicines', getAllMedicines);

router.get('/sales', getAllSales);


export default router;
