'use client';

import ButtonLink from '@/components/ui/ButtonLink';
import { LaptopTable } from '@/components/ui/LaptopTable';
import { ILaptop } from '@/types/laptop.type';
import { Plus } from 'lucide-react';
import { useTransition } from 'react';
import { deleteLaptopAction } from '@/features/laptop/actions/laptop.action';

type Props = {
  laptops: ILaptop[];
};

export default function AdminLaptopView({ laptops }: Props) {
  const [, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteLaptopAction(id);
    });
  };

  return (
    <div className="flex flex-col">
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
        <LaptopTable laptops={laptops} onDelete={handleDelete} />

        <div className="p-4 flex items-center justify-between bg-primary/5">
          <span className="text-sm">
            Showing {laptops.length} laptop{laptops.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
