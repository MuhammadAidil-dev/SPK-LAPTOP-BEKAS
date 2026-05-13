import Joi from 'joi';
import { TLoginPayload } from './auth.type';

export const LoginSchema = Joi.object<TLoginPayload>({
  email: Joi.string().trim().min(3).max(100).required().messages({
    'string.base': 'Email harus berupa teks',
    'string.empty': 'Email wajib diisi',
    'string.min': 'Email minimal 3 karakter',
    'string.max': 'Email maksimal 100 karakter',
    'any.required': 'Email wajib diisi',
  }),

  password: Joi.string()
    .min(8)
    .max(72) // bcrypt max length
    .required()
    .messages({
      'string.base': 'Password harus berupa teks',
      'string.empty': 'Password wajib diisi',
      'string.min': 'Password minimal 8 karakter',
      'string.max': 'Password maksimal 72 karakter',
      'any.required': 'Password wajib diisi',
    }),
});
