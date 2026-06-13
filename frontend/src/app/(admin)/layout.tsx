import AdminShell from '@/components/layouts/AdminShell';

export default function AdminLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <AdminShell>{children}</AdminShell>;
}
