import { Criteria } from './criteria.model';
import {
  CreateCriteriaDTO,
  ICriteriaDocument,
  ICriteriaResponse,
  UpdateCriteriaDTO,
} from './criteria.type';

class CriteriaRepository {
  constructor() {}

  async createCriteria(payload: CreateCriteriaDTO): Promise<ICriteriaDocument> {
    return await Criteria.create(payload);
  }

  async findByName(payloadName: string): Promise<ICriteriaResponse | null> {
    const criteria = await Criteria.findOne({
      name: payloadName,
    }).lean();

    return this.parseResponse(criteria);
  }

  async findAll(): Promise<ICriteriaResponse[]> {
    const docs = await Criteria.find().lean();
    return docs
      .map((doc) => this.parseResponse(doc))
      .filter((d): d is ICriteriaResponse => d !== null);
  }

  async updateCriteria(
    id: string,
    payload: UpdateCriteriaDTO,
  ): Promise<ICriteriaResponse | null> {
    const doc = await Criteria.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true, runValidators: true },
    ).lean();
    return this.parseResponse(doc);
  }

  async deleteCriteria(id: string): Promise<ICriteriaResponse | null> {
    const doc = await Criteria.findByIdAndDelete(id).lean();
    return this.parseResponse(doc);
  }

  // ## HELPER ##
  private parseResponse(doc: any): ICriteriaResponse | null {
    if (!doc) {
      return null;
    }

    return {
      _id: doc._id.toString(),
      name: doc.name,
      weight: doc.weight,
      type: doc.type,
      isActive: doc.isActive,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}

export const criteriaRepository = new CriteriaRepository();
