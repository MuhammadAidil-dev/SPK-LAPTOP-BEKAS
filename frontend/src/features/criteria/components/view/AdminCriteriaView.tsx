import Button from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export default function AdminCriteriaView() {
  return (
    <div className="flex flex-col">
      {/* Content */}
      <div className="max-w-7xl mx-auto w-full flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Criteria Management</h1>
            <p className="text-gray-500">
              Define and weight parameters for SMART ranking engine.
            </p>
          </div>

          <div className="w-50">
            <Button type="button">
              <Plus />
              <span>Add New Criterion</span>
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Weight Card */}
          <div className="bg-white border rounded-xl p-6">
            <span className="text-xs text-gray-400 mb-2 block">
              TOTAL WEIGHT
            </span>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">1.0</span>
              <span className="text-primary font-bold">/ 1.0</span>
            </div>

            <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full w-fit text-xs">
              ✅ VALIDATED
            </div>
          </div>

          {/* Table */}
          <div className="lg:col-span-3 bg-white border rounded-xl overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="font-semibold">Active Criteria</h3>
            </div>

            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs text-gray-500">
                <tr>
                  <th className="px-6 py-4">CRITERION</th>
                  <th className="px-6 py-4">DESCRIPTION</th>
                  <th className="px-6 py-4">WEIGHT</th>
                  <th className="px-6 py-4 text-right">ACTIONS</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {[
                  {
                    name: 'Price',
                    desc: 'Base purchase price',
                    weight: '0.40',
                  },
                  {
                    name: 'Performance',
                    desc: 'CPU / RAM performance',
                    weight: '0.30',
                  },
                  {
                    name: 'Condition',
                    desc: 'Physical & battery health',
                    weight: '0.20',
                  },
                  {
                    name: 'Age',
                    desc: 'Usage duration',
                    weight: '0.10',
                  },
                ].map((item) => (
                  <tr key={item.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {item.desc}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 rounded text-sm">
                        {item.weight}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-green-100 rounded">
                          ✏️
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weight Bar */}
          <div className="bg-white border rounded-xl p-6">
            <h4 className="font-semibold mb-4">Weight Distribution</h4>

            <div className="flex h-4 w-full rounded-full overflow-hidden bg-gray-100 mb-4">
              <div className="bg-green-500 w-[40%]" />
              <div className="bg-green-400 w-[30%]" />
              <div className="bg-green-300 w-[20%]" />
              <div className="bg-green-200 w-[10%]" />
            </div>

            <p className="text-sm text-gray-500">
              Price & Performance dominate decision (70%).
            </p>
          </div>

          {/* Info */}
          <div className="bg-green-900 text-white rounded-xl p-6">
            <h4 className="font-semibold mb-4">SMART Logic</h4>

            <p className="text-sm opacity-90 mb-4">
              Total weight must equal 1.0 for valid calculation.
            </p>

            <span className="text-xs uppercase">System Integrity Active</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-6 border-t flex justify-between items-center text-sm text-gray-500">
        <span>LAPTOPWISE DSS © 2026</span>
        <div className="flex gap-4">
          <a>Privacy</a>
          <a>Terms</a>
          <a>Support</a>
        </div>
      </footer>
    </div>
  );
}
