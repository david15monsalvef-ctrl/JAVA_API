import { Schema, model } from 'mongoose';

const loanSchema = new Schema({
  fechaPrestamo: { type: Date, required: true },
  fechaDevolucionEsperada: { type: Date, required: true },
  fechaDevuelto: { type: Date, default: null },
  estado: { type: String, enum: ['active', 'returned', 'overdue'], default: 'active' },
  notas: { type: String },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  reader: { type: Schema.Types.ObjectId, ref: 'Reader', required: true }
}, { timestamps: true });

export default model('Loan', loanSchema);