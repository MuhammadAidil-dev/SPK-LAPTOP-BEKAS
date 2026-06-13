'use client';

import Breadcrumbs, {
  breadcrumbItemsType,
} from '@/components/navigations/Breadcrumb';
import { ICalculationRanking } from '@/types/calculation.type';
import { ILaptop } from '@/types/laptop.type';
import { formatCurrency } from '@/utils/utils';
import {
  ArrowLeft,
  BarChart3,
  Battery,
  CheckCircle,
  Cpu,
  DollarSign,
  HardDrive,
  Medal,
  Monitor,
  MemoryStick,
  Shield,
  Trophy,
  Wrench,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const breadcrumbsItems: breadcrumbItemsType[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Semua Ranking', href: '/laptops/all' },
  { label: 'Detail Laptop' },
];

type Props = {
  laptop: ILaptop;
  ranking: ICalculationRanking | null;
  totalRankings: number;
};

function getRankColor(rank: number) {
  if (rank === 1) return 'bg-yellow-500 text-white';
  if (rank === 2) return 'bg-gray-400 text-white';
  if (rank === 3) return 'bg-amber-600 text-white';
  return 'bg-gray-100 text-gray-700';
}

function getRankLabel(rank: number) {
  if (rank === 1) return '🥇 Rekomendasi Terbaik';
  if (rank === 2) return '🥈 Runner-up';
  if (rank === 3) return '🥉 Pilihan Ketiga';
  return `Peringkat ke-${rank}`;
}

function ConditionBar({ value }: { value: number }) {
  const pct = (value / 5) * 100;
  const color =
    value >= 4
      ? 'bg-green-500'
      : value >= 3
        ? 'bg-yellow-500'
        : 'bg-red-400';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-6 text-right">
        {value}/5
      </span>
    </div>
  );
}

