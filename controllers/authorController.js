import Author from '../models/Author.js';

export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Autor no encontrado.' });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAuthor) return res.status(404).json({ message: 'Autor no encontrado.' });
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json({ message: 'Autor no encontrado.' });
    res.status(200).json({ message: 'Autor eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};