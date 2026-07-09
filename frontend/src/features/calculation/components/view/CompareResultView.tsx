'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, RefreshCw, Scale } from 'lucide-react';
import { calculationService } from '../../services/calculation.service';
import { ICalculationResult, ICalculationRanking } from '@/types/calculation.type';
import { getCompareIds, resetCompare } from '@/lib/compare-storage';
import { formatCurrency } from '@/utils/utils';

export default function CompareResultView() {
  const router = useRouter();
  const [result, setResult] = useState<ICalculationResult | null>(null);
  const [loading, setLoading] = useState(() => getCompareIds().length > 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const ids = getCompareIds();
    if (ids.length === 0) return;

    calculationService.compare(ids).then((res) => {
      if (cancelled) return;
      if (res.success) {
        setResult(res.data);
      } else {
        setError(res.error.message || 'Gagal membandingkan laptop');
      }
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, []);

  if (getCompareIds().length === 0 && !loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-12 text-center">
        <p className="text-gray-500 mb-4">Belum ada laptop dipilih untuk dibandingkan.</p>
        <Link
          href="/laptops/all"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          <ArrowLeft size={15} />
          Kembali ke Ranking
        </Link>
      </div>
    );
  }

  function handleReset() {
    resetCompare();
    router.push('/laptops/all');
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-12 text-center text-gray-500">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        Menghitung perbandingan...
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-12 text-center">
        <p className="text-gray-500 mb-4">{error || 'Terjadi kesalahan'}</p>
        <Link
          href="/laptops/all"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          <ArrowLeft size={15} />
          Kembali ke Ranking
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* HEADER */}
      <section className="bg-linear-to-br from-primary/10 via-white to-white pt-24 pb-10 md:pt-28 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Scale size={13} />
                Perbandingan SMART
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Hasil Perbandingan
              </h1>
              <p className="text-gray-500 text-sm md:text-base">
                Membandingkan{' '}
                <strong className="text-gray-700">{result.total_laptops} laptop</strong>{' '}
                berdasarkan{' '}
                <strong className="text-gray-700">{result.total_criteria} kriteria</strong>.
              </p>
            </div>
            <div className="shrink-0 flex gap-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition"
              >
                <RefreshCw size={15} />
                Reset
              </button>
              <Link
                href="/laptops/all"
                className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/5 transition"
              >
                <ArrowLeft size={15} />
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-10">
        {/* SCORE TABLE */}
        <section>
          <div className="overflow-x-auto border border-secondary/10 rounded-2xl shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-secondary/10">
                <tr>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Ranking
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Laptop
                  </th>
                  <th className="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Skor SMART
                  </th>
                  {result.rankings[0]?.criteria.map((c) => (
                    <th
                      key={c.name}
                      className="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      {c.name}
                    </th>
                  ))}
                  <th className="px-4 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Harga
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {result.rankings.map((item) => (
                  <CompareRow key={item.laptop_id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* DETAILED CARDS */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Detail Perbandingan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {result.rankings.map((item) => (
              <CompareCard key={item.laptop_id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function CompareRow({ item }: { item: ICalculationRanking }) {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3.5 text-center">
        <span className="inline-flex items-center justify-center text-xs font-bold px-2.5 py-1 rounded-full min-w-9 bg-primary/10 text-primary">
          #{item.rank}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-14 h-10 relative bg-gray-100 rounded-lg overflow-hidden shrink-0 border">
            {item.image ? (
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">—</div>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-400">{item.brand}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5 text-center">
        <span className="font-bold text-primary">{item.final_score.toFixed(2)}</span>
      </td>
      {item.criteria.map((c) => (
        <td key={c.name} className="px-4 py-3.5 text-center text-gray-700">
          {c.utility.toFixed(1)}
        </td>
      ))}
      <td className="px-4 py-3.5 text-right font-medium text-gray-700 whitespace-nowrap tabular-nums">
        {formatCurrency(item.price)}
      </td>
    </tr>
  );
}

function CompareCard({ item }: { item: ICalculationRanking }) {
  return (
    <div className="bg-white border border-secondary/10 rounded-2xl overflow-hidden shadow-sm">
      <div className="relative aspect-video bg-gray-100">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No image</div>
        )}
        <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
          #{item.rank} — {item.final_score.toFixed(2)}
        </span>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <p className="text-xs text-gray-400">{item.brand}</p>
          <p className="font-semibold text-gray-900 text-lg">{item.name}</p>
          <p className="text-primary font-bold text-sm mt-1">{formatCurrency(item.price)}</p>
        </div>
        <div className="space-y-2.5">
          {item.criteria.map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600 capitalize font-medium">{c.name}</span>
                <span className="font-semibold text-gray-800">{c.utility.toFixed(1)}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${Math.min(c.utility, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <Link
          href={`/laptops/detail/${item.laptop_id}`}
          className="flex items-center justify-center gap-1.5 w-full border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 rounded-lg transition text-xs"
        >
          Lihat Detail <ArrowLeft size={12} className="rotate-180" />
        </Link>
      </div>
    </div>
  );
}
