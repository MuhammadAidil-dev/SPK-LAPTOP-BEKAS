import DashboardView from '@/features/dashboard/components/view/DashboardView';
import { criteriaService } from '@/features/criteria/services/criteria.service';
import { laptopService } from '@/features/laptop/services/laptop.service';

export default async function AdminDashboardPage() {
  const [laptopsResult, criteriaResult] = await Promise.all([
    laptopService.getAll(),
    criteriaService.getAll(),
  ]);

  const laptops = laptopsResult.success ? laptopsResult.data : [];
  const criteriaCount = criteriaResult.success ? criteriaResult.data.length : 0;

  return <DashboardView laptops={laptops} criteriaCount={criteriaCount} />;
}
