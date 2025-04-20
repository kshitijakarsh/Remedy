import express from 'express';
import {
  createNewSale,
  getAllCustomers,
  getAllMedicines,
} from '../controllers/saleController';

const router = express.Router();

router.post('/new', createNewSale);
router.get('/customers', getAllCustomers);
router.get('/medicines', getAllMedicines);
router.get("/invoices/:id", getInvoiceById);


export default router;