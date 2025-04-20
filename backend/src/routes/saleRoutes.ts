// routes/saleRoutes.ts
import express from 'express';
import {
  createNewSale,
  getAllCustomers,
  getAllMedicines,
  getAllSales
} from '../controllers/saleController';

const router = express.Router();

// Route to create a new sale
router.post('/new', createNewSale);

// Route to fetch all customers
router.get('/customers', getAllCustomers);

// Route to fetch all medicines
router.get('/medicines', getAllMedicines);

router.get('/sales', getAllSales);


export default router;
