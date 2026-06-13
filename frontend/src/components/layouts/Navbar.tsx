'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/laptops/all', label: 'Semua Ranking' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 bg-white shadow-sm border-b border-b-secondary/10 z-50">
      <div className="flex justify-between items-center py-4 px-[5%]">
        <h1 className="font-semibold text-lg md:text-xl text-primary">
          LAPTOP STORE INHIL
        </h1>

        <div className="hidden sm:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-semibold text-sm hover:text-primary duration-200 ${
                pathname === link.href ? 'text-primary' : 'text-secondary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="sm:hidden p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden flex flex-col px-[5%] pb-4 border-t">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-semibold text-sm py-3 border-b border-gray-100 last:border-0 hover:text-primary duration-200 ${
                pathname === link.href ? 'text-primary' : 'text-secondary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
