import { Laptop, LucideIcon } from 'lucide-react';

type SummaryCardProps = {
  label: string;
  value: string;
  icon?: LucideIcon;
  bgIcon?: keyof typeof iconColor;
};

const iconColor = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
  tertiary: 'bg-tertiary text-white',
  neutral: 'bg-neutral text-white',
};

const bgColor = {
  primary: 'bg-primary/10',
  secondary: 'bg-secondary/10',
  tertiary: 'bg-tertiary/10',
  neutral: 'bg-neutral/10',
};

export default function SummaryCard({
  label,
  value,
  icon: Icon = Laptop,
  bgIcon = 'primary',
}: SummaryCardProps) {
  return (
    <div
      className={`flex items-center gap-4 ${bgColor[bgIcon]} rounded-md border border-secondary/5 shadow-sm p-4`}
    >
      <span
        className={`w-13 h-13 rounded-md ${iconColor[bgIcon]} flex justify-center items-center`}
      >
        <Icon size={28} />
      </span>
      <div className="flex flex-col">
        <p className="font-semibold text-sm text-black">{label}</p>
        <p className="font-bold text-lg text-black">{value}</p>
      </div>
    </div>
  );
}
