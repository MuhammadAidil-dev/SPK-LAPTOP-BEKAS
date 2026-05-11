'use client';

import { formatCurrency } from '@/utils/utils';
import Image from 'next/image';
import ButtonLink from '../ui/ButtonLink';

type Laptop = {
  id: number;
  name: string;
  price: number;
  performance_score: number;
  condition_score: number;
  age: number;
  final_score: number;
  rank: number;
  image: string;
  highlight?: string;
};

const laptops: Laptop[] = [
  {
    id: 1,
    name: 'Apex Forge Pro',
    price: 15490000,
    performance_score: 95,
    condition_score: 90,
    age: 1,
    final_score: 0.945,
    rank: 1,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    highlight: 'Performa tinggi + sangat portable',
  },
  {
    id: 2,
    name: 'Zenith Ultra 14',
    price: 12990000,
    performance_score: 88,
    condition_score: 85,
    age: 2,
    final_score: 0.892,
    rank: 2,
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Vanguard X1',
    price: 11500000,
    performance_score: 82,
    condition_score: 80,
    age: 3,
    final_score: 0.856,
    rank: 3,
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function HomeView() {
  const sorted = [...laptops].sort((a, b) => a.rank - b.rank);
  const top1 = sorted[0];
  const others = sorted.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* HERO */}
      <section className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Rekomendasi Laptop Terbaik
        </h1>
        <p className="text-gray-500">
          Sistem telah memproses data laptop menggunakan metode SMART
          berdasarkan kriteria harga, performa, kondisi, dan usia.
        </p>
      </section>

      {/* TOP 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end mb-16">
        {/* LEFT (RANK 2 & 3) */}
        {others.map((item) => (
          <div key={item.id} className="flex flex-col">
            <div className="bg-white border border-secondary/10 rounded-xl p-6 shadow-sm flex flex-col h-full relative">
              <span className="absolute -top-3 left-4 bg-gray-700 text-white text-xs px-3 py-1 rounded-full">
                Rank {item.rank}
              </span>

              <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={250}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="font-semibold text-lg">{item.name}</h3>

              <div className="flex justify-between items-center mt-4 mb-6">
                <span className="text-green-600 font-semibold">
                  {formatCurrency(item.price)}
                </span>

                <div className="bg-gray-100 px-3 py-1 rounded">
                  <p className="text-xs text-gray-500">Score</p>
                  <p className="font-semibold">{item.final_score}</p>
                </div>
              </div>

              <div className="mt-auto flex gap-2">
                <ButtonLink href="/laptops/detail/1">Detail</ButtonLink>
              </div>
            </div>
          </div>
        ))}

        {/* CENTER (BEST) */}
        <div className="flex flex-col">
          <div className="bg-white border-2 border-green-600 rounded-xl p-8 shadow-lg flex flex-col h-full scale-105 relative">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-4 py-1 rounded-full text-center">
              Best Recommendation
            </span>

            <div className="aspect-video mb-6 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={top1.image}
                alt={top1.name}
                width={400}
                height={250}
                className="object-cover w-full h-full"
              />
            </div>

            <h2 className="text-xl font-semibold">{top1.name}</h2>

            <p className="text-sm text-gray-500 mb-4">{top1.highlight}</p>

            <div className="flex justify-between items-center mb-6 gap-4">
              <span className="text-green-600 text-lg font-semibold">
                {formatCurrency(top1.price)}
              </span>

              <div className="bg-primary/10 px-4 py-2 rounded text-center">
                <p className="text-xs text-gray-600">SMART Score</p>
                <p className="font-bold text-sm">{top1.final_score}</p>
              </div>
            </div>

            <div className="mt-auto flex gap-3">
              <ButtonLink href="/laptops/detail/1">Detail</ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary/10 border rounded-xl p-6 flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-gray-900">
            Ingin lihat alternatif lain?
          </h4>
          <p className="text-sm text-gray-500">
            Masih ada banyak laptop lain yang sudah dihitung oleh sistem.
          </p>
        </div>

        <div className="w-50">
          <ButtonLink href="/laptops/all">Lihat Semua Ranking</ButtonLink>
        </div>
      </div>
    </div>
  );
}
