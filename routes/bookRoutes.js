import { Router } from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook, getBookAvailability } from '../controllers/bookController.js';

const router = Router();
router.get('/', getBooks);
router.get('/:id', getBookById);
router.get('/:id/availability', getBookAvailability);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;