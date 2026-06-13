import { ICalculationRanking } from '@/types/calculation.type';
import { formatCurrency } from '@/utils/utils';
import Link from 'next/link';

type Props = {
  rankings: ICalculationRanking[];
};

export default function RankingResultTable({ rankings }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-primary/10 text-black font-semibold">
          <tr>
            <th className="p-3 text-center w-10">Rank</th>
            <th className="p-3 text-left">Laptop</th>
            <th className="p-3 text-center">Price</th>
            <th className="p-3 text-right">Score</th>
            <th className="p-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {rankings.map((item) => (
            <tr key={item.laptop_id} className="border-t hover:bg-secondary/5">
              <td className="p-3 text-center font-semibold">{item.rank}</td>
              <td className="p-3">
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.brand}</p>
              </td>
              <td className="p-3 text-center">{formatCurrency(item.price)}</td>
              <td className="p-3 text-right font-semibold text-primary">
                {item.final_score.toFixed(2)}
              </td>
              <td className="p-3 text-right">
                <Link
                  href={`/laptops/detail/${item.laptop_id}`}
                  className="text-primary hover:underline text-xs"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
