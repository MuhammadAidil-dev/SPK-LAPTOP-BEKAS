import AdminCriteriaView from '@/features/criteria/components/view/AdminCriteriaView';
import { criteriaService } from '@/features/criteria/services/criteria.service';

export default async function AdminCriteriaPage() {
  const result = await criteriaService.getAll();
  const criteria = result.success ? result.data : [];

  return <AdminCriteriaView criteria={criteria} />;
}
