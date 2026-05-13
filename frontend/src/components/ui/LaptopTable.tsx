import { Laptop } from '@/types/dashboard.type';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface LaptopTableProps {
  laptops: Laptop[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAdd?: () => void;
}

export function LaptopTable({ laptops, onEdit, onDelete }: LaptopTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPerformanceLabel = (score: number) => {
    if (score >= 95) return 'Ultra';
    if (score >= 85) return 'High';
    if (score >= 75) return 'Medium';
    return 'Low';
  };

  const getConditionLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  };

  const getPerformanceBg = (score: number) => {
    if (score >= 85) return 'bg-primary-container/20 text-on-primary-container';
    if (score >= 75)
      return 'bg-secondary-container/20 text-on-secondary-container';
    return 'bg-surface-container-highest text-on-surface-variant';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-surface-container-low bg-primary/10">
            <th className="w-2.5 px-6 py-4 font-semibold text-sm text-center">
              NO
            </th>
            <th className="px-6 py-4 font-semibold text-sm text-center">
              Nama
            </th>
            <th className="px-6 py-4 font-semibold text-sm text-center">
              Harga
            </th>
            <th className="px-6 py-4 font-semibold text-sm text-center">
              Performa
            </th>
            <th className="px-6 py-4 font-semibold text-sm text-center">
              Kondisi
            </th>
            <th className="px-6 py-4 font-semibold text-sm text-center">
              Usia
            </th>
            <th className="px-6 py-4 font-semibold text-sm text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="">
          {laptops.map((laptop, index) => (
            <tr
              key={laptop.id}
              className="hover:bg-secondary/10 transition-colors"
            >
              <td className="px-6 py-4 text-xs font-semibold text-center text-primary">
                {index + 1}
              </td>
              <td className="px-6 py-4 text-xs font-semibold">{laptop.name}</td>
              <td className="px-6 py-4 text-xs font-semibold text-center">
                {formatPrice(laptop.price)}
              </td>
              <td className="px-6 py-4 text-xs font-semibold text-center">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full ${getPerformanceBg(
                    laptop.performanceScore,
                  )}`}
                >
                  {getPerformanceLabel(laptop.performanceScore)}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className={`px-3 py-1 text-xs font-bold rounded-full`}>
                  {getConditionLabel(laptop.conditionScore)}
                </span>
              </td>
              <td className="px-6 py-4 text-xs font-semibold text-center">
                {laptop.age} {laptop.age === 1 ? 'Year' : 'Years'}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-6 justify-center">
                  <Link
                    href={'/laptops/edit/1'}
                    onClick={() => onEdit?.(laptop.id)}
                    className="text-primary hover:underline text-xs font-semibold text-center"
                  >
                    <Edit2 className="w-4 h-4 inline mr-1" />
                  </Link>
                  <Link
                    href={'/laptops/1'}
                    onClick={() => onEdit?.(laptop.id)}
                    className="text-secondary hover:underline text-xs font-semibold text-center"
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                  </Link>
                  <button
                    onClick={() => onDelete?.(laptop.id)}
                    className="text-red-500 hover:underline text-xs font-semibold text-center cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 inline mr-1" />
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
