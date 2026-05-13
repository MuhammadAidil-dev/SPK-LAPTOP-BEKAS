import mongoose, { Schema } from 'mongoose';
import { IUserDocument, TUserRole } from './user.type';
import bcrypt from 'bcryptjs';

const validEmail = /^\S+@\S+\.\S+$/;

const UserSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: [true, 'Email wajib diisi'],
      unique: true,
      trim: true,
      minLength: [3, 'Email minimal 3 karakter'],
      match: [validEmail, 'Format email tidak valid'],
    },
    password: {
      type: String,
      required: [true, 'Password wajib diisi'],
      trim: true,
      minLength: [8, 'Email minimal 3 karakter'],
      select: false, // password tidak ikut ter-query secara default
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'admin',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Hash password sebelum disimpan
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method untuk membandingkan password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Users = mongoose.model<IUserDocument>('Users', UserSchema);
