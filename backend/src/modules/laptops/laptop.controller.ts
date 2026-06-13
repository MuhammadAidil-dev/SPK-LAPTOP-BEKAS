import { Request, Response } from 'express';
import { ApiResponse } from '@/types/api-response.type';
import { HTTP_CODE } from '@/common/error/http';
import { loadEnv } from '@/config/env';
import { laptopService } from './laptop.service';
import {
  CreateLaptopDTO,
  ILaptopResponse,
  UpdateLaptopDTO,
} from './laptop.type';

const env = loadEnv();

function buildImageUrl(file?: Express.Multer.File): string | undefined {
  if (!file) return undefined;
  return `${env.URL}/uploads/${file.filename}`;
}

class LaptopController {
  async createLaptopController(
    req: Request,
    res: Response<ApiResponse<ILaptopResponse>>,
  ) {
    const payload = res.locals.body as CreateLaptopDTO;
    const laptop = await laptopService.createLaptopService({
      ...payload,
      image: buildImageUrl(req.file),
    });

    res.status(HTTP_CODE.CREATED).json({
      success: true,
      message: 'Berhasil menambahkan laptop',
      data: laptop,
    });
  }

  async getAllLaptopsController(
    _req: Request,
    res: Response<ApiResponse<ILaptopResponse[]>>,
  ) {
    const laptops = await laptopService.getAllLaptopsService();

    res.status(HTTP_CODE.OK).json({
      success: true,
      message: 'Berhasil mengambil data laptop',
      data: laptops,
    });
  }

  async getLaptopByIdController(
    req: Request,
    res: Response<ApiResponse<ILaptopResponse>>,
  ) {
    const { id } = req.params;
    const laptop = await laptopService.getLaptopByIdService(id);

    res.status(HTTP_CODE.OK).json({
      success: true,
      message: 'Berhasil mengambil data laptop',
      data: laptop,
    });
  }

  async updateLaptopController(
    req: Request,
    res: Response<ApiResponse<ILaptopResponse>>,
  ) {
    const { id } = req.params;
    const payload = res.locals.body as UpdateLaptopDTO;
    const imageUrl = buildImageUrl(req.file);

    const laptop = await laptopService.updateLaptopService(id, {
      ...payload,
      ...(imageUrl !== undefined && { image: imageUrl }),
    });

    res.status(HTTP_CODE.OK).json({
      success: true,
      message: 'Berhasil memperbarui laptop',
      data: laptop,
    });
  }

  async deleteLaptopController(
    req: Request,
    res: Response<ApiResponse<ILaptopResponse>>,
  ) {
    const { id } = req.params;
    const laptop = await laptopService.deleteLaptopService(id);

    res.status(HTTP_CODE.OK).json({
      success: true,
      message: 'Berhasil menghapus laptop',
      data: laptop,
    });
  }
}

export const laptopController = new LaptopController();
