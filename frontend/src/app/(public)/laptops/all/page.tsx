import AllRankingView from '@/components/view/AllRankingView';
import { calculationService } from '@/features/calculation/services/calculation.service';
import { laptopService } from '@/features/laptop/services/laptop.service';

export default async function AllRankingPage() {
  const [calcResult, laptopsResult] = await Promise.all([
    calculationService.calculate(),
    laptopService.getAll(),
  ]);

  if (!calcResult.success) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center text-gray-500">
        Belum ada data ranking.
      </div>
    );
  }

  const laptops = laptopsResult.success ? laptopsResult.data : [];
  const rankings = calcResult.data.rankings.map((r) => ({
    ...r,
    image: laptops.find((l) => l._id === r.laptop_id)?.image ?? null,
  }));

  return (
    <AllRankingView
      rankings={rankings}
      totalLaptops={calcResult.data.total_laptops}
      totalCriteria={calcResult.data.total_criteria}
    />
  );
}
