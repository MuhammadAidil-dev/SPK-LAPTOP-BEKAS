import type { Metadata } from 'next';
import CompareResultView from '@/features/calculation/components/view/CompareResultView';

export const metadata: Metadata = {
  title: 'Perbandingan Laptop',
  description:
    'Bandingkan laptop bekas pilihan Anda dengan metode SMART untuk menemukan yang terbaik.',
};

export default function ComparePage() {
  return <CompareResultView />;
}
