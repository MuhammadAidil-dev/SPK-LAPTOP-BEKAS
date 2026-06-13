'use client';

import Breadcrumbs, {
  breadcrumbItemsType,
} from '@/components/navigations/Breadcrumb';
import ButtonLink from '@/components/ui/ButtonLink';
import { ILaptop } from '@/types/laptop.type';
import { formatCurrency } from '@/utils/utils';
import Image from 'next/image';

const breadcrumbsItem: breadcrumbItemsType[] = [
  { label: 'Laptop', href: '/laptops' },
  { label: 'Detail Laptop' },
];

type Props = {
  laptop: ILaptop;
};

export default function LaptopDetailView({ laptop }: Props) {
  return (
    <div className="flex flex-col">
      <div className="p-6 max-w-6xl mx-auto w-full">
        <Breadcrumbs breadcrumItems={breadcrumbsItem} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-7 border rounded-xl overflow-hidden relative aspect-video bg-gray-100">
            {laptop.image ? (
              <Image
                src={laptop.image}
                alt={laptop.name}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No image
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="border rounded-xl p-6 flex flex-col justify-between h-full">
              <div>
                <p className="text-sm text-gray-500 mb-1">{laptop.brand}</p>
                <h2 className="text-2xl font-semibold mb-2">{laptop.name}</h2>
                <p className="text-primary text-xl font-semibold">
                  {formatCurrency(laptop.price)}
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <ButtonLink href={`/laptops/edit/${laptop._id}`}>Edit</ButtonLink>
                <ButtonLink href="/laptops" color="secondary">Back</ButtonLink>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section>
            <h3 className="font-semibold mb-4">Spesifikasi</h3>

            <div className="border rounded-xl divide-y">
              {[
                ['RAM', `${laptop.ram} GB`],
                ['Storage', `${laptop.storage} GB`],
                ['Layar', `${laptop.screen_size}"`],
                ['Baterai', `${laptop.battery_life} jam`],
                ['Kondisi', `${laptop.condition}/5`],
                ['Usia', `${laptop.age_months} bulan`],
              ].map(([label, value]) => (
                <div key={label} className="p-3 flex justify-between">
                  <span className="text-gray-500">{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-semibold mb-4">Benchmark Score</h3>

            <div className="border rounded-xl divide-y">
              {[
                ['Processor (PassMark)', laptop.processor_score.toLocaleString()],
                ['GPU (PassMark)', laptop.gpu_score.toLocaleString()],
              ].map(([label, value]) => (
                <div key={label} className="p-3 flex justify-between">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
