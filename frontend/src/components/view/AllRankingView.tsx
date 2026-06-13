'use client';

import { ICalculationRanking } from '@/types/calculation.type';
import { formatCurrency } from '@/utils/utils';
import {
  Trophy,
  CheckCircle,
  BarChart3,
  RefreshCw,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import Image from 'next/image';
import ButtonLink from '../ui/ButtonLink';

type RankedLaptop = ICalculationRanking & { image: string | null };

type Props = {
  rankings: RankedLaptop[];
};

export default function AllRankingView({ rankings }: Props) {
  const best = rankings[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {best && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Rekomendasi Utama</h2>

            <span className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-xs font-semibold">
              <Trophy size={16} />
              PILIHAN TERBAIK
            </span>
          </div>

          <div className="flex flex-col md:flex-row border border-secondary/10 rounded-xl overflow-hidden shadow-sm">
            <div className="md:w-2/5 relative min-h-62.5 bg-gray-100">
              {best.image ? (
                <Image
                  src={best.image}
                  alt={best.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No image
                </div>
              )}
            </div>

            <div className="md:w-3/5 p-8 space-y-6 flex flex-col justify-center">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{best.name}</h3>
                  <p className="text-sm text-gray-500">{best.brand}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">SMART SCORE</p>
                  <p className="text-primary font-bold text-2xl">
                    {best.final_score.toFixed(2)}
                  </p>
                </div>
              </div>

              <p className="text-primary font-semibold text-lg">
                {formatCurrency(best.price)}
              </p>

              <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                {best.criteria.map((c) => (
                  <li key={c.name} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary" />
                    {c.name}: {c.utility.toFixed(1)}
                  </li>
                ))}
              </ul>

              <div className="w-32">
                <ButtonLink href={`/laptops/detail/${best.laptop_id}`}>
                  Detail
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Daftar Peringkat</h2>
            <p className="text-sm text-gray-500">
              Berdasarkan ranking hasil perhitungan SMART
            </p>
          </div>
        </div>

        <div className="border border-secondary/10 shadow-sm rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-primary/10 text-black font-semibold text-base">
              <tr>
                <th className="px-4 py-3 w-12">Rank</th>
                <th className="px-4 py-3 text-left">Laptop</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {rankings.map((item) => (
                <tr key={item.laptop_id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-center">
                    {item.rank}
                  </td>

                  <td className="px-4 py-3 flex items-center gap-3">
                    <div className="w-12 h-8 relative bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div>
                      <p>{item.name}</p>
                      <p className="text-xs text-gray-500">{item.brand}</p>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${Math.min(item.final_score, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="font-semibold text-primary">
                        {item.final_score.toFixed(2)}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {formatCurrency(item.price)}
                  </td>

                  <td className="px-4 py-3 flex justify-center items-center">
                    <div className="w-8">
                      <ButtonLink href={`/laptops/detail/${item.laptop_id}`}>
                        <Eye size={16} />
                      </ButtonLink>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="border border-secondary/10 shadow-sm bg-primary/10 rounded-xl p-6 space-y-2">
          <BarChart3 className="text-primary" />
          <h4 className="font-semibold">Metode SMART</h4>
          <p className="text-sm text-gray-500">
            Menggunakan metode pengambilan keputusan multi-kriteria.
          </p>
        </div>

        <div className="border border-secondary/10 shadow-sm bg-primary/10 rounded-xl p-6 space-y-2">
          <RefreshCw className="text-primary" />
          <h4 className="font-semibold">Update Berkala</h4>
          <p className="text-sm text-gray-500">
            Data diperbarui secara berkala.
          </p>
        </div>

        <div className="border border-secondary/10 shadow-sm bg-primary/10 rounded-xl p-6 space-y-2">
          <ShieldCheck className="text-primary" />
          <h4 className="font-semibold">Terpercaya</h4>
          <p className="text-sm text-gray-500">
            Digunakan untuk membantu keputusan pembelian.
          </p>
        </div>
      </section>
    </div>
  );
}
