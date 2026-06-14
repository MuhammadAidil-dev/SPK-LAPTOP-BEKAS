'use client';

import ButtonLink from '@/components/ui/ButtonLink';
import { LaptopTable } from '@/components/ui/LaptopTable';
import { ILaptop } from '@/types/laptop.type';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteLaptopAction } from '@/features/laptop/actions/laptop.action';

type Props = {
  laptops: ILaptop[];
  toastParam?: string;
};

export default function AdminLaptopView({ laptops, toastParam }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const toastShown = useRef(false);

  useEffect(() => {
    if (!toastParam || toastShown.current) return;
    toastShown.current = true;
    if (toastParam === 'added') toast.success('Laptop berhasil ditambahkan');
    if (toastParam === 'updated') toast.success('Laptop berhasil diperbarui');
    router.replace('/laptops');
  }, [toastParam, router]);

  const handleDeleteConfirm = () => {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    setPendingDeleteId(null);
    startTransition(async () => {
      const result = await deleteLaptopAction(id);
      if (result?.error) toast.error(result.error);
      else toast.success('Laptop berhasil dihapus');
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
        <LaptopTable laptops={laptops} onDelete={(id) => setPendingDeleteId(id)} />

        <div className="p-4 flex items-center justify-between bg-primary/5">
          <span className="text-sm">
            Showing {laptops.length} laptop{laptops.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {pendingDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-base font-semibold text-gray-900">
                Hapus Laptop?
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Data laptop ini akan dihapus secara permanen dan tidak bisa dikembalikan.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingDeleteId(null)}
                disabled={isPending}
                className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isPending}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
