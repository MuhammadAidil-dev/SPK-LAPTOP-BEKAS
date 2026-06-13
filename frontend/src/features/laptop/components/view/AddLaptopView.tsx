'use client';

import { useActionState, useRef, useState } from 'react';
import Breadcrumbs, {
  breadcrumbItemsType,
} from '@/components/navigations/Breadcrumb';
import { CircleCheck, ImagePlus, X } from 'lucide-react';
import { createLaptopAction } from '@/features/laptop/actions/laptop.action';
import { useLaptopAddStore } from '@/features/laptop/store/laptop-add.store';
import Image from 'next/image';

const breadcrumbItems: breadcrumbItemsType[] = [
  { label: 'Laptop', href: '/laptops' },
  { label: 'Add Laptop' },
];

const conditionLabels = ['Buruk', 'Kurang', 'Cukup', 'Baik', 'Sempurna'];

export default function AddLaptopView() {
  const [state, action, isPending] = useActionState(createLaptopAction, null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    name, brand, price, processor_score, gpu_score,
    ram, storage, condition, age_months, screen_size, battery_life,
    setField,
  } = useLaptopAddStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="flex-1">
      <div className="max-w-5xl">
        <Breadcrumbs breadcrumItems={breadcrumbItems} />

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Laptop Data Entry
          </h1>
          <p className="text-gray-500">
            Input data laptop untuk proses perhitungan SMART
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* FORM */}
          <div className="lg:col-span-8 bg-white border border-secondary/10 shadow-sm rounded-xl p-6">
            <form action={action} className="space-y-6">
              {/* Name + Brand */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-sm">
                    Nama Laptop
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setField('name', e.target.value)}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                    placeholder="ASUS TUF Gaming A15"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-sm">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={brand}
                    onChange={(e) => setField('brand', e.target.value)}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                    placeholder="ASUS"
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block font-medium mb-1 text-sm">
                  Harga (IDR)
                </label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setField('price', Number(e.target.value))}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                  placeholder="7800000"
                />
              </div>

              {/* Benchmark Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-sm">
                    Processor Score{' '}
                    <span className="text-xs text-gray-400">(PassMark)</span>
                  </label>
                  <input
                    type="number"
                    name="processor_score"
                    value={processor_score}
                    onChange={(e) =>
                      setField('processor_score', Number(e.target.value))
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                    placeholder="12500"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-sm">
                    GPU Score{' '}
                    <span className="text-xs text-gray-400">(PassMark)</span>
                  </label>
                  <input
                    type="number"
                    name="gpu_score"
                    value={gpu_score}
                    onChange={(e) =>
                      setField('gpu_score', Number(e.target.value))
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                    placeholder="5500"
                  />
                </div>
              </div>

              {/* RAM + Storage + Age + Screen */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-sm">
                    RAM (GB)
                  </label>
                  <input
                    type="number"
                    name="ram"
                    value={ram}
                    onChange={(e) => setField('ram', Number(e.target.value))}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-sm">
                    Storage (GB)
                  </label>
                  <input
                    type="number"
                    name="storage"
                    value={storage}
                    onChange={(e) =>
                      setField('storage', Number(e.target.value))
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-sm">
                    Usia (bulan)
                  </label>
                  <input
                    type="number"
                    name="age_months"
                    value={age_months}
                    onChange={(e) =>
                      setField('age_months', Number(e.target.value))
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-sm">
                    Layar (inch)
                  </label>
                  <input
                    type="number"
                    name="screen_size"
                    step="0.1"
                    value={screen_size}
                    onChange={(e) =>
                      setField('screen_size', Number(e.target.value))
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                  />
                </div>
              </div>

              {/* Battery */}
              <div>
                <label className="block font-medium mb-1 text-sm">
                  Baterai (jam)
                </label>
                <input
                  type="number"
                  name="battery_life"
                  step="0.5"
                  value={battery_life}
                  onChange={(e) =>
                    setField('battery_life', Number(e.target.value))
                  }
                  className="w-40 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                />
              </div>

              {/* Condition — visual selector */}
              <div>
                <label className="block font-medium mb-2 text-sm">
                  Kondisi Fisik
                </label>
                {/* hidden input carries the value into FormData */}
                <input type="hidden" name="condition" value={condition} />
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setField('condition', v)}
                      className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition ${
                        condition === v
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-200 text-gray-500 hover:border-primary/50'
                      }`}
                    >
                      <span className="block text-lg">{v}</span>
                      <span className="block text-xs font-normal">
                        {conditionLabels[v - 1]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block font-medium mb-2 text-sm">
                  Gambar{' '}
                  <span className="text-xs text-gray-400 font-normal">
                    (opsional, maks 5MB)
                  </span>
                </label>

                {/* Single always-in-DOM input — preserves selected file across re-renders */}
                <input
                  ref={fileRef}
                  type="file"
                  name="image"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-gray-50">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition"
                  >
                    <ImagePlus size={24} className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-400">
                      Klik untuk upload gambar
                    </span>
                  </div>
                )}
              </div>

              {state?.error && (
                <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">
                  {state.error}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" className="px-4 py-2 border rounded-lg text-sm">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Menyimpan...' : 'Save Laptop'}
                </button>
              </div>
            </form>
          </div>

          {/* SIDE PANEL */}
          <div className="lg:col-span-4 space-y-4">
            {/* Preview Card */}
            <div className="border border-secondary/10 shadow-sm rounded-xl p-4 bg-white">
              <h3 className="font-semibold mb-3 text-sm">Preview</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Nama</span>
                  <span className="font-medium text-right truncate max-w-[60%]">
                    {name || '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Brand</span>
                  <span className="font-medium">{brand || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Harga</span>
                  <span className="font-medium">
                    {price
                      ? new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          maximumFractionDigits: 0,
                        }).format(price)
                      : '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>RAM / Storage</span>
                  <span className="font-medium">
                    {ram}GB / {storage}GB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Kondisi</span>
                  <span className="font-medium">
                    {condition}/5 — {conditionLabels[condition - 1]}
                  </span>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="border border-secondary/10 shadow-sm rounded-xl p-4 bg-primary/10">
              <h3 className="font-semibold mb-3 text-sm text-green-700">
                DSS Guidelines
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CircleCheck size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    Processor & GPU score dari{' '}
                    <strong>cpubenchmark.net</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheck size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Kondisi 1=buruk, 5=sempurna</span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheck size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Usia dalam satuan bulan (bukan tahun)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheck size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Gambar opsional, max 5MB (JPEG/PNG/WebP)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
