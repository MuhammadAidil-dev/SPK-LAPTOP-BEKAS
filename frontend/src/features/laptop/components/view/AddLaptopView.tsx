'use client';

import Breadcrumbs, {
  breadcrumbItemsType,
} from '@/components/navigations/Breadcrumb';
import Input from '@/components/ui/Input';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';

type LaptopForm = {
  name: string;
  price: number;
  condition: 'new' | 'used' | 'refurbished';
  age: number;
  performance: number;
};

const breadcrumbItems: breadcrumbItemsType[] = [
  {
    label: 'Laptop',
    href: '/laptops',
  },
  {
    label: 'Add Laptop',
  },
];

export default function AddLaptopView() {
  const [form, setForm] = useState<LaptopForm>({
    name: '',
    price: 0,
    condition: 'used',
    age: 0,
    performance: 8.5,
  });

  const handleChange = (key: keyof LaptopForm, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('SUBMIT DATA:', form);
  };

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-5xl">
        {/* Breadcrumb */}
        <Breadcrumbs breadcrumItems={breadcrumbItems} />

        {/* Header */}
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}

              {/* <Input
                type="text"
                name="nameLaptop"
                label="Nama Laptop"
                placeholder="Laptop Asus"
                value={form.name}
                setValue={(e) => {}}
              /> */}

              <div>
                <label className="block font-medium mb-1">Nama Laptop</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="MacBook Pro M3"
                />
              </div>

              {/* PRICE + CONDITION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Harga (IDR)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      handleChange('price', Number(e.target.value))
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="15000000"
                  />
                </div>

                {/* <Input
                  type="text"
                  name="price"
                  label="Harga "
                  placeholder="5.000.000"
                  value={form.price.toString()}
                  setValue={(e) => {}}
                /> */}

                <div>
                  <label className="block font-medium mb-1">Kondisi</label>
                  <select
                    value={form.condition}
                    onChange={(e) => handleChange('condition', e.target.value)}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="refurbished">Refurbished</option>
                  </select>
                </div>
              </div>

              {/* AGE */}
              <div>
                <label className="block font-medium mb-1">Usia (Tahun)</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => handleChange('age', Number(e.target.value))}
                  className="w-40 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* PERFORMANCE */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium">Performa</label>
                  <span className="text-green-600 font-semibold">
                    {form.performance}
                  </span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={10}
                  step={0.1}
                  value={form.performance}
                  onChange={(e) =>
                    handleChange('performance', Number(e.target.value))
                  }
                  className="w-full text-primary"
                />

                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 (Low)</span>
                  <span>5</span>
                  <span>10 (High)</span>
                </div>
              </div>

              {/* ACTION */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          {/* SIDE PANEL */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border border-secondary/10 shadow-sm rounded-xl p-4 bg-primary/10">
              <h3 className="font-semibold mb-3 text-green-700">
                DSS Guidelines
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CircleCheck size={16} className="text-primary" /> Harga harus
                  sesuai pasar
                </li>
                <li className="flex items-center gap-2">
                  <CircleCheck size={16} className="text-primary" /> Performa
                  gunakan benchmark
                </li>
                <li className="flex items-center gap-2">
                  <CircleCheck size={16} className="text-primary" /> Usia
                  mempengaruhi nilai SMART
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
