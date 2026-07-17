import Joi from 'joi';
import { CreateLaptopDTO, UpdateLaptopDTO } from './laptop.type';

export const CreateLaptopSchema = Joi.object<CreateLaptopDTO>({
  name: Joi.string().min(3).required().trim().messages({
    'string.min': 'Nama laptop minimal 3 karakter',
    'any.required': 'Nama laptop wajib diisi',
  }),
  brand: Joi.string().required().trim().messages({
    'any.required': 'Brand wajib diisi',
  }),
  price: Joi.number().integer().min(0).required().messages({
    'number.base': 'Harga harus berupa angka',
    'number.integer': 'Harga harus berupa bilangan bulat, tanpa pemisah ribuan',
    'number.min': 'Harga tidak boleh negatif',
    'any.required': 'Harga wajib diisi',
  }),
  processor_score: Joi.number().integer().min(0).required().messages({
    'number.base': 'Skor processor harus berupa angka',
    'number.integer':
      'Skor processor PassMark harus bilangan bulat, contoh: 6277 (bukan 6.277)',
    'number.min': 'Skor processor tidak boleh negatif',
    'any.required': 'Skor processor wajib diisi',
  }),
  gpu_score: Joi.number().integer().min(0).required().messages({
    'number.base': 'Skor GPU harus berupa angka',
    'number.integer':
      'Skor GPU PassMark harus bilangan bulat, contoh: 1057 (bukan 1.057)',
    'number.min': 'Skor GPU tidak boleh negatif',
    'any.required': 'Skor GPU wajib diisi',
  }),
  ram: Joi.number().integer().min(0).required().messages({
    'number.base': 'RAM harus berupa angka',
    'number.integer': 'RAM harus berupa bilangan bulat dalam GB',
    'number.min': 'RAM tidak boleh negatif',
    'any.required': 'RAM wajib diisi',
  }),
  storage: Joi.number().integer().min(0).required().messages({
    'number.base': 'Storage harus berupa angka',
    'number.integer': 'Storage harus berupa bilangan bulat dalam GB',
    'number.min': 'Storage tidak boleh negatif',
    'any.required': 'Storage wajib diisi',
  }),
  condition: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Kondisi harus berupa angka',
    'number.min': 'Kondisi minimal 1',
    'number.max': 'Kondisi maksimal 5',
    'any.required': 'Kondisi wajib diisi',
  }),
  age_months: Joi.number().integer().min(0).required().messages({
    'number.base': 'Usia penggunaan harus berupa angka',
    'number.min': 'Usia penggunaan tidak boleh negatif',
    'any.required': 'Usia penggunaan wajib diisi',
  }),
  screen_size: Joi.number().min(0).required().messages({
    'number.base': 'Ukuran layar harus berupa angka',
    'any.required': 'Ukuran layar wajib diisi',
  }),
  battery_life: Joi.number().min(0).required().messages({
    'number.base': 'Daya tahan baterai harus berupa angka',
    'any.required': 'Daya tahan baterai wajib diisi',
  }),
});

export const UpdateLaptopSchema = Joi.object<UpdateLaptopDTO>({
  name: Joi.string().min(3).optional().trim(),
  brand: Joi.string().optional().trim(),
  price: Joi.number().integer().min(0).optional().messages({
    'number.integer': 'Harga harus berupa bilangan bulat, tanpa pemisah ribuan',
  }),
  processor_score: Joi.number().integer().min(0).optional().messages({
    'number.integer':
      'Skor processor PassMark harus bilangan bulat, contoh: 6277 (bukan 6.277)',
  }),
  gpu_score: Joi.number().integer().min(0).optional().messages({
    'number.integer':
      'Skor GPU PassMark harus bilangan bulat, contoh: 1057 (bukan 1.057)',
  }),
  ram: Joi.number().integer().min(0).optional().messages({
    'number.integer': 'RAM harus berupa bilangan bulat dalam GB',
  }),
  storage: Joi.number().integer().min(0).optional().messages({
    'number.integer': 'Storage harus berupa bilangan bulat dalam GB',
  }),
  condition: Joi.number().integer().min(1).max(5).optional(),
  age_months: Joi.number().integer().min(0).optional(),
  screen_size: Joi.number().min(0).optional(),
  battery_life: Joi.number().min(0).optional(),
  isActive: Joi.boolean().optional(),
});
