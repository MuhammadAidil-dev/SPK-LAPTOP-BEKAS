'use client';

import { ICalculationRanking } from '@/types/calculation.type';
import { formatCurrency } from '@/utils/utils';
import { ArrowRight, BarChart3, Eye, Medal, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type RankedLaptop = ICalculationRanking & { image: string | null };

type Props = {
  rankings: RankedLaptop[];
  totalLaptops: number;
  totalCriteria: number;
};

function getRankStyle(rank: number) {
  if (rank === 1)
    return { badge: 'bg-yellow-400 text-yellow-900', row: 'bg-yellow-50/60' };
  if (rank === 2)
    return { badge: 'bg-gray-300 text-gray-800', row: 'bg-gray-50/60' };
  if (rank === 3)
    return { badge: 'bg-amber-500/80 text-white', row: 'bg-amber-50/40' };
  return { badge: 'bg-gray-100 text-gray-600', row: '' };
}

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy size={14} className="text-yellow-600" />;
  if (rank === 2) return <Medal size={14} className="text-gray-500" />;
  if (rank === 3) return <Medal size={14} className="text-amber-600" />;
  return null;
}

export default function AllRankingView({
  rankings,
  totalLaptops,
  totalCriteria,
}: Props) {
  const top3 = rankings.slice(0, 3);
  const maxScore = rankings.length > 0 ? rankings[0].final_score : 1;

  return (
    <div className="w-full">
      {/* ── HEADER ── */}
      <section className="bg-linear-to-br from-primary/10 via-white to-white pt-24 pb-10 md:pt-28 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <BarChart3 size={13} />
              Metode SMART
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Semua Ranking Laptop
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Daftar lengkap{' '}
              <strong className="text-gray-700">{totalLaptops} laptop</strong>{' '}
              diurutkan berdasarkan skor SMART yang dihitung dari{' '}
              <strong className="text-gray-700">
                {totalCriteria} kriteria
              </strong>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-secondary/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-md">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-primary">
                {totalLaptops}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Laptop</p>
            </div>
            <div className="text-center border-x border-secondary/10">
              <p className="text-xl md:text-2xl font-bold text-primary">
                {totalCriteria}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Kriteria</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-primary">
                SMART
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Metode</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-12 md:space-y-16">
        {/* ── TOP 3 PODIUM ── */}
        {top3.length > 0 && (
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Podium Teratas
            </h2>

            {/* Desktop: rank 2 | rank 1 | rank 3 */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-4 md:gap-5 items-end">
              {[top3[1], top3[0], top3[2]].map((item, idx) => {
                if (!item) return <div key={idx} />;
                const podiumOrder = [2, 1, 3];
                const rank = podiumOrder[idx];
                const heights = [
                  'h-52 md:h-60',
                  'h-64 md:h-72',
                  'h-52 md:h-60',
                ];
                return (
                  <PodiumCard
                    key={item.laptop_id}
                    item={item}
                    rank={rank}
                    extraHeight={heights[idx]}
                    maxScore={maxScore}
                  />
                );
              })}
            </div>

            {/* Mobile: vertical list */}
            <div className="sm:hidden space-y-3">
              {top3.map((item) => (
                <MobileTopCard
                  key={item.laptop_id}
                  item={item}
                  maxScore={maxScore}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── FULL RANKING TABLE ── */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Daftar Lengkap
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {rankings.length} laptop diurutkan berdasarkan skor SMART
              </p>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block border border-secondary/10 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-secondary/10">
                <tr>
                  <th className="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide w-16">
                    Rank
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Laptop
                  </th>
                  <th className="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Skor SMART
                  </th>
                  <th className="px-4 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Harga
                  </th>
                  <th className="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">
                    Detail
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-secondary/5">
                {rankings.map((item) => {
                  const { badge, row } = getRankStyle(item.rank);
                  return (
                    <tr
                      key={item.laptop_id}
                      className={`hover:bg-gray-50 transition ${row}`}
                    >
                      <td className="px-4 py-3.5 text-center">
                        <span
                          className={`inline-flex items-center justify-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full min-w-9 ${badge}`}
                        >
                          <RankIcon rank={item.rank} />
                          {item.rank}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-10 relative bg-gray-100 rounded-lg overflow-hidden shrink-0 border">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                                —
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {item.brand}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-center gap-2.5">
                          <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{
                                width: `${(item.final_score / maxScore) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="font-semibold text-primary text-sm w-12 text-right tabular-nums">
                            {item.final_score.toFixed(3)}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-right font-medium text-gray-700 whitespace-nowrap tabular-nums">
                        {formatCurrency(item.price)}
                      </td>

                      <td className="px-4 py-3.5 text-center">
                        <Link
                          href={`/laptops/detail/${item.laptop_id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg transition"
                        >
                          <Eye size={13} />
                          Lihat
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile: card list */}
          <div className="md:hidden space-y-3">
            {rankings.map((item) => {
              const { badge } = getRankStyle(item.rank);
              return (
                <div
                  key={item.laptop_id}
                  className="bg-white border border-secondary/10 rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="flex gap-3 p-3.5">
                    <div className="w-20 h-14 relative bg-gray-100 rounded-lg overflow-hidden shrink-0 border">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-semibold text-gray-900 text-sm leading-tight truncate">
                          {item.name}
                        </p>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${badge}`}
                        >
                          <RankIcon rank={item.rank} />#{item.rank}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 mb-2">{item.brand}</p>

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{
                                width: `${(item.final_score / maxScore) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-primary tabular-nums shrink-0">
                            {item.final_score.toFixed(3)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-semibold text-gray-700">
                          {formatCurrency(item.price)}
                        </span>
                        <Link
                          href={`/laptops/detail/${item.laptop_id}`}
                          className="flex items-center gap-1 text-xs font-semibold text-primary"
                        >
                          Detail <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function PodiumCard({
  item,
  rank,
  extraHeight,
  maxScore,
}: {
  item: RankedLaptop;
  rank: number;
  extraHeight: string;
  maxScore: number;
}) {
  const isFirst = rank === 1;
  const borderColor = isFirst
    ? 'border-yellow-400'
    : rank === 2
      ? 'border-gray-300'
      : 'border-amber-500/60';

  return (
    <div
      className={`bg-white border-2 ${borderColor} rounded-2xl overflow-hidden shadow-sm flex flex-col`}
    >
      <div className={`relative ${extraHeight} bg-gray-100`}>
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
        <span
          className={`absolute top-2 left-2 flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${getRankStyle(rank).badge}`}
        >
          <RankIcon rank={rank} />#{rank}
        </span>
        {isFirst && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Trophy size={11} />
            Terbaik
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-xs text-gray-400">{item.brand}</p>
          <p className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
            {item.name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(item.final_score / maxScore) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-primary tabular-nums">
            {item.final_score.toFixed(3)}
          </span>
        </div>

        <p className="text-sm font-semibold text-primary">
          {formatCurrency(item.price)}
        </p>

        <Link
          href={`/laptops/detail/${item.laptop_id}`}
          className="mt-auto flex items-center justify-center gap-1.5 w-full border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 rounded-lg transition text-xs"
        >
          Lihat Detail <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

function MobileTopCard({
  item,
  maxScore,
}: {
  item: RankedLaptop;
  maxScore: number;
}) {
  const { badge } = getRankStyle(item.rank);
  return (
    <div className="bg-white border-2 border-primary/20 rounded-xl overflow-hidden shadow-sm">
      <div className="flex gap-3 p-3.5">
        <div className="w-20 h-14 relative bg-gray-100 rounded-lg overflow-hidden shrink-0">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${badge}`}
            >
              <RankIcon rank={item.rank} />#{item.rank}
            </span>
            {item.rank === 1 && (
              <span className="text-xs font-semibold text-yellow-600 flex items-center gap-1">
                <Trophy size={11} /> Terbaik
              </span>
            )}
          </div>
          <p className="font-semibold text-gray-900 text-sm truncate">
            {item.name}
          </p>
          <p className="text-xs text-gray-400 mb-2">{item.brand}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">
              {formatCurrency(item.price)}
            </span>
            <span className="text-xs font-bold text-gray-600 tabular-nums">
              {item.final_score.toFixed(3)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
