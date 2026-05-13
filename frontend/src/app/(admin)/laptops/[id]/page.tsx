import LaptopDetailView from '@/features/laptop/components/view/LaptopDetailView';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function LaptopDetailPage({ params }: Props) {
  return <LaptopDetailView />;
}
