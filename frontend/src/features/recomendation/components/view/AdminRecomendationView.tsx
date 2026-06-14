'use client';

import { recalculateAction } from '@/features/calculation/actions/calculation.action';
import { ICalculationResult } from '@/types/calculation.type';
import { formatCurrency } from '@/utils/utils';
import { RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

type Props = {
  result: ICalculationResult;
};

export default function AdminRecomendationView({ result }: Props) {
  const best = result.rankings[0];
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRecalculate() {
    startTransition(async () => {
      await recalculateAction();
      router.refresh();
    });
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Recommendation Engine
          </h2>
          <p className="text-gray-500">Based on SMART calculation</p>
        </div>
        <button
          onClick={handleRecalculate}
          disabled={isPending}
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          <RefreshCw size={15} className={isPending ? 'animate-spin' : ''} />
          {isPending ? 'Menghitung...' : 'Recalculate'}
        </button>
      </div>

      {best && (
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-8 border rounded-xl p-6 bg-white shadow-sm">
            <p className="text-green-600 text-sm font-semibold mb-1">
              Rank #{best.rank}
            </p>

            <h3 className="text-2xl font-bold mb-1">{best.name}</h3>
            <p className="text-gray-500 text-sm mb-3">{best.brand}</p>

            <div className="flex gap-3 mb-4 text-sm">
              <span className="bg-gray-100 px-3 py-1 rounded">
                {formatCurrency(best.price)}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold">
                Score: {best.final_score.toFixed(2)}
              </span>
            </div>

            <div className="space-y-3">
              {best.criteria.map((c) => (
                <div key={c.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{c.name}</span>
                    <span className="font-semibold">{c.utility.toFixed(1)}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 bg-primary rounded"
                      style={{ width: `${Math.min(c.utility, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href={`/laptops/${best.laptop_id}`}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm inline-block"
              >
                Detail
              </Link>
            </div>
          </div>

          <div className="md:col-span-4 border rounded-xl p-6 bg-gray-50">
            <h4 className="font-semibold mb-4">Calculation Health</h4>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Total Laptops</span>
                <span className="font-bold text-green-600">
                  {result.total_laptops}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Total Criteria</span>
                <span className="font-bold text-green-600">
                  {result.total_criteria}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="p-4 border-b flex justify-between">
          <h4 className="font-semibold text-lg">Ranking Result</h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-primary/10 text-black font-semibold">
              <tr>
                <th className="p-3 text-center w-10">Rank</th>
                <th className="p-3 text-left">Laptop</th>
                <th className="p-3 text-center">Price</th>
                <th className="p-3 text-right">Score</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {result.rankings.map((item) => (
                <tr
                  key={item.laptop_id}
                  className="border-t hover:bg-secondary/5"
                >
                  <td className="p-3 text-center font-semibold">{item.rank}</td>
                  <td className="p-3">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.brand}</p>
                  </td>
                  <td className="p-3 text-center">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="p-3 text-right font-semibold text-primary">
                    {item.final_score.toFixed(2)}
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/laptops/${item.laptop_id}`}
                      className="text-primary hover:underline text-xs"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
