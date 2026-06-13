import { Request, Response } from 'express';
import {
  CreateCriteriaDTO,
  ICriteriaDocument,
  ICriteriaResponse,
  UpdateCriteriaDTO,
} from './criteria.type';
import { criteriaService } from './criteria.service';
import { HTTP_CODE } from '@/common/error/http';
import { sendSuccess } from '@/common/response/response.helper';

class CriteriaController {
  async createCriteriaController(
    _req: Request,
    res: Response,
  ) {
    const payload = res.locals.body as CreateCriteriaDTO;

    const criteria = await criteriaService.createCriteriaService({
      ...payload,
      name: payload.name.toLowerCase(),
    });

    sendSuccess<ICriteriaDocument>(res, {
      statusCode: HTTP_CODE.CREATED,
      message: 'Berhasil menambahkan criteria',
      data: criteria,
    });
  }

  async getAllCriteriaController(
    _req: Request,
    res: Response,
  ) {
    const allCriteria = await criteriaService.getAllCriteriaService();

    sendSuccess<ICriteriaResponse[]>(res, {
      message: 'Berhasil mengambil data criteria',
      data: allCriteria,
    });
  }

  async updateCriteriaController(
    req: Request,
    res: Response,
  ) {
    const { id } = req.params;
    const payload = res.locals.body as UpdateCriteriaDTO;

    const updatedCriteria = await criteriaService.updateCriteriaService(id, {
      ...payload,
      name: payload?.name?.toLowerCase(),
    });

    sendSuccess<ICriteriaResponse>(res, {
      message: 'Berhasil update criteria',
      data: updatedCriteria,
    });
  }

  async deleteCriteriaController(
    req: Request,
    res: Response,
  ) {
    const { id } = req.params;

    const deletedCriteria = await criteriaService.deleteCriteriaService(id);

    sendSuccess<ICriteriaResponse>(res, {
      message: 'Berhasil menghapus criteria',
      data: deletedCriteria,
    });
  }
}

export const criteriaController = new CriteriaController();
