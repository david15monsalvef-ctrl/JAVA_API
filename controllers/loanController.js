import Loan from '../models/Loan.js';
import Book from '../models/Book.js';

export const createLoan = async (req, res) => {
  try {
    const { fechaPrestamo, fechaDevolucionEsperada, book, reader, notas } = req.body;

    if (new Date(fechaDevolucionEsperada) <= new Date(fechaPrestamo)) {
      return res.status(400).json({ message: 'La fecha de devolución esperada debe ser posterior a la de préstamo.' });
    }

    const activeLoans = await Loan.countDocuments({ reader, estado: 'active' });
    if (activeLoans >= 3) {
      return res.status(400).json({ message: 'El lector ya cuenta con el límite de 3 préstamos activos.' });
    }

    const targetBook = await Book.findById(book);
    if (!targetBook) return res.status(404).json({ message: 'Libro no encontrado.' });
    if (targetBook.copiasDisponibles <= 0) {
      return res.status(400).json({ message: 'No hay copias disponibles de este libro.' });
    }

    targetBook.copiasDisponibles -= 1;
    await targetBook.save();

    const newLoan = new Loan({ fechaPrestamo, fechaDevolucionEsperada, book, reader, notas });
    await newLoan.save();

    res.status(201).json(newLoan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getLoans = async (req, res) => {
  try {
    const { status, genre } = req.query;
    let query = {};

    if (status) query.estado = status;

    // POPULATE ENCADENADO: Loan -> Book -> Author
    let loans = await Loan.find(query)
      .populate({
        path: 'book',
        populate: { path: 'author' }
      })
      .populate('reader');

    if (genre) {
      loans = loans.filter(loan => loan.book && loan.book.genero === genre);
    }

    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id)
      .populate({
        path: 'book',
        populate: { path: 'author' }
      })
      .populate('reader');
    if (!loan) return res.status(404).json({ message: 'Préstamo no encontrado.' });
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLoanStatus = async (req, res) => {
  try {
    const { estado } = req.body;
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Préstamo no encontrado.' });

    if (loan.estado === 'active' && estado === 'returned') {
      await Book.findByIdAndUpdate(loan.book, { $inc: { copiasDisponibles: 1 } });
      loan.fechaDevuelto = new Date();
    }

    loan.estado = estado;
    await loan.save();

    res.status(200).json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};