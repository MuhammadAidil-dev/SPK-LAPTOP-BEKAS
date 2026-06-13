'use client';

import { ICalculationRanking } from '@/types/calculation.type';
import { formatCurrency } from '@/utils/utils';
import Image from 'next/image';
import ButtonLink from '../ui/ButtonLink';

type RankedLaptop = ICalculationRanking & { image: string | null };

type Props = {
  rankings: RankedLaptop[];
};

export default function HomeView({ rankings }: Props) {
  const [top1, ...others] = [...rankings].sort((a, b) => a.rank - b.rank);

  if (!top1) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 text-center text-gray-500">
        Belum ada data rekomendasi.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-20 pb-12 md:pt-24 md:pb-16">
      <section className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
          Rekomendasi Laptop Terbaik
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Sistem telah memproses data laptop menggunakan metode SMART
          berdasarkan kriteria harga, performa, kondisi, dan usia.
        </p>
      </section>

      {/* Podium — stack on mobile, 3-col on lg */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8 lg:items-end mb-10 md:mb-16">
        {/* Best — shown first on mobile via order */}
        <div className="order-first lg:order-last">
          <div className="bg-white border-2 border-green-600 rounded-xl p-6 md:p-8 shadow-lg flex flex-col relative lg:scale-105">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-4 py-1 rounded-full whitespace-nowrap">
              Best Recommendation
            </span>

            <div className="aspect-video mb-4 md:mb-6 rounded-lg overflow-hidden bg-gray-100">
              {top1.image ? (
                <Image
                  src={top1.image}
                  alt={top1.name}
                  width={400}
                  height={250}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  No image
                </div>
              )}
            </div>

            <h2 className="text-lg md:text-xl font-semibold">{top1.name}</h2>
            <p className="text-xs text-gray-500 mb-4">{top1.brand}</p>

            <div className="flex justify-between items-center mb-4 md:mb-6 gap-4 flex-wrap">
              <span className="text-green-600 text-base md:text-lg font-semibold">
                {formatCurrency(top1.price)}
              </span>
              <div className="bg-primary/10 px-4 py-2 rounded text-center">
                <p className="text-xs text-gray-600">SMART Score</p>
                <p className="font-bold text-sm">{top1.final_score.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-auto flex gap-3">
              <ButtonLink href={`/laptops/detail/${top1.laptop_id}`}>
                Detail
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Others */}
        {others.map((item) => (
          <div key={item.laptop_id} className="order-last lg:order-none">
            <div className="bg-white border border-secondary/10 rounded-xl p-5 md:p-6 shadow-sm flex flex-col relative">
              <span className="absolute -top-3 left-4 bg-gray-700 text-white text-xs px-3 py-1 rounded-full">
                Rank {item.rank}
              </span>

              <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={250}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    No image
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-base md:text-lg">{item.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{item.brand}</p>

              <div className="flex justify-between items-center mt-4 mb-4 md:mb-6 flex-wrap gap-2">
                <span className="text-green-600 font-semibold text-sm md:text-base">
                  {formatCurrency(item.price)}
                </span>
                <div className="bg-gray-100 px-3 py-1 rounded">
                  <p className="text-xs text-gray-500">Score</p>
                  <p className="font-semibold text-sm">{item.final_score.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-auto flex gap-2">
                <ButtonLink href={`/laptops/detail/${item.laptop_id}`}>
                  Detail
                </ButtonLink>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/10 border rounded-xl p-5 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="font-semibold text-gray-900">
            Ingin lihat alternatif lain?
          </h4>
          <p className="text-sm text-gray-500">
            Masih ada banyak laptop lain yang sudah dihitung oleh sistem.
          </p>
        </div>
        <div className="w-full sm:w-50 flex-shrink-0">
          <ButtonLink href="/laptops/all">Lihat Semua Ranking</ButtonLink>
        </div>
      </div>
    </div>
  );
}
