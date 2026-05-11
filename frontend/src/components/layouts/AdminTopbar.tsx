'use client';

import { usePathname } from 'next/navigation';
import { linkItems } from './AdminSidebar';
import { Bell, CircleUser } from 'lucide-react';

export default function AdminTopbar() {
  const pathname = usePathname();
  let label: string = '';

  for (const data of linkItems) {
    if (pathname == data.href) {
      label = data.label;
      break;
    }
  }

  return (
    <header className="fixed top-0 inset-x-0 py-4 px-8 bg-white shadow-sm border-b border-secondary/10 ml-62.5">
      <nav className="flex justify-between items-center">
        <h2 className="font-semibold text-lg text-black">{label}</h2>
        <div className="flex gap-4 items-center">
          <span className="cursor-pointer hover:text-primary">
            <Bell size={20} />
          </span>
          <div className="cursor-pointer flex items-center gap-2 border border-secondary rounded-md p-2 hover:text-primary hover:border-primary">
            <span>
              <CircleUser size={20} />
            </span>
            <p className="font-semibold text-xs hover:text-primary">ADMIN</p>
          </div>
        </div>
      </nav>
    </header>
  );
}
