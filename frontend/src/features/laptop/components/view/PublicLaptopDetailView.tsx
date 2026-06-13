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
    <div className="max-w-6xl mx-auto px-4 md:px-6 pt-20 pb-10 md:pt-24 md:pb-12">
      <Breadcrumbs breadcrumItems={breadcrumbsItems} />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start lg:items-center mb-10 md:mb-12">
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

        <div className="flex flex-col gap-3 md:gap-4">
          <p className="text-sm text-gray-500 font-medium">{laptop.brand}</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
            {laptop.name}
          </h1>
          <p className="text-green-600 text-xl md:text-2xl font-bold">
            {formatCurrency(laptop.price)}
          </p>
        </div>
      </section>

      <section className="border border-secondary/10 shadow-sm rounded-md max-w-4xl mx-auto bg-primary/10">
        <div className="p-5 md:p-6">
          <h2 className="flex items-center gap-2 text-lg md:text-xl font-semibold mb-5 md:mb-6">
            <List size={20} />
            Spesifikasi Teknis
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
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
    <div className="p-3 md:p-4 border rounded-lg bg-white">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-bold text-black">{value}</p>
    </div>
  );
}
