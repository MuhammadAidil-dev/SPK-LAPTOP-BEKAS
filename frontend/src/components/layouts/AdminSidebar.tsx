'use client';

import {
  Award,
  Laptop,
  LayoutDashboard,
  LucideIcon,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export const navItems: NavItem[] = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/laptops', icon: Laptop, label: 'Laptops' },
  { href: '/criteria', icon: SlidersHorizontal, label: 'Criteria' },
  { href: '/recomendations', icon: Award, label: 'Recomendations' },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex flex-col w-62.5 min-h-screen bg-white fixed left-0 top-0 z-30 px-4 py-8 items-center
        transform transition-transform duration-300 border-r border-r-secondary/10 shadow-sm
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >
      <button
        onClick={onClose}
        className="lg:hidden self-end mb-2 p-1 rounded hover:bg-primary/20"
        aria-label="Close sidebar"
      >
        <X size={20} />
      </button>

      <div className="flex gap-2 items-center w-full">
        <span className="w-15 h-15 bg-primary rounded-md flex justify-center items-center shrink-0">
          <Laptop size={24} color="white" />
        </span>
        <div className="flex flex-col">
          <p className="font-bold text-black text-base">ADMIN PANEL</p>
          <p className="font-normal text-black text-xs">
            Decision Support System
          </p>
        </div>
      </div>

      <nav className="flex flex-col w-full mt-8 gap-4">
        {navItems.map((item) => {
          const isActive = pathname.includes(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 transition-all text-sm rounded-md ${
                isActive
                  ? 'bg-primary text-white font-semibold'
                  : 'text-black hover:pl-4 hover:border-b border-secondary'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
