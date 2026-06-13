import PublicLaptopDetailView from '@/features/laptop/components/view/PublicLaptopDetailView';
import { calculationService } from '@/features/calculation/services/calculation.service';
import { laptopService } from '@/features/laptop/services/laptop.service';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PublicLaptopDetailPage({ params }: Props) {
  const { id } = await params;
  const [result, calcResult] = await Promise.all([
    laptopService.getById(id),
    calculationService.calculate(),
  ]);

  if (!result.success) notFound();

  const ranking = calcResult.success
    ? calcResult.data.rankings.find((r) => r.laptop_id === id) ?? null
    : null;

  const totalRankings = calcResult.success ? calcResult.data.rankings.length : 0;

  return (
    <PublicLaptopDetailView
      laptop={result.data}
      ranking={ranking}
      totalRankings={totalRankings}
    />
  );
}
