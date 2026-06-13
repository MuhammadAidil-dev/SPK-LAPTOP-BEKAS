import mongoose, { Schema } from 'mongoose';
import { ILaptopDocument } from './laptop.type';

const LaptopSchema = new Schema<ILaptopDocument>(
  {
    name: { type: String, required: true, minlength: 3 },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    processor_score: { type: Number, required: true, min: 0 },
    gpu_score: { type: Number, required: true, min: 0 },
    ram: { type: Number, required: true, min: 0 },
    storage: { type: Number, required: true, min: 0 },
    condition: { type: Number, required: true, min: 1, max: 5 },
    age_months: { type: Number, required: true, min: 0 },
    screen_size: { type: Number, required: true, min: 0 },
    battery_life: { type: Number, required: true, min: 0 },
    image: { type: String, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export const Laptop = mongoose.model<ILaptopDocument>('Laptop', LaptopSchema);
