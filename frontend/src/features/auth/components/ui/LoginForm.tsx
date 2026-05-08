'use client';

import Input from '@/components/ui/Input';
import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="mt-4">
      <form className="flex flex-col gap-4">
        <Input
          name="email"
          label="Email"
          value={email}
          setValue={setEmail}
          placeholder="email@example.com"
          icon={Mail}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={password}
          setValue={setPassword}
          placeholder="*****"
          icon={Lock}
        />

        <div className="w-full mt-4">
          <Button>Login</Button>
        </div>
      </form>
    </div>
  );
}
