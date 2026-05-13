import { Laptop } from 'lucide-react';
import LoginForm from '../ui/LoginForm';

export default function LoginView() {
  return (
    <div className="w-[85%] max-w-100 bg-white p-8 rounded-xl shadow-md flex flex-col border border-neutral/20">
      <div className="flex flex-col items-center gap-2">
        <span className="flex justify-center items-center w-15 h-15 bg-primary/10 rounded-md">
          <Laptop size={32} className="text-primary" />
        </span>
        <h1 className="font-bold text-black text-2xl">Laptop Store Inhil</h1>
        <p className="font-medium text-neutral text-base">
          SMART Decisition Support System
        </p>
      </div>

      <LoginForm />

      <hr className="mt-4" />
      <p className="text-xs text-neutral text-center mt-2">
        Authorized access only. By logging in, you agree to our Terms of
        Service.
      </p>
    </div>
  );
}
