import { CircleCheck, CircleX, Plus } from 'lucide-react';
import CriteriaTable from '../ui/CriteriaTable';
import ButtonLink from '@/components/ui/ButtonLink';
import { ICriteria } from '@/types/criteria.type';

type Props = {
  criteria: ICriteria[];
};

export default function AdminCriteriaView({ criteria }: Props) {
  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
  const isValid = Math.abs(totalWeight - 1) < 0.001;

  return (
    <div className="flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1">
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white border rounded-xl p-6 flex flex-col justify-center items-center">
            <span className="font-semibold text-xs text-secondary mb-2">
              TOTAL WEIGHT
            </span>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">
                {totalWeight.toFixed(2)}
              </span>
              <span className="text-primary font-bold">/ 1.0</span>
            </div>

            <div
              className={`mt-4 flex items-center gap-2 px-3 py-2 rounded-full w-fit text-xs ${
                isValid
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {isValid ? (
                <>
                  <CircleCheck size={16} />
                  VALIDATED
                </>
              ) : (
                <>
                  <CircleX size={16} />
                  INVALID
                </>
              )}
            </div>
          </div>

          <CriteriaTable criteria={criteria} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-xl p-6">
            <h4 className="font-semibold mb-4">Weight Distribution</h4>

            <div className="flex h-4 w-full rounded-full overflow-hidden bg-gray-100 mb-4">
              {criteria.map((c, i) => {
                const colors = [
                  'bg-green-500',
                  'bg-green-400',
                  'bg-green-300',
                  'bg-green-200',
                ];
                return (
                  <div
                    key={c._id}
                    className={colors[i % colors.length]}
                    style={{ width: `${c.weight * 100}%` }}
                  />
                );
              })}
            </div>

            <div className="flex flex-col gap-1">
              {criteria.map((c) => (
                <p key={c._id} className="text-sm text-gray-500">
                  {c.name}: {(c.weight * 100).toFixed(0)}%
                </p>
              ))}
            </div>
          </div>

          <div className="bg-green-900 text-white rounded-xl p-6">
            <h4 className="font-semibold mb-4">SMART Logic</h4>

            <p className="text-sm opacity-90 mb-4">
              Total weight must equal 1.0 for valid calculation.
            </p>

            <span className="text-xs uppercase">
              {isValid ? 'System Integrity Active' : 'Adjust weights to continue'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
