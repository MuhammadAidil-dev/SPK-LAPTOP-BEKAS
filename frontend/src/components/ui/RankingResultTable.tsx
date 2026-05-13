import { ILaptop, Result } from '@/types/laptop.type';
import { formatCurrency } from '@/utils/utils';

/**
 * Dummy Data (sementara, nanti pindah ke service)
 */
export const laptops: ILaptop[] = [
  {
    id: '1',
    name: 'MacBook Pro M3 Max',
    price: 48999000,
    processor: 'M3 Max (14-Core)',
    ram: '36GB',
    performance_score: 95,
    condition_score: 90,
    age: 1,
  },
  {
    id: '2',
    name: 'Dell XPS 15 9530',
    price: 34500000,
    processor: 'i9-13900H',
    ram: '32GB',
    performance_score: 90,
    condition_score: 85,
    age: 2,
  },
  {
    id: '3',
    name: 'Asus Zenbook 14 OLED',
    price: 19200000,
    processor: 'Ryzen 7 7840U',
    ram: '16GB',
    performance_score: 85,
    condition_score: 88,
    age: 2,
  },
];

/**
 * Dummy Result (hasil SMART)
 */
export const results: Result[] = [
  { laptop_id: '1', final_score: 0.984, rank: 1 },
  { laptop_id: '2', final_score: 0.892, rank: 2 },
  { laptop_id: '3', final_score: 0.845, rank: 3 },
];

const ranked = results
  .map((r) => ({
    ...r,
    laptop: laptops.find((l) => l.id === r.laptop_id)!,
  }))
  .sort((a, b) => a.rank - b.rank);

export const best = ranked[0];

export default function RankingResultTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-primary/10 text-black font-semibold">
          <tr>
            <th className="p-3 text-center w-10">Rank</th>
            <th className="p-3 text-left">Laptop</th>
            <th className="p-3">Price</th>
            <th className="p-3">Processor</th>
            <th className="p-3">RAM</th>
            <th className="p-3 text-right">Score</th>
            <th className="p-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {ranked.map((item) => (
            <tr key={item.laptop_id} className="border-t hover:bg-secondary/5">
              <td className="p-3 text-center">{item.rank}</td>
              <td className="p-3 font-medium">{item.laptop.name}</td>
              <td className="p-3 text-center">
                Rp {formatCurrency(item.laptop.price)}
              </td>
              <td className="p-3 text-center">{item.laptop.processor}</td>
              <td className="p-3 text-center">{item.laptop.ram}</td>
              <td className="p-3 text-right font-semibold">
                {item.final_score}
              </td>
              <td className="p-3 text-right">
                <button>Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
