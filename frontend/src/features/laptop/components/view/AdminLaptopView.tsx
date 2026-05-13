'use client';

import SummaryCard from '@/components/card/SummaryCard';
import ButtonLink from '@/components/ui/ButtonLink';
import { LaptopTable } from '@/components/ui/LaptopTable';
import { dummyLaptops } from '@/constant/dummy/laptop.dummy';
import { Plus, Wallet } from 'lucide-react';

export default function AdminLaptopView() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-h1 text-on-surface">Recent Laptop Entries</h3>
          <p className="text-body-sm text-on-surface-variant">
            Manage and review the latest second-hand laptop data.
          </p>
        </div>
        <div className="w-50">
          <ButtonLink href="/laptops/add">
            <Plus className="w-4 h-4" />
            Add New Laptop
          </ButtonLink>
        </div>
      </div>

      <div className="border border-secondary/10 rounded-md shadow-sm">
        {/* table */}
        <LaptopTable laptops={dummyLaptops} />

        {/* Footer / Pagination */}
        <div className="p-4 flex items-center justify-between bg-primary/5">
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

      <div className="grid grid-cols-3 mt-8 gap-4">
        <SummaryCard label="Total Managed" value="24 Units" />
        <SummaryCard
          label="Avg. Price"
          value="Rp 18.5 Juta"
          icon={Wallet}
          bgIcon="secondary"
        />
      </div>
    </div>
  );
}
