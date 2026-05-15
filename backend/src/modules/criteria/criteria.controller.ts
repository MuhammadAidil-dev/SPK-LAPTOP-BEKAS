import { Request, Response } from 'express';
import {
  CreateCriteriaDTO,
  ICriteria,
  ICriteriaDocument,
  ICriteriaResponse,
  UpdateCriteriaDTO,
} from './criteria.type';
import { criteriaService } from './criteria.service';
import { ApiResponse } from '@/types/api-response.type';
import { HTTP_CODE } from '@/common/error/http';

class CriteriaController {
  constructor() {}

  async createCriteriaController(
    _req: Request,
    res: Response<ApiResponse<ICriteriaDocument>>,
  ) {
    const payload = res.locals.body as CreateCriteriaDTO;

    const criteria = await criteriaService.createCriteriaService({
      ...payload,
      name: payload.name.toLowerCase(),
    });

    res.status(HTTP_CODE.CREATED).json({
      success: true,
      message: 'Berhasil menambahkan criteria',
      data: criteria,
    });
  }

  async getAllCriteriaController(
    _req: Request,
    res: Response<ApiResponse<ICriteriaResponse[]>>,
  ) {
    const allCriteria = await criteriaService.getAllCriteriaService();

    res.status(HTTP_CODE.OK).json({
      success: true,
      message: 'Berhasil mengambil data criteria',
      data: allCriteria,
    });
  }

  async updateCriteriaController(
    req: Request,
    res: Response<ApiResponse<ICriteriaResponse>>,
  ) {
    const { id } = req.params;
    const payload = res.locals.body as UpdateCriteriaDTO;

    const updateCriteria = await criteriaService.updateCriteriaService(id, {
      ...payload,
      name: payload?.name?.toLowerCase(),
    });

    res.status(HTTP_CODE.OK).json({
      success: true,
      message: 'Berhasil update criteria',
      data: updateCriteria,
    });
  }

  async deleteCriteriaController(
    req: Request,
    res: Response<ApiResponse<ICriteriaResponse>>,
  ) {
    const { id } = req.params;

    const deletedCriteria = await criteriaService.deleteCriteriaService(id);

    res.status(HTTP_CODE.OK).json({
      success: true,
      message: 'Berhasil menghapus criteria',
      data: deletedCriteria,
    });
  }
}

export const criteriaController = new CriteriaController();
