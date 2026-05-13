'use client';

import Breadcrumbs, {
  breadcrumbItemsType,
} from '@/components/navigations/Breadcrumb';
import ButtonLink from '@/components/ui/ButtonLink';
import Image from 'next/image';

type LaptopDetail = {
  id: string;
  name: string;
  price: number;
  performance_score: number;
  condition_score: number;
  age: number;
  final_score: number;
  rank: number;
};

const dummyLaptop: LaptopDetail = {
  id: '1',
  name: 'MacBook Pro M3',
  price: 24999000,
  performance_score: 0.98,
  condition_score: 1,
  age: 1,
  final_score: 0.92,
  rank: 1,
};

const breadcrumbsItem: breadcrumbItemsType[] = [
  { label: 'Laptop', href: "'/laptops" },
  {
    label: 'Detail Laptop',
  },
];

export default function LaptopDetailView() {
  return (
    <div className="flex flex-col">
      {/* CONTENT */}
      <div className="p-6 max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <Breadcrumbs breadcrumItems={breadcrumbsItem} />

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* IMAGE */}
          <div className="lg:col-span-7 border rounded-xl overflow-hidden relative aspect-video">
            <Image
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
              alt="laptop"
              className=" object-cover"
              fill
              sizes='(max-width: 768px) 100vw, 33vw"'
            />
          </div>

          {/* INFO */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="border rounded-xl p-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  {dummyLaptop.name}
                </h2>
                <p className="text-primary text-xl font-semibold">
                  Rp {dummyLaptop.price.toLocaleString()}
                </p>
              </div>

              {/* SCORE */}
              <div className="mt-6">
                <p className="text-sm text-gray-500">SMART SCORE</p>

                <div className="flex items-center gap-4 mt-2">
                  <span className="text-5xl font-bold text-primary">
                    {dummyLaptop.final_score}
                  </span>

                  <div className="text-sm text-gray-500">
                    Rank #{dummyLaptop.rank}
                  </div>
                </div>
              </div>

              {/* ACTION */}
              <div className="flex gap-3 mt-6">
                <ButtonLink href="/laptops/edit/1">Edit</ButtonLink>
                <ButtonLink href="/laptops" color="secondary">
                  Back
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>

        {/* DETAIL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SPECS */}
          <section>
            <h3 className="font-semibold mb-4">Spesifikasi</h3>

            <div className="border rounded-xl divide-y">
              <div className="p-3 flex justify-between">
                <span className="text-gray-500">Performa</span>
                <span>{dummyLaptop.performance_score}</span>
              </div>

              <div className="p-3 flex justify-between">
                <span className="text-gray-500">Kondisi</span>
                <span>{dummyLaptop.condition_score}</span>
              </div>

              <div className="p-3 flex justify-between">
                <span className="text-gray-500">Usia</span>
                <span>{dummyLaptop.age} Tahun</span>
              </div>
            </div>
          </section>

          {/* SMART */}
          <section>
            <h3 className="font-semibold mb-4">Analisis SMART</h3>

            <div className="space-y-4 border rounded-xl p-4">
              {/* Harga */}
              <div>
                <div className="flex justify-between text-sm">
                  <span>Harga</span>
                  <span>0.85</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-primary w-[85%]" />
                </div>
              </div>

              {/* Performa */}
              <div>
                <div className="flex justify-between text-sm">
                  <span>Performa</span>
                  <span>0.98</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-primary w-[98%]" />
                </div>
              </div>

              {/* Kondisi */}
              <div>
                <div className="flex justify-between text-sm">
                  <span>Kondisi</span>
                  <span>1.00</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-primary w-full" />
                </div>
              </div>

              {/* Usia */}
              <div>
                <div className="flex justify-between text-sm">
                  <span>Usia</span>
                  <span>0.90</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-primary w-[90%]" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
