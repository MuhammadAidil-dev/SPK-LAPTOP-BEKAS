import { ICriteria } from '@/types/criteria.type';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

type CriteriaTableProps = {
  criterion: ICriteria[];
};

export const dummyCriteria = [
  {
    id: 1,
    name: 'Price',
    desc: 'Base purchase price',
    weight: '0.40',
    type: 'cost',
  },
  {
    id: 2,
    name: 'Performance',
    desc: 'CPU / RAM performance',
    weight: '0.30',
    type: 'benefit',
  },
  {
    id: 3,
    name: 'Condition',
    desc: 'Physical & battery health',
    weight: '0.20',
    type: 'benefit',
  },

  {
    id: 4,
    name: 'Age',
    desc: 'Usage duration',
    weight: '0.10',
    type: 'cost',
  },
];

export default function CriteriaTable() {
  return (
    <div className="lg:col-span-3 bg-white border rounded-xl overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="font-semibold">Active Criteria</h3>
      </div>

      <table className="w-full text-left">
        <thead className="bg-primary/10 text-xs text-secondary">
          <tr>
            <th className="px-6 py-4">CRITERIA</th>
            <th className="px-6 py-4">DESCRIPTION</th>
            <th className="px-6 py-4">WEIGHT</th>
            <th className="px-6 py-4 text-right">ACTIONS</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {dummyCriteria.map((item) => (
            <tr key={item.name} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{item.name}</td>
              <td className="px-6 py-4 text-gray-500 text-sm">{item.desc}</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-gray-100 rounded text-sm">
                  {item.weight}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-4">
                  <Link
                    href={'/criteria/edit/1'}
                    className="p-2 hover:bg-green-100 rounded cursor-pointer"
                  >
                    <Pencil size={20} />
                  </Link>
                  <button className="p-2 hover:bg-red-100 rounded cursor-pointer">
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
