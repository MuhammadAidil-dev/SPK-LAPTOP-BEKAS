import { AppError } from '@/common/error/appError';
import { ERROR_CODE, HTTP_CODE } from '@/common/error/http';
import { laptopRepository } from './laptop.repository';
import {
  CreateLaptopDTO,
  ILaptopResponse,
  UpdateLaptopDTO,
} from './laptop.type';

class LaptopService {
  async createLaptopService(payload: CreateLaptopDTO) {
    return await laptopRepository.create(payload);
  }

  async getAllLaptopsService(): Promise<ILaptopResponse[]> {
    return await laptopRepository.findAll();
  }

  async getLaptopByIdService(id: string): Promise<ILaptopResponse> {
    const laptop = await laptopRepository.findById(id);

    if (!laptop) {
      throw new AppError(
        'Laptop tidak ditemukan',
        HTTP_CODE.NOT_FOUND,
        ERROR_CODE.NOT_FOUND,
      );
    }

    return laptop;
  }

  async updateLaptopService(
    id: string,
    payload: UpdateLaptopDTO,
  ): Promise<ILaptopResponse> {
    const laptop = await laptopRepository.update(id, payload);

    if (!laptop) {
      throw new AppError(
        'Laptop tidak ditemukan',
        HTTP_CODE.NOT_FOUND,
        ERROR_CODE.NOT_FOUND,
      );
    }

    return laptop;
  }

  async deleteLaptopService(id: string): Promise<ILaptopResponse> {
    const laptop = await laptopRepository.delete(id);

    if (!laptop) {
      throw new AppError(
        'Laptop tidak ditemukan',
        HTTP_CODE.NOT_FOUND,
        ERROR_CODE.NOT_FOUND,
      );
    }

    return laptop;
  }
}

export const laptopService = new LaptopService();
