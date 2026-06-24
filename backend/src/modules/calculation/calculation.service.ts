import { AppError } from '@/common/error/appError';
import { ERROR_CODE, HTTP_CODE } from '@/common/error/http';
import { criteriaRepository } from '@/modules/criteria/criteria.repository';
import { ICriteriaResponse } from '@/modules/criteria/criteria.type';
import { laptopRepository } from '@/modules/laptops/laptop.repository';
import { ILaptopResponse } from '@/modules/laptops/laptop.type';
import { ICalculationResult, ICriterionDetail } from './calculation.type';

// Min-max normalization. Returns 0-100.
function minMax(
  value: number,
  min: number,
  max: number,
  isCost: boolean,
): number {
  if (max === min) return 100;
  const raw = isCost
    ? (max - value) / (max - min)
    : (value - min) / (max - min);
  return Math.round(raw * 10000) / 100;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// Composite utility for "performa": average of 4 sub-criteria (processor, GPU, RAM, storage)
function computePerformaUtility(
  laptop: ILaptopResponse,
  all: ILaptopResponse[],
): number {
  const proc = all.map((l) => l.processor_score);
  const gpu = all.map((l) => l.gpu_score);
  const ram = all.map((l) => l.ram);
  const storage = all.map((l) => l.storage);

  const u1 = minMax(laptop.processor_score, Math.min(...proc), Math.max(...proc), false);
  const u2 = minMax(laptop.gpu_score, Math.min(...gpu), Math.max(...gpu), false);
  const u3 = minMax(laptop.ram, Math.min(...ram), Math.max(...ram), false);
  const u4 = minMax(laptop.storage, Math.min(...storage), Math.max(...storage), false);

  return round2((u1 + u2 + u3 + u4) / 4);
}

// Absolute scale: condition 1-5 → utility 0-100
function computeKondisiUtility(laptop: ILaptopResponse): number {
  return round2(((laptop.condition - 1) / 4) * 100);
}

function computeUtility(
  criterionName: string,
  criterionType: string,
  laptop: ILaptopResponse,
  allLaptops: ILaptopResponse[],
): number {
  const name = criterionName.toLowerCase().trim();
  const isCost = criterionType === 'cost';

  switch (name) {
    case 'harga': {
      const vals = allLaptops.map((l) => l.price);
      return minMax(laptop.price, Math.min(...vals), Math.max(...vals), isCost);
    }
    case 'performa': {
      return computePerformaUtility(laptop, allLaptops);
    }
    case 'kondisi':
    case 'kondisi fisik': {
      return computeKondisiUtility(laptop);
    }
    case 'umur':
    case 'usia penggunaan': {
      const vals = allLaptops.map((l) => l.age_months);
      return minMax(laptop.age_months, Math.min(...vals), Math.max(...vals), isCost);
    }
    default:
      return 0;
  }
}

class CalculationService {
  async calculateSmartService(): Promise<ICalculationResult> {
    const [allCriteria, laptops] = await Promise.all([
      criteriaRepository.findAll(),
      laptopRepository.findAllActive(),
    ]);

    const activeCriteria = allCriteria.filter((c) => c.isActive === true);

    if (activeCriteria.length === 0) {
      throw new AppError(
        'Tidak ada kriteria aktif untuk perhitungan',
        HTTP_CODE.BAD_REQUEST,
        ERROR_CODE.BAD_REQUEST,
      );
    }

    if (laptops.length === 0) {
      throw new AppError(
        'Tidak ada data laptop tersedia untuk perhitungan',
        HTTP_CODE.BAD_REQUEST,
        ERROR_CODE.BAD_REQUEST,
      );
    }

    return this._performCalculation(laptops, activeCriteria);
  }

  async compareService(laptopIds: string[]): Promise<ICalculationResult> {
    // De-duplicate IDs
    const uniqueIds = [...new Set(laptopIds)];

    // Fetch criteria and selected laptops
    const [allCriteria, selectedLaptops] = await Promise.all([
      criteriaRepository.findAll(),
      laptopRepository.findByIdsAndActive(uniqueIds),
    ]);

    const activeCriteria = allCriteria.filter((c) => c.isActive === true);

    // Validate: no active criteria
    if (activeCriteria.length === 0) {
      throw new AppError(
        'Tidak ada kriteria aktif untuk perhitungan',
        HTTP_CODE.BAD_REQUEST,
        ERROR_CODE.BAD_REQUEST,
      );
    }

    // Validate: check if all requested IDs are found
    if (selectedLaptops.length < uniqueIds.length) {
      const foundIds = selectedLaptops.map((l) => String(l._id));
      const notFoundIds = uniqueIds.filter((id) => !foundIds.includes(id));
      throw new AppError(
        `Laptop dengan ID ${notFoundIds.join(', ')} tidak ditemukan atau tidak aktif`,
        HTTP_CODE.NOT_FOUND,
        ERROR_CODE.NOT_FOUND,
      );
    }

    // Perform calculation with selected laptops only
    return this._performCalculation(selectedLaptops, activeCriteria);
  }

  private _performCalculation(
    laptops: ILaptopResponse[],
    activeCriteria: ICriteriaResponse[],
  ): ICalculationResult {
    // Normalize weights so they sum to 1
    const totalWeight = activeCriteria.reduce((sum, c) => sum + c.weight, 0);
    const normalizedCriteria = activeCriteria.map((c) => ({
      name: c.name,
      type: c.type,
      weight: c.weight,
      normalizedWeight: totalWeight > 0 ? c.weight / totalWeight : 0,
    }));

    const rankings = laptops.map((laptop) => {
      const criteriaDetails: ICriterionDetail[] = normalizedCriteria.map(
        (criterion) => {
          const utility = computeUtility(
            criterion.name,
            criterion.type,
            laptop,
            laptops,
          );
          const weightedScore = round2(utility * criterion.normalizedWeight);

          return {
            name: criterion.name,
            weight: criterion.weight,
            normalized_weight: round2(criterion.normalizedWeight),
            utility: round2(utility),
            weighted_score: weightedScore,
          };
        },
      );

      const finalScore = round2(
        criteriaDetails.reduce((sum, c) => sum + c.weighted_score, 0),
      );

      return {
        rank: 0,
        laptop_id: String(laptop._id),
        name: laptop.name,
        brand: laptop.brand,
        price: laptop.price,
        final_score: finalScore,
        criteria: criteriaDetails,
      };
    });

    rankings.sort((a, b) => b.final_score - a.final_score);
    rankings.forEach((item, idx) => {
      item.rank = idx + 1;
    });

    return {
      total_laptops: laptops.length,
      total_criteria: activeCriteria.length,
      rankings,
    };
  }
}

export const calculationService = new CalculationService();
