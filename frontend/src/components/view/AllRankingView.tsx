'use client';

import Image from 'next/image';
import {
  Trophy,
  CheckCircle,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  RefreshCw,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import ButtonLink from '../ui/ButtonLink';
import Button from '../ui/Button';

type Laptop = {
  id: number;
  name: string;
  price: number;
  score: number;
  image: string;
  features?: string[];
};

const laptops: Laptop[] = [
  {
    id: 1,
    name: 'MacBook Pro M3',
    price: 28999000,
    score: 98,
    image: '/images/laptop-1.jpg',
    features: [
      'M3 Chip',
      '22 Jam Baterai',
      'Liquid Retina XDR',
      'Unified Memory',
    ],
  },
  {
    id: 2,
    name: 'Dell XPS 15',
    price: 31500000,
    score: 92,
    image: '/images/laptop-2.jpg',
  },
  {
    id: 3,
    name: 'ThinkPad X1 Carbon',
    price: 26200000,
    score: 89,
    image: '/images/laptop-3.jpg',
  },
  {
    id: 4,
    name: 'ROG Zephyrus G14',
    price: 24500000,
    score: 85,
    image: '/images/laptop-4.jpg',
  },
  {
    id: 5,
    name: 'HP Spectre x360',
    price: 22800000,
    score: 82,
    image: '/images/laptop-5.jpg',
  },
];

const formatCurrency = (value: number) => `Rp ${value.toLocaleString('id-ID')}`;

export default function AllRankingView() {
  const best = laptops[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* ===================== BEST RECOMMENDATION ===================== */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Rekomendasi Utama</h2>

          <span className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-xs font-semibold">
            <Trophy size={16} />
            PILIHAN TERBAIK
          </span>
        </div>

        <div className="flex flex-col md:flex-row border border-secondary/10 rounded-xl overflow-hidden shadow-sm">
          <div className="md:w-2/5 relative min-h-62.5">
            <Image
              src={best.image}
              alt={best.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="md:w-3/5 p-8 space-y-6 flex flex-col justify-center">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">{best.name}</h3>

              <div className="text-right">
                <p className="text-xs text-gray-500">SMART SCORE</p>
                <p className="text-primary font-bold text-2xl">{best.score}%</p>
              </div>
            </div>

            <p className="text-primary font-semibold text-lg">
              {formatCurrency(best.price)}
            </p>

            <p className="text-gray-500 text-sm">
              Laptop ini memiliki performa terbaik berdasarkan perhitungan
              metode SMART dengan kombinasi optimal antara performa, harga, dan
              efisiensi.
            </p>

            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              {best.features?.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="w-32">
              <ButtonLink href="/laptops/detail/1">Detail</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TABLE ===================== */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Daftar Peringkat</h2>
            <p className="text-sm text-gray-500">
              Berdasarkan ranking hasil perhitungan SMART
            </p>
          </div>

          {/* <div className="flex gap-2">
            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm">
              <Filter size={16} />
              Filter
            </button>

            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm">
              <ArrowUpDown size={16} />
              Urutkan
            </button>
          </div> */}
        </div>

        <div className="border border-secondary/10 shadow-sm rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-primary/10 text-black font-semibold text-base">
              <tr>
                <th className="px-4 py-3 w-12">Rank</th>
                <th className="px-4 py-3">Laptop</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {laptops.map((item, i) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-center">
                    {i + 1}
                  </td>

                  <td className="px-4 py-3 flex items-center gap-3">
                    <div className="w-12 h-8 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    {item.name}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="font-semibold text-primary">
                        {item.score}%
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {formatCurrency(item.price)}
                  </td>

                  <td className="px-4 py-3 flex justify-center items-center">
                    <div className="w-8">
                      <Button>
                        <Eye size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-between items-center p-4 border-t text-sm">
            <span className="text-gray-500">Menampilkan 5 data</span>

            <div className="flex gap-2">
              <button className="p-2 border rounded">
                <ChevronLeft size={16} />
              </button>
              <button className="p-2 border rounded">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== INFO CARDS ===================== */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="border border-secondary/10 shadow-sm bg-primary/10 rounded-xl p-6 space-y-2">
          <BarChart3 className="text-primary" />
          <h4 className="font-semibold">Metode SMART</h4>
          <p className="text-sm text-gray-500">
            Menggunakan metode pengambilan keputusan multi-kriteria.
          </p>
        </div>

        <div className="border border-secondary/10 shadow-sm bg-primary/10 rounded-xl p-6 space-y-2">
          <RefreshCw className="text-primary" />
          <h4 className="font-semibold">Update Berkala</h4>
          <p className="text-sm text-gray-500">
            Data diperbarui secara berkala.
          </p>
        </div>

        <div className="border border-secondary/10 shadow-sm bg-primary/10 rounded-xl p-6 space-y-2">
          <ShieldCheck className="text-primary" />
          <h4 className="font-semibold">Terpercaya</h4>
          <p className="text-sm text-gray-500">
            Digunakan untuk membantu keputusan pembelian.
          </p>
        </div>
      </section>
    </div>
  );
}
