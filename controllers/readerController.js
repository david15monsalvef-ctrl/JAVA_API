import Reader from '../models/Reader.js';

export const getReaders = async (req, res) => {
  try {
    const readers = await Reader.find();
    res.status(200).json(readers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReaderById = async (req, res) => {
  try {
    const reader = await Reader.findById(req.params.id);
    if (!reader) return res.status(404).json({ message: 'Lector no encontrado.' });
    res.status(200).json(reader);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createReader = async (req, res) => {
  try {
    const newReader = new Reader(req.body);
    await newReader.save();
    res.status(201).json(newReader);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateReader = async (req, res) => {
  try {
    const updatedReader = await Reader.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReader) return res.status(404).json({ message: 'Lector no encontrado.' });
    res.status(200).json(updatedReader);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteReader = async (req, res) => {
  try {
    const deletedReader = await Reader.findByIdAndDelete(req.params.id);
    if (!deletedReader) return res.status(404).json({ message: 'Lector no encontrado.' });
    res.status(200).json({ message: 'Lector eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};