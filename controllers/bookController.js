import Book from '../models/Book.js';

export const getBooks = async (req, res) => {
  try {
    const { genre, authorId } = req.query;
    let query = {};

    if (genre) query.genero = genre;
    if (authorId) query.author = authorId;

    const books = await Book.find(query).populate('author');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author');
    if (!book) return res.status(404).json({ message: 'Libro no encontrado.' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: 'Libro no encontrado.' });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Libro no encontrado.' });
    res.status(200).json({ message: 'Libro eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookAvailability = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado.' });
    res.status(200).json({
      titulo: book.titulo,
      copiasDisponibles: book.copiasDisponibles,
      disponible: book.copiasDisponibles > 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};