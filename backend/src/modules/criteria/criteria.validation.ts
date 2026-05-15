import Joi from 'joi';
import { CreateCriteriaDTO, UpdateCriteriaDTO } from './criteria.type';

export const CreateCriteriaSchema = Joi.object<CreateCriteriaDTO>({
  name: Joi.string().min(3).required().trim(),
  type: Joi.string().valid('benefit', 'cost').required().trim(),
  weight: Joi.number().min(0).max(1).required().messages({
    'number.base': 'Weight harus angka',
    'number.min': 'Weight tidak boleh bernilai negatif',
    'number.max': 'Weight tidak boleh lebih dari 1',
    'any.required': 'Weight tidak boleh kosong',
  }),
});

export const UpdateCriteriaSchema = Joi.object<UpdateCriteriaDTO>({
  name: Joi.string().min(3).optional().trim(),
  type: Joi.string().valid('benefit', 'cost').optional().trim(),
  weight: Joi.number().min(0).max(1).optional().messages({
    'number.base': 'Weight harus angka',
    'number.min': 'Weight tidak boleh bernilai negatif',
    'number.max': 'Weight tidak boleh lebih dari 1',
    'any.required': 'Weight tidak boleh kosong',
  }),
  isActive: Joi.boolean().optional(),
});
