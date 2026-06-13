'use client';

import { logoutAction } from '@/features/auth/actions/auth.action';
import { usePathname } from 'next/navigation';
import { Bell, CircleUser, LogOut, Menu } from 'lucide-react';
import { useTransition } from 'react';

type linkItemsType = {
  href: string;
  label: string;
};

export const linkItems: linkItemsType[] = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/laptops', label: 'Laptops' },
  { href: '/criteria', label: 'Criteria' },
  { href: '/recomendations', label: 'Recomendations' },
  { href: '/criteria/add', label: 'Add Criteria' },
  { href: '/criteria/edit', label: 'Edit Criteria' },
  { href: '/laptops/add', label: 'Add Laptop' },
  { href: '/laptops/edit', label: 'Edit Laptop' },
];

type Props = {
  onToggleSidebar: () => void;
};

export default function AdminTopbar({ onToggleSidebar }: Props) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  let label: string = '';
  for (const data of linkItems) {
    if (pathname === data.href) {
      label = data.label;
      break;
    }
  }

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <header className="fixed top-0 inset-x-0 py-4 px-4 md:px-8 bg-white shadow-sm border-b border-secondary/10 lg:ml-62.5 z-10">
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-1 rounded hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <Menu size={22} />
          </button>
          <h2 className="font-semibold text-lg text-black">{label}</h2>
        </div>

        <div className="flex gap-2 md:gap-4 items-center">
          {/* <span className="cursor-pointer hover:text-primary">
            <Bell size={20} />
          </span>

          <div className="flex items-center gap-2 border border-secondary rounded-md p-2">
            <CircleUser size={20} />
            <p className="font-semibold text-xs hidden sm:block">ADMIN</p>
          </div> */}

          <button
            onClick={handleLogout}
            disabled={isPending}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition disabled:opacity-50 cursor-pointer"
            title="Logout"
          >
            <LogOut size={18} />
            <span className="font-medium hidden sm:block">
              {isPending ? '...' : 'Logout'}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
