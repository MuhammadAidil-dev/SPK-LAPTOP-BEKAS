'use client';

import Button from '@/components/ui/Button';
import { CriteriaDTO } from '@/types/criteria.type';
import Link from 'next/link';
import { useState } from 'react';

export default function CriteriaAddView() {
  const [form, setForm] = useState<CriteriaDTO>({
    name: '',
    description: '',
    weight: 0.45,
    type: 'benefit',
  });

  const handleChange = (key: keyof CriteriaDTO, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: integrate with service layer
    console.log('SUBMIT CRITERIA:', form);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center">
      {/* Breadcrumb */}
      <div className="w-full mb-8 flex items-center justify-between">
        <nav className="flex items-center gap-2 text-gray-500 text-sm">
          <Link
            href={'/criteria'}
            className="hover:text-green-600 cursor-pointer"
          >
            Criteria
          </Link>
          <span>{'>'}</span>
          <span className="text-gray-900 font-semibold">
            Manage SMART Criterion
          </span>
        </nav>
      </div>

      {/* Card */}
      <div className="w-full bg-white border border-secondary/10 rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-primary/10">
          <h2 className="text-lg font-semibold">Add Criteria</h2>
          <p className="text-sm text-gray-500 mt-1">
            Define SMART attributes for decision model.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-gray-500">
              Criterion Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Price, Performance"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-gray-500">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              placeholder="Explain impact to SMART calculation"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Weight */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase text-gray-500">
                  Weight (0 - 1)
                </label>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                  {form.weight.toFixed(2)}
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={form.weight}
                onChange={(e) => handleChange('weight', Number(e.target.value))}
                className="w-full accent-green-600"
              />

              <div className="flex justify-between text-xs text-gray-400">
                <span>0</span>
                <span>0.5</span>
                <span>1</span>
              </div>
            </div>

            {/* Utility Type */}
            <div className="flex flex-col gap-4">
              <label className="text-xs font-semibold uppercase text-gray-500">
                Utility Type
              </label>

              <div className="flex gap-3">
                {/* Benefit */}
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="benefit"
                    checked={form.type === 'benefit'}
                    onChange={() => handleChange('type', 'benefit')}
                    className="hidden"
                  />
                  <div
                    className={`p-4 border rounded-lg text-center transition ${
                      form.type === 'benefit'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-300'
                    }`}
                  >
                    <p className="text-sm font-semibold">BENEFIT</p>
                  </div>
                </label>

                {/* Cost */}
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="cost"
                    checked={form.type === 'cost'}
                    onChange={() => handleChange('type', 'cost')}
                    className="hidden"
                  />
                  <div
                    className={`p-4 border rounded-lg text-center transition ${
                      form.type === 'cost'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300'
                    }`}
                  >
                    <p className="text-sm font-semibold">COST</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-primary/10 p-4 rounded-lg text-sm text-gray-600">
            Benefit = nilai tinggi lebih baik (contoh: RAM) <br />
            Cost = nilai rendah lebih baik (contoh: harga)
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <div className="w-75 flex items-center gap-4">
              <Button type="button" color="secondary">
                Cancel
              </Button>
              <Button type="submit">Save Criteria</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
