'use client';

import { ICriteria } from '@/types/criteria.type';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';
import { deleteCriteriaAction } from '@/features/criteria/actions/criteria.action';

type Props = {
  criteria: ICriteria[];
};

export default function CriteriaTable({ criteria }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteCriteriaAction(id);
    });
  };

  return (
    <div className="lg:col-span-3 bg-white border rounded-xl overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="font-semibold">Active Criteria</h3>
      </div>

      <table className="w-full text-left">
        <thead className="bg-primary/10 text-xs text-secondary">
          <tr>
            <th className="px-6 py-4">CRITERIA</th>
            <th className="px-6 py-4">TYPE</th>
            <th className="px-6 py-4">WEIGHT</th>
            {/* <th className="px-6 py-4 text-right">ACTIONS</th> */}
          </tr>
        </thead>

        <tbody className="divide-y">
          {criteria.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                Belum ada kriteria.
              </td>
            </tr>
          )}
          {criteria.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{item.name}</td>
              <td className="px-6 py-4 text-gray-500 text-sm capitalize">
                {item.type}
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-gray-100 rounded text-sm">
                  {item.weight.toFixed(2)}
                </span>
              </td>
              {/* <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-4">
                  <Link
                    href={`/criteria/edit/${item._id}`}
                    className="p-2 hover:bg-green-100 rounded cursor-pointer"
                  >
                    <Pencil size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={isPending}
                    className="p-2 hover:bg-red-100 rounded cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
