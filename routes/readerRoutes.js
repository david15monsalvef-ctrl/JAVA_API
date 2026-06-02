import { Router } from 'express';
import { getReaders, getReaderById, createReader, updateReader, deleteReader } from '../controllers/readerController.js';

const router = Router();
router.get('/', getReaders);
router.get('/:id', getReaderById);
router.post('/', createReader);
router.put('/:id', updateReader);
router.delete('/:id', deleteReader);

export default router;