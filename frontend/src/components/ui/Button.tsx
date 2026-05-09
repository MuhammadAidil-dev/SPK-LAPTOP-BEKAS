type ButtonProps = {
  children: Readonly<React.ReactNode>;
  color?: keyof typeof buttonColor;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

const buttonColor = {
  primary: 'bg-primary hover:bg-hover',
  secondary: 'bg-secondary',
};

export default function Button({
  children,
  color = 'primary',
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${color ? buttonColor[color] : 'bg-primary'} w-full px-1 py-2 rounded-md font-semibold text-white text-sm cursor-pointer duration-200 flex items-center justify-center gap-2`}
    >
      {children}
    </button>
  );
}
