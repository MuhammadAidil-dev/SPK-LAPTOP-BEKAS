import CriteriaEditView from '@/features/criteria/components/view/CriteriaEditView';
import { criteriaService } from '@/features/criteria/services/criteria.service';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CriteriaEditPage({ params }: Props) {
  const { id } = await params;
  const result = await criteriaService.getAll();

  if (!result.success) {
    return <p className="p-8 text-red-500">Gagal memuat data kriteria.</p>;
  }

  const criteria = result.data.find((c) => c._id === id);
  if (!criteria) notFound();

  return <CriteriaEditView criteria={criteria} />;
}
