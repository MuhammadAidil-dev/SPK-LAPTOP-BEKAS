import { Request, Response } from 'express';
import { sendSuccess } from '@/common/response/response.helper';
import { calculationService } from './calculation.service';
import { ICalculationResult } from './calculation.type';

class CalculationController {
  async calculateSmartController(_req: Request, res: Response) {
    const result = await calculationService.calculateSmartService();

    sendSuccess<ICalculationResult>(res, {
      message: 'Perhitungan SMART berhasil',
      data: result,
    });
  }

  async compareController(req: Request, res: Response) {
    const { laptop_ids } = req.body;
    const result = await calculationService.compareService(laptop_ids);

    sendSuccess<ICalculationResult>(res, {
      message: 'Perhitungan SMART perbandingan berhasil',
      data: result,
    });
  }
}

export const calculationController = new CalculationController();
