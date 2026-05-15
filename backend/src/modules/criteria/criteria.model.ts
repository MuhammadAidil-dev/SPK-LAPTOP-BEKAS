import mongoose, { Schema } from 'mongoose';
import { ICriteriaDocument } from './criteria.type';
import { AppError } from '@/common/error/appError';
import { ERROR_CODE, HTTP_CODE } from '@/common/error/http';
import { boolean } from 'joi';

const CriteriaSchema = new Schema<ICriteriaDocument>(
  {
    name: {
      type: String,
      min: [3, 'Nama minimal 3 Karakter'],
      unique: true,
      required: [true, 'Nama wajib diisi'],
    },
    type: {
      type: String,
      enum: ['benefit', 'cost'],
      required: [true, 'Tipe wajib diisi'],
    },
    weight: {
      type: Number,
      min: [0, 'Nilai minimal adalah 0'],
      max: [1, 'Nilai maksimal adalah 1'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

CriteriaSchema.pre('save', async function (next) {
  if (this.weight < 0 || this.weight > 1) {
    return next(
      new AppError(
        'Nilai weight tidak valid',
        HTTP_CODE.BAD_REQUEST,
        ERROR_CODE.BAD_REQUEST,
      ),
    );
  }

  next();
});

export const Criteria = mongoose.model<ICriteriaDocument>(
  'Criteria',
  CriteriaSchema,
);
