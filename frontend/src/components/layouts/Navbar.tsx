'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 py-4 px-[5%] bg-white shadow-sm border-b border-b-secondary/10 z-50">
      <nav className="flex justify-between items-center">
        <h1 className="font-semibold text-xl text-primary">
          LAPTOP STORE INHIL
        </h1>
        <div className="flex items-center gap-4">
          <Link
            href={'/'}
            className={`font-semibold text-sm  hover:text-primary duration-200 ${pathname === '/' ? 'text-primary' : 'text-secondary'}`}
          >
            Beranda
          </Link>
          <Link
            href={'/laptops/all'}
            className={`font-semibold text-sm hover:text-primary duration-200 ${pathname === '/laptops/all' ? 'text-primary' : 'text-secondary'}`}
          >
            Semua Ranking
          </Link>
        </div>
      </nav>
    </header>
  );
}
