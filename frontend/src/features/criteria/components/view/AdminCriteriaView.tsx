import { CircleCheck, Plus } from 'lucide-react';
import CriteriaTable from '../ui/CriteriaTable';

import ButtonLink from '@/components/ui/ButtonLink';

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
            <ButtonLink href={'/criteria/add'}>
              <Plus />
              <span>Add New Criterion</span>
            </ButtonLink>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Weight Card */}
          <div className="bg-white border rounded-xl p-6 flex flex-col justify-center items-center">
            <span className="font-semibold text-xs text-secondary mb-2">
              TOTAL WEIGHT
            </span>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">1.0</span>
              <span className="text-primary font-bold">/ 1.0</span>
            </div>

            <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-full w-fit text-xs">
              <span>
                <CircleCheck size={16} />
              </span>
              VALIDATED
            </div>
          </div>

          {/* Table */}
          <CriteriaTable />
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
    </div>
  );
}
