function requireEnv(key: string, value: string | undefined): string {
  if (value === undefined || value === '') {
    throw new Error(`Environment variable ${key} is required to run the server`);
  }
  return value.trim();
}

export const loadEnvPublic = () => ({
  NODE_ENV: requireEnv('NEXT_PUBLIC_NODE_ENV', process.env.NEXT_PUBLIC_NODE_ENV),
  BASE_URL: requireEnv('NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL),
});
