import { Request, Response } from 'express';
import { HTTP_CODE } from '@/common/error/http';
import { sendSuccess } from '@/common/response/response.helper';
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
  async createLaptopController(req: Request, res: Response) {
    const payload = res.locals.body as CreateLaptopDTO;
    const laptop = await laptopService.createLaptopService({
      ...payload,
      image: buildImageUrl(req.file),
    });

    sendSuccess<ILaptopResponse>(res, {
      statusCode: HTTP_CODE.CREATED,
      message: 'Berhasil menambahkan laptop',
      data: laptop,
    });
  }

  async getAllLaptopsController(_req: Request, res: Response) {
    const laptops = await laptopService.getAllLaptopsService();

    sendSuccess<ILaptopResponse[]>(res, {
      message: 'Berhasil mengambil data laptop',
      data: laptops,
    });
  }

  async getLaptopByIdController(req: Request, res: Response) {
    const { id } = req.params;
    const laptop = await laptopService.getLaptopByIdService(id);

    sendSuccess<ILaptopResponse>(res, {
      message: 'Berhasil mengambil data laptop',
      data: laptop,
    });
  }

  async updateLaptopController(req: Request, res: Response) {
    const { id } = req.params;
    const payload = res.locals.body as UpdateLaptopDTO;
    const imageUrl = buildImageUrl(req.file);

    const laptop = await laptopService.updateLaptopService(id, {
      ...payload,
      ...(imageUrl !== undefined && { image: imageUrl }),
    });

    sendSuccess<ILaptopResponse>(res, {
      message: 'Berhasil memperbarui laptop',
      data: laptop,
    });
  }

  async deleteLaptopController(req: Request, res: Response) {
    const { id } = req.params;
    const laptop = await laptopService.deleteLaptopService(id);

    sendSuccess<ILaptopResponse>(res, {
      message: 'Berhasil menghapus laptop',
      data: laptop,
    });
  }
}

export const laptopController = new LaptopController();
