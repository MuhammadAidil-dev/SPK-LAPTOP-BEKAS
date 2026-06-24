'use client';

import { ICalculationRanking } from '@/types/calculation.type';
import { formatCurrency } from '@/utils/utils';
import {
  addToCompare,
  getCompareIds,
  removeFromCompare,
} from '@/lib/compare-storage';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  CheckSquare,
  Cpu,
  DollarSign,
  Medal,
  Shield,
  Square,
  Trophy,
  Wrench,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type RankedLaptop = ICalculationRanking & { image: string | null };

type Props = {
  rankings: RankedLaptop[];
  totalLaptops: number;
  totalCriteria: number;
};

const criteriaIcons: Record<string, React.ReactNode> = {
  harga: <DollarSign size={18} className="text-primary" />,
  performa: <Cpu size={18} className="text-primary" />,
  kondisi: <Wrench size={18} className="text-primary" />,
  umur: <Shield size={18} className="text-primary" />,
};

function getCriteriaIcon(name: string) {
  const key = name.toLowerCase();
  for (const k of Object.keys(criteriaIcons)) {
    if (key.includes(k)) return criteriaIcons[k];
  }
  return <BarChart3 size={18} className="text-primary" />;
}

export default function HomeView({
  rankings,
  totalLaptops,
  totalCriteria,
}: Props) {
  const [top1, ...others] = [...rankings].sort((a, b) => a.rank - b.rank);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    setCompareIds(getCompareIds());
  }, []);

  function toggleCompare(laptopId: string) {
    setCompareIds((prev) => {
      if (prev.includes(laptopId)) {
        removeFromCompare(laptopId);
        return prev.filter((id) => id !== laptopId);
      }
      addToCompare(laptopId);
      return [...prev, laptopId];
    });
  }

  if (!top1) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 text-center text-gray-500">
        Belum ada data rekomendasi.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ── HERO ── */}
      <section className="bg-linear-to-br from-primary/10 via-white to-white pt-24 pb-14 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                <BarChart3 size={14} />
                Sistem Pendukung Keputusan — Metode SMART
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Temukan Laptop <span className="text-primary">Terbaik</span>{' '}
                untuk Kebutuhan Anda
              </h1>

              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-lg">
                Sistem kami menganalisis{' '}
                <strong className="text-gray-700">{totalLaptops} laptop</strong>{' '}
                berdasarkan{' '}
                <strong className="text-gray-700">
                  {totalCriteria} kriteria
                </strong>{' '}
                menggunakan metode SMART untuk memberikan rekomendasi yang
                objektif.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={`/laptops/detail/${top1.laptop_id}`}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-hover text-white font-semibold px-6 py-3 rounded-lg transition text-sm"
                >
                  Lihat Rekomendasi #1
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/laptops/all"
                  className="flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary/5 font-semibold px-6 py-3 rounded-lg transition text-sm"
                >
                  Semua Ranking
                </Link>
              </div>
            </div>

            {/* Hero image — top 1 laptop */}
            <div className="relative">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border bg-gray-100">
                {top1.image ? (
                  <Image
                    src={top1.image}
                    alt={top1.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No image
                  </div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy size={16} className="text-yellow-400" />
                    <span className="text-xs font-semibold text-yellow-400">
                      Rekomendasi Terbaik
                    </span>
                  </div>
                  <p className="font-bold text-base md:text-lg leading-tight">
                    {top1.name}
                  </p>
                  <p className="text-xs text-white/70">{top1.brand}</p>
                </div>
              </div>

              {/* Score badge */}
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white border-2 border-primary rounded-xl px-3 py-2 shadow-lg text-center">
                <p className="text-xs text-gray-500 font-medium">SMART Score</p>
                <p className="text-xl font-bold text-primary">
                  {top1.final_score.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-secondary/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Laptop Dianalisis', value: totalLaptops, suffix: '' },
              { label: 'Kriteria Penilaian', value: totalCriteria, suffix: '' },
              { label: 'Top Rekomendasi', value: 3, suffix: ' laptop' },
              { label: 'Akurasi Metode', value: 'SMART', suffix: '' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 md:p-4">
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-14 md:space-y-20">
        {/* ── TOP 3 RECOMMENDATIONS ── */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Top 3 Rekomendasi
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Laptop terbaik berdasarkan perhitungan SMART
              </p>
            </div>
            <Link
              href="/laptops/all"
              className="text-primary text-sm font-semibold hover:underline flex items-center gap-1 shrink-0"
            >
              Lihat semua <ArrowRight size={14} />
            </Link>
          </div>

          {/* Rank 1 — featured */}
          <div className="bg-white border-2 border-primary rounded-2xl overflow-hidden shadow-md mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto md:min-h-64 bg-gray-100">
                {top1.image ? (
                  <Image
                    src={top1.image}
                    alt={top1.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm min-h-52">
                    No image
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Trophy size={13} />
                  Rank #1
                </span>
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    {top1.brand}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {top1.name}
                  </h3>
                  <p className="text-primary text-xl font-bold mb-5">
                    {formatCurrency(top1.price)}
                  </p>

                  {/* Criteria breakdown */}
                  <div className="space-y-2.5 mb-6">
                    {top1.criteria.map((c) => (
                      <div key={c.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 capitalize">
                            {getCriteriaIcon(c.name)}
                            {c.name}
                          </span>
                          <span className="text-xs font-semibold text-primary">
                            {c.utility.toFixed(1)}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${Math.min(c.utility, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="bg-primary/10 rounded-lg px-4 py-2 text-center">
                        <p className="text-xs text-gray-500">SMART Score</p>
                        <p className="text-lg font-bold text-primary">
                          {top1.final_score.toFixed(2)}
                        </p>
                      </div>
                      <Link
                        href={`/laptops/detail/${top1.laptop_id}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-hover text-white font-semibold py-2.5 rounded-lg transition text-sm"
                      >
                        Lihat Detail <ArrowRight size={15} />
                      </Link>
                    </div>
                    <button
                      onClick={() => toggleCompare(top1.laptop_id)}
                      className={`flex items-center justify-center gap-1.5 w-full font-semibold py-2 rounded-lg transition text-sm ${
                        compareIds.includes(top1.laptop_id)
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'border border-gray-300 text-gray-500 hover:border-primary hover:text-primary'
                      }`}
                    >
                      {compareIds.includes(top1.laptop_id) ? (
                        <CheckSquare size={15} />
                      ) : (
                        <Square size={15} />
                      )}
                      {compareIds.includes(top1.laptop_id)
                        ? 'Terpilih untuk Dibandingkan'
                        : 'Bandingkan'}
                    </button>
                  </div>
              </div>
            </div>
          </div>

          {/* Rank 2 & 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {others.map((item) => (
              <div
                key={item.laptop_id}
                className="bg-white border border-secondary/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video bg-gray-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No image
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Medal size={12} />
                    Rank #{item.rank}
                  </span>
                </div>

                <div className="p-4 md:p-5">
                  <p className="text-xs text-gray-500">{item.brand}</p>
                  <h3 className="font-semibold text-gray-900 mt-0.5 mb-3">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary font-semibold text-sm">
                      {formatCurrency(item.price)}
                    </span>
                    <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded">
                      Score: {item.final_score.toFixed(2)}
                    </span>
                  </div>

                  <Link
                    href={`/laptops/detail/${item.laptop_id}`}
                    className="flex items-center justify-center gap-2 w-full border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 rounded-lg transition text-sm"
                  >
                    Lihat Detail
                  </Link>
                  <button
                    onClick={() => toggleCompare(item.laptop_id)}
                    className={`flex items-center justify-center gap-1.5 w-full font-semibold py-2 rounded-lg transition text-sm ${
                      compareIds.includes(item.laptop_id)
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'border border-gray-300 text-gray-500 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {compareIds.includes(item.laptop_id) ? (
                      <CheckSquare size={14} />
                    ) : (
                      <Square size={14} />
                    )}
                    {compareIds.includes(item.laptop_id) ? 'Terpilih' : 'Bandingkan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section>
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Bagaimana Sistem Bekerja?
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
              Metode SMART menghitung skor berdasarkan 4 kriteria utama dan
              menghasilkan ranking yang objektif.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              {
                icon: <DollarSign size={22} className="text-primary" />,
                title: 'Harga',
                desc: 'Laptop dengan harga lebih terjangkau mendapat nilai utilitas lebih tinggi (kriteria cost).',
              },
              {
                icon: <Cpu size={22} className="text-primary" />,
                title: 'Performa',
                desc: 'Dihitung dari skor CPU, GPU, RAM, dan storage berdasarkan benchmark PassMark.',
              },
              {
                icon: <Wrench size={22} className="text-primary" />,
                title: 'Kondisi Fisik',
                desc: 'Skala 1–5 yang merepresentasikan kondisi fisik laptop dari buruk hingga sempurna.',
              },
              {
                icon: <Shield size={22} className="text-primary" />,
                title: 'Usia Pemakaian',
                desc: 'Laptop lebih baru mendapat skor lebih tinggi — diukur dalam satuan bulan.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-secondary/10 rounded-xl p-5 md:p-6 shadow-sm space-y-3 hover:border-primary/30 transition"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Masih bingung memilih?
          </h3>
          <p className="text-primary-foreground/80 text-sm md:text-base mb-6 max-w-lg mx-auto opacity-80">
            Lihat seluruh daftar ranking laptop yang sudah dihitung oleh sistem
            SMART kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/laptops/all"
              className="flex items-center justify-center gap-2 bg-white text-primary hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg transition text-sm"
            >
              Lihat Semua Ranking
              <ArrowRight size={16} />
            </Link>
            <Link
              href={`/laptops/detail/${top1.laptop_id}`}
              className="flex items-center justify-center gap-2 border border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition text-sm"
            >
              <CheckCircle size={16} />
              Rekomendasi #1
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
