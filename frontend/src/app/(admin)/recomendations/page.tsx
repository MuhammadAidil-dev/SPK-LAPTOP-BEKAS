import AdminRecomendationView from '@/features/recomendation/components/view/AdminRecomendationView';
import { calculationService } from '@/features/calculation/services/calculation.service';

export default async function AdminRecomendationPage() {
  const result = await calculationService.calculate();

  if (!result.success) {
    return (
      <p className="p-8 text-red-500">
        Gagal memuat data rekomendasi: {result.error.message}
      </p>
    );
  }

  return <AdminRecomendationView result={result.data} />;
}
