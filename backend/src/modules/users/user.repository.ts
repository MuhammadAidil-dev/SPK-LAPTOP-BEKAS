import { Users } from './user.model';
import { IUserDocument } from './user.type';

class UserRepository {
  constructor() {}

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return await Users.findOne({
      email,
    }).select('+password');
  }
}

export const userRepository = new UserRepository();
