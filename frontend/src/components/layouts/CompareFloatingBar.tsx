'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Scale, X } from 'lucide-react';
import { getCompareCount, resetCompare } from '@/lib/compare-storage';

export default function CompareFloatingBar() {
  const pathname = usePathname();
  const [compareCount, setCompareCount] = useState(getCompareCount);

  useEffect(() => {
    const handler = () => setCompareCount(getCompareCount());
    window.addEventListener('storage', handler);
    window.addEventListener('compare-update', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('compare-update', handler);
    };
  }, []);

  if (compareCount === 0 || pathname === '/laptops/compare') return null;

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 px-4 flex justify-center">
      <div className="flex items-center gap-3 bg-gray-900 text-white rounded-full shadow-lg pl-4 pr-2 py-2">
        <Scale size={16} className="text-primary shrink-0" />
        <span className="text-sm font-medium whitespace-nowrap">
          {compareCount} laptop dipilih
        </span>
        <Link
          href="/laptops/compare"
          className="bg-primary hover:bg-hover text-white text-sm font-semibold px-4 py-1.5 rounded-full transition whitespace-nowrap"
        >
          Bandingkan Sekarang
        </Link>
        <button
          onClick={resetCompare}
          aria-label="Batalkan perbandingan"
          className="p-1.5 hover:bg-white/10 rounded-full transition shrink-0"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
