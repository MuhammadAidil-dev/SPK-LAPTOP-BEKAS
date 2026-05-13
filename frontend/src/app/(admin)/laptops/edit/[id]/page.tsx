import LaptopEditView from '@/features/laptop/components/view/LaptopEditView';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LaptopEditPage({ params }: Props) {
  const { id } = await params;

  return <LaptopEditView />;
}
