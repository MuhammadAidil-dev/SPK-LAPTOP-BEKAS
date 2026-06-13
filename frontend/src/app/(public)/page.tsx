import HomeView from '@/components/view/HomeView';
import { calculationService } from '@/features/calculation/services/calculation.service';
import { laptopService } from '@/features/laptop/services/laptop.service';

export default async function HomePage() {
  const [calcResult, laptopsResult] = await Promise.all([
    calculationService.calculate(),
    laptopService.getAll(),
  ]);

  if (!calcResult.success) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center text-gray-500">
        Belum ada data rekomendasi.
      </div>
    );
  }

  const laptops = laptopsResult.success ? laptopsResult.data : [];
  const rankings = calcResult.data.rankings.slice(0, 3).map((r) => ({
    ...r,
    image: laptops.find((l) => l._id === r.laptop_id)?.image ?? null,
  }));

  return <HomeView rankings={rankings} />;
}
