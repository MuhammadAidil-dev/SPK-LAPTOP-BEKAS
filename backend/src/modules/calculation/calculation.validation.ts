import Joi from 'joi';

export const compareSchema = Joi.object({
  laptop_ids: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
          'string.pattern.base': 'Format ID laptop tidak valid',
        }),
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'laptop_ids harus berupa array',
      'array.min': 'Minimal pilih 1 laptop untuk dibandingkan',
      'any.required': 'laptop_ids wajib diisi',
    }),
});
