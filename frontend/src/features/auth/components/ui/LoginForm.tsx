'use client';

import { useActionState } from 'react';
import { Lock, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import { loginAction } from '@/features/auth/actions/auth.action';

export default function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, null);

  return (
    <div className="mt-4">
      <form action={action} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <div className="flex items-center border rounded-lg px-3 gap-2 focus-within:ring-2 focus-within:ring-primary">
            <Mail size={16} className="text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              className="w-full py-2 outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Password</label>
          <div className="flex items-center border rounded-lg px-3 gap-2 focus-within:ring-2 focus-within:ring-primary">
            <Lock size={16} className="text-gray-400" />
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full py-2 outline-none text-sm"
            />
          </div>
        </div>

        {state?.error && (
          <p className="text-sm text-red-500 text-center">{state.error}</p>
        )}

        <div className="w-full mt-4">
          <Button disabled={isPending}>
            {isPending ? 'Memproses...' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
}
