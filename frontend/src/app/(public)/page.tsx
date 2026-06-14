import type { Metadata } from 'next';
import HomeView from '@/components/view/HomeView';
import { calculationService } from '@/features/calculation/services/calculation.service';
import { laptopService } from '@/features/laptop/services/laptop.service';

export const metadata: Metadata = {
  title: {
    absolute: 'SPK Laptop Bekas Indragiri Hilir',
  },
  description:
    'Temukan rekomendasi laptop bekas terbaik berdasarkan metode SMART. Pilih laptop sesuai kebutuhan dan anggaran Anda di Indragiri Hilir.',
  openGraph: {
    title: 'SPK Laptop Bekas Indragiri Hilir',
    description:
      'Temukan rekomendasi laptop bekas terbaik berdasarkan metode SMART.',
    url: 'https://laptopstore-inhil.my.id',
  },
};

export default async function HomePage() {
  const [calcResult, laptopsResult] = await Promise.all([
    calculationService.calculate(),
    laptopService.getAll(),
  ]);

  if (!calcResult.success) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 text-center text-gray-500">
        Belum ada data rekomendasi.
      </div>
    );
  }

  const laptops = laptopsResult.success ? laptopsResult.data : [];
  const rankings = calcResult.data.rankings.slice(0, 3).map((r) => ({
    ...r,
    image: r.image ?? laptops.find((l) => l._id === r.laptop_id)?.image ?? null,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SPK Laptop Bekas Indragiri Hilir',
    url: 'https://laptopstore-inhil.my.id',
    description:
      'Sistem Pendukung Keputusan pemilihan laptop bekas menggunakan metode SMART',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate:
          'https://laptopstore-inhil.my.id/laptops/all',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeView
        rankings={rankings}
        totalLaptops={calcResult.data.total_laptops}
        totalCriteria={calcResult.data.total_criteria}
      />
    </>
  );
}
