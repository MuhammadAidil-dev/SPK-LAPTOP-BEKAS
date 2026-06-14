import type { MetadataRoute } from 'next';
import { laptopService } from '@/features/laptop/services/laptop.service';

const BASE_URL = 'https://laptopstore-inhil.my.id';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const laptopsResult = await laptopService.getAll();

  const laptopUrls: MetadataRoute.Sitemap = laptopsResult.success
    ? laptopsResult.data
        .filter((l) => l.isActive)
        .map((laptop) => ({
          url: `${BASE_URL}/laptops/detail/${laptop._id}`,
          lastModified: new Date(laptop.updatedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
    : [];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/laptops/all`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...laptopUrls,
  ];
}
