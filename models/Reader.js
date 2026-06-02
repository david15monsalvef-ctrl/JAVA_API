import { Schema, model } from 'mongoose';

const readerSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  membresia: { type: String, enum: ['standard', 'premium'], required: true },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

export default model('Reader', readerSchema);