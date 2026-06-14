import type { Metadata } from 'next';
import AllRankingView from '@/components/view/AllRankingView';
import { calculationService } from '@/features/calculation/services/calculation.service';
import { laptopService } from '@/features/laptop/services/laptop.service';

export const metadata: Metadata = {
  title: 'Semua Rekomendasi Laptop Bekas',
  description:
    'Daftar lengkap laptop bekas dengan ranking rekomendasi berdasarkan metode SMART. Bandingkan spesifikasi dan harga laptop bekas terbaik.',
  openGraph: {
    title: 'Semua Rekomendasi Laptop Bekas | SPK Laptop Bekas',
    description:
      'Daftar lengkap laptop bekas dengan ranking rekomendasi berdasarkan metode SMART.',
    url: 'https://laptopstore-inhil.my.id/laptops/all',
  },
};

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
    image: r.image ?? laptops.find((l) => l._id === r.laptop_id)?.image ?? null,
  }));

  return (
    <AllRankingView
      rankings={rankings}
      totalLaptops={calcResult.data.total_laptops}
      totalCriteria={calcResult.data.total_criteria}
    />
  );
}
