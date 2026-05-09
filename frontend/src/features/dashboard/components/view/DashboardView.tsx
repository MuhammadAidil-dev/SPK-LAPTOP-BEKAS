'use client';

import { dummyLaptops, dummyMetrics } from '@/constant/dummy/laptop.dummy';
import { MetricCard } from '../card/MetricCard';
import { Plus } from 'lucide-react';
import { LaptopTable } from '@/components/ui/LaptopTable';

export default function DashboardView() {
  const handleAddLaptop = () => {
    console.log('Add new laptop clicked');
    // TODO: Navigate to add laptop form
  };

  const handleEditLaptop = (id: string) => {
    console.log('Edit laptop:', id);
    // TODO: Navigate to edit laptop form
  };

  const handleDeleteLaptop = (id: string) => {
    console.log('Delete laptop:', id);
    // TODO: Show confirmation dialog and delete
  };

  return (
    <div className="flex flex-col py-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {dummyMetrics.map((metric) => (
          <MetricCard key={metric.title} metric={metric} icon={metric.icon} />
        ))}
      </div>

      {/* Laptop Table */}
      <div className=" border border-secondary/10 shadow-sm rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="text-h1 text-on-surface">Recent Laptop Entries</h3>
            <p className="text-body-sm text-on-surface-variant">
              Manage and review the latest second-hand laptop data.
            </p>
          </div>
          <button
            onClick={handleAddLaptop}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:bg-hover transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Laptop
          </button>
        </div>

        <LaptopTable
          laptops={dummyLaptops}
          onEdit={handleEditLaptop}
          onDelete={handleDeleteLaptop}
        />

        {/* Footer / Pagination */}
        <div className="p-6 flex items-center justify-between">
          <span className="text-sm">
            Showing {dummyLaptops.length} of {dummyLaptops.length} laptops
          </span>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-secondary/50 rounded-lg text-sm font-medium">
              Previous
            </button>
            <button className="px-4 py-2 border border-secondary/50 rounded-lg text-sm font-medium ">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
