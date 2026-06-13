'use client';

import { useActionState, useState } from 'react';
import Button from '@/components/ui/Button';
import Breadcrumbs, {
  breadcrumbItemsType,
} from '@/components/navigations/Breadcrumb';
import { ICriteria } from '@/types/criteria.type';
import { updateCriteriaAction } from '@/features/criteria/actions/criteria.action';

const breadcrumItems: breadcrumbItemsType[] = [
  { label: 'criteria', href: '/criteria' },
  { label: 'Edit Criteria' },
];

type Props = {
  criteria: ICriteria;
};

export default function CriteriaEditView({ criteria }: Props) {
  const updateWithId = updateCriteriaAction.bind(null, criteria._id);
  const [state, action, isPending] = useActionState(updateWithId, null);
  const [weight, setWeight] = useState(criteria.weight);

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center">
      <Breadcrumbs breadcrumItems={breadcrumItems} />

      <div className="w-full bg-white border border-secondary/10 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-primary/10">
          <h2 className="text-lg font-semibold">Edit Criteria</h2>
          <p className="text-sm text-gray-500 mt-1">
            Define SMART attributes for decision model.
          </p>
        </div>

        <form action={action} className="p-8 space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-gray-500">
              Criterion Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={criteria.name}
              placeholder="e.g., Price, Performance"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase text-gray-500">
                  Weight (0 - 1)
                </label>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                  {weight.toFixed(2)}
                </span>
              </div>

              <input
                type="range"
                name="weight"
                min={0}
                max={1}
                step={0.05}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-green-600"
              />

              <div className="flex justify-between text-xs text-gray-400">
                <span>0</span>
                <span>0.5</span>
                <span>1</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-xs font-semibold uppercase text-gray-500">
                Utility Type
              </label>

              <div className="flex gap-3">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="benefit"
                    defaultChecked={criteria.type === 'benefit'}
                    className="hidden"
                  />
                  <div
                    className={`p-4 border rounded-lg text-center transition ${
                      criteria.type === 'benefit'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-300'
                    }`}
                  >
                    <p className="text-sm font-semibold">BENEFIT</p>
                  </div>
                </label>

                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="cost"
                    defaultChecked={criteria.type === 'cost'}
                    className="hidden"
                  />
                  <div
                    className={`p-4 border rounded-lg text-center transition ${
                      criteria.type === 'cost'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300'
                    }`}
                  >
                    <p className="text-sm font-semibold">COST</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg text-sm text-gray-600">
            Benefit = nilai tinggi lebih baik (contoh: RAM) <br />
            Cost = nilai rendah lebih baik (contoh: harga)
          </div>

          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}

          <div className="flex justify-end gap-4 pt-6 border-t">
            <div className="w-75 flex items-center gap-4">
              <Button type="button" color="secondary">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Menyimpan...' : 'Edit Criteria'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
