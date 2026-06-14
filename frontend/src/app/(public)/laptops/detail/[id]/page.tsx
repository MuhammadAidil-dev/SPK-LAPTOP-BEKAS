import type { Metadata } from 'next';
import PublicLaptopDetailView from '@/features/laptop/components/view/PublicLaptopDetailView';
import { calculationService } from '@/features/calculation/services/calculation.service';
import { laptopService } from '@/features/laptop/services/laptop.service';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const result = await laptopService.getById(id);

  if (!result.success) {
    return { title: 'Laptop Tidak Ditemukan' };
  }

  const laptop = result.data;
  const title = `${laptop.name} - ${laptop.brand}`;
  const description = `Detail laptop bekas ${laptop.name} (${laptop.brand}). RAM ${laptop.ram}GB, Storage ${laptop.storage}GB, Harga Rp ${laptop.price.toLocaleString('id-ID')}. Cek rekomendasi dan spesifikasi lengkap.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | SPK Laptop Bekas`,
      description,
      url: `https://laptopstore-inhil.my.id/laptops/detail/${id}`,
      images: laptop.image ? [{ url: laptop.image, alt: laptop.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: laptop.image ? [laptop.image] : [],
    },
  };
}

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

  const laptop = result.data;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: laptop.name,
    brand: { '@type': 'Brand', name: laptop.brand },
    description: `Laptop bekas ${laptop.name} - RAM ${laptop.ram}GB, Storage ${laptop.storage}GB`,
    image: laptop.image ?? undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      price: laptop.price,
      availability: laptop.isActive
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://laptopstore-inhil.my.id/laptops/detail/${id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PublicLaptopDetailView
        laptop={laptop}
        ranking={ranking}
        totalRankings={totalRankings}
      />
    </>
  );
}
