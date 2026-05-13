import PublicLaptopDetailView from '@/features/laptop/components/view/PublicLaptopDetailView';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function PublicLaptopDetailPage({ params }: Props) {
  return <PublicLaptopDetailView />;
}
