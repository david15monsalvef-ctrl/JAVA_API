import { Schema, model } from 'mongoose';

const authorSchema = new Schema({
  nombre: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true }
}, { timestamps: true });

export default model('Author', authorSchema);