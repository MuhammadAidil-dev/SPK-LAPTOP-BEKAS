import { Request, Response } from 'express';
import { ApiResponse } from '@/types/api-response.type';
import { HTTP_CODE } from '@/common/error/http';
import { calculationService } from './calculation.service';
import { ICalculationResult } from './calculation.type';

class CalculationController {
  async calculateSmartController(
    _req: Request,
    res: Response<ApiResponse<ICalculationResult>>,
  ) {
    const result = await calculationService.calculateSmartService();

    res.status(HTTP_CODE.OK).json({
      success: true,
      message: 'Perhitungan SMART berhasil',
      data: result,
    });
  }
}

export const calculationController = new CalculationController();
