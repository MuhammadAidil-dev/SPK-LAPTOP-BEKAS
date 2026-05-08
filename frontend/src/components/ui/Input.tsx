import { LucideIcon } from 'lucide-react';

type InputProps = {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  icon?: LucideIcon;
  required?: boolean;
  value: string;
  setValue: (value: string) => void;
  isError?: {
    error: boolean;
    message: string;
  };
};

export default function Input({
  name,
  label,
  type = 'text',
  icon: Icon,
  placeholder,
  value,
  setValue,
  isError,
  required = false,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-base font-semibold">
        {label}
      </label>
      <div className="bg-primary/7 flex gap-2 border border-black px-2 py-2 rounded-md has-[input:focus]:border-primary  has-[input:focus]:[&>svg]:text-primary duration-200">
        {Icon && <Icon size={20} className="text-gray-400" />}
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          required={required}
          className="w-full focus: outline-none text-sm px-2"
        />
      </div>
      {isError?.error && (
        <p className="text-xs text-red-300">
          {isError.message || 'Validation error'}
        </p>
      )}
    </div>
  );
}