export default function PublicLaptopDetailView({
  laptop,
  ranking,
  totalRankings,
}: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pt-20 pb-12 md:pt-24 md:pb-16">
      <div className="mb-5">
        <Breadcrumbs breadcrumItems={breadcrumbsItems} />
      </div>

      {/* ── HERO ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start mb-10 md:mb-14">
        {/* Image */}
        <div className="relative">
          <div className="relative aspect-video rounded-2xl overflow-hidden border bg-gray-100 shadow-md">
            {laptop.image ? (
              <Image
                src={laptop.image}
                alt={laptop.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                Tidak ada gambar
              </div>
            )}
          </div>

          {ranking && (
            <span
              className={`absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${getRankColor(ranking.rank)}`}
            >
              <Trophy size={13} />
              Rank #{ranking.rank}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">{laptop.brand}</p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
              {laptop.name}
            </h1>
            <p className="text-primary text-2xl md:text-3xl font-bold">
              {formatCurrency(laptop.price)}
            </p>
          </div>

          {/* Rank badge */}
          {ranking ? (
            <div className="flex flex-wrap gap-3">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${getRankColor(ranking.rank)}`}
              >
                <Medal size={16} />
                {getRankLabel(ranking.rank)}
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-semibold">
                <BarChart3 size={16} />
                SMART Score: {ranking.final_score.toFixed(3)}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <BarChart3 size={16} />
              Tidak termasuk dalam kalkulasi aktif
            </div>
          )}

          {ranking && totalRankings > 0 && (
            <p className="text-sm text-gray-500">
              Laptop ini menempati peringkat{' '}
              <strong className="text-gray-800">#{ranking.rank}</strong> dari{' '}
              <strong className="text-gray-800">{totalRankings}</strong> laptop
              yang dianalisis menggunakan metode SMART.
            </p>
          )}

          {/* Quick specs summary */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <QuickSpec icon={<MemoryStick size={15} />} label="RAM" value={`${laptop.ram} GB`} />
            <QuickSpec icon={<HardDrive size={15} />} label="Storage" value={`${laptop.storage} GB`} />
            <QuickSpec icon={<Monitor size={15} />} label="Layar" value={`${laptop.screen_size}"`} />
            <QuickSpec icon={<Battery size={15} />} label="Baterai" value={`${laptop.battery_life} jam`} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/laptops/all"
              className="flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white font-semibold px-5 py-2.5 rounded-lg transition text-sm"
            >
              <ArrowLeft size={15} />
              Lihat Semua Ranking
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 text-gray-500 hover:text-primary font-medium px-5 py-2.5 rounded-lg transition text-sm"
            >
              Ke Beranda
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
        {/* ── SPECS ── */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white border border-secondary/10 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 md:px-6 py-4 border-b border-secondary/10 bg-gray-50">
              <h2 className="font-semibold text-gray-900 text-base md:text-lg">
                Spesifikasi Teknis
              </h2>
            </div>

            <div className="p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SpecCard
                icon={<Cpu size={18} className="text-primary" />}
                label="Processor Score"
                value={laptop.processor_score.toLocaleString()}
                sub="PassMark score"
              />
              <SpecCard
                icon={<Zap size={18} className="text-primary" />}
                label="GPU Score"
                value={laptop.gpu_score.toLocaleString()}
                sub="PassMark score"
              />
              <SpecCard
                icon={<MemoryStick size={18} className="text-primary" />}
                label="RAM"
                value={`${laptop.ram} GB`}
              />
              <SpecCard
                icon={<HardDrive size={18} className="text-primary" />}
                label="Storage"
                value={`${laptop.storage} GB`}
              />
              <SpecCard
                icon={<Monitor size={18} className="text-primary" />}
                label="Ukuran Layar"
                value={`${laptop.screen_size}"`}
              />
              <SpecCard
                icon={<Battery size={18} className="text-primary" />}
                label="Daya Tahan Baterai"
                value={`${laptop.battery_life} jam`}
              />

              {/* Condition */}
              <div className="border border-secondary/10 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <Wrench size={18} className="text-primary" />
                  <span className="text-xs font-medium">Kondisi Fisik</span>
                </div>
                <ConditionBar value={laptop.condition} />
              </div>

              <SpecCard
                icon={<Shield size={18} className="text-primary" />}
                label="Usia Pemakaian"
                value={`${laptop.age_months} bulan`}
                sub={
                  laptop.age_months < 12
                    ? '< 1 tahun'
                    : `~${Math.round(laptop.age_months / 12)} tahun`
                }
              />
            </div>
          </div>
        </div>

        {/* ── SMART ANALYSIS ── */}
        <div className="lg:col-span-2">
          {ranking ? (
            <div className="bg-white border border-secondary/10 rounded-2xl shadow-sm overflow-hidden sticky top-24">
              <div className="px-5 md:px-6 py-4 border-b border-secondary/10 bg-primary/5">
                <h2 className="font-semibold text-gray-900 text-base md:text-lg flex items-center gap-2">
                  <BarChart3 size={18} className="text-primary" />
                  Analisis SMART
                </h2>
              </div>

              <div className="p-5 md:p-6 space-y-4">
                {/* Final score */}
                <div className="flex items-center justify-between bg-primary/10 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-xs text-gray-500">Skor Akhir</p>
                    <p className="text-2xl font-bold text-primary">
                      {ranking.final_score.toFixed(3)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Peringkat</p>
                    <p className="text-2xl font-bold text-gray-900">
                      #{ranking.rank}
                    </p>
                  </div>
                </div>

                {/* Per-criteria breakdown */}
                <div className="space-y-3.5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Nilai per Kriteria
                  </p>
                  {ranking.criteria.map((c) => (
                    <div key={c.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {c.name}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>bobot {(c.normalized_weight * 100).toFixed(0)}%</span>
                          <span className="font-semibold text-primary">
                            {c.utility.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${Math.min(c.utility, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-2 bg-blue-50 text-blue-700 rounded-xl p-3 text-xs">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" />
                  <p>
                    Skor SMART dihitung dari nilai utilitas tiap kriteria yang
                    dikalikan dengan bobotnya, menghasilkan rekomendasi yang
                    objektif.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-secondary/10 rounded-2xl shadow-sm p-6 text-center text-gray-400 text-sm">
              <BarChart3 size={28} className="mx-auto mb-3 text-gray-300" />
              <p>Laptop ini belum masuk dalam kalkulasi SMART saat ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QuickSpec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 bg-gray-50 border border-secondary/10 rounded-lg px-3 py-2">
      <span className="text-primary">{icon}</span>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function SpecCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="border border-secondary/10 rounded-xl p-3.5 space-y-1.5">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="font-bold text-gray-900 text-base">{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}
