'use client';

import Breadcrumbs, {
  breadcrumbItemsType,
} from '@/components/navigations/Breadcrumb';
import { List, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

type Laptop = {
  name: string;
  price: number;
  description: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    battery: string;
  };
};

const dummyLaptop: Laptop = {
  name: 'MacBook Pro M3',
  price: 24999000,
  description:
    'Performa tinggi dengan efisiensi energi generasi terbaru. Cocok untuk developer dan content creator.',
  specs: {
    processor: 'Apple M3 Chip (8-core CPU)',
    ram: '8GB Unified Memory',
    storage: '512GB SSD',
    display: '14.2" Liquid Retina XDR',
    battery: 'Up to 22 hours',
  },
};

const breadcrumbsItems: breadcrumbItemsType[] = [
  {
    label: 'Beranda',
    href: '/',
  },
  {
    label: 'Detail Laptop',
  },
];

export default function PublicLaptopDetailView() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* BREADCRUMB */}
      <Breadcrumbs breadcrumItems={breadcrumbsItems} />

      {/* HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
        {/* IMAGE */}
        <div className="relative aspect-video rounded-xl overflow-hidden border">
          <Image
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
            alt={dummyLaptop.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">{dummyLaptop.name}</h1>

          <p className="text-green-600 text-2xl font-bold">
            Rp {dummyLaptop.price.toLocaleString()}
          </p>

          <p className="text-gray-600 leading-relaxed">
            {dummyLaptop.description}
          </p>

          <div className="flex gap-3 mt-4">
            <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg">
              <ShoppingCart size={20} />
              Lihat Penawaran
            </button>
            <button className="border px-6 py-2 rounded-lg">Bandingkan</button>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="border border-secondary/10 shadow-sm rounded-md max-w-4xl mx-auto bg-primary/10">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
            <List size={20} />
            Spesifikasi Teknis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SpecItem label="Processor" value={dummyLaptop.specs.processor} />
            <SpecItem label="RAM" value={dummyLaptop.specs.ram} />
            <SpecItem label="Storage" value={dummyLaptop.specs.storage} />
            <SpecItem label="Display" value={dummyLaptop.specs.display} />
            <SpecItem label="Battery" value={dummyLaptop.specs.battery} />
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
