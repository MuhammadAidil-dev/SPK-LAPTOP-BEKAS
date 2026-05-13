'use client';

import Button from '@/components/ui/Button';
import RankingResultTable, { best } from '@/components/ui/RankingResultTable';
import { formatCurrency } from '@/utils/utils';
import { RefreshCw } from 'lucide-react';

/**
 * Component
 */
export default function AdminRecomendationView() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Recommendation Engine
          </h2>
          <p className="text-gray-500">Based on SMART calculation</p>
        </div>

        <div className="w-50">
          <Button type="button">
            <RefreshCw />
            <span>Recalculate</span>
          </Button>
        </div>
      </div>

      {/* Highlight */}
      {best && (
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-8 border rounded-xl p-6 bg-white shadow-sm">
            <p className="text-green-600 text-sm font-semibold mb-1">
              Rank #{best.rank}
            </p>

            <h3 className="text-2xl font-bold mb-2">{best.laptop.name}</h3>

            <div className="flex gap-3 mb-4 text-sm">
              <span className="bg-gray-100 px-3 py-1 rounded">
                IDR {formatCurrency(best.laptop.price)}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold">
                Score: {best.final_score}
              </span>
            </div>

            <p className="text-gray-500 mb-4">
              Best laptop based on weighted SMART calculation.
            </p>

            <div className="flex gap-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Detail
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="md:col-span-4 border rounded-xl p-6 bg-gray-50">
            <h4 className="font-semibold mb-4">Calculation Health</h4>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Criteria Weight</span>
                <span className="font-bold text-green-600">1.00</span>
              </div>

              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="bg-green-600 h-full w-full" />
              </div>

              <div className="flex justify-between">
                <span>Data Integrity</span>
                <span className="font-bold text-green-600">100%</span>
              </div>

              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="bg-green-600 h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="p-4 border-b flex justify-between">
          <h4 className="font-semibold text-lg">Ranking Result</h4>
        </div>

        <RankingResultTable />
      </div>
    </div>
  );
}
