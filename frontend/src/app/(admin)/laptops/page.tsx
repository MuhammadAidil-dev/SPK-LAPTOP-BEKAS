import AdminLaptopView from '@/features/laptop/components/view/AdminLaptopView';
import { laptopService } from '@/features/laptop/services/laptop.service';

export default async function AdminLaptopPage() {
  const result = await laptopService.getAll();
  const laptops = result.success ? result.data : [];

  return <AdminLaptopView laptops={laptops} />;
}
