import { AppError } from '@/common/error/appError';
import { criteriaRepository } from './criteria.repository';
import {
  CreateCriteriaDTO,
  ICriteria,
  ICriteriaResponse,
  UpdateCriteriaDTO,
} from './criteria.type';
import { ERROR_CODE, HTTP_CODE } from '@/common/error/http';

const MAX_SUM_WEIGHT = 1;

class CriteriaService {
  constructor() {}

  async createCriteriaService(payload: CreateCriteriaDTO) {
    // total weight = 1, tidak bisa tambah kriteria
    const sumWeight = await this.getTotalWeight();

    if (sumWeight === MAX_SUM_WEIGHT) {
      throw new AppError(
        'Tidak bisa menambahkan kriteria, total weight sudah = 1',
        HTTP_CODE.BAD_REQUEST,
        ERROR_CODE.BAD_REQUEST,
      );
    }

    const isExistCriteria = await criteriaRepository.findByName(payload.name);

    if (isExistCriteria) {
      throw new AppError(
        `Criteria ${payload.name} sudah ada`,
        HTTP_CODE.CONFLICT,
        ERROR_CODE.DUPLICATE_KEY,
      );
    }

    // validasi nilai weigth tidak lebih dari 1
    const totalWeight = await this.checkTotalWeight(payload.weight);

    if (totalWeight > 1) {
      throw new AppError(
        'Total keseluruhan weight sudah lebih dari 1, tolong sesuaikan terlebih dahulu',
        HTTP_CODE.BAD_REQUEST,
        ERROR_CODE.BAD_REQUEST,
      );
    }

    return await criteriaRepository.createCriteria(payload);
  }

  async getAllCriteriaService(): Promise<ICriteriaResponse[]> {
    return await criteriaRepository.findAll();
  }

  async updateCriteriaService(
    id: string,
    payload: UpdateCriteriaDTO,
  ): Promise<ICriteriaResponse> {
    // validasi nilai weigth tidak lebih dari 1
    if (payload.weight) {
      const allCriteria = (await criteriaRepository.findAll()).filter(
        (criteria) => criteria._id.toString() !== id,
      );

      const sumWeight =
        allCriteria.reduce((acc, cur) => acc + cur.weight, 0) + payload.weight;

      if (sumWeight > MAX_SUM_WEIGHT) {
        throw new AppError(
          'Hasil total weight lebih dari 1, tolong disesuaikan terlebih dahulu',
          HTTP_CODE.BAD_REQUEST,
          ERROR_CODE.BAD_REQUEST,
        );
      }
    }

    const updatedCriteria = await criteriaRepository.updateCriteria(
      id,
      payload,
    );

    if (!updatedCriteria) {
      throw new AppError(
        'Criteria tidak ditemukan',
        HTTP_CODE.NOT_FOUND,
        ERROR_CODE.NOT_FOUND,
      );
    }

    return updatedCriteria;
  }

  async deleteCriteriaService(id: string): Promise<ICriteriaResponse> {
    if (!id) {
      throw new AppError(
        'Id criteria tidak ada',
        HTTP_CODE.NOT_FOUND,
        ERROR_CODE.NOT_FOUND,
      );
    }

    const deletedCriteria = await criteriaRepository.deleteCriteria(id);

    if (!deletedCriteria) {
      throw new AppError(
        'Criteria tidak ditemukan',
        HTTP_CODE.NOT_FOUND,
        ERROR_CODE.NOT_FOUND,
      );
    }

    return deletedCriteria;
  }

  /**
   *  @function FUNCTION_HELPER
   */

  private async checkTotalWeight(weight: number): Promise<number> {
    const allCriteria = await criteriaRepository.findAll();

    const sum = allCriteria.reduce((acc, criteria) => {
      return acc + criteria.weight;
    }, 0);

    return sum + weight;
  }
  private async getTotalWeight(): Promise<number> {
    const criteria = await criteriaRepository.findAll();
    return criteria.reduce((acc, data) => acc + data.weight, 0);
  }
}

export const criteriaService = new CriteriaService();
