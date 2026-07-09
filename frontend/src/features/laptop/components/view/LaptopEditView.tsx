'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import Breadcrumbs, {
  breadcrumbItemsType,
} from '@/components/navigations/Breadcrumb';
import { CircleCheck, ImagePlus, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { ILaptop } from '@/types/laptop.type';
import { updateLaptopAction } from '@/features/laptop/actions/laptop.action';
import Image from 'next/image';

const breadcrumbItems: breadcrumbItemsType[] = [
  { label: 'Laptop', href: '/laptops' },
  { label: 'Edit Laptop' },
];

const conditionLabels = ['Buruk', 'Kurang', 'Cukup', 'Baik', 'Sempurna'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

type Props = {
  laptop: ILaptop;
};

export default function LaptopEditView({ laptop }: Props) {
  const updateWithId = updateLaptopAction.bind(null, laptop._id);
  const [state, action, isPending] = useActionState(updateWithId, null);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state]);

  const [condition, setCondition] = useState(laptop.condition);
  // null  = pakai gambar lama (tidak ganti)
  // false = user hapus gambar lama, tidak upload baru
  // string = blob URL gambar baru yang dipilih
  const [imagePreview, setImagePreview] = useState<string | null | false>(
    laptop.image ?? false,
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error('Ukuran gambar maksimal 5MB');
      if (fileRef.current) fileRef.current.value = '';
      return;
    }
    if (typeof imagePreview === 'string' && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    if (typeof imagePreview === 'string' && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const hasImage = typeof imagePreview === 'string' && imagePreview.length > 0;

  return (
    <div className="flex-1">
      <div className="max-w-5xl">
        <Breadcrumbs breadcrumItems={breadcrumbItems} />

        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Laptop Data Entry
          </h1>
          <p className="text-gray-500">
            Edit data Laptop untuk perhitungan SMART
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
                    defaultValue={laptop.name}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-sm">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    defaultValue={laptop.brand}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
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
                  defaultValue={laptop.price}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                />
              </div>

              {/* Benchmark */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-sm">
                    Processor Score{' '}
                    <span className="text-xs text-gray-400">(PassMark)</span>
                  </label>
                  <input
                    type="number"
                    name="processor_score"
                    defaultValue={laptop.processor_score}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
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
                    defaultValue={laptop.gpu_score}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
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
                    defaultValue={laptop.ram}
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
                    defaultValue={laptop.storage}
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
                    defaultValue={laptop.age_months}
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
                    defaultValue={laptop.screen_size}
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
                  defaultValue={laptop.battery_life}
                  className="w-40 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                />
              </div>

              {/* Condition — visual selector */}
              <div>
                <label className="block font-medium mb-2 text-sm">
                  Kondisi Fisik
                </label>
                <input type="hidden" name="condition" value={condition} />
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setCondition(v)}
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

              {/* Image — preview current or new */}
              <div>
                <label className="block font-medium mb-2 text-sm">
                  Gambar{' '}
                  <span className="text-xs text-gray-400 font-normal">
                    (kosongkan = gambar lama tetap)
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

                {hasImage ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-gray-50">
                    <Image
                      src={imagePreview as string}
                      alt="Preview"
                      fill
                      className="object-contain"
                      unoptimized={
                        typeof imagePreview === 'string' &&
                        imagePreview.startsWith('blob:')
                      }
                    />

                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="bg-white border border-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-gray-50 shadow-sm"
                      >
                        Ganti
                      </button>
                      <button
                        type="button"
                        onClick={clearImage}
                        className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <span className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">
                      {typeof imagePreview === 'string' &&
                      imagePreview.startsWith('blob:')
                        ? 'Gambar baru'
                        : 'Gambar saat ini'}
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition"
                  >
                    <ImagePlus size={24} className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-400">
                      {laptop.image
                        ? 'Gambar dihapus — klik untuk upload baru'
                        : 'Klik untuk upload gambar'}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Menyimpan...' : 'Save'}
                </button>
              </div>
            </form>
          </div>

          {/* SIDE PANEL */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border border-secondary/10 shadow-sm rounded-xl p-4 bg-primary/10">
              <h3 className="font-semibold mb-3 text-sm text-green-700">
                DSS Guidelines
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CircleCheck
                    size={16}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  <span>
                    Processor & GPU score dari <strong>cpubenchmark.net</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheck
                    size={16}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  <span>Kondisi 1=buruk, 5=sempurna</span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheck
                    size={16}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  <span>Usia dalam satuan bulan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheck
                    size={16}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  <span>Gambar kosong = gambar lama tetap dipakai</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
