import { ILaptop } from '@/types/laptop.type';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface LaptopTableProps {
  laptops: ILaptop[];
  onDelete?: (id: string) => void;
}

const conditionLabel = (v: number) =>
  ['Buruk', 'Kurang', 'Cukup', 'Baik', 'Sempurna'][v - 1] ?? String(v);

export function LaptopTable({ laptops, onDelete }: LaptopTableProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary/10">
            <th className="w-2.5 px-6 py-4 font-semibold text-sm text-center">NO</th>
            <th className="px-6 py-4 font-semibold text-sm text-left">Nama</th>
            <th className="px-6 py-4 font-semibold text-sm text-center">Brand</th>
            <th className="px-6 py-4 font-semibold text-sm text-center">Harga</th>
            <th className="px-6 py-4 font-semibold text-sm text-center">RAM</th>
            <th className="px-6 py-4 font-semibold text-sm text-center">Kondisi</th>
            <th className="px-6 py-4 font-semibold text-sm text-center">Usia</th>
            <th className="px-6 py-4 font-semibold text-sm text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {laptops.length === 0 && (
            <tr>
              <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                Belum ada data laptop.
              </td>
            </tr>
          )}
          {laptops.map((laptop, index) => (
            <tr key={laptop._id} className="hover:bg-secondary/10 transition-colors">
              <td className="px-6 py-4 text-xs font-semibold text-center text-primary">
                {index + 1}
              </td>
              <td className="px-6 py-4 text-xs font-semibold">{laptop.name}</td>
              <td className="px-6 py-4 text-xs text-center text-gray-500">
                {laptop.brand}
              </td>
              <td className="px-6 py-4 text-xs font-semibold text-center">
                {formatPrice(laptop.price)}
              </td>
              <td className="px-6 py-4 text-xs font-semibold text-center">
                {laptop.ram} GB
              </td>
              <td className="px-6 py-4 text-xs font-semibold text-center">
                {conditionLabel(laptop.condition)}
              </td>
              <td className="px-6 py-4 text-xs font-semibold text-center">
                {laptop.age_months} bln
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-6 justify-center">
                  <Link
                    href={`/laptops/edit/${laptop._id}`}
                    className="text-primary hover:underline text-xs font-semibold"
                  >
                    <Edit2 className="w-4 h-4 inline mr-1" />
                  </Link>
                  <Link
                    href={`/laptops/${laptop._id}`}
                    className="text-secondary hover:underline text-xs font-semibold"
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                  </Link>
                  <button
                    onClick={() => onDelete?.(laptop._id)}
                    className="text-red-500 hover:underline text-xs font-semibold cursor-pointer"
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
