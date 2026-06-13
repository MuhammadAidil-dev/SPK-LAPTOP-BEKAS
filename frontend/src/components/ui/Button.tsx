type ButtonProps = {
  children: Readonly<React.ReactNode>;
  color?: keyof typeof buttonColor;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
};

const buttonColor = {
  primary: 'bg-primary hover:bg-hover',
  secondary: 'bg-secondary hover:bg-secondary/80',
};

export default function Button({
  children,
  color = 'primary',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${color ? buttonColor[color] : 'bg-primary'} w-full px-1 py-2 rounded-md font-semibold text-white text-sm cursor-pointer duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
