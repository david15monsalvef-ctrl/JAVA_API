import { Router } from 'express';
import { createLoan, getLoans, getLoanById, updateLoanStatus } from '../controllers/loanController.js';

const router = Router();
router.get('/', getLoans);
router.get('/:id', getLoanById);
router.post('/', createLoan);
router.patch('/:id/status', updateLoanStatus);

export default router;