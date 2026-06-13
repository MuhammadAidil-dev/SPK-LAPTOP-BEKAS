import LaptopEditView from '@/features/laptop/components/view/LaptopEditView';
import { laptopService } from '@/features/laptop/services/laptop.service';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LaptopEditPage({ params }: Props) {
  const { id } = await params;
  const result = await laptopService.getById(id);

  if (!result.success) notFound();

  return <LaptopEditView laptop={result.data} />;
}
