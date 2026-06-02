import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  titulo: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  genero: { type: String, enum: ['fiction', 'non-fiction', 'sci-fi', 'history', 'other'], required: true },
  anio: { type: Number, required: true },
  copiasDisponibles: { type: Number, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true }
}, { timestamps: true });

export default model('Book', bookSchema);