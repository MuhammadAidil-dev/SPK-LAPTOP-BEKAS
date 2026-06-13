'use client';

import Breadcrumbs, {
  breadcrumbItemsType,
} from '@/components/navigations/Breadcrumb';
import { ILaptop } from '@/types/laptop.type';
import { formatCurrency } from '@/utils/utils';
import { List } from 'lucide-react';
import Image from 'next/image';

const breadcrumbsItems: breadcrumbItemsType[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Detail Laptop' },
];

type Props = {
  laptop: ILaptop;
};

export default function PublicLaptopDetailView({ laptop }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Breadcrumbs breadcrumItems={breadcrumbsItems} />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
        <div className="relative aspect-video rounded-xl overflow-hidden border bg-gray-100">
          {laptop.image ? (
            <Image
              src={laptop.image}
              alt={laptop.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500 font-medium">{laptop.brand}</p>
          <h1 className="text-4xl font-semibold">{laptop.name}</h1>
          <p className="text-green-600 text-2xl font-bold">
            {formatCurrency(laptop.price)}
          </p>
        </div>
      </section>

      <section className="border border-secondary/10 shadow-sm rounded-md max-w-4xl mx-auto bg-primary/10">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
            <List size={20} />
            Spesifikasi Teknis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SpecItem label="RAM" value={`${laptop.ram} GB`} />
            <SpecItem label="Storage" value={`${laptop.storage} GB`} />
            <SpecItem label="Layar" value={`${laptop.screen_size}"`} />
            <SpecItem label="Baterai" value={`${laptop.battery_life} jam`} />
            <SpecItem label="Kondisi" value={`${laptop.condition}/5`} />
            <SpecItem label="Usia" value={`${laptop.age_months} bulan`} />
            <SpecItem
              label="Processor Score"
              value={laptop.processor_score.toLocaleString()}
            />
            <SpecItem
              label="GPU Score"
              value={laptop.gpu_score.toLocaleString()}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-bold text-black">{value}</p>
    </div>
  );
}
