import Link from 'next/link';

type ButtonProps = {
  children: Readonly<React.ReactNode>;
  color?: keyof typeof buttonColor;
  href: string;
};

const buttonColor = {
  primary: 'bg-primary hover:bg-hover',
  secondary: 'bg-secondary',
};

export default function ButtonLink({
  children,
  color = 'primary',
  href,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${color ? buttonColor[color] : 'bg-primary'} w-full px-1 py-2 rounded-md font-semibold text-white text-sm cursor-pointer duration-200 flex items-center justify-center gap-2`}
    >
      {children}
    </Link>
  );
}
