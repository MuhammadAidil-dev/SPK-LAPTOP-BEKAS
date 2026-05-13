import CriteriaEditView from '@/features/criteria/components/view/CriteriaEditView';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CriteriaEditPage({ params }: Props) {
  const { id } = await params;

  return <CriteriaEditView />;
}
