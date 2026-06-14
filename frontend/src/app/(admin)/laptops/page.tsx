import AdminLaptopView from '@/features/laptop/components/view/AdminLaptopView';
import { laptopService } from '@/features/laptop/services/laptop.service';

type Props = {
  searchParams: Promise<{ toast?: string }>;
};

export default async function AdminLaptopPage({ searchParams }: Props) {
  const [result, { toast: toastParam }] = await Promise.all([
    laptopService.getAll(),
    searchParams,
  ]);
  const laptops = result.success ? result.data : [];

  return <AdminLaptopView laptops={laptops} toastParam={toastParam} />;
}
