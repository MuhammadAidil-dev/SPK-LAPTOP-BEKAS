import { Laptop } from './laptop.model';
import {
  CreateLaptopDTO,
  ILaptopResponse,
  UpdateLaptopDTO,
} from './laptop.type';

class LaptopRepository {
  async create(payload: CreateLaptopDTO): Promise<ILaptopResponse> {
    const doc = await Laptop.create(payload);
    return this.parseResponse(doc.toObject()) as ILaptopResponse;
  }

  async findAll(): Promise<ILaptopResponse[]> {
    const docs = await Laptop.find().lean();
    return docs
      .map((doc) => this.parseResponse(doc))
      .filter((d): d is ILaptopResponse => d !== null);
  }

  async findAllActive(): Promise<ILaptopResponse[]> {
    const docs = await Laptop.find({ isActive: true }).lean();
    return docs
      .map((doc) => this.parseResponse(doc))
      .filter((d): d is ILaptopResponse => d !== null);
  }

  async findById(id: string): Promise<ILaptopResponse | null> {
    const doc = await Laptop.findById(id).lean();
    return this.parseResponse(doc);
  }

  async update(
    id: string,
    payload: UpdateLaptopDTO,
  ): Promise<ILaptopResponse | null> {
    const doc = await Laptop.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true, runValidators: true },
    ).lean();
    return this.parseResponse(doc);
  }

  async delete(id: string): Promise<ILaptopResponse | null> {
    const doc = await Laptop.findByIdAndDelete(id).lean();
    return this.parseResponse(doc);
  }

  // ## HELPER ##
  private parseResponse(doc: any): ILaptopResponse | null {
    if (!doc) return null;

    return {
      _id: doc._id.toString(),
      name: doc.name,
      brand: doc.brand,
      price: doc.price,
      processor_score: doc.processor_score,
      gpu_score: doc.gpu_score,
      ram: doc.ram,
      storage: doc.storage,
      condition: doc.condition,
      age_months: doc.age_months,
      screen_size: doc.screen_size,
      battery_life: doc.battery_life,
      image: doc.image ?? null,
      isActive: doc.isActive,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}

export const laptopRepository = new LaptopRepository();
